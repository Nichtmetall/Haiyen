# SEO Audit — Haiyen Hairdesign (haiyen-hairdesign.de)

*Date: 2026-09-24*
*Full site audit — Next.js/App Router source review + web research (no SEO tool/analytics connected; no live-site crawl performed). Keyword and competitor signals below are research-derived, not pulled from a ranking tool — flagged where relevant.*

## Executive Summary

Haiyen Hairdesign has a **solid technical SEO skeleton but thin, uneven content depth** — the classic "foundation is there, execution stops halfway" pattern. The biggest strength is the homepage: clean per-page metadata via a shared `pageMetadata()` helper, correct canonicals on all 6 routes, one well-built JSON-LD block (Organization + WebSite + two HairSalon entities with real address/hours data), and consistently descriptive image alt text on the homepage and team page. The three biggest priorities: (1) **structured data coverage is homepage-only** — a ready-made FAQPage opportunity (10 Q&A pairs already written) and Person markup for 6 stylists are sitting unused; (2) **`/team`, `/galerie`, and `/booking` are thin** — 3 of 6 stylists have no bio at all, gallery images share duplicate/generic alt text and non-descriptive filenames, and `/booking` is nearly copy-free; (3) **local competitors (Duo Perfecto, Frau Schneider) are out-content-ing this site** with dedicated technique landing pages, FAQ schema, and comparison guides that directly target the same Dresden hair-technique searches. Overall assessment: **needs work** — not broken, but leaving ranking potential on the table against a competitive local field.

## Keyword Opportunity Table

*No SEO tool is connected — volume/difficulty are directional estimates from on-page copy, SERP patterns, and competitor coverage, not measured data. For precise volume/difficulty, connect Ahrefs or Semrush via MCP.*

| Keyword | Est. Difficulty | Opportunity Score | Current Ranking | Intent | Recommended Content Type |
|---|---|---|---|---|---|
| Friseur Dresden Striesen | Moderate | High | Unranked/unknown (not tracked) | Navigational/Commercial | Existing homepage location block — strengthen with dedicated section content |
| Friseur Dresden Neustadt | Moderate | High | Unranked/unknown (not tracked) | Navigational/Commercial | Existing homepage location block — strengthen |
| Balayage Dresden | Hard (Frau Schneider, cHAARakter, Duo Perfecto all target this) | High | Unranked/unknown (not tracked) | Commercial | New dedicated `/balayage` landing page |
| AirTouch Dresden | Moderate (Frau Schneider owns this niche) | Medium | Not targeted at all currently | Commercial | New landing page or FAQ addition |
| Extensions Dresden / Haarverlängerung Dresden | Moderate | High | Unranked/unknown (not tracked) | Commercial | New `/extensions` page (Great Lengths is already a stocked brand) |
| Coloration Dresden | Moderate | Medium | Unranked/unknown (not tracked) | Commercial | Service section expansion |
| Great Lengths Extensions Dresden | Easy | Medium | Not targeted | Commercial/Transactional | Brand-specific landing page (differentiator vs. generic competitors) |
| Hochsteckfrisur Dresden / Brautfrisur Dresden | Easy–Moderate | High | Not targeted (services list mentions "Hochzeits- & Festfrisuren" but no dedicated page) | Commercial | New bridal/event-hair landing page |
| Friseurtermin Dresden online buchen | Moderate | Medium | Ranked via `/booking` (weak — thin content, English URL) | Transactional | Strengthen `/booking` copy; consider renaming path |
| Bester Friseur Dresden Striesen | Hard | Medium | Unranked/unknown | Commercial | Reviews/testimonials section (4 exist on homepage — expand, add schema) |
| Balayage oder Strähnen Unterschied | Easy | High (Frau Schneider already ranks a comparison guide here) | Not targeted | Informational | New comparison blog post |
| Was kostet Balayage in Dresden | Easy | High | Not targeted (no pricing page) | Commercial investigation | Pricing/FAQ page or FAQ expansion |
| Wie oft zum Friseur gehen | Easy | Low–Medium | Not targeted | Informational | Blog post (low commercial value but easy win, low competition) |
| Wie lange hält eine Extension | Easy | Medium | Not targeted | Informational | FAQ addition or blog post |
| Olaplex Behandlung Dresden | Easy | Medium | Not targeted (brand is stocked per homepage marquee) | Commercial | Service/FAQ mention |
| Redken Friseur Dresden | Easy | Low | Not targeted | Commercial | Minor — brand mention only |
| Coloriste Diplômé L'Oréal Dresden | Easy | Low | Not targeted | Commercial | Team page credential highlight (already have this credential, underused) |
| Masterstylist Dresden | Easy | Low–Medium | Not targeted | Commercial | Team page — already have badge, could be a keyword anchor |
| Foliensträhnen Dresden | Moderate | Medium | Not targeted | Commercial | Service section expansion |
| Friseur Dresden Borsbergstraße | Easy | Medium | Should already rank via GBP + Impressum NAP data | Navigational | Ensure NAP consistency (already good) |
| Haarfarbe auffrischen Dresden | Easy | Low–Medium | Not targeted | Informational/Commercial | Blog post |
| Grey Blending Dresden | Easy | Low–Medium (Frau Schneider covers "grey blending" — low-competition niche locally) | Not targeted | Commercial | FAQ or service mention |
| Friseur Dresden Bewertungen | Easy | Medium | Homepage has 4 reviews, no schema | Commercial investigation | Add Review/AggregateRating schema |
| Salon Dresden Great Lengths zertifiziert | Easy | Low | Not targeted | Commercial | Credential/trust content |
| Friseur in meiner Nähe Dresden | Hard (broad, GBP-driven) | Medium | Depends on Google Business Profile, not this audit's scope | Navigational | Ensure GBP ↔ site NAP/schema consistency |

## On-Page Issues Table

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| `/galerie` | Duplicate alt text/captions across different images (e.g. "Highlights & Cut" and "Soft Balayage & Styling" each used twice) | High | Write unique, descriptive captions per image, ideally including stylist + technique + district |
| `public/images/galerie/<Stylist>/*` | Gallery source images use raw camera/UUID filenames (`IMG_1153.jpg`, `381afdd4-...jpg`) | Medium | Rename to descriptive slugs (e.g. `balayage-josi-dresden-neustadt.webp`) before next upload batch |
| `/team` | 3 of 6 stylists (Lea-Sophie, Josi, Minh Anh) have no bio/specialty text at all; `quote` and `skills` fields exist in the data model but aren't rendered | High | Write 1-2 sentence specialty blurbs for all 6; render existing `quote`/`skills` fields |
| `/booking` | Page has almost no crawlable text (~100 words) — mostly an embedded third-party iframe | Medium | Add descriptive copy about the booking process, what to expect, cancellation policy |
| `/booking` | URL path is English ("booking") while every other route is German (`/galerie`, `/impressum`, `/datenschutz`) | Low | Consider `/termin` or `/termin-buchen` with a redirect from `/booking` to preserve links |
| `app/sitemap.ts` | No `lastModified`, `changeFrequency`, or `priority` set on any of the 6 URLs | Medium | Add `lastModified` (from content update dates) at minimum — helps crawl prioritization |
| `app/layout.tsx` | No explicit `viewport` export — relying on Next.js's implicit default | Low | Add explicit `export const viewport` for auditability and control |
| `public/og.png` | Orphaned 1.2MB unused file — actual OG image is `haiyen-dresden-social.jpg` (133KB) | Low | Delete unused asset (repo hygiene, not a live SEO issue since it's unreferenced) |
| `components/site/gallery-lightbox.tsx` | `next/image` used with `unoptimized` prop on both preview and full images | Medium | Remove `unoptimized` unless there's a specific reason (e.g. animation/blur conflict) — re-enable Next.js image optimization for potentially large lightbox images |
| `components/site/horizontal-gallery.tsx` | Dead component (not imported anywhere) with generic `alt="Styling Inspiration"` | Low | Delete if truly unused, or fix alt text if it's slated for reuse |
| Sitewide | No `FAQPage` structured data despite 10 FAQ items existing on the homepage | High | Add FAQPage JSON-LD wrapping the existing FAQ content — cheap win, direct rich-result eligibility |
| Sitewide | No `Person` structured data for the 6 stylists on `/team` | Medium | Add Person schema per team member (name, jobTitle, worksFor → Organization) |
| `/galerie` | No `ImageObject`/gallery structured data | Low | Consider ImageObject or ImageGallery schema if gallery traffic matters |

## Content Gap Recommendations

| Topic/Keyword | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| FAQPage schema for existing homepage FAQ | 10 Q&A pairs already written, zero markup — direct rich-snippet eligibility with no new content needed | Structured data (JSON-LD) | High | Quick win (1-2 hrs) |
| Balayage vs. Strähnen / AirTouch comparison guide | Frau Schneider already ranks a "Balayage oder AirTouch?" comparison page for exactly this query cluster; direct competitive gap | Blog post / guide | High | Moderate (half day) |
| Dedicated `/balayage`, `/extensions`, `/hochsteckfrisuren` landing pages | Currently all services live in one homepage section; competitors (Frau Schneider) use dedicated URLs like `balayage-dresden`, `airtouch-dresden` that can rank independently | Landing pages | High | Substantial (multi-day) |
| Team bios for 3 missing stylists | Thin `/team` page undermines E-E-A-T signals (expertise/experience) that matter for a personal-service business | Content addition | High | Quick win (1-2 hrs) |
| Pricing page or price ranges | Both competitors researched (cHAARakter, Frau Schneider) surface pricing directly; "was kostet Balayage Dresden" is an easy-difficulty, high-intent query with no current page to answer it | New page or FAQ expansion | Medium | Moderate (half day) |
| Person schema for stylists | Reinforces individual stylist authority/credentials already stated in copy (Coloriste Diplômé L'Oréal, Masterstylist) | Structured data | Medium | Quick win (1-2 hrs) |
| Review/testimonial schema | 4 reviews exist on homepage unmarked; Duo Perfecto surfaces 428+ reviews with a visible 5.0 rating as a trust signal | Structured data + expanded review section | Medium | Moderate (half day) |
| Blog/guide content cluster (hair care basics) | Zero informational content exists; "wie oft zum Friseur," "wie lange hält eine Extension" are easy, on-topic, low-competition queries that build topical authority | Blog posts | Medium | Substantial (multi-day, ongoing) |

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | Pass | `SITE_URL = https://haiyen-hairdesign.de`, used consistently |
| robots.txt | Pass | `allow: "/"` for all user agents, correctly references sitemap |
| XML sitemap presence | Pass | All 6 routes present with correct absolute URLs |
| Sitemap completeness (metadata) | Warning | Missing `lastModified`/`changeFrequency`/`priority` on every entry |
| Canonical tags | Pass | All 6 pages set `alternates.canonical` via shared `pageMetadata()` helper, resolved absolute via `metadataBase` |
| Duplicate H1s | Pass | Exactly one H1 per page confirmed across all 6 routes |
| Structured data coverage | Warning | Only homepage has JSON-LD (Organization/WebSite/HairSalon×2); no FAQPage, Person, or Review markup anywhere |
| Mobile viewport | Warning | No explicit `viewport` export in `app/layout.tsx` — relies on Next.js implicit default (functionally fine, not auditable/explicit) |
| Image optimization | Warning | `next/image` used everywhere (no raw `<img>` tags) except `gallery-lightbox.tsx`, which explicitly sets `unoptimized` |
| Image alt text | Warning | Descriptive and unique on homepage/team; generic and duplicated on `/galerie` |
| Manifest/PWA icons | Fail | No `site.webmanifest`, no `apple-touch-icon` — only default `app/favicon.ico` |
| Analytics/tracking | N/A (by design) | No analytics packages present at all — can't measure organic traffic to validate keyword targets; custom consent manager exists but currently gates only Maps/Planity iframes |
| Orphaned assets | Low-severity fail | `public/og.png` (1.2MB) unreferenced in code |
| URL structure consistency | Warning | 5/6 paths are German; `/booking` is the English outlier |
| Redirects/headers config | N/A | `next.config.ts` is default/empty — no redirects or security headers configured, not inherently an SEO issue but worth noting for future `/booking` rename |

## Competitor Comparison Summary

*Competitors identified via web search (Duo Perfecto and Frau Schneider, both Dresden-Neustadt salons directly competing on Balayage/Extensions/Coloration — the same services and district Haiyen targets). Signals are from live homepage/page fetches, not a ranking tool.*

| Dimension | Haiyen Hairdesign | Duo Perfecto | Frau Schneider | Winner |
|---|---|---|---|---|
| Content depth (homepage) | ~1,200-1,500 words, strong on story/services/FAQ | ~2,000+ words across philosophy/services/team/care guidance | Substantial, with technique comparison content | Duo Perfecto |
| Dedicated service landing pages | None (all on one page) | Not confirmed beyond homepage sections | Yes — `balayage-dresden`, `airtouch-dresden` style URLs | Frau Schneider |
| FAQ presence | Yes, 10 items — but **not marked up as schema** | Yes, dedicated FAQ section (schema-supportable) | Not confirmed on homepage | Duo Perfecto (has it AND likely marks it up) |
| Structured data | Homepage only (Organization/WebSite/HairSalon) | Not verified directly, but content structure suggests FAQ schema readiness | Described as "schema-friendly" with clean H2/H3 hierarchy | Tie/Unclear — worth re-checking with a tool |
| Team/stylist bios | 3 of 6 stylists have no bio | Team info present in homepage content | Team bios with specializations listed | Frau Schneider |
| Reviews/social proof | 4 reviews, unmarked, on homepage | 428+ Google reviews, 5.0 rating, prominently displayed | Not confirmed | Duo Perfecto |
| Pricing transparency | None | Not confirmed as dedicated page | Structured pricing tables with time estimates | Frau Schneider |
| Technical foundation (canonicals, sitemap, robots) | Solid — clean and consistent | Not audited (out of scope) | Not audited (out of scope) | Haiyen (on what we can verify) |
| Brand credibility signals | Great Lengths, Redken, L'Oréal, Olaplex, ghd — all named, underused as keywords | Not confirmed | Premium product lines mentioned | Tie |

## Prioritized Action Plan

**Quick Wins (do this week):**
- Add FAQPage JSON-LD wrapping the 10 existing homepage FAQ items — Impact: High, Effort: 1-2 hrs, no dependencies.
- Fix duplicate/generic alt text and captions on `/galerie` (start with the two confirmed duplicate pairs) — Impact: Medium, Effort: 1-2 hrs.
- Write bios/specialty lines for the 3 team members currently blank (Lea-Sophie, Josi, Minh Anh); render the unused `quote`/`skills` fields already in the data model — Impact: High, Effort: 1-2 hrs, no dependencies (data model already supports it).
- Add `lastModified` to `app/sitemap.ts` entries — Impact: Medium, Effort: <1 hr.
- Add explicit `viewport` export to `app/layout.tsx` — Impact: Low, Effort: <1 hr.
- Delete orphaned `public/og.png` (1.2MB, unreferenced) — Impact: Low, Effort: <1 hr.
- Remove `unoptimized` from `gallery-lightbox.tsx`'s `next/image` usage, or document why it's needed — Impact: Medium, Effort: <1 hr, verify no visual regression after.

**Strategic Investments (plan for this quarter):**
- Build dedicated landing pages for top services (`/balayage`, `/extensions`, `/hochsteckfrisuren`) targeting the high-opportunity keywords above — Impact: High, Effort: multi-day, Dependencies: copywriting, possibly new photography per service.
- Add Person schema for all 6 stylists and Review/AggregateRating schema for testimonials — Impact: Medium-High, Effort: half day, Dependencies: FAQ schema work above as a template.
- Launch a short blog/guide content cluster (Balayage vs. AirTouch comparison, hair-care basics, bridal-hair guide) to compete directly with Frau Schneider's comparison content and capture question-based long-tail queries — Impact: High (compounding), Effort: multi-day/ongoing, Dependencies: none, but benefits from the landing pages existing first for internal linking.
- Rename gallery source image files to descriptive, keyword-relevant slugs — Impact: Low-Medium, Effort: moderate (batch rename + update `data.ts` references), Dependencies: coordinate with any pending photo uploads.
- Consider renaming `/booking` → `/termin` (with a redirect) for URL/language consistency — Impact: Low-Medium, Effort: moderate (needs `next.config.ts` redirect + internal link updates across the codebase), Dependencies: audit all internal `/booking` references first.
- Add a pricing page or FAQ pricing section — Impact: Medium, Effort: moderate, Dependencies: business decision on whether to publish exact prices (some competitors do, some route to consultation).

## Follow-Up

Possible next steps:
- Draft the FAQPage/Person/Review JSON-LD as ready-to-paste code for `app/page.tsx` and `/team`.
- Write the missing bios for Lea-Sophie, Josi, and Minh Anh.
- Draft a content brief for the Balayage-vs-AirTouch comparison post or one of the new service landing pages.
- Build a content calendar from the gap analysis.
- Re-run this analysis for a different competitor or domain.
