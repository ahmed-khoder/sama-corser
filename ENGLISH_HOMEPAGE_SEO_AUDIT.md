# ENGLISH HOMEPAGE SEO AUDIT

**Target URL:** `https://samalogistics.com/` (Language: English)  
**Audit Type:** Read-Only Source Code & Live Payload Audit  
**Date:** September 16, 2026  
**Status:** Analysis Only — 0 Code Changes Executed

---

## 1. Current English Metadata

| Element | Exact Current Value | Source File & Location | Evaluation |
| :--- | :--- | :--- | :--- |
| **HTML Title** | `SAMA Logistics \| Freight Forwarding & Container Transport Egypt` | [`app/page.tsx:18`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/page.tsx#L18) | **GOOD** (58 chars; targets brand, primary services, and national geographic scope) |
| **Meta Description** | `Freight forwarding, customs clearance, and container transport from Port Said, Egypt. Fast, secure logistics backed by 25+ years of experience.` | [`app/page.tsx:21`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/page.tsx#L21) | **GOOD** (151 chars; targets 3 core services, Port Said, Egypt, and trust signal) |
| **Canonical** | `https://samalogistics.com` | [`app/layout.tsx:134`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L134) | **GOOD** (Self-referencing canonical to root domain) |
| **Open Graph Title** | `SAMA Logistics \| Freight Forwarding & Container Transport Egypt` | [`app/page.tsx:30`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/page.tsx#L30) | **GOOD** (Matches HTML title) |
| **Open Graph Description** | `Freight forwarding, customs clearance, and container transport from Port Said, Egypt. Fast, secure logistics backed by 25+ years of experience.` | [`app/page.tsx:31`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/page.tsx#L31) | **GOOD** (Matches Meta description) |
| **Open Graph Locale** | `ar_EG` (inherited from layout) | [`app/layout.tsx:91`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L91) | **NEEDS IMPROVEMENT** (Not switched to `en_US` for English) |
| **Open Graph Image** | `https://samalogistics.com/og-image.jpg` | [`app/layout.tsx:99`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L99) | **GOOD** (1200x630 branded image) |
| **Twitter Card** | `summary_large_image` | [`app/layout.tsx:109`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L109) | **GOOD** |
| **Twitter Title** | `سما لوجستيك \| Sama Logistics` | [`app/layout.tsx:112`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L112) | **ACTUAL PROBLEM** (Falls back to Arabic title from layout) |
| **Twitter Description** | `حلول الشحن والتخليص الجمركي المتكاملة - نوصل أعمالك للعالم` | [`app/layout.tsx:113`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L113) | **ACTUAL PROBLEM** (Falls back to Arabic description from layout) |
| **Robots** | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | [`app/layout.tsx:76-86`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/layout.tsx#L76-L86) | **GOOD** (Full indexing and rich snippet support) |

---

## 2. Current English H1

- **Exact Current Visible Text:**
  ```text
  Connecting Your Business To The World
  ```
  *(Rendered in two lines: "Connecting Your Business" and "To The World", with "Business" and "World" highlighted in brand orange).*
- **Source File & Code Location:**
  [`components/home/HomeHeroSection.tsx:129-162`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/HomeHeroSection.tsx#L129-L162)
  CMS Fields in Database: `titleEnLine1 = "Connecting Your Business"`, `titleEnLine2 = "To The World"`.
- **Accuracy of Representation:**
  Partially accurate as a high-level inspirational corporate slogan, but does not explicitly name the brand or core operations.
- **Alignment with Search Intent:**
  **NEEDS IMPROVEMENT / WEAK for SEO:** It contains zero commercial or service keywords (e.g., "Freight Forwarding", "Container Transport", "Logistics", "Egypt", "Port Said"). Search engine bots looking for core topical relevance in the top `<h1>` find only generic marketing wording.

---

## 3. English Heading Structure

### Complete Heading Outline (DOM Hierarchy Order)

| Level | Exact Text | Section | Source File & Location |
| :--- | :--- | :--- | :--- |
| **H1** | `Connecting Your Business To The World` | Hero Section | [`components/home/HomeHeroSection.tsx:129`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/HomeHeroSection.tsx#L129) |
| **H3** | `Sea Freight` | Hero Service Card 1 | [`components/home/HomeHeroSection.tsx:274`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/HomeHeroSection.tsx#L274) |
| **H3** | `Land Transport` | Hero Service Card 2 | [`components/home/HomeHeroSection.tsx:274`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/HomeHeroSection.tsx#L274) |
| **H3** | `Customs Clearance` | Hero Service Card 3 | [`components/home/HomeHeroSection.tsx:274`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/HomeHeroSection.tsx#L274) |
| **H2** | `Why Choose Sama?` | Why Choose Section | [`components/home/WhyChooseSection.tsx:27`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/WhyChooseSection.tsx#L27) |
| **H3** | `Global Coverage` | Why Choose Feature 1 | [`components/home/WhyChooseSection.tsx:39`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/WhyChooseSection.tsx#L39) |
| **H3** | `Cargo Safety` | Why Choose Feature 2 | [`components/home/WhyChooseSection.tsx:39`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/WhyChooseSection.tsx#L39) |
| **H3** | `Custom Solutions` | Why Choose Feature 3 | [`components/home/WhyChooseSection.tsx:39`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/WhyChooseSection.tsx#L39) |
| **H3** | `Certified Quality` | Why Choose Feature 4 | [`components/home/WhyChooseSection.tsx:39`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/WhyChooseSection.tsx#L39) |
| **H2** | `Your Strategic Partner for Integrated Logistics Solutions` | About Preview Section | [`components/home/AboutPreviewSection.tsx:81`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/AboutPreviewSection.tsx#L81) |
| **H2** | `Leadership Team` | Team Section | [`components/home/TeamSection.tsx:121`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L121) |
| **H3** | `Ahmed Khoder` | Team Member 1 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Mohammed Khoder` | Team Member 2 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Ali Khoder` | Team Member 3 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Salma Jamal` | Team Member 4 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Ayat Ashour` | Team Member 5 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Aya Gabr` | Team Member 6 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Amr Nagep` | Team Member 7 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Mohamed Abd Menaem` | Team Member 8 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H3** | `Omar Amine` | Team Member 9 | [`components/home/TeamSection.tsx:66`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/TeamSection.tsx#L66) |
| **H2** | `We Reach Everywhere` | World Map Section | [`components/WorldMapVisualization.tsx:1550`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/WorldMapVisualization.tsx#L1550) |
| **H2** | `Ready to Start Your Shipment?` | CTA Section | [`components/home/CTASection.tsx:22`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/components/home/CTASection.tsx#L22) |

### Heading Hierarchy Structural Analysis:
1. **Skipped Heading Level in Hero:** In the Hero section, three cards use `<h3>` tags (`Sea Freight`, `Land Transport`, `Customs Clearance`) immediately after `<h1>` without any parent `<h2>`.
2. **Dilution from 9 Team Member H3s:** 9 individual names are tagged as `<h3>`. While nested under `<h2>Leadership Team`, having 9 personal names as primary subheadings on the Homepage dilutes keyword prominence away from logistics services.
3. **No H4 Headings:** There are no H4 headings on the page, keeping the depth moderate.

---

## 4. English Search Intent

- **Primary Intent:** **Navigational Brand Hub & High-Level Corporate Discovery**  
  Users searching for "SAMA Logistics" or "Sama Logistics Egypt" expecting to find the official company homepage, verify legitimacy, check credentials, and get in touch.
- **Secondary Intent:** **B2B Service Investigation**  
  Importers, exporters, and manufacturers in Egypt and the MENA region exploring integrated logistics solutions (ocean freight, customs clearance, land trucking).

---

## 5. English Keyword Coverage

| Keyword Theme | Classification | Evidence in Actual Current Content |
| :--- | :--- | :--- |
| **SAMA Logistics / SAMA Logistic** | **Strongly Supported** | Title tag, meta description, schema, "Why Choose Sama?", about preview, team section, client marquee, footer. |
| **logistics company in Egypt** | **Partially Supported** | Present in title tag ("... Transport Egypt") and about section ("logistics services to the Egyptian and Arab markets"). Exact phrase "logistics company in Egypt" is not in body copy. |
| **logistics company in Port Said** | **Partially Supported** | Present in meta description ("from Port Said, Egypt"), JSON-LD schema, and image alt text. Absent from visible English body headings and text. |
| **shipping company in Egypt** | **Partially Supported** | Keywords tag, JSON-LD descriptions, and CTA ("Ready to Start Your Shipment?"). Explicit phrase not prominent in body. |
| **freight forwarding company in Egypt** | **Partially Supported** | Present in Title tag and Meta description. In visible copy, only "freight" appears ("Sea, Air & Land Freight", "Sea Freight"). |
| **freight forwarder Port Said** | **Not Sufficiently Supported** | Present only in metadata/alt. The combination "freight forwarder Port Said" does not appear in visible body text. |
| **container transport Egypt** | **Partially Supported** | Prominent in Title tag and Meta description. In hero card: "Container transport via global port network". |
| **container transport Port Said** | **Partially Supported** | In meta description and HeroSlideshow fallback alt. Not in visible body copy. |
| **customs clearance Egypt** | **Partially Supported** | In meta description, hero card ("Customs Clearance"), and about features ("Fast Customs Clearance"). |
| **maritime / sea freight Egypt** | **Partially Supported** | Hero card has "Sea Freight", About preview has "Sea, Air & Land Freight", World Map has global ports. |
| **logistics services Egypt** | **Partially Supported** | "Your Strategic Partner for Integrated Logistics Solutions", "outstanding logistics services to the Egyptian and Arab markets". |

---

## 6. English Keyword Cannibalization

| Comparison Page | Homepage Search Intent | Target Page Search Intent | Overlapping Topics | Is Overlap Cannibalization? | Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/about`** | Brand overview, quick trust signals, contact routing. | Corporate history, executive vision, mission, accreditations, corporate governance. | Company history ("Since 2000"), leadership team. | **NO.** Natural parent-to-detail relationship. Homepage has high-level summary and links to `/about`. | None. |
| **`/services`** | Overview hub of 3 core pillars (Sea, Land, Customs). | Complete catalog of all logistics services with sub-service filters. | Service names ("Sea Freight", "Land Transport", "Customs Clearance"). | **NO.** Homepage cards link directly to service detail endpoints. | None. |
| **`/services/container-transport`** | Broad multi-modal freight capability in Egypt. | Specialized container trucking, fleet specs, reefer transport, port container haulage. | "Container Transport Egypt" in metadata. | **NO.** Homepage is broad brand umbrella; the landing page is deep transactional. | None. |
| **`/services/marble-transport`** | Mention of general cargo / industry partners. | High-intent niche marble and granite export transport from Shaq El-Thoban. | Client marquee shows stone clients. | **NO.** Distinct intents; marble transport is not indexed on homepage copy. | None. |
| **`/services/industrial-transport`** | General logistics overview. | Factory logistics and industrial heavy cargo containerization. | Industrial partners in marquee. | **NO.** No keyword clash. | None. |

---

## 7. English Local SEO

### Current Strengths:
1. **Meta Description:** Explicitly states `"from Port Said, Egypt"`.
2. **Structured Data (JSON-LD):** Contains full verified Port Said postal address (`7 أبراج أرض الجولف، حي الشرق`, `Port Said`, `EG`), exact GPS coordinates (`31.2509721, 32.2930159`), and Google Maps link.
3. **HTML Title Tag:** Explicitly anchors the country `"Egypt"`.

### Current Gaps / Deficiencies:
1. **Zero Visible Mentions of "Port Said" in English Body Text:**
   While Port Said is the company's operational headquarters, "Port Said" is 100% absent from all visible English headings, paragraphs, and badges on the Homepage. It only exists in image alt text and metadata.
2. **No Port Entities Named in Body Copy:**
   Major operational gateways (Port Said Port, East Port Said Port, Damietta Port, Alexandria Port, Sokhna Port) are not mentioned in the English homepage body copy.

---

## 8. English Image ALT Audit

| Image Element | Current ALT Attribute | Language-Aware? | Assessment |
| :--- | :--- | :--- | :--- |
| **Hero Fallback Image** | `Freight and container transport in Port Said — SAMA Logistics` | ✅ Yes | **GOOD** (Descriptive, branded, localized) |
| **Hero Dynamic Slides** | `Freight shipping and logistics operations — SAMA Logistics` (or slide-specific English title) | ✅ Yes | **GOOD** (Descriptive fallback) |
| **Client Marquee Logos (40+)** | `{client.name}` (e.g. `ABYDOS STONE FOR MARBLE AND GRANITE`) | ✅ Yes | **GOOD** (Accurately names partner brand) |
| **About Preview Image Carousel** | `SAMA Logistics operations — Port Said, Egypt` | ✅ Yes | **GOOD** (Descriptive, branded, localized) |
| **Team Member Avatars (9)** | `{member.nameEn}` (e.g. `Ahmed Khoder`, `Mohammed Khoder`) | ✅ Yes | **GOOD** (Accurately names individual) |

- **Missing ALTs:** 0
- **Misleading ALTs:** 0
- **Verdict:** All images on the English homepage have descriptive, language-aware alt tags.

---

## 9. English Internal Linking

| Section | Target Link | Anchor Text / Element | Status | Discoverability |
| :--- | :--- | :--- | :--- | :--- |
| **Hero CTA** | `/contact?tab=quote` | `"Get a Quote"` | Working | High conversion intent |
| **Hero CTA** | `/services` | `"Our Services"` | Working | Routes to service hub |
| **Hero Card 1** | `/services/sea-freight` | `"Sea Freight"` | Working | Deep dynamic service link |
| **Hero Card 2** | `/services/container-transport` | `"Land Transport"` | Working | Direct link to dedicated container page |
| **Hero Card 3** | `/services/customs-clearance` | `"Customs Clearance"` | Working | Deep dynamic service link |
| **About Preview** | `/about` | `"Learn More About Us"` | Working | Direct link to about page |
| **CTA Section** | `/contact` | `"Contact Us Now"` | Working | Direct link to contact page |
| **CTA Section** | `/services` | `"View Services"` | Working | Secondary link to services hub |

---

## 10. Structured Data (JSON-LD)

- **Organization Schema:** Present via `components/JsonLd.tsx`. Contains official name, alternateName, URL, logo, email, founding date (2000), telephone numbers, and social profiles.
- **LocalBusiness Schema:** Present via `components/JsonLd.tsx`. Contains exact physical address in Port Said, geo-coordinates, priceRange, opening hours, Google Maps link.
- **Service Schema:** Present via `components/JsonLd.tsx`. Catalog includes Sea Freight, Air Freight, Land Transport, Customs Clearance.
- **WebSite Schema:** Present.
- **BreadcrumbList Schema:** Present.  
  *Observation:* Position 1 name is hardcoded as `'الرئيسية'` in `components/JsonLd.tsx:189` rather than dynamically displaying `'Home'` for English visitors.

---

## 11. English Content Quality

- **Clarity & Tone:** Professional corporate B2B logistics tone. Concise sentences and clear value propositions.
- **Trust Signals:** Prominent display of 25+ years experience, 50+ global ports, 100K+ successful shipments, ISO quality assurance certification, and executive team.
- **Company Credibility:** Real leadership portraits and verified LinkedIn profiles of founders and department heads.
- **Identified Improvement Area (Proposal Only — Not Implemented):**
  - Current Hero H1:  
    `Connecting Your Business To The World`
  - Proposed Alternative (Proposal Only):  
    `Connecting Your Business To The World | Integrated Logistics in Egypt`  
    *or updating the badge/subtitle to explicitly include "Port Said & Egyptian Ports".*

---

## 12. Issues by Priority

| Issue | Type | Priority | Necessary / Optional | Proposed Action |
| :--- | :--- | :--- | :--- | :--- |
| **Twitter Metadata Language Mismatch** | Social Metadata | **Medium** | **Necessary** | When English cookies/headers are active, inject English `twitter:title` and `twitter:description` in `generateMetadata()` instead of falling back to Arabic layout defaults. |
| **Open Graph Locale Mismatch** | Social Metadata | **Low** | **Optional** | Set `openGraph.locale: 'en_US'` for English rather than inheriting `'ar_EG'`. |
| **H1 Keyword Relevance** | On-Page SEO | **Medium** | **Optional** | Enhance the visible H1 or hero subtitle to include commercial logistics keywords rather than a purely generic marketing slogan. |
| **Hero Heading Level Skip (H1 -> H3)** | Heading Hierarchy | **Low** | **Optional** | Elevate hero service cards to `<h2>` or wrap them semantically to avoid skipping heading levels. |
| **Port Said Visibility in English Body** | Local SEO | **Medium** | **Optional** | Introduce mention of "Port Said" into visible English body copy (e.g. in About preview description). |
| **Breadcrumb Schema English Label** | Structured Data | **Low** | **Optional** | Update `JsonLd.tsx` so `BreadcrumbList` outputs `'Home'` instead of hardcoded `'الرئيسية'` when viewed in English. |

---

## 13. Proposed Changes — NOT IMPLEMENTED

### Proposal 1: Twitter Metadata in `app/page.tsx` (Necessary)
```tsx
// PROPOSAL ONLY — NOT IMPLEMENTED
twitter: {
    card: 'summary_large_image',
    title: isArabic 
        ? 'سما لوجستيك | شحن وتخليص جمركي ونقل حاويات في مصر' 
        : 'SAMA Logistics | Freight Forwarding & Logistics in Egypt',
    description: isArabic 
        ? 'خدمات احترافية في نقل الحاويات والشحن والتخليص الجمركي في بورسعيد.' 
        : 'Leading freight forwarder and container transport specialist based in Port Said, Egypt with 25+ years of operational experience.',
}
```
- **Rationale:** Prevents Twitter/X shares of the English homepage from displaying Arabic titles and descriptions.
- **Benefit:** Increases social CTR and brand trust for international clients.
- **Risk:** None.

### Proposal 2: Dynamic Breadcrumb Schema in `components/JsonLd.tsx` (Optional)
- Switch `'الرئيسية'` to `'Home'` when English language context is active.

---

## 14. Final Recommendation

The English Homepage is technically sound, with an excellent HTML Title and Meta Description, pristine image alt tagging, full structured data, and zero 404 links.

The primary actionable fixes are:
1. **Fix Twitter Card Metadata:** Add language-aware English Twitter metadata to `app/page.tsx` to stop displaying Arabic cards on English shares.
2. **Local SEO Visibility:** In future content updates, organically integrate "Port Said" into visible English body paragraphs.

---

## 15. Scope Verification

- **Files modified:** 0
- **Metadata changes executed:** 0
- **Visible text changes executed:** 0
- **Arabic changes:** 0
- **Database commands executed:** 0
- **Package changes:** 0
- **Git mutations executed:** 0
- **Changes outside the English Homepage audit:** 0
