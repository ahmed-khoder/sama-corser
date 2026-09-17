# 🚀 دليل تشغيل ونشر مشروع SAMA Logistics عبر Docker

هذا الدليل يشرح خطوات رفع وتشغيل المشروع على السيرفر الخاص بك باستخدام **Docker** و **Docker Compose**.

المستودع: `https://github.com/ahmed-khoder/sama-corser`

---

## 📋 المتطلبات الأساسية للسيرفر (Prerequisites):
- سيرفر بنظام تشغيل **Ubuntu 20.04 / 22.04 / 24.04** أو **Debian**.
- ذاكرة عشوائية (RAM): يُفضل 2GB أو أكثر (لعملية البناء الأولى).
- تثبيت **Docker** و **Docker Compose**:
  إذا لم تكن مثبتة، يمكنك تثبيتها بأمر واحد:
  ```bash
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker $USER
  ```

---

## ⚡ خطوات التشغيل لأول مرة (First-Time Setup):

### 1. الدخول إلى السيرفر وسحب المشروع:
```bash
# الانتقال إلى المجلد المفضل (مثلاً /opt أو مجلد المستخدم)
cd /opt

# سحب الكود من GitHub
git clone https://github.com/ahmed-khoder/sama-corser.git

# الدخول إلى مجلد المشروع
cd sama-corser
```

### 2. تجهيز ملف متغيرات البيئة `.env`:
```bash
# نسخ القالب الجاهز
cp .env.production.example .env

# توليد مفتاح تشفير عشوائي وتحديثه في .env
sed -i "s/sama-production-super-secret-key-change-this-now/$(openssl rand -hex 32)/g" .env
```
*(اختياري)* يمكنك تعديل `.env` بواسطة `nano .env` لتعديل الرابط الأساسي `NEXT_PUBLIC_SITE_URL` أو المنفذ إذا أردت.

### 3. التشغيل السريع بضغطة زر:
قم بتشغيل سكربت النشر الآلي:
```bash
chmod +x deploy.sh
./deploy.sh
```

أو تشغيل الأمر اليدوي المباشر:
```bash
docker compose up -d --build
```

---

## 🛡️ ربط الموقع مع Nginx Proxy Manager:
بمجرد اكتمال التشغيل، سيكون المشروع متاحاً على المنفذ `3030`.
- راجع الدليل المخصص للربط وحماية الموقع بشهادة SSL المجانية:  
  👉 [NGINX_PROXY_MANAGER_GUIDE.md](file:///home/khoder/old\)_data/SAMA%20Logistic/sama-corser/NGINX_PROXY_MANAGER_GUIDE.md)

---

## 🔄 كيفية تحديث المشروع عند دفع كود جديد إلى GitHub:
عندما تقوم بعمل `git push` لتعديلات جديدة من جهازك المحلي، كل ما عليك فعله على السيرفر هو:

```bash
cd /opt/sama-corser

# 1. سحب التعديلات الجديدة
git pull origin main

# 2. إعادة البناء والتشغيل بدون توقف
docker compose up -d --build
```
> **ملاحظة هامة:** لن يتم فقدان أي بيانات، فقاعدة البيانات `dev.db` والصور والملفات المرفوعة محفوظة داخل مجلدات دوكر الدائمة (`sama-db`, `sama-images`, `sama-uploads`).

---

## 🛠️ أوامر الصيانة وإدارة الحاوية (Useful Commands):

### 1. متابعة السجلات الحية (Live Logs):
```bash
docker logs -f sama-logistics
```

### 2. فحص حالة الحاوية واستهلاك الموارد:
```bash
docker ps
docker stats sama-logistics
```

### 3. إعادة تشغيل الحاوية:
```bash
docker compose restart
```

### 4. أخذ نسخة احتياطية سريعة من قاعدة البيانات:
```bash
docker exec sama-logistics cp /data/db/dev.db /data/db/backup-$(date +%Y%m%d).db
```
أو سحب نسخة مباشرة إلى خارج الدوكر:
```bash
docker cp sama-logistics:/data/db/dev.db ./backup-dev.db
```
