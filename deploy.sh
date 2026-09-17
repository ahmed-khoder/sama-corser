#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# SAMA Logistics — سكربت النشر والتشغيل الآلي عبر Docker
# ═══════════════════════════════════════════════════════════════

set -e

echo ""
echo "🚀 ================================================"
echo "   SAMA Logistics — Production Deployment Script"
echo "================================================"
echo ""

# 1. التحقق من تثبيت Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker غير مثبت على هذا السيرفر!"
    echo "   يمكنك تثبيته بسهولة بتنفيذ الأمر:"
    echo "   curl -fsSL https://get.docker.com | sh"
    exit 1
fi

# 2. التحقق من Docker Compose
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "❌ Docker Compose غير متوفر!"
    echo "   يرجى تثبيت إضافة docker compose:"
    echo "   sudo apt-get update && sudo apt-get install -y docker-compose-plugin"
    exit 1
fi

echo "✅ Docker و Docker Compose متوفران بنجاح."

# 3. تجهيز ملف متغيرات البيئة .env
if [ ! -f .env ]; then
    echo "📝 جاري إنشاء ملف .env من القالب .env.production.example..."
    cp .env.production.example .env
    
    # توليد مفتاح تشفير JWT عشوائي وآمن
    if command -v openssl &> /dev/null; then
        RANDOM_SECRET=$(openssl rand -hex 32)
        sed -i "s/sama-production-super-secret-key-change-this-now/$RANDOM_SECRET/g" .env
        echo "🔑 تم توليد مفتاح JWT_SECRET عشوائي فائق الأمان وحفظه في .env."
    fi
    echo "⚠️ يرجى مراجعة ملف .env وتعديل NEXT_PUBLIC_SITE_URL إذا كان لديك دومين محدد."
else
    echo "✅ ملف .env موجود بالفعل وسيتم استخدامه."
fi

# 4. بناء وتشغيل الحاويات
echo ""
echo "📦 جاري بناء وتشغيل الحاوية عبر Docker Compose..."
$DOCKER_COMPOSE down --remove-orphans 2>/dev/null || true
docker rm -f sama-logistics 2>/dev/null || true
$DOCKER_COMPOSE up -d --build

echo ""
echo "⏳ جاري فحص حالة الحاوية خلال 5 ثوان..."
sleep 5

# 5. عرض حالة الحاوية
if docker ps --filter "name=sama-logistics" --filter "status=running" | grep -q sama-logistics; then
    echo ""
    echo "🎉 ================================================"
    echo "   ✅ تم تشغيل SAMA Logistics بنجاح تام!"
    echo "================================================"
    echo ""
    ACTUAL_PORT=${PORT:-3000}
    echo "📡 المنفذ المحلي: http://localhost:${ACTUAL_PORT}"
    echo "🌐 للربط مع Nginx Proxy Manager:"
    echo "   - Scheme: http"
    echo "   - Forward IP: 172.17.0.1 (أو IP السيرفر المحلي)"
    echo "   - Forward Port: ${ACTUAL_PORT}"
    echo "   - تفعيل: Websockets Support + Block Common Exploits + Cache Assets"
    echo ""
    echo "📋 لمتابعة السجلات الحية (Logs):"
    echo "   docker logs -f sama-logistics"
    echo ""
else
    echo "❌ يبدو أن هناك مشكلة أثناء الإقلاع. جاري عرض آخر السجلات:"
    docker logs sama-logistics --tail 30
    exit 1
fi
