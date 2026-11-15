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
| ~~Summit content~~ (deferred: cancelled) | Talent discovery (`profiles`, `skills`, `portfolio_items`, `profile_badges`, countries/cities) |
| ~~Awards categories~~ (deferred: cancelled) | Trends dashboard data + cron aggregation |
| Clients, partners, FAQs, testimonials | `blog_comments` (user-generated; keep, key by Sanity post `_id`/slug) |
| Careers / job postings (currently i18n JSON) | |
| Academy programs, membership tiers, pricing | |
| Site settings (nav, footer, banners/popup, CTA links e.g. demo/contact, hidden-pages list, social, SEO defaults) | |

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
| `BlogComments` + `CommentCount` | 🔄 | Stay on Supabase via `useBlogComments`, keyed by `legacyId`. **Gap:** posts created natively in Sanity have no `legacyId`, so comments are hidden for them. Fix = add `post_slug` column to `blog_comments`, backfill from `blogs.slug`, key by slug (needs SQL run + approval) |
| `sitemap-blogs.xml.js` | ✅ | Query Sanity instead of Supabase |
| 301 redirect audit | ✅ | Slugs unchanged, URLs unchanged → none needed. Still verify in Search Console after deploy |
| Blog images ImageKit → Sanity assets | ✅ | `scripts/migrate-images-to-sanity.mjs` (dry-run default). 207 images (77 MB) uploaded, 154 body image blocks + 53 featured images now Sanity `image`s; Studio shows thumbnails. `cdn.sanity.io` added to `remotePatterns`. `rawHtml` backup still points at ImageKit. **Decision (2026-11-15): migrate ALL site images from ImageKit to Sanity eventually** (events, webinars, logos, etc. as each phase lands); keep ImageKit live until the last page is moved. Alt text: filename-style alts were replaced with the post title — editors should improve them |
| Cutover checks | ⏳ | Set `SANITY_REVALIDATE_SECRET` + Sanity webhook; add CORS origins; deploy preview and diff 5 top posts; then remove blog code from Supabase (`blogs`, `blog_*` tables stay until verified in prod) |
| Known pre-existing issues found | ⏳ | `africas-future-of-digital-advertising` has a 1.7 MB base64 image in the body (upload as a real image); `[slug]` subscribe form posts to non-existent `/api/subscribe` (real route is `/api/subscribe-newsletter`); `RelatedPosts` linked to `/blog/` (fixed → `/blogs/`) |

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
| # | Content | Source today | Why | Status |
|---|---|---|---|---|
| 1 | Events & webinars | `data/eventsData.js`, `events/[id].js`, homepage events block | Edited by hand for every webinar; past/upcoming derived from date, not two arrays | ⏳ |
| 2 | Masterclasses | hardcoded in `masterclasses/index.js` (~760 lines) and `[id].js` (~2,150 lines) | Biggest hardcoded blob; also fixes numeric-id routing → slugs | ⏳ |
| 3 | Summit / Awards | `data/summit/*`, `summit/*`, `paan-awards/*` | **Deferred**: cancelled and redirected. Leave code as-is behind `SUMMIT_CANCELLED`; decide later whether to delete or model per edition | ⏸ |
| 4 | Careers | `src/messages` JSON + `careers.js` | Same as CCSA careers; application form already has `send-career-application` API | ⏳ |
| 5 | Clients, partners, FAQs, testimonials | `clients.js`, `partners.js`, `StrategicPartners`, `FAQs`, `VoicesFromNetwork` | Small, reusable | ⏳ |
| 6 | Academy / membership tiers / pricing | `academy/index.js`, `Tier1-3`, `MemberTiers`, `pricing.js` | Marketing copy changes | ⏳ |
| 7 | Site settings | `menuData.js`, `summitMenu.js`, `usePopupBanner`, footer, `ChristmasContext` | Seasonal banners/popups without deploy | ⏳ |

### Do NOT migrate to Sanity
Ticket types & prices (payments depend on DB integrity), promo codes, talent profiles, trends data, form submissions. Sanity may *reference* ticket type IDs but Supabase stays source of truth.

### Phase 1.4 — Cleanup
| Task | Status |
|---|---|
| Remove `src/data/*` content files and `mock-data.js` once consumed from Sanity | ⏳ |
| Remove `usePublicBlog`, blog-related Supabase code, `hr_users` usage | ⏳ |
| Delete `purchase-ticket.js.backup`, `test-ticket.js`, `api/debug-eoi.js` (non-prod leftovers) | ⏳ |
| Remove unused deps (`openai` if unused, `@napi-rs/canvas`, duplicate map libs — see `docs/mapping-library-comparison.md`) | ⏳ |

---

## 2. TypeScript Migration
Greenfield: nothing is typed yet. Do it **alongside** the CMS work so new code is typed from day one.

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
- Keep `next-intl` working across both during transition (App Router needs `[locale]` segment or cookie-based config — **decide before starting**, this is the riskiest part given `fr.json`).

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
1. ⏳ Root layout, providers (`_app`), `<html>` (`_document`), fonts, analytics/pixel scripts
2. ⏳ Static legal pages
3. ⏳ Blogs (Sanity, ISR)
4. ⏳ Certified agencies, masterclasses, events, careers
5. ⏳ Home + marketing pages
6. ⏳ Payment pages + retrieve-ticket + (hidden) summit pages (**last, highest risk** — keep Meta CAPI/GA4 purchase events verified before/after). While cancelled, summit/awards routes can be migrated as a pure redirect, not re-built
7. ⏳ API routes → Route Handlers (Paystack webhook: verify raw-body signature handling changes)
8. ⏳ Replace `sitemap.xml.js`/`sitemap-blogs.xml.js`/`next-sitemap` with `app/sitemap.ts`
9. ⏳ Delete `src/pages/`

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
1. Sanity foundation → 2. Blog → 3. Certified agencies → 4. Masterclasses/events/summit/awards/careers/small content → 5. TS setup + high-priority typing (parallel) → 6. App Router branch → 7. Feature-based folder restructure (Section 3b) → 8. Cleanup.
