import { prisma } from '@/lib/db';
import ServicesPageClient from './ServicesPageClient';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

// ISR: revalidate every 5 minutes
export const revalidate = 300;

// ─── Dynamic bilingual SEO metadata ───
export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const headerStore = await headers();
    const langCookie = cookieStore.get('language')?.value;
    const acceptLang = headerStore.get('accept-language') || '';
    const isArabic = langCookie === 'ar' || (!langCookie && acceptLang.startsWith('ar'));

    const title = isArabic
        ? 'خدمات الشحن والحلول اللوجستية المتكاملة في مصر | سما لوجيستك'
        : 'Logistics Services & Freight Forwarding in Egypt | SAMA Logistics';
    const description = isArabic
        ? 'خدمات سما لوجيستك المتكاملة في مصر: الشحن البحري والجوي، النقل البري، التخليص الجمركي، التخزين والحلول اللوجستية من موانئ بورسعيد ودمياط والإسكندرية.'
        : 'Sea freight, land transport, customs clearance, warehousing, and cargo insurance from Port Said, Egypt. Explore SAMA Logistics services.';

    return {
        title,
        description,
        keywords: isArabic
            ? 'نقل حاويات مصر, شركة لوجستية بورسعيد, شحن بحري مصر, تخليص جمركي, خدمات شحن, خدمات لوجستية, تخزين, توزيع'
            : 'container transport Egypt, logistics company Port Said, freight forwarding Egypt, customs clearance Egypt, shipping services Egypt, logistics services, warehousing, distribution',
        openGraph: {
            title,
            description,
            type: 'website',
            url: 'https://samalogistics.com/services',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: isArabic ? 'خدمات سما لوجيستك اللوجستية' : 'SAMA Logistics Services',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: 'https://samalogistics.com/services',
        },
    };
}

export default async function ServicesPage() {
    // Fetch services server-side (same query as /api/cms/services GET)
    let services: any[] = [];
    try {
        const raw = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        services = raw.map(s => ({
            ...JSON.parse(JSON.stringify(s)), // serialize Prisma objects
            features: (() => { try { return JSON.parse(s.featuresJson || '[]'); } catch { return []; } })(),
        }));
    } catch {
        services = [];
    }

    // Fetch fleet server-side (same query as /api/cms/fleet GET)
    let fleet: any[] = [];
    try {
        const raw = await prisma.fleetTruck.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
        fleet = JSON.parse(JSON.stringify(raw));
    } catch {
        fleet = [];
    }

    // Fetch ports server-side (same query as /api/cms/ports GET)
    let ports: any[] = [];
    try {
        const raw = await prisma.portOperation.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
        ports = JSON.parse(JSON.stringify(raw));
    } catch {
        ports = [];
    }

    // Fetch specialized cargo server-side (same query as /api/cms/specialized-cargo GET)
    let cargo: any[] = [];
    try {
        const raw = await prisma.specializedCargo.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
        });
        cargo = JSON.parse(JSON.stringify(raw));
    } catch {
        cargo = [];
    }

    // ── Enrich cargo cards with hero images from their dedicated service pages ──
    // When a cargo item has a slug (linking it to a service page) but no uploaded
    // card image, pull the hero image from SiteSetting so the card background
    // matches the service page hero. This is a read-only, server-side enrichment.
    const slugToSection: Record<string, string> = {
        'marble-transport': 'marble-page',
        'industrial-transport': 'industrial-page',
    };

    const cargoNeedingImages = cargo.filter(
        (c: any) => !c.image && c.slug && slugToSection[c.slug]
    );

    if (cargoNeedingImages.length > 0) {
        try {
            const sections = cargoNeedingImages.map(
                (c: any) => slugToSection[c.slug]
            );
            const heroSettings = await prisma.siteSetting.findMany({
                where: {
                    section: { in: sections },
                    key: 'hero',
                    isActive: true,
                },
                select: { section: true, extra: true },
            });

            const sectionToImage: Record<string, string> = {};
            for (const hs of heroSettings) {
                try {
                    const data = JSON.parse(hs.extra || '{}');
                    if (data.image) sectionToImage[hs.section] = data.image;
                } catch { /* skip malformed JSON */ }
            }

            // Inject hero images into matching cargo items
            for (const c of cargo) {
                if (!c.image && c.slug && slugToSection[c.slug]) {
                    const heroImg = sectionToImage[slugToSection[c.slug]];
                    if (heroImg) c.image = heroImg;
                }
            }
        } catch {
            // Non-fatal — cards will render without background images
        }
    }

    return <ServicesPageClient initialServices={services} initialFleet={fleet} initialPorts={ports} initialCargo={cargo} />;
}
