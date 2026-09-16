# تقرير تدقيق الـ SEO الشامل للموقع (SEO Audit Report)
### مشروع: SAMA Logistics
**التقنية:** Next.js 14 (App Router) | TypeScript | Tailwind CSS | Prisma
**تاريخ التدقيق:** سبتمبر 2026

---

## الفهرس
1. [إعدادات الـ SEO العامة (Global SEO)](#1-global-seo)
2. [فحص الصفحات العامة صفحة بصفحة (Page-by-Page SEO)](#2-page-by-page-seo)
3. [البيانات المنظمة (Structured Data / JSON-LD)](#3-structured-data--json-ld)
4. [خريطة الموقع (Sitemap)](#4-sitemap)
5. [ملف التوجيه والعناكب (Robots.txt)](#5-robotstxt)
6. [بنية الروابط والكانونيكال (URL & Canonical Structure)](#6-url--canonical-structure)
7. [جودة المحتوى وهيكلة العناوين (Content SEO)](#7-content-seo)
8. [الصور والوسائط (Images & Media)](#8-images--media)
9. [الربط الداخلي (Internal Linking)](#9-internal-linking)
10. [الـ SEO التقني (Technical SEO)](#10-technical-seo)
11. [الجاهزية لمحركات البحث وجوجل (Google Search / Indexing)](#11-google-search--indexing)
12. [خريطة تطبيق الـ SEO (Implementation Map)](#12-seo-implementation-map)
13. [قائمة الأولويات والتوصيات (Priority Action List)](#13-priority-list)
14. [الخلاصة والتقييم النهائي (Final Verdict)](#14-final-verdict)

---

## 1. Global SEO

تم فحص ملف الـ Root Layout الأساسي في `app/layout.tsx` ومكون الـ Viewport وملفات الأصول العامة:

* **العنوان (Title):**
  * مُهيأ بنمط Template:
    * `default: 'SAMA Logistics'`
    * `template: '%s | SAMA Logistics'`
* **الوصف التعريفي (Meta Description):**
  * ثنائي اللغة (عربي وإنجليزي):
    > *"شركة سما لوجستيك - خدمات الشحن البحري والجوي والبري والتخليص الجمركي. نوصل أعمالك للعالم بأمان وسرعة. خدمة على مدار الساعة في مصر والشرق الأوسط. Sama Logistics - Premium shipping and customs clearance solutions."*
* **الكلمات المفتاحية (Keywords):**
  * مصفوفة تضم 9 كلمات عربية و11 كلمة إنجليزية (شحن بحري، تخليص جمركي، freight forwarding، logistics Egypt، إلخ).
* **النطاق الأساسي (metadataBase):**
  * `new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://samalogistics.com')`
* **الرابط الكانونيكال الأساسي (Canonical):**
  * `alternates.canonical: 'https://samalogistics.com'`
* **توجيه الروبوتات (Robots):**
  * `index: true, follow: true` مع إعدادات متقدمة لـ Googlebot:
    * `max-video-preview: -1`, `max-image-preview: 'large'`, `max-snippet: -1`
* **Open Graph (OG):**
  * النوع: `website`
  * اللغة الأساسية: `ar_EG`، والبدائل: `['en_US', 'en_GB']`
  * الصورة المحددة: `/og-image.jpg` (1200×630).
  * ⚠️ **ملاحظة فنية:** ملف `/og-image.jpg` **غير موجود فعلياً** في مجلد `public/` (يُرجع 404).
* **بطاقات تويتر (Twitter / X Cards):**
  * النوع: `summary_large_image`
  * الحساب: `@SamaLogistics`
  * الصورة: `['/twitter-image.jpg']`.
  * ⚠️ **ملاحظة فنية:** ملف `/twitter-image.jpg` **غير موجود فعلياً** في `public/` (يُرجع 404).
* **الأيقونات والمانيفست (Favicon / Icons / Manifest):**
  * الأيقونة: `/icons/icon.png?v=5` بأحجام متعددة (any, 192x192, 512x512) و Apple Touch Icon بحجم 180x180.
  * المانيفست: `/site.webmanifest` (موجود فعلياً).
* **اللغة والاتجاه (Language & dir / RTL):**
  * `<html lang="ar" dir="rtl" suppressHydrationWarning>` في `app/layout.tsx`.
* **الروابط البديلة للغات (Alternates / Hreflang):**
  * محدد في الكود:
    * `ar-EG`: `https://samalogistics.com/ar`
    * `en-US`: `https://samalogistics.com/en`
  * ⚠️ **خطأ حرج (Critical Bug):** مسارات `/ar` و `/en` **غير موجودة في المشروع** نهائياً؛ فالموقع يعتمد على الكوكيز وحالة التطبيق للتبديل بين اللغتين، وتوجيه جوجل لهذه المسارات يتسبب في أخطاء 404 Crawl Errors.
* **وسوم التحقق (Verification Tags):**
  * `google: 'google-site-verification-code'` (قيمة تجريبية وهمية Dummy Placeholder).
* **المؤلف والناشر (Author & Publisher):**
  * `Sama Logistics`.
* **إعدادات الشاشة (Viewport & Theme Color):**
  * مُهيأ داخل `export const viewport`:
    * النمط الفاتح: `#0369a1` | النمط الداكن: `#0c4a6e`
    * `width: 'device-width', initialScale: 1, maximumScale: 5`

---

## 2. Page-by-Page SEO

### 1) الصفحة الرئيسية (Homepage) — `/`
* **الملف:** `app/page.tsx`
* **النوع:** Server Component مع ISR (`revalidate = 300`).
* **Title:** ديناميكي عبر `generateMetadata()`:
  * عربي: *"سما لوجيستك | شحن وتخليص جمركي ونقل حاويات في مصر"*
  * إنجليزي: *"SAMA Logistics | Freight Forwarding & Container Transport Egypt"*
* **Meta Description:** محدد بدقة باللغتين.
* **Canonical:** يرث إعداد الـ Root Layout (`https://samalogistics.com`).
* **Robots:** `index: true, follow: true`.
* **Open Graph:** مخصص بنوع `website`.
* **H1:** عنصر `<motion.h1>` وحيد في `components/home/HomeHeroSection.tsx:129`. النص الافتراضي: *"نوصل أعمالك إلى العالم"* / *"Connecting Your Business To The World"*.
* **هيكل H2:** عناوين أقسام واضحة ومتسلسلة (`ServicesSection`, `AboutSection`, `StatsSection`, إلخ).
* **Alt الصور:** جيدة مع استخدام دوال توليد الـ Alt التلقائية.
* **البيانات المنظمة:** ترث السكيما العامة من `components/JsonLd.tsx`.

---

### 2) صفحة من نحن — `/about`
* **الملفات:** `app/about/page.tsx` (Client Component) و `app/about/layout.tsx` (Server Layout).
* **النوع:** Hybrid (Client Page داخل Server Layout).
* **Title:** ديناميكي في `layout.tsx`:
  * عربي: *"من نحن — شحن وتخليص جمركي منذ 2000"*
  * إنجليزي: *"About — Freight & Customs Experts Since 2000"*
* **Meta Description:** محدد باللغتين بدقة.
* **Canonical:** ⚠️ **مفقود في `layout.tsx`**، مما يجعله يرث رابط الرئيسية `https://samalogistics.com`!
* **Robots:** `index: true, follow: true`.
* **H1:** عنصر `<motion.h1>` وحيد في `app/about/page.tsx:336`.
* **هيكل H2:** ممتاز (الرؤية والرسالة، مسيرة الشركة، فريق العمل، الاعتمادات).
* **البيانات المنظمة:** تفتقر لسكيما مخصصة من نوع `AboutPage`.

---

### 3) صفحة اتصل بنا — `/contact`
* **الملفات:** `app/contact/page.tsx` (Client Component) و `app/contact/layout.tsx` (Server Layout).
* **Title:** ديناميكي في `layout.tsx`:
  * عربي: *"اطلب عرض سعر — شحن وتخليص جمركي من بورسعيد"*
  * إنجليزي: *"Request a Freight Quote — Shipping & Customs in Port Said"*
* **Meta Description:** محفز للتحويلات وعروض الأسعار.
* **Canonical:** ⚠️ **مفقود في `layout.tsx`** (يرث الرئيسية).
* **H1:** `<h1 ...>` في `app/contact/page.tsx:34` ("تواصل معنا").
* **البيانات المنظمة:** تفتقر لسكيما `ContactPage`.

---

### 4) صفحة فهرس التوظيف — `/careers`
* **الملفات:** `app/careers/page.tsx` (Client Component) و `app/careers/layout.tsx` (Server Layout).
* **Title:** ديناميكي في `layout.tsx`:
  * عربي: *"وظائف في الشحن واللوجستيات — بورسعيد"*
  * إنجليزي: *"Logistics & Shipping Jobs in Port Said"*
* **Meta Description:** محدد باللغتين لفرص العمل.
* **Canonical:** ⚠️ **مفقود في `layout.tsx`**.
* **H1:** `<motion.h1>` في `app/careers/page.tsx:185`.
* **البيانات المنظمة:** ترث السكيما العامة فقط.

---

### 5) صفحة تفاصيل الوظيفة الفردية — `/careers/[id]`
* **الملف:** `app/careers/[id]/page.tsx`
* **النوع:** `'use client'` بالكامل (بدون Server Component وبدون Layout خاص بها).
* **Title:** ⚠️ **يرث عنوان الفهرس العام من `app/careers/layout.tsx`** ("وظائف في الشحن واللوجستيات — بورسعيد") بدلاً من اسم الوظيفة الفعلي!
* **Meta Description:** ⚠️ يرث الوصف العام للتوظيف.
* **Canonical:** مفقود تماماً.
* **H1:** `<h1 ...>` في السطر 140 يعرض اسم الوظيفة (`job.titleAr` أو `job.titleEn`).
* **البيانات المنظمة:** ⚠️ **مفقود سكيما `JobPosting` بالكامل**، مما يحرم الموقع من الظهور في خدمة Google for Jobs.

---

### 6) صفحة فهرس الخدمات — `/services`
* **الملف:** `app/services/page.tsx`
* **النوع:** Server Component مع ISR (`revalidate = 300`).
* **Title:** ديناميكي:
  * عربي: *"خدمات النقل اللوجستي ونقل الحاويات في بورسعيد"*
  * إنجليزي: *"Freight, Customs & Transport Services in Port Said"*
* **Meta Description:** شامل للخدمات البحرية والبرية والتخليص.
* **Canonical:** ✅ محدد صراحة: `https://samalogistics.com/services`.
* **H1:** `<motion.h1>` في `app/services/ServicesPageClient.tsx:190`.
* **الصور:** وسم `<img src={cargoBg} alt="" ... />` في السطر 508 يحمل نص Alt فارغ.

---

### 7) الصفحات المقصودة لخدمات الشحن المتخصصة (Landing Pages)
1. **نقل الحاويات:** `app/services/container-transport/page.tsx`
2. **نقل الرخام والجرانيت:** `app/services/marble-transport/page.tsx`
3. **نقل القطاع الصناعي والمصانع:** `app/services/industrial-transport/page.tsx`
* **النوع:** Server Components مع ISR (`revalidate = 300`).
* **Title & Description:** فائقة الاستهداف المحلي (بورسعيد، شق الثعبان، العاشر من رمضان، 6 أكتوبر).
* **Canonical:** ✅ محدد صراحة في كل صفحة على حدة.
* **H1:** عنصر `<motion.h1>` وحيد ومضبوط.
* **هيكل H2/H3:** محتوى غني جداً يضم مواصفات الحاويات والأسطول والأسئلة الشائعة FAQ.
* **البيانات المنظمة:** تحتوي على دالة `getSchemaJsonLd` تضخ: `Service`, `BreadcrumbList`, و `FAQPage`.
* ⚠️ **ملاحظة:** يحدث تضارب (Schema Conflict) مع السكيما العامة المحقونة في الـ Root Layout.

---

### 8) صفحة تفاصيل الخدمة العامة الديناميكية — `/services/[slug]`
* **الملف:** `app/services/[slug]/page.tsx`
* **النوع:** Server Component مع `generateMetadata({ params })` متصل بـ Prisma.
* **Title:** ديناميكي من قاعدة البيانات (`service.titleAr || service.titleEn`).
* **Meta Description:** مقتبس من `service.shortDescAr || service.shortDescEn`.
* **Canonical:** ⚠️ **مفقود تماماً**.
* **H1:** عنصر H1 وحيد ومضبوط (تبادلي حسب وجود صورة الهيرو بالسطور 144 / 170).
* **الصور:** استخدام وسم `<img>` كلاسيكي بدلاً من `<Image />` في السطر 123.
* **البيانات المنظمة:** ⚠️ **لا يوجد سكيما `Service` لهذه الخدمات الديناميكية**.

---

### 9) صفحة فهرس المدونة — `/blog`
* **الملفات:** `app/blog/page.tsx` (Client Component) و `app/blog/layout.tsx` (Server Layout).
* **Title:** ديناميكي في `layout.tsx`:
  * عربي: *"نصائح الشحن ودليل التخليص الجمركي في مصر"*
  * إنجليزي: *"Shipping Tips & Freight Guides in Egypt"*
* **Meta Description:** مخصص لأدلة التخليص الجمركي والشحن.
* **Canonical:** ⚠️ **مفقود في `layout.tsx`**.
* **H1:** `<motion.h1>` في السطر 207.

---

### 10) صفحة المقال الفردي بالمدونة — `/blog/[slug]`
* **الملف:** `app/blog/[slug]/page.tsx`
* **النوع:** Server Component مع `generateMetadata`.
* **Title:** ديناميكي من عنوان المقال (`post.titleAr || post.titleEn`).
* **Meta Description:** مقتبس ومُنظف من أول 160 حرفاً من نص المقال.
* **Canonical:** ⚠️ **مفقود تماماً**.
* **Open Graph:** نوع `article` مع `publishedTime`، `authors`، وصورة المقال.
* **H1:** `<h1 ...>` في `BlogPostClient.tsx:49`.
* **البيانات المنظمة:** ⚠️ **مفقود سكيما `Article` أو `BlogPosting` بالكامل**.

---

### 11) صفحات المصادقة (Auth Pages) — `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`
* محظورة في `app/robots.ts` عبر مسار `/auth/`، لكنها تفتقر إلى وسم `noindex` في الميتاداتا لمنع فهرستها قطعياً في حال وُجدت روابط خارجية لها.

---

## 3. Structured Data / JSON-LD

### فحص المكون الأساسي `components/JsonLd.tsx`:
المكون يعمل في العميل (`'use client'`) ويُحقن في `app/layout.tsx` ليظهر في **كافة صفحات الموقع**.
يضم حالياً 6 كائنات سكيما ثابتة:

1. **Organization Schema:**
   * الاسم: `سما لوجستيك | Sama Logistics`
   * الشعار: `https://samalogistics.com/logo.png` (⚠️ غير موجود بهذا المسار).
   * سنة التأسيس: 2000
   * العنوان: شارع التحرير، القاهرة، 11511، مصر.
   * أرقام الاتصال: أرقام تجريبية غير حقيقية (`+20-2-12345678`).
   * الروابط الاجتماعية الموثقة (`sameAs`):
     * Facebook: `https://www.facebook.com/Samallogseg/`
     * LinkedIn: `https://www.linkedin.com/company/sama-logistic`
     * Twitter: `https://twitter.com/samalogistics`
     * Instagram: `https://www.instagram.com/samalogistics`
   * النطاق الجغرافي: `GeoCircle` بنصف قطر 5000 كم متمركز حول القاهرة.
2. **LocalBusiness Schema:**
   * المعرف: `https://samalogistics.com/#localbusiness`
   * ساعات العمل: من الأحد إلى الخميس من 08:00 إلى 18:00.
3. **Service Schema:**
   * قائمة خدمات OfferCatalog تضم 4 خدمات أساسية (بحري، جوي، بري، تخليص جمركي).
4. **FAQPage Schema:**
   * 4 أسئلة شائعة ثابتة عن أنواع الشحن والتتبع والتغطية والتخليص.
5. **WebSite Schema:**
   * يتضمن قالب بحث `SearchAction` يستهدف: `https://samalogistics.com/search?q={search_term_string}`.
   * ⚠️ مسار `/search` غير موجود في الموقع (يعطي 404).
6. **BreadcrumbList Schema:**
   * يحتوي على عنصر واحد فقط: `"الرئيسية"` -> `https://samalogistics.com`.

### مشكلة تكرار السكيما (Duplication & Conflict):
* في صفحات خدمات النقل الثلاث، يتم حقن سكيما صفحة خاصة (Service, Breadcrumbs, FAQ).
* النتيجة: تحتوي تلك الصفحات على نسختين من الـ Breadcrumbs ونسختين من الـ FAQPage مما يربك عناكب محركات البحث.

### السكيما المفقودة في المشروع:
* ❌ سكيما `Article` أو `BlogPosting` للمقالات.
* ❌ سكيما `JobPosting` للوظائف.
* ❌ سكيما `Service` للصفحات الديناميكية `/services/[slug]`.
* ❌ سكيما `ContactPage` و `AboutPage`.

---

## 4. Sitemap

يوجد تطبيقان لخريطة الموقع في المشروع:

1. **المولد الديناميكي لـ Next.js (`app/sitemap.ts`):**
   * كود نظيف ومتصل بقاعدة بيانات Prisma مباشرة.
   * يجلب المقالات المنشورة والخدمات النشطة والوظائف النشطة والصفحات الثابتة.
   * ⚠️ **خلل داخلي في السطر 106:** يولد روابط الوظائف بالصيغة:
     `${baseUrl}/careers?job=${job.id}`
     بدلاً من المسار الفعلي المنفصل في المشروع:
     `${baseUrl}/careers/${job.id}`!

2. **الملف الثابت القديم (`public/sitemap.xml`):**
   * ⚠️ **تعارض حرج (Critical Conflict):** وجود ملف ثابت باسم `sitemap.xml` داخل مجلد `public/` يرجع تاريخه لديسمبر 2024.
   * في خوادم Next.js، أي ملف ثابت في `public/sitemap.xml` يتجاوز ويعطل المولد الديناميكي `app/sitemap.ts`!
   * الملف الثابت يضم روابط وهمية (`/profile`) وروابط لغات غير موجودة (`/ar`, `/en`)، ويحجب المقالات والخدمات الجديدة تماماً عن محركات البحث.

---

## 5. Robots.txt

يوجد تطبيقان متعارضان لملف الروبوت:

1. **الملف الثابت (`public/robots.txt`):**
   * هو الملف النشط حالياً لأنه موجود في `public/`.
   * يحظر: `/admin/`، `/dashboard/`، `/api/`، `/_next/`، `/private/`.
   * ⚠️ **الأخطاء:**
     * يشير لخرائط غير موجودة: `sitemap-ar.xml` و `sitemap-en.xml` (404).
     * يحظر عناكب التحليل وفحص الروابط الخلفية: `AhrefsBot`, `SemrushBot`, `MJ12bot`.
2. **المولد الديناميكي (`app/robots.ts`):**
   * مكتوب بشكل رسمي متوافق مع Next.js ويشير لخريطة الموقع الصحيحة ويحظر لوحة التحكم ومسارات المصادقة.

---

## 6. URL & Canonical Structure

* **الشرطة المائلة في النهاية (Trailing Slash):** غير مفعلة (السلوك الافتراضي لـ Next.js بدون سلاش في النهاية: `/about`).
* **روابط الكانونيكال (Canonicals):**
  * معرفة في: الرئيسية، فهرس الخدمات، وصفحات خدمات النقل الثلاث.
  * **مفقودة تماماً في:** `/about`, `/contact`, `/careers`, `/careers/[id]`, `/blog`, `/blog/[slug]`, `/services/[slug]`.
  * **المخاطرة:** جميع الصفحات التي لا تعرف كانونيكال خاصاً بها ترث تلقائياً كانونيكال الـ Root Layout (`https://samalogistics.com`)، مما قد يدفع جوجل للتعامل معها كصفحات مكررة من الرئيسية وتجاهل فهرستها.
* **إعادة التوجيه (Redirects / WWW / HTTPS):**
  * لا توجد قواعد لإجبار التحويل من `http` إلى `https` أو من `www` إلى `non-www` داخل التطبيق نفسه؛ الاعتماد الحالي كلياً على خادم الويب الخارجي (Nginx / Cloudflare).

---

## 7. Content SEO

* **جودة العناوين (Titles):**
  * العناوين المكتوبة ممتازة وجذابة ومستهدفة محلياً، باستثناء صفحة الوظيفة الفردية التي ترث عنوان الفهرس العام.
* **هيكلية H1:**
  * تم التأكد من وجود وسم `<h1>` واحد فقط في كل صفحة عامة من صفحات الموقع دون أي تكرار.
  * عنوان H1 بالرئيسية *"نوصل أعمالك إلى العالم"* تسويقي، ويُفضل تدعيمه بكلمات لوجستية رئيسية.
* **المحتوى النحيف (Thin Content):**
  * صفحات النقل الثلاث غنية جداً بالمعلومات، بينما صفحة تفاصيل الخدمة العامة تعتمد على ما يتم إدخاله في الـ CMS.
* **دعم اللغة العربية والإنجليزية (RTL / LTR):**
  * التطبيق يدعم اللغتين بنظام ممتاز، ونصوص الميتاداتا في الـ Layouts تتحقق من كوكي اللغة `language` و `accept-language` عبر الخادم لتقديم العنوان والوصف المناسبين للمستخدم.

---

## 8. Images & Media

* **الخلط بين `<Image />` و `<img>`:**
  * يتم استخدام وسم `<img>` الكلاسيكي بدون تحسين Next.js في مكونات تفاصيل المقال، تفاصيل الخدمة، قسم فريق العمل، وشريط الشركاء.
* **نصوص الـ Alt:**
  * وجود وسم `alt=""` فارغ في `ServicesPageClient.tsx:508`.
  * باقي الصور تستخدم أسماء العناصر أو نصوصاً وصفية مقبولة.
* **ملفات وسائط الـ SEO المفقودة:**
  * `/og-image.jpg` غير موجود في `public/`.
  * `/twitter-image.jpg` غير موجود في `public/`.
  * الشعار المذكور في السكيما (`/logo.png`) غير موجود بهذا الاسم.

---

## 9. Internal Linking

* **شريط التنقل العلوي (Navbar):** يربط كل الأقسام الرئيسية بسلاسة.
* **التذييل (Footer):** يربط كل الصفحات، وتوليد قائمة الخدمات يتم عبر API Client-Side مع Fallback صلب.
* **مسارات التنقل (Breadcrumbs):** متوفرة بصرياً ومدعومة بـ Schema.org Microdata في صفحات الخدمات.
* **الصفحات المعزولة (Orphan Pages):**
  * صفحات الوظائف الفردية `/careers/[id]` معزولة إلى حد كبير بسبب خطأ رابط الـ Sitemap وعدم وجود روابط داخلية كافية تشير إليها.

---

## 10. Technical SEO

* **الميتاداتا في مكونات العميل (Client Components):**
  * تم عزل الميتاداتا بنجاح في ملفات `layout.tsx` على الخادم لمعظم صفحات العميل، باستثناء صفحة تفاصيل الوظيفة `/careers/[id]` التي تحتاج إلى Layout فرعي.
* **مؤشرات أداء الويب (Core Web Vitals):**
  * يتم تحميل 5 خطوط Google Fonts في الـ Root Layout (`Inter`, `Cairo`, `Tajawal`, `Outfit`, `Rubik`) مما قد يؤثر على أوقات استجابة الخادم وزمن حجز الشبكة.
* **ملف الوسيط والأمان (`middleware.ts`):**
  * مهيأ بكفاءة عالية؛ يطبق سياسات الكاش للأصول الثابتة (سنة كاملة)، وسياسات CSP، HSTS، و X-Frame-Options.

---

## 11. Google Search / Indexing

* **Google Search Console:** غير موثق حالياً (رمز التحقق عبارة عن Dummy String).
* **خريطة الموقع لـ Google:** الزواحف تقرأ الملف الثابت القديم فقط وتحجب التحديثات.
* **Google Sitelinks Searchbox:** يوجه الزواحف لمحرك بحث `/search` غير موجود.

---

## 12. SEO Implementation Map

| المجال (Area) | الحالة الحالية | الملفات المعنية | الإيجابيات | المفقودات والعيوب | مستوى المخاطرة |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Root Metadata** | شبه مكتمل | `app/layout.tsx` | عنوان ووصف وروبوتات مهيأة بدقة | صور OG حقيقية، رمز GSC صالح | متوسط |
| **Hreflang / Alternates** | معطوب | `app/layout.tsx` | نية دعم التعدد اللغوي | مسارات اللغات `/ar` و `/en` غير موجودة | **حرج (أخطاء 404)** |
| **Sitemap** | تعارض خطير | `app/sitemap.ts`<br>`public/sitemap.xml` | مولد ديناميكي متصل بـ Prisma | إزالة الملف الثابت، وتصحيح مسار الوظائف | **حرج (حجب الفهرسة)** |
| **Robots.txt** | تعارض وتضارب | `app/robots.ts`<br>`public/robots.txt` | قواعد ممتازة في `robots.ts` | حذف الملف الثابت الذي يحظر أدوات التحليل | **عالي** |
| **Canonicals** | جزئي ومفقود | صفحات متعددة | محدد في الرئيسية وخدمات النقل | مفقود في 6 مسارات رئيسية | **عالي (تكرار كانونيكال)** |
| **Structured Data** | نشط وبه تضارب | `components/JsonLd.tsx`<br>صفحات الخدمات | بيانات منظمة غنية للمؤسسة | سكيما المقالات والوظائف، وفصل الـ FAQ | متوسط |
| **Career SEO** | ضعيف | `app/careers/[id]/page.tsx` | نموذج تقديم سريع | ميتاداتا ديناميكية وسكيما `JobPosting` | متوسط |
| **Blog SEO** | جيد وينقصه تفاصيل | `app/blog/[slug]/page.tsx` | توليد ميتاداتا ونوع Article | كانونيكال صريح وسكيما المقال | متوسط |
| **Dedicated Landings**| ممتاز جداً | مجلدات خدمات النقل الثلاثة | استهداف محلي، كانونيكال، محتوى دسم | حل تضارب السكيما مع الـ Root | منخفض |
| **Media & Images** | متوسط | ممتد عبر المكونات | استخدام WebP والأبعاد | تحويل `<img>` إلى `<Image />` وحفظ OG | متوسط |

---

## 13. Priority List

### 🔴 P0: أولوية حرجة للغاية (Critical)
1. **حل تعارض خريطة الموقع:**
   * **الملف:** `public/sitemap.xml`
   * **الإجراء:** حذف الملف الثابت القديم نهائياً لتمكين المولد الديناميكي `app/sitemap.ts`.
   * **تعديل كود:** نعم (حذف ملف) | **تعديل قاعدة بيانات:** لا.
2. **تصحيح روابط اللغات البديلة الوهمية:**
   * **الملف:** `app/layout.tsx` (السطور 135-138)
   * **الإجراء:** حذف إعداد `languages` غير المتطابق مع مسارات الموقع لتجنب أخطاء 404.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
3. **حل تعارض ملف الروبوت:**
   * **الملف:** `public/robots.txt`
   * **الإجراء:** حذف الملف الثابت والاعتماد التام على `app/robots.ts`.
   * **تعديل كود:** نعم (حذف ملف) | **تعديل قاعدة بيانات:** لا.

---

### 🟠 P1: أولوية عالية (High)
1. **تثبيت روابط الكانونيكال المفقودة:**
   * **الملفات:** layouts و pages لـ (`/about`, `/contact`, `/careers`, `/blog`, `/blog/[slug]`, `/services/[slug]`).
   * **الإجراء:** إضافة `alternates: { canonical: '...' }` داخل دالة `generateMetadata` لكل مسار لمنع وراثة رابط الرئيسية.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
2. **توليد ميتاداتا ديناميكية لصفحات الوظائف:**
   * **الملف:** `app/careers/[id]/page.tsx`
   * **الإجراء:** إضافة Server Layout يولد العنوان والوصف وسكيما `JobPosting` لكل وظيفة على حدة.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
3. **تصحيح رابط الوظائف في الـ Sitemap:**
   * **الملف:** `app/sitemap.ts` (السطر 106)
   * **الإجراء:** تعديل الرابط ليكون `${baseUrl}/careers/${job.id}`.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
4. **توفير ملفات وسائط المشاركة الاجتماعية:**
   * **المكان:** مجلد `public/`
   * **الإجراء:** وضع صورتي `/og-image.jpg` و `/twitter-image.jpg` بأبعاد 1200×630 داخل `public/`.
   * **تعديل كود:** لا | **تعديل قاعدة بيانات:** لا.

---

### 🟡 P2: أولوية متوسطة (Medium)
1. **إضافة سكيما المقالات المنظمة (Article Schema):**
   * **الملف:** `app/blog/[slug]/page.tsx`
   * **الإجراء:** حقن JSON-LD لسكيما `Article` أو `BlogPosting`.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
2. **معالجة ازدواجية وتضارب السكيما:**
   * **الملفات:** `components/JsonLd.tsx` وصفحات الخدمات المتخصصة.
   * **الإجراء:** قصر السكيما العامة في الـ Layout على المؤسسة والنشاط المحلي، وفصل الـ FAQ و Breadcrumbs للصفحات المتخصصة.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
3. **إزالة مسار البحث الوهمي من سكيما الموقع:**
   * **الملف:** `components/JsonLd.tsx`
   * **الإجراء:** إزالة خاصية `potentialAction` التابعة لمربع البحث حتى يتم برمجة صفحة بحث داخلية.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.
4. **إضافة وسم `noindex` لصفحات المصادقة:**
   * **الملفات:** صفحات `app/auth/*`.
   * **الإجراء:** تصدير `robots: { index: false, follow: false }`.
   * **تعديل كود:** نعم | **تعديل قاعدة بيانات:** لا.

---

### 🟢 P3: أولوية منخفضة (Low)
1. **تحويل وسوم `<img>` إلى Next.js `<Image />`** في المكونات المذكورة لتحسين مؤشرات LCP.
2. **تقليص عدد الخطوط المحملة** من 5 خطوط إلى خطين أساسيين لتسريع التصفح.
3. **وضع كود التحقق الحقيقي** الخاص بـ Google Search Console فور استخراجه.

---

## 14. Final Verdict

### A. ما هو منفذ بشكل ممتاز حالياً:
* بنية الصفحات المقصودة لخدمات النقل الثلاث ذات الكلمات المفتاحية المحلية.
* كود الـ Sitemap الديناميكي المتصل بـ Prisma في `app/sitemap.ts`.
* كاش الأصول الثابتة وحماية الأمان في `middleware.ts`.
* تسلسل العناوين وخلو الموقع من تكرار وسوم H1.

### B. ما هو مفقود:
* صور المعاينة الاجتماعية في مجلد `public/`.
* روابط الكانونيكال الصريحة في 6 مسارات رئيسية.
* سكيما المقالات وسكيما الوظائف المنظمة.
* الميتاداتا المستقلة لصفحات تفاصيل الوظائف.

### C. ما تم تنفيذه بشكل خاطئ:
* وجود ملفات ثابتة قديمة (`public/sitemap.xml` و `public/robots.txt`) تعطل المولدات الديناميكية وتوجه العناكب لمسارات 404.
* الإشارة لمسارات لغات غير موجودة (`/ar` و `/en`) في إعدادات Alternates.
* صياغة رابط الوظيفة كـ Query Parameter بدلاً من مسار URL مباشر في الـ Sitemap.

### D. ما يجب عدم المساس به:
* مكون `components/JsonLd.tsx` فيما يخص الـ Organization والروابط الاجتماعية `sameAs`.
* جداول وقواعد بيانات Prisma (لا تتطلب أي تعديل).
* لوحة التحكم (Dashboard) وتصميم واجهات المستخدم (UI/UX).

### E. ترتيب التنفيذ الموصى به:
1. إزالة الملفين الثابتين القديمين من `public/`.
2. تصحيح إعدادات اللغات في `app/layout.tsx` وتوفير صور الـ OG.
3. إضافة روابط الكانونيكال الناقصة وتصحيح رابط الوظائف في الـ Sitemap.
4. إضافة Layout لميتاداتا الوظائف الفردية وسكيما `JobPosting` و `Article`.
5. ضبط تضارب السكيما واستبدال وسوم الصور تدريجياً.

### F. حجم النطاق والجهد المقدر (Scope):
* **النطاق: متوسط (Medium)** — تعديلات محصورة في طبقة الـ Metadata، وحذف ملفين ثابتين متعارضين، وتحديثات JSON-LD خفيفة دون المساس بمنطق العمل أو قواعد البيانات.

---
**SEO AUDIT COMPLETE — NO FILES WERE MODIFIED.**
