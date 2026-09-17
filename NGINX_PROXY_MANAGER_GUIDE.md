# 🛡️ دليل ربط SAMA Logistics مع Nginx Proxy Manager (NPM)

هذا الدليل يشرح بالتفصيل كيفية ربط مشروع **SAMA Logistics** الذي يعمل داخل Docker مع **Nginx Proxy Manager** بخطوات واضحة ومباشرة.

---

## 🎯 الخياران المتاحان للربط (اختر أحدهما):

### 🌟 الخيار الأول (الأسهل والموصى به فوراً): عبر منفذ الهوست (`3030`)
بما أن حاوية المشروع تنشر المنفذ `3030` على السيرفر، يمكنك التوجيه له مباشرة من Nginx Proxy Manager:

1. ادخل إلى لوحة تحكم **Nginx Proxy Manager** (عادةً على البورت `:81`).
2. اذهب إلى **Hosts** ⬅️ **Proxy Hosts** ⬅️ اضغط **Add Proxy Host**.
3. في تبويب **Details**:
   - **Domain Names:** اكتب الدومين الخاص بك (مثلاً: `samalogistics.com` و `www.samalogistics.com`).
   - **Scheme:** اختر `http`.
   - **Forward Hostname / IP:**
     - اكتب IP السيرفر الداخلي للدوكر: `172.17.0.1` (هذا هو عنوان الـ Docker Host الافتراضي الذي تستطيع أي حاوية الوصول منه لمنفذ السيرفر).
     - أو اكتب الـ Private IP للسيرفر الخاص بك (مثل `192.168.1.X` أو IP السيرفر المحلي).
   - **Forward Port:** `3030`.
   - **Cache Assets:** ✅ تفعيل (ON) - لتسريع تحميل ملفات الصور و CSS و JS.
   - **Block Common Exploits:** ✅ تفعيل (ON) - لحماية الموقع من محاولات الاختراق الشائعة.
   - **Websockets Support:** ✅ تفعيل (ON) - **إلزامي جداً** لـ Next.js وواجهات التفاعل اللحظية.
4. في تبويب **SSL**:
   - **SSL Certificate:** اختر **Request a new SSL Certificate**.
   - **Force SSL:** ✅ تفعيل (ON) - لإجبار تحويل كل الزوار إلى HTTPS المشفر.
   - **HTTP/2 Support:** ✅ تفعيل (ON) - لسرعة نقل بيانات فائقة.
   - **HSTS Enabled:** ✅ تفعيل (ON).
   - **Email Address for Let's Encrypt:** اكتب بريدك الإلكتروني لتجديد الشهادة.
   - وافق على شروط Let's Encrypt: ✅
5. اضغط **Save**.

---

### 🚀 الخيار الثاني (الأكثر احترافية وأماناً): عبر شبكة Docker موحدة
إذا كان Nginx Proxy Manager يعمل أيضاً كحاوية دوكر على نفس السيرفر، يمكنك ضم حاوية `sama-logistics` إلى نفس شبكة Nginx Proxy Manager دون الحاجة لفتح البورت `3030` خارجياً:

1. **معرفة اسم شبكة NPM:**
   نفّذ الأمر التالي في التيرمنال لمعرفة اسم شبكة الدوكر الخاصة بـ NPM:
   ```bash
   docker network ls
   ```
   (غالباً يكون اسمها `npm-network` أو `proxy_network` أو `nginx-proxy-manager_default`).

2. **تعديل `docker-compose.yml` في المشروع:**
   أضف الشبكة الخارجية أسفل الملف:
   ```yaml
   services:
     sama-web:
       # ...
       networks:
         - sama-network
         - npm-network   # أضف شبكة NPM هنا

   networks:
     sama-network:
       driver: bridge
     npm-network:
       external: true    # اسم شبكة NPM الفعلي
   ```

3. **في لوحة Nginx Proxy Manager:**
   - **Forward Hostname / IP:** اكتب فقط اسم الحاوية: `sama-logistics`
   - **Forward Port:** `3000` (المنفذ الداخلي للتطبيق)
   - **Scheme:** `http`
   - فعّل **Websockets Support** و **Block Common Exploits** و **Cache Assets**.

---

## ⚡ فحص واختبار الاتصال (Troubleshooting):
- إذا ظهر لك خطأ `502 Bad Gateway` في المتصفح:
  1. تأكد أن حاوية المشروع تعمل:
     ```bash
     docker ps
     ```
  2. تأكد من تجربة فتح الرابط محلياً من السيرفر:
     ```bash
     curl -I http://localhost:3030/api/health
     ```
     (يجب أن يعيد لك `HTTP/1.1 200 OK`).
  3. في NPM جرب استخدام IP الهوست: `172.17.0.1` أو IP بطاقة الشبكة `eth0`.
