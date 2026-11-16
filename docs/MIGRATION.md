# Migration Tracker

Modelled on the CCSA tracker (`call-center-solutions-africa/docs/MIGRATION.md`).

## Status Legend
- ✅ Done
- 🔄 In Progress
- ⏳ Pending

## Starting point (audited)
- Next 16, **Pages Router**, 255 `.js` files, **0 TypeScript**, `jsconfig.json` only. `src/app/` holds only `globals.css`.
- Supabase is used for everything: blogs, comments, and all transactional data.
- Content is hardcoded in pages/components (masterclasses, certified agencies, awards categories, exhibitors, clients, partners, FAQs, events, summit data).
- i18n via `next-intl` (`src/messages/en.json`, `fr.json`).
- Pages use `getServerSideProps` (blogs, careers, masterclasses) — no static/ISR.

## Update (after pulling latest, 2026-11-15)
- **Summit 2026 + PAAN Awards cancelled**: `SUMMIT_CANCELLED=true` (`src/data/summit/status.js`), `/summit/*`, `/paan-awards/*`, `/paan-awards-terms` redirect to `/` (temporary) via `HIDDEN_PATHS` in `next.config.js`, and are excluded in `next-sitemap.config.js`. → **Summit and Awards content is out of scope for Sanity for now**; do not spend effort on 2,800+ lines of unreachable pages. Revisit when/if an edition returns (then model as `summitEdition` with a year field).
- **Webinars are the live events content** (`eventsData.js` is edited by hand for each webinar) → Events moves up to Phase 1.2b, right after agencies.
- **Agency marquee lists more agencies than there are profile pages** (Growthpad/GCG, TDC, Ingenium have logos only) → `agency` schema gets `hasProfilePage`; marquee/grid read from Sanity.
- **UPDATE 2026-11-15 (later): Summit and Awards content now moves to Sanity too** (reverses the deferral above). The pages stay hidden behind `SUMMIT_CANCELLED` + `HIDDEN_PATHS` while this is done, so it can be migrated and verified without anything going public. See Phase 1.5.
- **Ticket retrieval** (`retrieve-ticket` + API) is still live for existing ticket holders → ticket/payment code stays untouched and must keep working through the migration.
- **Redirects must be carried through every phase** (HIDDEN_PATHS, www/host redirect, plus new agency/blog redirects).

**Package manager: pnpm** (switched from npm on branch `feat/sanity-foundation`; `pnpm-lock.yaml`, `packageManager` field). Studio code lives in `src/sanity/` + root `sanity.config.ts`.

## Guiding rule: what goes in Sanity vs. stays in Supabase
| Goes to Sanity (editorial, edited by humans) | Stays in Supabase (transactional / user-generated) |
|---|---|
| Blog posts, categories, authors | `ticket_purchases`, `purchasers`, `attendees`, `purchase_items`, `payment_transactions`, `ticket_types` |
| Certified agencies | `promo_codes`, `masterclass_promo_codes` |
| Webinars / events (live) | `experience_bookings` |
| Events / webinars | `summit_leads`, `eoi_submissions`, `enquiry_submissions`, `agency_enquiries`, `agency_contacts`, `partner_enquiries`, `newsletter_subscriptions` |
| Summit content (speakers, sessions, tracks, partners, exhibitors, travel guide + experiences, per edition/year) — Phase 1.5 | Talent discovery (`profiles`, `skills`, `portfolio_items`, `profile_badges`, countries/cities) |
| Awards (categories, terms, judges/info, per edition/year) — Phase 1.5 | Trends dashboard data + cron aggregation |
| ~~Clients, partners, FAQs, testimonials~~ → `src/data` (decision 2026-11-15) | `blog_comments` (user-generated; keep, key by Sanity post `_id`/slug) |
| Careers / job postings (currently i18n JSON) | |
| ~~Academy programs, membership tiers, pricing~~ → `src/data` (decision 2026-11-15) | |
| ~~Site settings (nav, footer, banners/popup, CTA links, hidden-pages list)~~ → `src/data/site.ts` (decision 2026-11-15) | |

**Consequence vs. CCSA:** Supabase can *not* be fully removed here. Target is "Supabase for data, Sanity for content". `hr_users` (blog authors) is replaced by Sanity `author` documents.

---

## 1. CMS Migration (→ Sanity)

### Phase 1.0 — Foundation
| Task | Status | Notes |
|---|---|---|
| Install `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`, `@portabletext/react` | ✅ | Copy `sanity.config.ts` + `sanity/lib` pattern from CCSA |
| New dataset + env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`, read token, webhook secret) | ⏳ | Separate project from CCSA |
| Embed Studio at `/studio` | ✅ | Pages-router catch-all first, `app/studio` later |
| Shared helpers: `sanityClient`, `urlFor`, GROQ fetch wrapper | ✅ | |
| i18n strategy for en/fr | ⏳ | Decide once: field-level (`sanity-plugin-internationalized-array`) — recommended, since `next-intl` is already document-agnostic |
| ISR + on-demand revalidation webhook (`/api/revalidate`) | 🔄 | Handler done; still need to add the webhook in Sanity manage + `SANITY_REVALIDATE_SECRET` env (local + Vercel). Replaces `getServerSideProps` for content pages |

### Phase 1.1 — Blog (first, mirrors CCSA)
| Area | Status | Notes |
|---|---|---|
| Schemas: `post`, `category`, `author` (tags are strings on the post) | ✅ | Portable Text `body` for new posts; legacy HTML in `rawHtml` |
| Export script: Supabase `blogs` + `blog_categories` + `blog_tags` + `hr_users` → NDJSON → `sanity dataset import` | ✅ | Done 2026-11-15: 53 posts, 1 author, 3 categories imported; parity check vs Supabase = 100% (slugs, bodies, published flags). Images stay on ImageKit (`mainImageUrl`) |
| HTML → Portable Text conversion | ✅ | `scripts/convert-html-to-pt.mjs` (dry-run by default). Added `tableBlock` + `imageUrl` block types. All 53 posts converted; each verified identical to what the site rendered before (text, headings, lists, images, table cells, bold/italic/underline text, visible link targets). Intentionally dropped: blank-space-only anchors, `color:` span styles, `text-align:center` on 17 paragraphs. `rawHtml` kept as backup; revert a post by unsetting `body` |
| `src/lib/blogService` (GROQ) replaces `usePublicBlog` | ✅ | Hook is client-side Supabase fetching today |
| Update `blogs/index`, `blogs/[slug]`, `RelatedPosts`, `TableOfContents`, `BlogAuthor` | ✅ | `sanitizeBlogHtml` / `readTime` util reworked for Portable Text |
| `BlogComments` + `CommentCount` | ✅ removed | **Decision (2026-11-15): blog comments removed.** Only 4 comments in ~17 months (1 test by the owner, 2 cold outreach/solicitation, 1 genuine "Insightful!"). Form, count badge and `useBlogComments` deleted. Supabase table `blog_comments` left untouched; the 4 rows are backed up to `scripts/backups/` (gitignored: contains visitor emails). Drop the table in cleanup A when ready. This also removes the "new posts have no comments" gap and the unverified-reCAPTCHA concern |
| `sitemap-blogs.xml.js` | ✅ | Query Sanity instead of Supabase |
| 301 redirect audit | ✅ | Slugs unchanged, URLs unchanged → none needed. Still verify in Search Console after deploy |
| Blog images ImageKit → Sanity assets | ✅ | `scripts/migrate-images-to-sanity.mjs` (dry-run default). 207 images (77 MB) uploaded, 154 body image blocks + 53 featured images now Sanity `image`s; Studio shows thumbnails. `cdn.sanity.io` added to `remotePatterns`. `rawHtml` backup still points at ImageKit. **Decision (2026-11-15): migrate ALL site images from ImageKit to Sanity eventually** (events, webinars, logos, etc. as each phase lands); keep ImageKit live until the last page is moved. Alt text: filename-style alts were replaced with the post title — editors should improve them |
| Cutover checks | ⏳ | Set `SANITY_REVALIDATE_SECRET` + Sanity webhook; add CORS origins; deploy preview and diff 5 top posts; then remove blog code from Supabase (`blogs`, `blog_*` tables stay until verified in prod) |
| Known pre-existing issues found | ⏳ | `africas-future-of-digital-advertising` has a 1.7 MB base64 image in the body (upload as a real image); `[slug]` subscribe form posted to non-existent `/api/subscribe` (**fixed 2026-11-15**: now `/api/subscribe-newsletter`, clears the form, shows the server's error message); `RelatedPosts` linked to `/blog/` (fixed → `/blogs/`) |

### Phase 1.2 — Certified Agencies ✅
Seven near-identical ~850-line pages (6,000 lines) → one Sanity schema + one template. Done 2026-11-15.
| Area | Status | Notes |
|---|---|---|
| Schema `agency` (+ `localizedString` / `localizedText`) | ✅ | Name, slug, tier (associate/full/gold), member since, countries (flags), about, specializations, video (URL or file), client logos, testimonial, social links, contact intro, SEO. English required, French optional (falls back to English). `hasProfilePage` + `order` + `marqueeLogo` drive the homepage logo strip |
| Seed script `scripts/migrate-agencies-to-sanity.mjs` | ✅ | Dry-run default; skips existing docs unless `--force`. 10 agencies (7 with pages + Ingenium, Talking Drum Comms, Growthpad as logo-only), 107 files uploaded (logos, client logos, 2 videos) |
| One template: `components/agencies/AgencyProfile.tsx` + `pages/certified-agencies/[slug].tsx` | ✅ | Generated from the Aquila page so layout/animation/form are unchanged; ISR 1h + webhook. Component is `@ts-nocheck` internally (props typed) |
| Verified vs old pages | ✅ | Rendered text, links and image counts compared with a pre-change baseline: Aquila, Nitro, Omni, Penquin identical; Liftup/Media Seal differ only in "Follow … on social media" wording; Xperia now uses the standard header |
| URLs unchanged | ✅ | Same slugs (incl. `media_seal`, `xperia_agency`), so no redirects. Optional later: hyphenate + 301 |
| Homepage logo strip (`AgencyLogosMarquee`) from Sanity | ✅ | Left strip is Sanity (10 logos). Right strip = free members, still hardcoded → move in 1.3 (clients/partners) |
| Deleted: 7 page files, `certifiedAgencies.aquila/liftup` i18n keys | ✅ | Shared form labels moved to `certifiedAgencies.common` |
| `/certified-agencies` listing page | ⏳ | Did not exist before; now trivial to add from `getAgencyLogos()` if wanted |
| Delete `public/assets/images/certified-members/*` (≈117 MB, incl. 78 MB of video) | ⏳ | Keep until verified in production. `talent-discovery.js` still references two files there |

**Bugs found in the old pages (fixed by the migration):** Media Seal contact enquiries were emailed/stored as agency "LyftUp" and Penquin's as "Aquila"; Nitro's LinkedIn icon linked to Instagram; Omni Options and Xperia had placeholder `#` social links and reused Aquila's YouTube video; Xperia's heading said "Clients Aquila Has Worked With"; Omni Options was "Full Member" in the Associate (grey) colour; the header special-cased `/certified-agencies/omni_options` (404 path). **Not fixed (content, needs the agencies):** real videos for Aquila/Omni/Xperia, social links for Omni/Xperia.

### Phase 1.3 — Other content (recommended order)
> **`src/data` notes:** (a) the ✕ icon in the tiers table means "not included" and one instance has no colour class (kept as-is); (b) `components/PartnersBenefits.js` is unused dead code; (c) `AgencyLogosGrid` is a generic client-logo grid whose entries are still named "Agency 1…"; (d) Careers page `values` (4 hardcoded cards) were left in place, outside this list.
> **Masterclass notes:** (a) every masterclass date (latest 23 Jun 2026) is in the past, so all 16 now show COMPLETED — status was hand-set before and still said UPCOMING; checkout is NOT gated by status (never was), so old pages remain purchasable; add new dates in Studio. (b) the listing page showed id 9 at $150 member / 28 Jan while the detail page and checkout used $130 / 11 Feb; the detail values are kept. (c) 13 instructor photos 404 on ImageKit (already broken on the live site, page falls back to an icon): upload in Studio. (d) masterclasses 3, 4, 8 were never in the listing: kept hidden via `hideFromListing`. (e) `takeawayToolkit`, `moduleNumber`, `bannerDescription`, `aboutThisMasterclass` were never rendered anywhere; the first two are kept in the schema, the last two were dropped. (f) instructor is an inline object per masterclass (texts differ slightly between sessions by the same person, e.g. Stuart Dunk ×3, Paul Burns ×2); consolidate later if wanted.
> **Events notes:** (a) the only "upcoming" webinar (AI in Strategic Communication, 3 Nov 2026) is already in the past, so `/events` now shows 0 upcoming until a new one is added in Studio; (b) event 12 ("From Data to Decisions") is dated 2025-02-04 in the source, probably meant 2026-02-04, confirm in Studio; (c) `components/PAANWebinar.js` is unused dead code; (d) `speakers` was a number on 12 events and a list of names on 2 (the card printed the names run together) — now a count everywhere; (e) location filter no longer lists "Nairobi, Kenya" (no events there).
| # | Content | Source today | Why | Status |
|---|---|---|---|---|
| 1 | Events & webinars | ✅ | Done 2026-11-15. Schema `event`, `scripts/migrate-events-to-sanity.mjs` (14 events + images → Sanity), `lib/eventService.ts`, `/events` + `/events/[slug]` on ISR. **Upcoming/Past is now derived from the event date (East Africa time)**, no hand-edited lists. Old `/events/<number>` URLs 308-redirect to `/events/<slug>`. Fixed: detail pages were server-rendered as "Event Not Found" (client-only ID lookup). Old data kept at `scripts/data/eventsData.source.js` for the seed script |
| 2 | Masterclasses | ✅ | Done 2026-11-15. Schemas `masterclass` + `masterclassSeries`, `scripts/migrate-masterclasses-to-sanity.mjs` (16 masterclasses + 2 series, images → Sanity), `lib/masterclassService.ts`; `/masterclasses` + `/masterclasses/[slug]` on ISR (4,000 → ~1,800 lines). **The numeric ID is kept as required, unique `masterclassId`** because it is part of the Paystack reference and the key for `masterclass_promo_codes.applicable_masterclass_ids`; purchase flow code is untouched. Old `/masterclasses/<number>` URLs 308-redirect to slug URLs; `/masterclasses/10` is now a real 404 (was a blank "Loading…" 200). Listing and detail pages each had their own copy of the data and had drifted; detail data (what checkout charges) is canonical. Verified: all 16 detail pages render identically to before except the status badge |
| 3 | Summit / Awards | `data/summit/*`, `summit/*`, `paan-awards/*` | **In scope again (2026-11-15)** → Phase 1.5 below | ⏳ |
| 4 | Careers | ✅ | Done 2026-11-15. Schema `jobPosting`, `scripts/migrate-careers-to-sanity.mjs` (2 positions; long descriptions converted HTML → Portable Text and verified: text, headings, list items AND bullet-list grouping), `lib/careerService.ts`; `/careers` on ISR. Positions hide automatically after an optional closing date or via the "Show on the Careers page" switch. The Apply-now form's position dropdown is built from the open positions (same values as before, so `/api/send-career-application` is unchanged) and the card's Apply button now preselects its role. Direct-application email boxes are data-driven. Careers hero/culture/process copy stays in `messages` |
| 5 | Clients, partners, FAQs, testimonials | ✅ `src/data` | **Decision (2026-11-15): typed data files in `src/data`, not Sanity.** Done: `faqs.ts`, `partners.ts` (strategic partners), `testimonials.ts` (network-voice videos), `clients.ts` (benefit slides + client logo grid), `members.ts` (free-member logos). Verified: all affected pages render byte-identical HTML |
| 6 | Academy / membership tiers / pricing | ✅ `src/data` | `membership.ts` (the two comparison tables, 36 rows; `MemberTiers` 607 → 131 lines, now `.tsx`) and `academy.ts` (5 repeated lists; `academy/index.js` 881 → 674 lines). Tier cards (`Tier1-3`) and most academy/pricing copy are already translation keys in `messages`, so they stay there. Byte-identical HTML verified |
| 7 | Site settings | ✅ `src/data` | `site.ts`: social links (shared by footer + contact page), contact email, the 3 Calendly booking links. `menuData.js` / `summitMenu.js` were already data files. `HIDDEN_PATHS` stays in `next.config.js` (CommonJS, cannot import TS). Popup banner is generic logic, nothing to move |

### Do NOT migrate to Sanity
Ticket types & prices (payments depend on DB integrity), promo codes, talent profiles, trends data, form submissions. Sanity may *reference* ticket type IDs but Supabase stays source of truth.

### Phase 1.5 — Summit & Awards (moved into scope 2026-11-15) 🔄
Both are cancelled and hidden (`SUMMIT_CANCELLED`, `HIDDEN_PATHS` in `next.config.js`), so content is migrated and verified without anything going public. **Local verification:** build/start with `SHOW_HIDDEN_PAGES=1` (added to `next.config.js`; default off, never set it in production) to render the redirected pages and compare them byte-for-byte with a pre-change baseline. Content is keyed by **edition (year)**, `SUMMIT_EDITION` in `data/summit/status.js`.

**Scope:** the *structured* content moves to Sanity. The long marketing prose inside these pages stays in the page code (same approach as the home/about pages).
| Slice | Status | Notes |
|---|---|---|
| 0. Dead code | ✅ | `travel-guide`, `exhibitors`, `paan-awards`, `categories` carried copies of `speakers` + `sessions` and carousel helpers that nothing rendered (~360 lines): deleted |
| 1. Speakers, experiences/sessions, tracks | ✅ | `summitSpeaker` (8), `summitSession` (6), `summitTrack` (7); `lib/summitService.ts`; `summit.js` on ISR; 21 images → Sanity. `data/summit/{speakers,sessions,tracks}.js` removed (kept as seed sources in `scripts/data/`); unused `SessionsSection`/`SpeakersSection` deleted. `TracksSection` took `track.id === 7` for its layout: now positional |
| 2. Award categories | ✅ | `awardGroup` (5 agency + 3 freelancer groups, 37 awards; `featured` flag replaces the hardcoded "selected" ID lists). The two pages kept drifting copies (one description differed): the full-list wording is used. `paan-awards` 1,549 → 1,209 lines, `categories` 1,217 → 908 |
| 3. Travel experiences (11, bookable via Paystack) | ✅ | `summitExperience` (+ `scripts/migrate-experiences-to-sanity.mjs`, 11 images → Sanity). The string id is kept as required, unique `experienceId` (URL + Paystack reference + `experience_bookings`); `price`/`priceUnit` unchanged, so the payment code is untouched. `travel-guide` no longer exports data from a page file; the booking page (`experiences/[id]`) is now static + server-rendered (was a blank "Loading…" shell until JS ran) and fully typed (no `@ts-nocheck`). Dead `experience.features` fallback removed. Verified: other 9 hidden pages identical |
| 4. Exhibition booths (40) | ✅ | `exhibitorBooth` (number, status Available/Reserved/Booked, type, size, price label) + `scripts/migrate-booths-to-sanity.mjs`; `exhibitors.js` rebuilds its by-number lookup from Sanity so the rest of the page is unchanged (33 available, 2 reserved, 5 booked). Booking status can now be changed in Studio without a deploy. Page byte-identical |
| 5. Edition info (dates + venue) | 🔄 | ✅ `summitEdition` document (dates, venue, address, attendance labels) + `getSummitEdition()` with safe defaults; used by the summit page, the travel guide (hero line, event JSON-LD) and `useCountdown`. **Pending:** `exhibitors`, `purchase-ticket`, the application pages, `TicketsSection`, awards pages still have the strings hardcoded; wire them as each page is split. Long guide prose, exhibitor packages and awards terms stay in the page code unless they change per edition |
| 6. Convert + split the pages | 🔄 | ✅ **`summit.js` 1,597 → 237 lines** and ✅ **`travel-guide` 1,324 → 194** (typed `.tsx`): 19 sections extracted verbatim into `components/summit/*`, byte-identical output (verified with `SHOW_HIDDEN_PAGES`). Tooling kept at `scripts/tools/{jsx-tree,split-page-sections}.cjs`. The 9 stale `components/summit/*` copies I had planned to reuse were NOT the live content (≈10% overlap) and were deleted. Dead code removed (count-up animation, early-bird timer, sessions carousel). ✅ **Also done 2026-11-16:** `exhibitors` 176 lines, `paan-awards` 194, `categories` typed `.tsx`, `purchase-ticket` 1,046 → 152 (checkout logic in `hooks/useTicketCheckout`, moved unchanged), the 6 forms properly typed (no `@ts-nocheck` left in `src`), `useRecaptcha` applied to 4 forms, unreachable `CategoryNominationModal` deleted, unused `featured` award flag removed (existing Sanity docs still carry the field; harmless). All byte-identical via `SHOW_HIDDEN_PAGES`. **Still open:** a test-mode Paystack purchase before go-live; wiring `summitEdition` into the remaining hardcoded dates |

### Phase 1.4 — Cleanup: delete old, unused files and directories
**Gate:** only after everything is deployed and verified in production (suggest one week of monitoring). One commit per category below so any can be reverted; before each: `next build` + baseline compare + the dead-code scan (`knip`) has been re-run. Everything deleted stays recoverable from git history.
| # | What | Candidates | Status |
|---|---|---|---|
| A | Replaced by Sanity | `public/assets/images/certified-members/*` (≈117 MB incl. 78 MB of video; first repoint the 2 refs in `talent-discovery.js`); one-time seed scripts `scripts/migrate-*-to-sanity.mjs` + `scripts/data/*` (keep until prod verified, then delete); Supabase `blogs`, `blog_categories`, `blog_tags`, `blog_post_tags` tables + `hr_users` blog use (**back up first**); the `blog_comments` table (feature removed, 4 rows backed up); blog/event/masterclass/agency images that now live in Sanity but still sit on ImageKit | ⏳ |
| B | Dead code (no importer found 2026-11-15 — verify with `knip` before deleting) | **Components:** `AIInvoiceGenerator`, `AIBriefBuilder` (the pages `ai-*.js` may inline their own copy), `TalentProfileSubmissionForm`, `TalentDiscoveryMap`, `SeminarRegistration`, `PaymentAnalytics`, `BreakoutSessions`, `LanguageSwitcher`, `PaanAmbassadorProgramModal`, `BenefitsToggle`, `AcademyConsultationModal`, `PAANWebinar`, `PAANSummit`, `Tracks`, `PartnerWithUsButton`, `PartnersBenefits`, `blog/BlogPost`, `common/FormCheckbox`; **Layouts:** `partners-header`, `paan-ma-header`, `freelancers-header`, `clients-header`, `ambassador-header`, `blogs-header`; **Hook:** `usePopupBanner`; **Summit components** (`TicketsSection`, `SpeakersSection`, `WhoShouldJoinSection`, `PlanYourTripSection`, `AboutSection`, `MarqueeSection`, `SessionsSection`, `CrossborderConnectionsSection`, `AwardsSection`, `ExhibitionSection`, `PartnersSection`): decide in Phase 1.5 whether the rebuilt summit pages use them | ✅ done 2026-11-16 (knip + name search; `MapboxMap`/`CountrySelect` kept: used via relative dynamic imports) |
| C | Non-production leftovers | `pages/summit/purchase-ticket.js.backup`, `pages/test-ticket.js`, `pages/api/debug-eoi.js`, root `send-ticket-email.js`, `next-env.d.js` (replaced by `next-env.d.ts`), root `utils/` (move `scrollUtils` into `src`), stale `docs/*` (e.g. mapbox/leaflet comparisons if one library is dropped), `public/sitemap-static.xml` (generated on every build: untrack + gitignore) | ✅ done 2026-11-16 (`public/sitemap-static.xml` untracked + gitignored) |
| D | Unused dependencies | `openai`, `@napi-rs/canvas`, duplicate map libs (`leaflet*` vs `mapbox-gl`), `next-pwa` (PWA is disabled), `busboy`/`formidable` (one of the two), `@types/uuid`; run `knip` / `depcheck` | ✅ 14 unused packages removed 2026-11-16. Kept: `openai`, `formidable`, `next-pwa`, `@napi-rs/canvas`, `mapbox-gl`, `react-select`, `leaflet` (still imported) |
| E | Tool pages: **decision 2026-11-16: keep all** (`ai-invoice-generator`, `ai-brief-builder`, `ai-business-plan-generator`, `pdf-editor`, and `trends-dashboard` as an undeveloped concept to pick up later; it runs on mock data, has no cron and none of its source API keys). They are not deleted; they migrate to the App Router with the rest | ✅ decided |

---|---|
| Remove `src/data/*` content files and `mock-data.js` once consumed from Sanity | ⏳ |
| Remove `usePublicBlog`, blog-related Supabase code, `hr_users` usage | ⏳ |
| Delete `purchase-ticket.js.backup`, `test-ticket.js`, `api/debug-eoi.js` (non-prod leftovers) | ⏳ |
| Remove unused deps (`openai` if unused, `@napi-rs/canvas`, duplicate map libs — see `docs/mapping-library-comparison.md`) | ⏳ |

---

## 2. TypeScript Migration
Greenfield: nothing is typed yet. Do it **alongside** the CMS work so new code is typed from day one.

### Rule (2026-11-15): convert a file to TypeScript whenever it is touched
Any `.js` file that is edited as part of this migration is renamed to `.ts`/`.tsx` **in the same change**, with typed props/params at minimum. `// @ts-nocheck` is only acceptable for the internals of a large legacy markup block (as in `AgencyProfile.tsx`, `MemberTiers.tsx`), never for new logic. Reason: the whole codebase is moving to TypeScript anyway, so touching a file twice is pure waste. (This rule was applied too narrowly in Phases 1.1–1.3, where several rewritten files stayed `.js`.)

**Catch-up list: already touched on this branch but still `.js` (27 files)**
| Group | Files |
|---|---|
| Pages (rewritten) | `masterclasses/[slug]`, `masterclasses/index`, `index` (home), `careers`, `events`, `events/[slug]`, `blogs/index`, `blogs/[slug]`, `academy/index`, `contact-us`, `faqs`, `sitemap-blogs.xml` |
| Layouts | `standard-header`, `footer`, `paan-academy-footer` |
| Components / hooks | `blog/BlogComments`, `blog/RelatedPosts`, `CareerApplicationModal`, `EventCard`, `VoicesFromNetwork`, `StrategicPartners`, `ClientsSlider`, `FAQs`, `ContactSection`, `AgencyLogosMarquee`, `AgencyLogosGrid`, `hooks/useBlogComments` |
| Status | ✅ **Done 2026-11-15.** `@ts-nocheck` only remains on the 6 summit/award forms (rewritten in Phase 1.5, so typing them now would be thrown away); `AgencyProfile` and `MemberTiers` are now fully typed. All 27 converted (+ `SEO`, `LanguageSwitch`, `TooltipIconButton`, `Pagination`, `ContactParallax` that they depend on). Properly typed where small; large legacy markup (`AgencyProfile`, `MemberTiers`, the 6 summit/award forms) keeps `// @ts-nocheck` with typed props. Verified: 18 of 19 sampled pages byte-identical, 1 differs only by `alt=""` on the client slider images. New: `src/types/globals.d.ts`, `utils/errors.ts`, `data/navigation.ts`, `data/countries.ts` |

**Bugs surfaced by the type checker during the catch-up (fixed unless noted):** an upcoming event with no registration link would have crashed its card; the blog sitemap's error path called a non-existent `res.status()`; the contact page's membership button set `window.href` (a no-op: it never navigated, now `window.location.href`, a visible fix); the masterclass page crashed on an empty outcomes/why-attend list; two scroll-to buttons threw when their target section was absent. **Open items:** (1) ~~blog subscribe forms~~ **fixed 2026-11-15**: only the single-post form was broken (wrong URL); the blog-index form was already wired (an earlier note here wrongly said both were broken); (2) ~~blog comments / reCAPTCHA~~ **moot**: comments removed; (3) the standard header ignores `navLinkColor` / `transparent` / `openModal`, which pages still pass; (4) ✅ **`LanguageSwitch` simplified (2026-11-15, option 1)**: ~310 → 124 lines, cookie-based Google Translate (writes `googtrans`, reloads; the Google script loads only when a non-English language is active). Behaviour changes to be aware of: switching language now reloads the page; the browser's language is no longer auto-applied on a first visit; the per-language confirmation toasts are gone. **Not browser-tested** (Google's widget cannot run here); the cookie read/write logic was tested in a simulated browser. Still true: `fr.json` is dead because `next.config.js` has no `i18n` block (`router.locale` is always empty), so real translations remain a decision for the App Router phase; (5) **13 near-duplicate header layouts** (`layouts/*-header.*`) should become one header with variants.

### Setup
| Task | Status |
|---|---|
| Add `typescript` (pinned ^5.9, next-intl peer), `@types/*`, `tsconfig.json` (`strict`, `allowJs`, `@/*` alias), replace `jsconfig.json` | ✅ |
| `sanity typegen` → generated types for GROQ results | ⏳ |
| Zod schemas (already a dep) shared by API routes and forms | ⏳ |

### New files (typed from the start, no `@ts-nocheck`)
Everything created in Phase 1: Sanity client/lib, `blogService`, agency template, masterclass/event pages, `SEO`.

### Legacy files (rename `.js` → `.ts(x)` + `@ts-nocheck`, then type by priority)
| File group | Priority | Notes |
|---|---|---|
| `_app`, `_document`, `layouts/*` (header, standard-header, footer) | High | Every page |
| `components/SEO`, `lib/*`, `utils/structuredData` | High | Shared |
| `lib/ticketService`, `paystack`, `meta-capi`, `promoCodeService`, `pdfTicketGenerator` | High | Money paths — types pay off most; add tests while here |
| `api/paystack/webhook`, `verify-payment`, `generate-ticket`, `send-summit-ticket` | High | Payments |
| `components/summit/*` (purchase flow, now disabled) | Low | Deprioritised while summit cancelled |
| Other `api/send-*` routes (~18) | Medium | Share one typed mail/Slack helper — they look near-duplicate |
| Pages (~45; skip hidden summit/awards pages until reactivated) | Medium/Low | |
| Modals (`*Modal.js`, ~12) | Low | Candidates for the shared `Modal` shell |

---

## 3. Pages Router → App Router
> Do in a separate branch, **after** Sanity (Phase 1.1–1.3), because content pages become `generateStaticParams` + async server components.

### Strategy
- Migrate one route at a time; both routers coexist (`src/app/` already exists).
- **i18n decision (resolved 2026-11-16):** there is no locale routing (no `i18n` in `next.config.js`; `next-intl` was unused and removed; the language switch is cookie-based Google Translate). `useAppTranslations` now reads only the English messages and no longer touches the Pages Router, so it works in App Router components. No `[locale]` segment is needed.
- Branch `feat/app-router` (from `feat/sanity-foundation`). Routes move one at a time; the same path must not exist in both routers.
- **Verification method (App Router output is not byte-comparable):** build the Pages Router baseline, then compare per page: head tags (title, meta, canonical, JSON-LD as sets), and the normalized `<main>` markup. Scratchpad script `cmp-app.py`.
- **Metadata:** `src/lib/seo.ts` `buildMetadata()` replaces the `<SEO>` component (same tags and defaults; `og:updated_time` dropped, it was a changing timestamp).
- Client components imported by server pages need `"use client"` (done for `ScrollToTop`; `header`/`footer` already had it).

### Proposed structure
```
src/app/
  (site)/layout.tsx            # Header, Footer, popup banner
    page.tsx                   # Home
    about/  contact-us/  faqs/  clients/  partners/  pricing/
    blogs/ [slug]/
    certified-agencies/ [slug]/
    masterclasses/ [slug]/
    events/ [slug]/
    careers/ [slug]/
    academy/  freelancers/  talent-discovery/  trends-dashboard/
    paan-awards/ categories/ terms/
    paan-ma-program/  paan-ambassador/
    retrieve-ticket/
    (summit/, paan-awards/: hidden via redirects; migrate only if reactivated)
    payment/ success/ failure/
    legal/ privacy-policy/ terms-and-conditions/
  studio/[[...index]]/page.tsx
  api/**/route.ts
  sitemap.ts, robots.ts
```

### Migration order
1. ✅ Root layout (`app/layout.tsx`), `Providers`, shared `AnalyticsScripts`/`siteSchema`/`ServiceWorkerCleanup` (also used by `_app`), fonts, icons/manifest via metadata
2. ✅ `privacy-policy`, `terms-and-conditions` (main markup identical; head differs only in tag attribute order and the modern `mobile-web-app-capable` tag)
3. ✅ Blogs (Sanity, ISR): `app/blogs`, `app/blogs/[slug]` (`generateStaticParams` + `revalidate = 3600`, `dynamicParams`), feature code in `features/blog/{components,lib}`. Index main markup identical; posts identical except `id="blog-author"` (replaces a ref) and extra head tags (author, og:locale, image alt, twitter:domain). **Verify on the preview:** the Sanity webhook (`/api/revalidate`, `res.revalidate`) refreshing an App Router path. `sitemap-blogs.xml` is still a Pages route until step 8
4. ✅ Certified agencies ✅ (`app/certified-agencies/[slug]`, `features/agencies`: profile split into 8 sections, contact form state owned by its modal; main markup identical). Events ✅ (`app/events`, `app/events/[slug]` incl. the numeric-id permanent redirect; `features/events`; markup identical). Careers ✅ (`app/careers`, `features/careers`: six inline sub-components extracted, page state in one client component; markup identical). Masterclasses ✅ (`app/masterclasses`, `[slug]` incl. numeric-id redirect, `features/masterclasses`; list split into six sections; the detail page moved as one client component, markup identical, JSON-LD differs only by timestamps) — detail page split into nine sections + `lib/invoicePdf.ts` (Paystack logic unchanged, ≈330 lines in the component); **a test-mode masterclass purchase is still required before go-live**
5. ✅ Home + marketing pages (home, about, academy, clients, contact-us, faqs, freelancers, partners, pricing, thank-you, paan-ambassador, paan-ma-program, both expressions of interest, talent-discovery, retrieve-ticket, payment success/failure): one feature folder each; main markup identical (talent-discovery gains an empty `<template>` from `dynamic()`). Payment pages read their query after mount, so they stay statically rendered and the purchase tracking (GA4/Meta, de-duplicated per reference) is unchanged — **verify a real purchase fires it once**. The About page's parallax button now opens the modal (it was wired to nothing)
6. 🔄 Payment pages + retrieve-ticket + (hidden) summit pages (**last, highest risk** — keep Meta CAPI/GA4 purchase events verified before/after). While cancelled, summit/awards routes can be migrated as a pure redirect, not re-built
7. ⏳ API routes → Route Handlers (Paystack webhook: verify raw-body signature handling changes)
8. ⏳ Replace `sitemap.xml.js`/`sitemap-blogs.xml.js`/`next-sitemap` with `app/sitemap.ts`
9. ⏳ Delete `src/pages/`

### Conventions adopted during the migration (same as growthpad-website)
- `src/app/**` holds thin route files (metadata + fetch + compose). UI and logic live in `src/features/<feature>/{components,lib,data}`; shared code in `src/shared/{components,layouts,hooks,lib}`. Done so far: `features/blog`, `features/legal`, `shared/layouts`, `shared/components/{ScrollToTop,Pagination,Icon}`, `shared/lib/{scrollUtils,portableText}`. The rest of section 3b happens route by route as each moves.
- Every file touched is converted to `.ts`/`.tsx`.
- Server components must not import `@iconify/react` or hook-using components directly: use `@/shared/components/Icon`, and put `"use client"` on interactive shared components. `tailwind.config.js` now scans all of `src/`.

### Key changes
- `getServerSideProps` → ISR (`revalidate` + webhook tags), not dynamic rendering
- `next/head` / `SEO.js` → `generateMetadata`
- `useRouter` → `next/navigation`
- `vercel.json` function globs `src/pages/api/**` must be updated when routes move
- Fix known smell: `sitemap-blogs.xml.js` uses the service key in a page file

---

## 3b. Feature-based folder structure (final step, after the App Router migration)
Same convention as `growthpad-website`: `src/app` holds thin route files only (fetch + compose), all UI and logic lives in `src/features/<feature>/`, anything used by 2+ features lives in `src/shared/`.

Do this **after** Sections 1–3 are done (not during), so each move is a pure rename/refactor with no behaviour change. Move one feature per PR, run `tsc` + `next build` after each, and keep `@/*` aliases so imports are the only diff.

```
src/
  app/                      # routes only: page.tsx, layout.tsx, route.ts, sitemap.ts, studio/
  features/
    blog/            components/  lib/
    agencies/        components/  lib/            # certified agencies (Sanity)
    events/          components/  lib/            # webinars (Sanity)
    masterclasses/   components/  lib/  data/
    academy/         components/  data/           # tiers, membership, pricing
    careers/         components/  lib/
    talent-discovery/components/  lib/            # map, profiles, search
    trends/          components/  lib/
    tickets/         components/  lib/            # purchase, payment, retrieve-ticket (formerly summit/)
    summit/          components/  data/           # hidden while cancelled
    awards/          components/  data/           # hidden while cancelled
    contact/         components/                 # forms + enquiry modals
    home/            components/  data/
    legal/           components/
  shared/
    components/      # Modal, Accordion, Pagination, FormInput/Textarea/Checkbox, CountrySelect, ScrollToTop, SEO...
    layouts/         # header, standard-header, footer, summit-header
    hooks/  lib/  data/
  sanity/            # client.ts, env.ts, image.ts, queries.ts, schemaTypes/, components/
  messages/          # next-intl en/fr (stays)
  styles/
```

Mapping of today's flat `src/components/*.js` (~85 files) → features:
| Today | Goes to |
|---|---|
| `AgencyLogos*`, `AgenciesMarquee`, `AgencyEnquiryModal` | `features/agencies` |
| `EventCard`, `EventDetail`, `PAANWebinar`, `SeminarRegistration` | `features/events` |
| `Ticket*`, `PaymentAnalytics`, `PaystackScript`, `components/summit/*` | `features/tickets` (+ `features/summit`) |
| `Talent*`, `MapboxMap`, `MapStyles`, `BadgeSystem`, `RegionalFilter`, `CategoryFilter` | `features/talent-discovery` |
| `Trend*`, `AnalyticsChart` | `features/trends` |
| `Tier1-3`, `MemberTiers`, `BenefitsToggle`, `Academy*` | `features/academy` |
| `*Modal`, `ContactForm/Section/Parallax`, `EnquiryModal` | `features/contact` (generic ones → `shared/Modal`) |
| `components/blog/*`, `usePublicBlog` | `features/blog` |
| `Modal`, `Accordion`, `Marquee`, `components/common/*`, `SEO`, `ScrollToTop`, `CookieConsentBanner` | `shared/components` |

Rules (copied from the growthpad approach):
- A feature never imports from another feature; shared code moves to `shared/`.
- Feature `data/` files are temporary: once content is in Sanity they are deleted.
- `src/app/**/page.tsx` stays under ~50 lines.
- Prefer doing the TypeScript conversion of a file **when** it moves into its feature folder, to avoid touching it twice.

---

## 3c. Refactor audit: files over 1,000 lines (2026-11-15)
**9 pages and 2 components are over 1,000 lines** (the next largest page is 965). Why each is big, and the fix. The same fixes are tracked once, because the causes repeat:

| Lines | File | Why it is big | Fix |
|---|---|---|---|
| 1,696 | `pages/summit.js` | 12 inline `<section>`s (≈1,280 lines of JSX) + 418 lines of state/effects. Only 5 of the sections use `components/summit/*`; **11 finished section components in that folder are unused**, i.e. the split was started and never finished | Reuse the existing section components; move agenda/speakers/sessions to Sanity (Phase 1.5); page ≈ 100 lines |
| 1,649 | `pages/summit/travel-guide.js` | 8 sections of hardcoded content + 5 inline SVGs | Content → Sanity `travelExperience` (1.5); sections → components |
| 1,609 | `pages/summit/exhibitors.js` | Exhibitor list/packages hardcoded in JSX | `exhibitor` documents (1.5) → page becomes a map over data |
| 1,549 | `pages/paan-awards.js` | 10 sections, 619 lines of logic (11 `useState`), category data inline | Awards content → Sanity (1.5); application-modal state → one hook |
| 1,217 | `pages/paan-awards/categories.js` | 702 lines of logic (14 `useState`) + inline category data | `awardCategory` documents (1.5); filter/selection logic → hook |
| 1,289 | `pages/ai-invoice-generator.js` | A whole invoice builder in one page (582 lines logic) **and an unused 859-line near-copy in `components/AIInvoiceGenerator.js`** | Confirm the tool is still used (cleanup E); if kept: one implementation, split into form / preview / PDF, currency + payment-term option lists → `src/data` |
| 1,157 | `pages/masterclasses/[slug].js` | 508 lines of **checkout logic** (Paystack config, promo codes, 9 `useState`) + 650 lines of markup | `useMasterclassCheckout()` hook + sections (Hero, Pricing card, Instructor, Outcomes). **Payment path: refactor only with the byte-identical check + a Paystack test-mode purchase** |
| 1,046 | `pages/summit/purchase-ticket.js` | 786 lines of logic: 21 `useState`, 7 effects (a multi-step wizard) | State machine / `useReducer` + `useTicketCheckout()`; the `*Step` components already exist. Payment path: same caution as above |
| 1,034 | `pages/index.js` (home) | Almost pure markup: 13 sections ≈ 1,000 lines, only 38 lines of logic, plus the ~200-line canvas animation | One component per section in `features/home/components`; `useConnectingDots()` hook; page ≈ 40 lines |
| 1,294 | `components/PAANAwardsApplicationModal.js` | Huge form with its own country list and option lists inline | Shared `src/data/countries.ts` + `CountrySelect`; form fields in `components/common/Form*` |
| 1,255 | `components/TicketPurchaseForm.js` | Legacy single-form ticket flow (only used by `TicketPurchaseButton`), own country list | Likely superseded by the step-based flow: confirm, then delete (cleanup B) or fold into it |

**Shared causes (fix once, shrinks many files):**
| Repeated pattern | Where | Extraction | Status |
|---|---|---|---|
| **Country list copy-pasted** (23 entries, identical in all six) | `PAANAwardsApplicationModal`, `ExhibitionApplicationModal`, `CategoryNominationModal`, `TicketPurchaseForm`, `summit/speaker-application`, `summit/exhibition-application`; a shared `common/CountrySelect` exists but only 2 components use it | ✅ `src/data/countries.ts` wired into all 6 files (identical lists, so no behaviour change). **Correction:** this removes ≈150 lines, not the ≈600 first estimated. `CountrySelect` is still only used by 2 summit step components | ✅ |
| Canvas connecting-dots hero animation (125 lines each, verified identical) | `index`, `academy/index`, `components/agencies/AgencyProfile` | ✅ `hooks/useConnectingDots.ts` (≈375 lines removed) | ✅ |
| IntersectionObserver "section-visible" block + `sectionRefs` | 22 files | ✅ `hooks/useSectionObserver.ts`, applied to 5 (`careers`, `contact-us`, `faqs`, `academy`, `AgencyProfile`; the home page's copy was dead/commented out and was deleted). **17 files left**: apply as each is converted | 🔄 |
| reCAPTCHA setup (key check, ref, token state) | 17 files | ✅ `hooks/useRecaptcha.ts`, applied to 3 (`CareerApplicationModal`, `contact-us`, `AgencyProfile`). **14 left**: apply as each is converted | 🔄 |
| Components declared inside the page component (remounted on every render) | `careers.js` (6), `faqs.js`, `clients.js` | Move to section files | ⏳ |
| Duplicate page-vs-component implementations | `ai-invoice-generator` (+ `AIInvoiceGenerator`), `ai-brief-builder` (+ `AIBriefBuilder`) | Keep one; delete the other (cleanup B/E) | ⏳ |

**Order:** (1) the shared extractions above, because they cut lines from the big files and from dozens of smaller ones; (2) Phase 1.5 moves summit/awards content to Sanity, which is what actually shrinks the five summit/awards pages; (3) `index`, then the two payment pages last and only with a test-mode purchase. Each page is converted to TypeScript in the same change (rule in section 2) and verified with the byte-identical-HTML method. Target after the move to feature folders (3b): route files under ~100 lines.

---

## 4. Risks / watch-list
| Risk | Mitigation |
|---|---|
| SEO loss on blogs/agencies | Identical slugs, 301s, compare sitemap before/after |
| Redirect list drift (HIDDEN_PATHS etc. lives in `next.config.js`) | Move to one shared constant/Sanity site setting; test redirects in CI |
| Payment/tracking regressions (just shipped Meta CAPI) | Don't touch purchase flow until last; E2E test with Paystack test keys |
| HTML → Portable Text conversion artifacts | Spot-check top 20 posts by traffic; keep old HTML in a hidden field as fallback |
| `fr` translations for migrated content | Decide per type whether fr is required; don't block migration on it |
| Supabase RLS/service key usage in pages | Move all service-key use to API routes only |

## 5. Build Health
| Check | Status |
|---|---|
| TypeScript (`tsc --noEmit`) | ⏳ not set up |
| Production build (`next build`) | ✅ currently builds |
| Sanity CMS connected | ⏳ |
| Blogs on Sanity | ⏳ |
| Certified agencies on Sanity | ⏳ |
| Supabase content tables removed | ⏳ (transactional tables stay) |

## Suggested sequence
1. ✅ Sanity foundation → ✅ Blog → ✅ Certified agencies → ✅ Events → ✅ Masterclasses → ✅ Careers → ✅ `src/data` content
2. **Preview deploy** (also: Sanity webhook + `SANITY_REVALIDATE_SECRET` + CORS) and verify in production
3. ✅ **TypeScript catch-up pass** on the 27 touched files + shared hooks/data (`countries.ts`, `useSectionObserver`, `useConnectingDots`, `useRecaptcha`): done 2026-11-15
4. **Phase 1.5**: Summit & Awards → Sanity (pages still hidden)
5. Refactor the 11 files over 1,000 lines (3c) with their TypeScript conversion: shared extractions first (countries, hooks), then home, then the two payment pages last…
6. **App Router** branch (section 3), then **feature-folder restructure** (3b)
7. **Phase 1.4 cleanup**: delete old/unused files, directories, tables, dependencies (after production has been stable for a week)
