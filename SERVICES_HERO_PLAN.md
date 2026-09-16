# خطة تنفيذ مطابقة هيدر خدماتنا اللوجستية مع هيدر التوظيف
### Pre-Execution Plan — Services Hero Layout Refactor

---

## 1. تشخيص المشكلة الفنية الحالية (Problem Diagnosis)

بالمقارنة البصرية بين هيدر صفحة التوظيف (`/careers`) وهيدر صفحة الخدمات اللوجستية (`/services`):

1. **الترتيب المعكوس للعناصر (Inverted Hierarchy):**
   - في صفحة **التوظيف (الصورة الأولى المرجعية)**:
     - نصوص الإحصائيات (Stats) تقع **أعلى** الأزرار (`mb-8`).
     - أزرار الدعوة للإجراء (CTA Buttons) تقع **أسفل** الإحصائيات مع تنسيق موحد ومرن.
   - في صفحة **الخدمات اللوجستية (الصورة الثانية الحالية)**:
     - الأزرار معروضة أولاً (`mb-14`).
     - الإحصائيات مدفوعة إلى أسفل الحاوية (`mt-auto lg:mt-0`).

2. **التداخل مع تأثير التلاشي السفلي (Bottom Gradient Collision):**
   - وجود الإحصائيات في قاع القسم يجعلها تتداخل مباشرة مع طبقة التلاشي السفلي:
     ```tsx
     <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10" />
     ```
   - هذا التداخل يؤدي إلى طمس الأرقام والنصوص وتلاشي ألوانها وصعوبة قراءتها تماماً (كما يظهر بوضوح في الصورة الثانية).

3. **تنسيق الأزرار (Buttons Layout & Responsiveness):**
   - أزرار صفحة التوظيف تستخدم `flex-row gap-3 md:gap-4 w-full md:w-auto` و `flex-1 md:flex-none justify-center` بحجم خط وحشوات متناسقة (`text-sm md:text-base py-3.5 md:py-4`).
   - أزرار صفحة الخدمات تفتقر لهذا التناسق المرن.

---

## 2. الملف المستهدف للتعديل (Target File)
* **الملف الوحيد:** [`app/services/ServicesPageClient.tsx`](file:///home/khoder/old%29_data/SAMA%20Logistic/sama-corser/app/services/ServicesPageClient.tsx)
* **النطاق الحصري:** الأسطر (227–276) الخاصة بكتلة الأزرار والإحصائيات داخل الهيرو.

---

## 3. التعديل المقترح (Proposed Code Changes)

### الكود الحالي في `app/services/ServicesPageClient.tsx`:
```tsx
                            {/* CTA Buttons — matches Careers pattern */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-4 mb-14 order-last md:order-none mt-6 md:mt-0"
                                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                            >
                                <motion.a
                                    href="/contact"
                                    className="px-8 py-4 bg-brand-orange hover:bg-brand-darkOrange text-white font-semibold rounded-xl shadow-lg shadow-brand-orange/25 flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isRTL ? 'تواصل معنا' : 'Contact Us'}
                                    {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                </motion.a>
                                <motion.a
                                    href="/about"
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isRTL ? 'من نحن' : 'About Us'}
                                </motion.a>
                            </motion.div>

                            {/* Stats Row — matches Careers pattern (plain numbers) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap gap-8 md:gap-16 mt-auto lg:mt-0"
                                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                            >
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="text-center"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9 + idx * 0.1, type: 'spring' }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-1">{isRTL ? stat.valueAr : stat.valueEn}</div>
                                        <div className="text-sm text-gray-400 font-medium">{isRTL ? stat.labelAr : stat.labelEn}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
```

### الكود الجديد المقترح (مطابق 100% لمنطق صفحة التوظيف):
```tsx
                            {/* ── Bottom: Stats + Buttons (Matches Careers Layout) ── */}
                            <div className="mt-8">
                                {/* Stats Row — Placed First, Clear of Bottom Gradient */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-wrap gap-8 md:gap-16 mb-8"
                                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                                >
                                    {stats.map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="text-center"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.7 + idx * 0.1, type: 'spring' }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-1">
                                                {isRTL ? stat.valueAr : stat.valueEn}
                                            </div>
                                            <div className="text-sm text-gray-400 font-medium">
                                                {isRTL ? stat.labelAr : stat.labelEn}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* CTA Buttons — Placed Directly Below Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-row gap-3 md:gap-4 w-full md:w-auto"
                                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                                >
                                    <motion.a
                                        href="/contact"
                                        className="flex-1 md:flex-none px-4 md:px-8 py-3.5 md:py-4 bg-brand-orange hover:bg-brand-darkOrange text-white font-semibold rounded-xl shadow-lg shadow-brand-orange/25 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isRTL ? 'تواصل معنا' : 'Contact Us'}
                                        {isRTL ? <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> : <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
                                    </motion.a>
                                    <motion.a
                                        href="/about"
                                        className="flex-1 md:flex-none px-4 md:px-8 py-3.5 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isRTL ? 'من نحن' : 'About Us'}
                                    </motion.a>
                                </motion.div>
                            </div>
```

---

## 4. النتائج المترتبة على التعديل (Expected Benefits)
1. **وضوح الإحصائيات بنسبة 100%:** ارتفاع كتلة الإحصائيات لتكون أعلى الأزرار يبعدها تماماً عن طبقة التلاشي الأبيض السفلية (`h-24 gradient`)، فتظهر واضحة ومتباينة على الخلفية الداكنة.
2. **توحيد الهوية البصرية (Design Consistency):** تطابق هيكلي وتجربة مستخدم موحدة بين صفحة التوظيف وصفحة الخدمات اللوجستية.
3. **تجاوب ممتاز على شاشات الموبايل:** تنسيق الأزرار المشترك عبر `flex-1 md:flex-none` يضمن تناسق العرض على الشاشات الصغيرة دون تكسر.

---

## 5. قيود السلامة الصارمة (Safety Invariants)
* **لا تعديل على النصوص:** نصوص الأزرار (`تواصل معنا`، `من نحن`) وقيم وتسميات الإحصائيات تظل كما هي.
* **لا تعديل على باقي أقسام الصفحة:** لا يتم المساس بكروت الشحن أو الفئات المتخصصة أو باقي الصفحة.
* **لا لمس لقاعدة البيانات:** عدم تشغيل أي استعلامات أو أوامر قاعدة بيانات.
* **لا تعديل على الحزم:** عدم تثبيت أو تعديل أي باكدج.
* **لا عمليات Git:** التوقف عن أي أوامر commit أو push.

---

## 6. خطة الفحص والتحقق (Verification Plan)
1. تشغيل فحص الأنواع: `npx tsc --noEmit`.
2. تشغيل بناء الإنتاج: `npm run build`.
3. فحص الفروقات الصافية عبر `git diff -- app/services/ServicesPageClient.tsx`.
