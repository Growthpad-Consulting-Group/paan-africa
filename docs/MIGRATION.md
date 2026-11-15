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

## Guiding rule: what goes in Sanity vs. stays in Supabase
| Goes to Sanity (editorial, edited by humans) | Stays in Supabase (transactional / user-generated) |
|---|---|
| Blog posts, categories, authors | `ticket_purchases`, `purchasers`, `attendees`, `purchase_items`, `payment_transactions`, `ticket_types` |
| Certified agencies | `promo_codes`, `masterclass_promo_codes` |
| Masterclasses | `experience_bookings` |
| Events / webinars | `summit_leads`, `eoi_submissions`, `enquiry_submissions`, `agency_enquiries`, `agency_contacts`, `partner_enquiries`, `newsletter_subscriptions` |
| Summit content (speakers, sessions, tracks, sponsors, exhibitors, travel experiences) | Talent discovery (`profiles`, `skills`, `portfolio_items`, `profile_badges`, countries/cities) |
| Awards categories | Trends dashboard data + cron aggregation |
| Clients, partners, FAQs, testimonials | `blog_comments` (user-generated; keep, key by Sanity post `_id`/slug) |
| Careers / job postings (currently i18n JSON) | |
| Academy programs, membership tiers, pricing | |
| Site settings (nav, footer, banners/popup, social, SEO defaults) | |

**Consequence vs. CCSA:** Supabase can *not* be fully removed here. Target is "Supabase for data, Sanity for content". `hr_users` (blog authors) is replaced by Sanity `author` documents.

---

## 1. CMS Migration (→ Sanity)

### Phase 1.0 — Foundation
| Task | Status | Notes |
|---|---|---|
| Install `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`, `@portabletext/react` | ⏳ | Copy `sanity.config.ts` + `sanity/lib` pattern from CCSA |
| New dataset + env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`, read token, webhook secret) | ⏳ | Separate project from CCSA |
| Embed Studio at `/studio` | ⏳ | Pages-router catch-all first, `app/studio` later |
| Shared helpers: `sanityClient`, `urlFor`, GROQ fetch wrapper | ⏳ | |
| i18n strategy for en/fr | ⏳ | Decide once: field-level (`sanity-plugin-internationalized-array`) — recommended, since `next-intl` is already document-agnostic |
| ISR + on-demand revalidation webhook (`/api/revalidate`) | ⏳ | Replaces `getServerSideProps` for content pages |

### Phase 1.1 — Blog (first, mirrors CCSA)
| Area | Status | Notes |
|---|---|---|
| Schemas: `post`, `category`, `author`, `tag` | ⏳ | Portable Text body; map `is_published` → draft/publish workflow |
| Export script: Supabase `blogs` + `blog_categories` + `blog_tags` + `hr_users` → NDJSON → `sanity dataset import` | ⏳ | Convert stored HTML → Portable Text (`@sanity/block-tools` or `@portabletext/block-tools`); keep slugs identical; upload images to Sanity assets |
| `src/lib/blogService` (GROQ) replaces `usePublicBlog` | ⏳ | Hook is client-side Supabase fetching today |
| Update `blogs/index`, `blogs/[slug]`, `RelatedPosts`, `TableOfContents`, `BlogAuthor` | ⏳ | `sanitizeBlogHtml` / `readTime` util reworked for Portable Text |
| `BlogComments` + `CommentCount` | ⏳ | Keep on Supabase; re-key `blog_id` → Sanity post `_id` (migration SQL) |
| `sitemap-blogs.xml.js` | ⏳ | Query Sanity instead of Supabase |
| 301 redirect audit | ⏳ | Slugs must be unchanged; verify in Search Console |

### Phase 1.2 — Certified Agencies (highest code-reduction win)
Seven near-identical ~850-line pages (`aquila, liftup, media_seal, nitro121, omni-options, penquin, xperia_agency` = 6,000 lines).
| Area | Status | Notes |
|---|---|---|
| Schema `agency` (name, slug, logo, hero, about, services, regions, certification date/level, team, case studies, contact, SEO) | ⏳ | Diff the 7 files first to find the true variable fields |
| One template `certified-agencies/[slug]` + `certified-agencies/index` | ⏳ | `getStaticPaths` + ISR |
| Redirects for old underscore URL (`media_seal`, `xperia_agency`) | ⏳ | Normalise slugs; add `redirects()` in `next.config.js` |
| `AgencyLogosGrid`, `AgencyLogosMarquee`, `AgenciesMarquee` read from Sanity | ⏳ | |
| Delete 7 page files | ⏳ | Expected: −6,000 lines |

### Phase 1.3 — Other content (recommended order)
| # | Content | Source today | Why | Status |
|---|---|---|---|---|
| 1 | Masterclasses | hardcoded in `masterclasses/index.js` (~760 lines) and `[id].js` (~2,150 lines) | Biggest hardcoded blob; also fixes numeric-id routing → slugs | ⏳ |
| 2 | Events & webinars | `data/eventsData.js`, `events/[id].js` | Frequent edits | ⏳ |
| 3 | Summit content | `data/summit/*`, `summit/exhibitors.js` (1,600 lines), `summit/travel-guide`, `PartnersSection`, `SpeakersSection` | Changes every year; add `year`/`edition` field so past summits are archived, not deleted | ⏳ |
| 4 | Awards categories | `paan-awards/categories.js` (1,200 lines) | Annual cycle | ⏳ |
| 5 | Careers | `src/messages` JSON + `careers.js` | Same as CCSA careers; application form already has `send-career-application` API | ⏳ |
| 6 | Clients, partners, FAQs, testimonials | `clients.js`, `partners.js`, `StrategicPartners`, `FAQs`, `VoicesFromNetwork` | Small, reusable | ⏳ |
| 7 | Academy / membership tiers / pricing | `academy/index.js`, `Tier1-3`, `MemberTiers`, `pricing.js` | Marketing copy changes | ⏳ |
| 8 | Site settings | `menuData.js`, `summitMenu.js`, `usePopupBanner`, footer, `ChristmasContext` | Seasonal banners/popups without deploy | ⏳ |

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
| Add `typescript`, `@types/*`, `tsconfig.json` (`strict`, `allowJs`, `@/*` alias), replace `jsconfig.json` | ⏳ |
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
| `components/summit/*` (purchase flow) | Medium | Multi-step form state |
| Other `api/send-*` routes (~18) | Medium | Share one typed mail/Slack helper — they look near-duplicate |
| Pages (~45) | Medium/Low | |
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
    summit/ exhibitors/ travel-guide/ [experiences]/ purchase-ticket/ speaker-application/ exhibition-application/
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
6. ⏳ Summit + ticket purchase + payment pages (**last, highest risk** — keep Meta CAPI/GA4 purchase events verified before/after)
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

## 4. Risks / watch-list
| Risk | Mitigation |
|---|---|
| SEO loss on blogs/agencies | Identical slugs, 301s, compare sitemap before/after |
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
1. Sanity foundation → 2. Blog → 3. Certified agencies → 4. Masterclasses/events/summit/awards/careers/small content → 5. TS setup + high-priority typing (parallel) → 6. App Router branch → 7. Cleanup.
