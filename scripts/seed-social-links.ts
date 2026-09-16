// Seed script: Insert default social media links into SiteSetting
// Run with: npx tsx scripts/seed-social-links.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SOCIAL_LINKS = [
    {
        section: 'social',
        key: 'facebook',
        valueAr: 'https://www.facebook.com/Samallogseg/',
        valueEn: 'Facebook',
        extra: JSON.stringify({ platform: 'facebook' }),
        order: 0,
        isActive: true,
    },
    {
        section: 'social',
        key: 'linkedin',
        valueAr: 'https://www.linkedin.com/company/sama-logistic',
        valueEn: 'LinkedIn',
        extra: JSON.stringify({ platform: 'linkedin' }),
        order: 1,
        isActive: true,
    },
    {
        section: 'social',
        key: 'instagram',
        valueAr: '#',
        valueEn: 'Instagram',
        extra: JSON.stringify({ platform: 'instagram' }),
        order: 2,
        isActive: true,
    },
    {
        section: 'social',
        key: 'tiktok',
        valueAr: '#',
        valueEn: 'TikTok',
        extra: JSON.stringify({ platform: 'tiktok' }),
        order: 3,
        isActive: true,
    },
];

async function main() {
    console.log('🔗 Seeding social media links...');

    for (const link of SOCIAL_LINKS) {
        const result = await prisma.siteSetting.upsert({
            where: {
                section_key: { section: link.section, key: link.key },
            },
            update: {
                valueAr: link.valueAr,
                valueEn: link.valueEn,
                extra: link.extra,
                order: link.order,
                isActive: link.isActive,
            },
            create: link,
        });
        console.log(`  ✅ ${link.key}: ${link.valueAr}`);
    }

    console.log('✨ Social media links seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
