# 📋 تقرير ما قبل التنفيذ: خطة تجهيز وتشغيل المشروع عبر Docker على السيرفر
### مشروع: SAMA Logistics (`sama-corser`)
**تاريخ الإعداد:** 17 سبتمبر 2026  
**المستودع:** `https://github.com/ahmed-khoder/sama-corser`

---

## 1. ملخص الهدف (Executive Summary)
المشروع جاهز ومكتمل ومرفوع على GitHub. المطلوب هو تجهيز المنظومة بالكامل لتعمل داخل بيئة حاويات **Docker & Docker Compose** على سيرفر إنتاج (VPS / Dedicated Server) بأعلى معايير الاستقرار، مع الحفاظ الكامل على:
- قاعدة بيانات SQLite المدمجة ببياناتها الحالية (مستخدمين، مقالات، خدمات، وإعدادات).
- حفظ الملفات والصور المرفوعة بشكل مستمر (Persistent Volumes).
- أداء فائق وسرعة تحميل عبر Next.js Standalone Build مع مكتبة Sharp ومكتبات Three.js.
- توفير سكربت تشغيل ونشر آلي، بالإضافة إلى دليل نشر تفصيلي يشمل إعداد الـ Reverse Proxy (Nginx) وشهادة SSL (Let's Encrypt).

---

## 2. مراجعة الوضع الحالي والثغرات المكتشفة (Audit Findings)

بعد فحص دقيق لملفات المشروع الحالية (`Dockerfile`, `docker-compose.yml`, `docker-entrypoint.sh`, `next.config.js`):

1. **ثغرة بناء Next.js بدون DATABASE_URL:**
   - ملف `app/sitemap.ts` يستدعي Prisma عند الـ Build لإنشاء خريطة الموقع.
   - حالياً في `Dockerfile` في مرحلة الـ Builder، لا يوجد تعريف لـ `DATABASE_URL` وملف `.env` مستبعد عبر `.dockerignore`.
   - **النتيجة المحتملة:** فشل أمر `npm run build` داخل الدوكر برسالة خطأ تفيد بغياب المتغير.
   - **الحل:** تمرير `ENV DATABASE_URL="file:/app/prisma/dev.db"` أثناء مرحلة البناء لضمان نجاح التجميع.

2. **دعم مكتبة Sharp مع Next.js Standalone:**
   - ملف `next.config.js` يعرّف `sharp` كـ `serverComponentsExternalPackage`.
   - في بيئة الـ Standalone، يلزم ضمان نسخ حزمة `@img` ومحركات Sharp للـ runner حتى لا تتعطل معالجة الصور ذات الامتدادات WebP/AVIF.
   - **الحل:** التأكد من تضمين `node_modules/sharp` و `node_modules/@img` داخل الـ Runner.

3. **سلامة الروابط الرمزية في `docker-entrypoint.sh`:**
   - كود حذف وإعادة إنشاء الروابط الرمزية (`rm -rf /app/public/images` متبوعاً بـ `ln -sf`) يحتاج أن يكون آمناً ومحصناً (Idempotent) حتى لا يمس محتويات الـ Volume الدائم عند إعادة تشغيل الحاوية.
   - **الحل:** فحص وتحديث التعامل مع الروابط بدقة متناهية (`[ -L ... ]`).

4. **تخصيص المنافذ والروابط عبر متغيرات البيئة:**
   - في `docker-compose.yml` البورت مثبت على `3030:3000`.
   - **الحل:** جعله مرناً `${PORT:-3030}:3000` مع إضافة متغيرات `NEXT_PUBLIC_SITE_URL` لربط الدومين الفعلي بسهولة.

---

## 3. التعديلات والملفات المستهدفة (Target Files & Changes)

### أ. الملفات التي سيتم تحديثها:
1. **`Dockerfile`:**
   - إضافة `ENV DATABASE_URL="file:/app/prisma/dev.db"` في مرحلة الـ Builder.
   - ضبط نسخ مجلدات `@img` و `sharp` لضمان عمل تحسين الصور بنسبة 100%.
2. **`docker-compose.yml`:**
   - دعم مرونة المنافذ عبر متغيرات `.env`.
   - إضافة Healthcheck لفحص صحة التطبيق تلقائياً.
   - إضافة `NEXT_PUBLIC_SITE_URL` و `NEXT_PUBLIC_BASE_URL`.
3. **`docker-entrypoint.sh`:**
   - جعل أوامر فحص وإنشاء الـ Symlinks آمنة 100% عند تكرار الإقلاع.
   - نسخ أي وسائط جديدة من صورة البناء دون الكتابة فوق الملفات الموجودة في الـ Volume.

### ب. الملفات الجديدة التي سيتم إنشاؤها:
1. **`deploy.sh`:**
   - سكربت تنفيذي على السيرفر لفحص بيئة التشغيل، وتوليد مفتاح JWT سري إذا لم يكن موجوداً، وتشغيل الدوكر بضغطة واحدة.
2. **`.env.production.example`:**
   - قالب جاهز لمتغيرات الإنتاج يحتوي على كافة المتغيرات المطلوبة مع شرح كامل لكل متغير.
3. **`NGINX_PROXY_MANAGER_GUIDE.md`:**
   - دليل مرئي بالخطوات والإعدادات المضبوطة لربط الموقع بـ **Nginx Proxy Manager (NPM)**:
     - إعدادات الـ Proxy Host (Scheme, Forward Hostname, Forward Port).
     - تفعيل **Websockets Support** (ضروري جداً لـ Next.js).
     - تفعيل **Block Common Exploits** و **Cache Assets**.
     - إعداد شهادة SSL بنقرة واحدة عبر NPM مع تفعيل Force SSL و HTTP/2.
     - طريقة ربط شبكة الدوكر مباشرة (Docker Network) أو عبر المنفذ `3030`.
4. **`DOCKER_DEPLOYMENT_GUIDE.md`:**
   - دليل التشغيل السريع والأوامر على السيرفر (سحب الريبو، التشغيل بـ Docker Compose، والصيانة الدورية).

---

## 4. قيود السلامة الصارمة (Safety Invariants)
- **قاعدة البيانات (`prisma/dev.db`):** الحفاظ الكامل على قاعدة البيانات الحالية وكافة محتوياتها من مستخدمين وبيانات SEO وخدمات ومقالات، وعدم المساس بملف `schema.prisma`.
- **التصميم والواجهات:** عدم إجراء أي تعديل على كود الواجهات أو ملفات Tailwind أو Framer Motion أو Three.js.
- **الحزم والتبعيات:** لن يتم تثبيت أي package جديدة في `package.json`.
- **التحكم في Git:** لن يتم عمل أي `git commit` أو `push` إلا بعد المراجعة والموافقة التامة.

---

## 5. خطة الفحص والتحقق (Verification Plan)
1. فحص توافق TypeScript: `npx tsc --noEmit`.
2. فحص بناء المشروع محلياً لضمان عدم وجود أخطاء في الـ standalone: `npm run build`.
3. فحص صيغة ملفات Docker: مراجعة بناء الـ Dockerfile و Docker Compose والـ Shell script بصيغة متوافقة مع أنظمة Linux POSIX (LF line endings).
4. تسليم خطة الأوامر الجاهزة للمستخدم لتنفيذها على السيرفر مباشرة.
