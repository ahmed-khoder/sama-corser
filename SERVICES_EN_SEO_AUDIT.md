# ENGLISH SERVICES HUB PAGE SEO AUDIT (/services)

**Target URL:** `https://samalogistics.com/services` (Language: English)  
**Audit Type:** Read-Only Source Code & Payload SEO Audit  
**Date:** September 16, 2026  
**Scope:** English version of `/services` ONLY  
**Status:** Audit Only — 0 Code Changes Executed

---

## Executive Summary

This audit evaluates the search engine optimization (SEO) of the English version of the central Services Hub page (`/services`). It assesses metadata, heading architecture, keyword targeting, internal linking, image accessibility, local search presence, structured data, canonicalization, and social card configurations against modern technical SEO standards.

Special attention was given to ranking potential for four critical high-intent queries:
1. `Logistics Services Egypt`
2. `Freight Forwarding Egypt`
3. `Shipping & Logistics Egypt`
4. `Logistics Services Port Said`

---

## 1. English Title & Meta Description

| Element | Exact Current Value in Code | Source File & Location | Character Count | SEO Evaluation |
| :--- | :--- | :--- | :--- | :--- |
| **HTML Title** | `Freight, Customs & Transport Services in Port Said` | [`app/services/page.tsx:19`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L19) | 52 chars | **ACTUAL PROBLEM (P1)**<br>• Omits Brand Name (`SAMA Logistics`).<br>• Omits Country (`Egypt`).<br>• Omits primary category word (`Logistics`).<br>• Narrowly restricted to `in Port Said`. |
| **Meta Description** | `Sea freight, land transport, customs clearance, warehousing, and cargo insurance from Port Said, Egypt. Explore SAMA Logistics services.` | [`app/services/page.tsx:22`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L22) | 137 chars | **GOOD**<br>• Optimal length (120-155 chars).<br>• Contains brand name (`SAMA Logistics`).<br>• Contains geographic anchors (`Port Said, Egypt`).<br>• Lists 5 core services + active CTA. |
| **Meta Keywords** | `container transport Egypt, logistics company Port Said, freight forwarding Egypt, customs clearance Egypt, shipping services Egypt, logistics services, warehousing, distribution` | [`app/services/page.tsx:29`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L29) | — | **GOOD**<br>Covers the 4 focus keyword themes cleanly. |

---

## 2. Heading Architecture (H1 / H2 / H3 / H4)

### DOM Hierarchy Inspection

| Level | Exact Current Visible Text (EN) | Section | Code File & Location | Hierarchy Check |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | Dynamic CMS title (`titleEn`)<br>*(Default: `Our Logistics Services`)* | Hero Section | [`ServicesPageClient.tsx:190-214`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L190-L214) | **Single H1** (Clean, but generic without geographic anchor) |
| **H2** | `Our Logistics & Container Transport Services` | Section 3: Core Services | [`ServicesPageClient.tsx:309`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L309) | Valid H2 (Presents minor cannibalization risk with `/container-transport`) |
| **H3** | Dynamic service title (`service.titleEn`)<br>*(e.g., Sea Freight, Land Transport, Customs Clearance, Warehousing)* | Section 3: Service Cards | [`ServicesPageClient.tsx:394`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L394) | Valid H3 |
| **H2** | `Specialized Cargo & Heavy Transport Solutions` | Section 4: Specialized Cargo | [`ServicesPageClient.tsx:460`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L460) | Valid H2 |
| **H3** | Dynamic cargo title (`cargo.titleEn`)<br>*(e.g., Port Container Transport, Marble Transport, Factory Transport)* | Section 4: Cargo Cards | [`ServicesPageClient.tsx:531`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L531) | Valid H3 |
| **H2** | `Our Fleet for Container Transport` | Section 5: Fleet Showcase | [`ServicesPageClient.tsx:593`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L593) | Valid H2 |
| **H3** | Dynamic truck model (`truck.nameEn`)<br>*(e.g., Mercedes-Benz Actros 1845)* | Section 5: Truck Cards | [`ServicesPageClient.tsx:628`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L628) | Valid H3 |
| **H2** | `Port Operations & Shipping Services` | Section 6: Port Operations | [`ServicesPageClient.tsx:696`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L696) | Valid H2 |
| **H3** | Dynamic port name (`port.nameEn`)<br>*(e.g., Port Said Port (East & West), Damietta Port)* | Section 6: Port Cards | [`ServicesPageClient.tsx:740`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L740) | Valid H3 |
| **H2** | `We Make the Difference in Logistics` | Section 7: Why Choose Us | [`ServicesPageClient.tsx:824`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L824) | Valid H2 |
| **H4** | `Fast Execution`, `Complete Security`, `Competitive Prices` | Section 7: Feature Cards | [`ServicesPageClient.tsx:853`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L853) | **HEADING SKIP (P3)**<br>Skips H3 level directly from H2 to H4 |
| **H3** | `Ready to Get Started?` | Section 7: CTA Banner | [`ServicesPageClient.tsx:896`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L896) | Valid H3 |

---

## 3. Keyword Coverage & Search Intent Analysis

### Search Intent Profile
- **Page Nature:** Central Services Directory & Commercial Capabilities Hub.
- **Audience:** B2B commercial importers/exporters, manufacturers, and freight agents evaluating full logistics capacity in Egypt.
- **Intent Type:** Commercial Investigation leading to Transactional inquiry (`/contact`, `/services/[slug]`).

### Target Keyword Matrix

| Target Keyword | In `<title>`? | In `Meta Desc`? | In `<h1>`? | In `<h2>`? | In Body Content? | Overall Ranking Readiness |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`Logistics Services Egypt`** | ❌ NO | ❌ NO | ❌ NO | ⚠️ Partial (`Services`, no `Egypt`) | ✅ YES (Multiple sections) | **MODERATE / UNDER-OPTIMIZED**<br>Missing from the two strongest on-page ranking signals (Title tag & H1). |
| **`Freight Forwarding Egypt`** | ⚠️ Partial (`Freight` only) | ⚠️ Partial (`Sea freight`) | ❌ NO | ❌ NO | ⚠️ Low ("Freight" appears, but not entity string) | **WEAK**<br>The hub page does not explicitly claim the national "Freight Forwarding Egypt" entity in its Title or H1. |
| **`Shipping & Logistics Egypt`** | ❌ NO | ⚠️ Partial | ❌ NO | ⚠️ Partial (`Shipping Services` in Sec 6) | ✅ YES (`in Egypt's most vital Suez Canal ports`) | **MODERATE**<br>Strong topical support in Port Operations, but absent from Title. |
| **`Logistics Services Port Said`** | ⚠️ Partial (`Services in Port Said`, missing `Logistics`) | ✅ YES (`from Port Said, Egypt... SAMA Logistics services`) | ⚠️ Partial (`Logistics Services`) | ⚠️ Partial | ✅ STRONG (Section 6 features East & West Port Said) | **STRONG**<br>Well-anchored locally, but Title should explicitly include "Logistics". |

---

## 4. Keyword Cannibalization Analysis

### Evaluation Against Sibling & Child Pages

| Subpage URL | Primary Target Keyword | Potential Cannibalization on `/services` | Verdict & Recommendation |
| :--- | :--- | :--- | :--- |
| **`/services/container-transport`** | `Container Transport Port Said / Egypt` | **MODERATE RISK (P2):**<br>On `/services`, Section 3 H2 is `Our Logistics & Container Transport Services`, and Section 5 H2 is `Our Fleet for Container Transport`. Having two H2s specifically centered on "Container Transport" dilutes the authority of the specialized container transport landing page. | **CHANGE H2:** Update Section 3 H2 to `Our Comprehensive Freight & Logistics Services`. Let `/services/container-transport` own the specific transactional keyword "Container Transport". |
| **`/services/marble-transport`** | `Marble, Quarry & Mining Transport Egypt` | **NO RISK (GOOD):**<br>Specialized cargo card 1 routes directly to `/services/marble-transport` with precise anchor text. | Hub-and-Spoke model works properly. |
| **`/services/industrial-transport`** | `Factory & Industrial Container Transport Egypt` | **NO RISK (GOOD):**<br>Specialized cargo card 3 routes directly to `/services/industrial-transport`. | Hub-and-Spoke model works properly. |
| **`/services/[slug]`** | Dynamic specific services (Sea Freight, Customs, etc.) | **NO RISK (GOOD):**<br>Each card links to `/services/${service.slug}`. | Hub-and-Spoke model works properly. |

---

## 5. Internal Linking & Crawl Architecture

| Link Target | Link Location | Element | Anchor / Label | Evaluation |
| :--- | :--- | :--- | :--- | :--- |
| `/services/[slug]` | Section 3 Service Cards | `<Link href="/services/${service.slug}">` | Card wrapper + `Explore Service` + arrow | **GOOD** (Crawlable Next.js `<Link>`) |
| `/services/container-transport` | Section 4 Cargo Card | `<Link href="/services/container-transport">` | Card wrapper + `Learn More` | **GOOD** |
| `/services/marble-transport` | Section 4 Cargo Card | `<Link href="/services/marble-transport">` | Card wrapper + `Learn More` | **GOOD** |
| `/services/industrial-transport` | Section 4 Cargo Card | `<Link href="/services/industrial-transport">` | Card wrapper + `Learn More` | **GOOD** |
| `/contact` | Hero CTA & Bottom CTA | `<motion.a href="/contact">` / `<Link href="/contact">` | `Contact Us` | **GOOD** |
| `/about` | Hero CTA | `<motion.a href="/about">` | `About Us` | **GOOD** |
| `/#team` | Bottom CTA | `<Link href="/#team">` | `Our Team` | **GOOD** |

- **Link Health Verdict:** **EXCELLENT (GOOD)**. No broken internal links detected; clear parent-to-child silo hierarchy.

---

## 6. Image Accessibility & ALT Attributes

| Image Context | Current `alt` Value in Code | Code Location | Evaluation |
| :--- | :--- | :--- | :--- |
| **Hero Slideshow** | `(slide.altEn \|\| slide.titleEn) \|\| 'Freight shipping and logistics operations — SAMA Logistics'` | [`HeroSlideshow.tsx:152-153`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/HeroSlideshow.tsx#L152-L153) | **GOOD** (Language-aware, keyword-rich fallback) |
| **Core Service Cards** | `service.titleEn` (e.g., `Sea Freight`, `Customs Clearance`) | [`ServicesPageClient.tsx:369`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L369) | **GOOD** (Dynamic & descriptive) |
| **Specialized Cargo BG** | `alt=""` | [`ServicesPageClient.tsx:511`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L511) | **ACCEPTABLE / IMPROVEMENT (P3)**<br>Decorative background; could use `cargo.titleEn` or explicit `aria-hidden="true"` |
| **Fleet Trucks** | `truck.nameEn` (e.g., `Mercedes-Benz Actros 1845`) | [`ServicesPageClient.tsx:619`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L619) | **GOOD** (Dynamic & descriptive) |
| **Port Operations** | `port.nameEn` (e.g., `Port Said Port (East & West)`) | [`ServicesPageClient.tsx:727`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L727) | **GOOD** (Dynamic & descriptive) |
| **Flanking Image 1** | `Port operations — SAMA Logistics, Port Said` | [`ServicesPageClient.tsx:791`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L791) | **GOOD** (Contains service, brand, city) |
| **Flanking Image 2** | `Fleet transport trucks — SAMA Logistics` | [`ServicesPageClient.tsx:802`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L802) | **GOOD** (Contains service, brand) |
| **Flanking Image 3** | `Container port` | [`ServicesPageClient.tsx:936`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L936) | **ACTUAL PROBLEM (P2)**<br>Generic alt text without brand or location keywords |
| **Flanking Image 4** | `Shipping operations` | [`ServicesPageClient.tsx:948`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L948) | **ACTUAL PROBLEM (P2)**<br>Generic alt text without brand or location keywords |

---

## 7. Local SEO: Egypt & Port Said

| Signal | Current Status | Findings & Assessment |
| :--- | :--- | :--- |
| **Port Said Presence** | Strong | Port Said is explicitly cited in the Title, Meta Description, Section 6 Port Operations (East & West Port Said), and Section 7 flanking image ALT. |
| **Egypt National Presence** | Weak in Primary Signals | While Egypt appears in the Meta Description and Section 6 description, it is **completely missing from the HTML `<title>` tag and the `<h1>`**. |
| **Local Entity Alignment** | Incomplete Geo-scope | Because SAMA Logistics operates across all Egyptian ports (Port Said, Damietta, Alexandria, Sokhna) and industrial zones nationwide, omitting "Egypt" from the `<title>` reduces search engine confidence for nationwide logistics queries. |

---

## 8. Structured Data (Schema.org / JSON-LD)

| Schema Type | Status | Source | Findings |
| :--- | :--- | :--- | :--- |
| **Organization** | ✅ Active | Inherited from `app/layout.tsx` -> `components/JsonLd.tsx` | Full postal address (Port Said, EG), phone lines, social profiles. |
| **LocalBusiness** | ✅ Active | Inherited from `app/layout.tsx` -> `components/JsonLd.tsx` | GeoCoordinates (31.2509721, 32.2930159), opening hours, Google Maps link. |
| **WebSite** | ✅ Active | Inherited from `app/layout.tsx` -> `components/JsonLd.tsx` | Site name and URL. |
| **BreadcrumbList** | ⚠️ Incomplete & Flawed | Inherited from `components/JsonLd.tsx:182-193` | **ACTUAL PROBLEM (P2):**<br>1. Emits only 1 item: `position: 1, name: 'الرئيسية'`. It does NOT include item 2 (`Services`).<br>2. The name is hardcoded in Arabic (`الرئيسية`), even on the English page. |
| **Service Catalog Schema** | ❌ Missing | None on `/services` | **ACTUAL PROBLEM (P2):**<br>Unlike `/services/container-transport` which emits dedicated `Service` schema, the main `/services` hub lacks a page-level `CollectionPage` or `ItemList` schema enumerating its service portfolio. |

---

## 9. Canonicalization & Indexability

| Element | Current Value | Evaluation |
| :--- | :--- | :--- |
| **Canonical URL** | `https://samalogistics.com/services` | **GOOD** (Explicit, self-referencing canonical tag in `app/services/page.tsx:51`). |
| **Robots Directive** | `index: true, follow: true` | **GOOD** (Inherited from `app/layout.tsx`). |
| **Robots.txt** | `Allow: /` (Disallows only `/dashboard/`, `/api/`, `/auth/`) | **GOOD** ([`app/robots.ts:14`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/robots.ts#L14)). |
| **XML Sitemap** | Listed with `priority: 0.9`, `changeFrequency: 'weekly'` | **GOOD** ([`app/sitemap.ts:21-25`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/sitemap.ts#L21-L25)). |

---

## 10. Social Meta Tags (Open Graph & Twitter)

| Tag | Current Value in Code | Source File & Location | Evaluation |
| :--- | :--- | :--- | :--- |
| `og:title` | Inherits `title` variable | [`app/services/page.tsx:31`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L31) | Functional, but inherits weak title |
| `og:description` | Inherits `description` variable | [`app/services/page.tsx:32`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L32) | **GOOD** |
| `og:type` | `website` | [`app/services/page.tsx:33`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L33) | **GOOD** |
| `og:url` | `https://samalogistics.com/services` | [`app/services/page.tsx:34`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L34) | **GOOD** |
| `og:image` | `https://samalogistics.com/og-image.jpg` | [`app/services/page.tsx:37`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L37) | **GOOD** |
| `og:image:alt` | `SAMA Logistics Services` | [`app/services/page.tsx:40`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L40) | **GOOD** (Language-aware) |
| `twitter:card` | `summary_large_image` | [`app/services/page.tsx:45`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L45) | **GOOD** |
| `twitter:title` | Inherits `title` variable | [`app/services/page.tsx:46`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L46) | Functional, but inherits weak title |
| `twitter:description` | Inherits `description` variable | [`app/services/page.tsx:47`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L47) | **GOOD** |

---

## Summary: What is GOOD (No Modification Required)

1. **Meta Description:** Concise (137 chars), mentions Port Said & Egypt, lists core offerings, includes brand name.
2. **Canonical Tag:** Perfectly configured self-referencing canonical (`https://samalogistics.com/services`).
3. **Indexability & Crawlability:** Fully allowed in `robots.ts`, high priority (0.9) in `sitemap.ts`.
4. **Internal Linking Structure:** Flawless hub-and-spoke architecture linking to specialized landing pages and detail slugs using semantic Next.js `<Link>` elements.
5. **Core Service & Fleet Image ALTs:** All dynamically populated with English entity titles (`service.titleEn`, `truck.nameEn`, `port.nameEn`).
6. **Hero Slideshow Fallback ALT:** Fully language-aware and SEO-friendly.
7. **Social Cards Dynamic Language Handling:** Both Open Graph and Twitter cards switch dynamically based on user language.

---

## Actual Problems Identified

| ID | Category | Problem Description | Impact |
| :---: | :--- | :--- | :--- |
| **#1** | **Metadata (P1)** | English Title completely omits the Brand Name (`SAMA Logistics`), omits the country (`Egypt`), and omits the primary category word (`Logistics`). | High ranking loss for national high-volume queries (`Logistics Services Egypt`, `Freight Forwarding Egypt`). |
| **#2** | **Cannibalization (P2)** | Section 3 H2 is named `Our Logistics & Container Transport Services`, competing directly with `/services/container-transport`. | Cannibalizes rankings for dedicated container trucking page. |
| **#3** | **Structured Data (P2)** | Global `BreadcrumbList` has only 1 step (`الرئيسية`), omitting `/services`, and is hardcoded in Arabic on the English page. Page lacks a `CollectionPage` / `ItemList` catalog schema. | Incomplete breadcrumb rich snippets in Google Search results. |
| **#4** | **Image Alt (P2)** | Flanking images in Section 7 use generic text: `Container port` and `Shipping operations` without brand or geographic context. | Missed local image SEO ranking opportunities. |
| **#5** | **Heading Level (P3)** | Section 7 skips H3 heading level, going directly from H2 (`We Make the Difference in Logistics`) to H4 (`Fast Execution`, etc.). | Minor semantic HTML heading hierarchy defect. |

---

## Proposed Changes & Recommendations

### [P1] Optimize English Title Tag
- **Target File:** [`app/services/page.tsx:19`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx#L19)
- **Current Value:**
  ```typescript
  : 'Freight, Customs & Transport Services in Port Said';
  ```
- **Proposed Replacement:**
  ```typescript
  : 'Logistics Services & Freight Forwarding Egypt | SAMA Logistics';
  ```
- **Rationale:** Exactly 62 characters (optimal length). Captures exact target phrases: `Logistics Services Egypt`, `Freight Forwarding Egypt`, and Brand `SAMA Logistics`. Automatically propagates to Open Graph and Twitter tags.

---

### [P2] Resolve Heading Cannibalization for Container Transport
- **Target File:** [`app/services/ServicesPageClient.tsx:309`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L309)
- **Current Value:**
  ```typescript
  {isRTL ? 'خدمات النقل اللوجستي ونقل الحاويات' : 'Our Logistics & Container Transport Services'}
  ```
- **Proposed Replacement:**
  ```typescript
  {isRTL ? 'خدمات الشحن والحلول اللوجستية المتكاملة' : 'Our Comprehensive Logistics & Freight Solutions'}
  ```
- **Rationale:** Eliminates keyword cannibalization with `/services/container-transport` and accurately describes the full catalog (customs, sea freight, warehousing).

---

### [P2] Add Page-Level BreadcrumbList & Service Catalog Schema
- **Target File:** [`app/services/page.tsx`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/page.tsx)
- **Proposed Solution:** Render a page-level `<script type="application/ld+json">` matching language:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://samalogistics.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://samalogistics.com/services"
      }
    ]
  }
  ```

---

### [P2] Enrich Section 7 Flanking Images ALT Text
- **Target File:** [`app/services/ServicesPageClient.tsx:936, 948`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L936-L948)
- **Current Values:**
  - Line 936: `alt="Container port"`
  - Line 948: `alt="Shipping operations"`
- **Proposed Replacements:**
  - Line 936: `alt={isRTL ? "عمليات ميناء الحاويات في مصر — سما لوجستيك" : "Container port operations in Egypt — SAMA Logistics"}`
  - Line 948: `alt={isRTL ? "خدمات الشحن والعمليات البحرية — سما لوجستيك" : "Commercial shipping and maritime operations — SAMA Logistics"}`

---

### [P3] Fix Heading Hierarchy Skip in Section 7
- **Target File:** [`app/services/ServicesPageClient.tsx:853`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx#L853)
- **Current Value:** `<h4 className="...">`
- **Proposed Replacement:** `<h3 className="...">` (with corresponding closing `</h3>` at line 855)
- **Rationale:** Ensures clean `H1 -> H2 -> H3` semantic flow without level skipping.
