/**
 * Seed initial contact info into SiteSetting table.
 * Run: npx tsx scripts/seed-contact-info.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTACT_ITEMS = [
    {
        section: 'contact',
        key: 'phone1',
        valueAr: '+20 122 130 0036',
        valueEn: '+20 122 130 0036',
        extra: JSON.stringify({ raw: '201221300036', hasWhatsapp: true, type: 'mobile' }),
        order: 0,
    },
    {
        section: 'contact',
        key: 'phone2',
        valueAr: '+20 121 175 5925',
        valueEn: '+20 121 175 5925',
        extra: JSON.stringify({ raw: '201211755925', hasWhatsapp: true, type: 'mobile' }),
        order: 1,
    },
    {
        section: 'contact',
        key: 'landline',
        valueAr: '+20 66 374 4469',
        valueEn: '+20 66 374 4469',
        extra: JSON.stringify({ raw: '20663744469', hasWhatsapp: false, type: 'landline' }),
        order: 2,
    },
    {
        section: 'contact',
        key: 'email',
        valueAr: 'info@samalogs.com',
        valueEn: 'info@samalogs.com',
        extra: JSON.stringify({ type: 'email' }),
        order: 3,
    },
    {
        section: 'contact',
        key: 'address1',
        valueAr: '7 أبراج أرض الجولف، حى الشرق، بورسعيد، جمهورية مصر العربية',
        valueEn: '7 Golf Land Towers, Al-Sharq District, Port Said, Egypt',
        extra: JSON.stringify({ type: 'address', mapsUrl: 'https://maps.google.com/?q=7+Golf+Land+Towers+Port+Said+Egypt' }),
        order: 4,
    },
    {
        section: 'contact',
        key: 'address2',
        valueAr: 'مكتب 12 بساحة النورس، ميناء شرق بورسعيد',
        valueEn: 'Office 12, Al-Nawras Square, East Port Said Port',
        extra: JSON.stringify({ type: 'office', mapsUrl: 'https://maps.google.com/?q=East+Port+Said+Port+Egypt' }),
        order: 5,
    },
];

async function main() {
    console.log('🔄 Seeding contact info...');

    for (const item of CONTACT_ITEMS) {
        await prisma.siteSetting.upsert({
            where: { section_key: { section: item.section, key: item.key } },
            update: {
                valueAr: item.valueAr,
                valueEn: item.valueEn,
                extra: item.extra,
                order: item.order,
                isActive: true,
            },
            create: item,
        });
        console.log(`  ✅ ${item.key}`);
    }

    console.log('✅ Contact info seeded successfully!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
