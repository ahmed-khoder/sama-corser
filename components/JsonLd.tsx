'use client';

import React from 'react';
import Script from 'next/script';

// Organization Schema
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'سما لوجستيك | Sama Logistics',
    alternateName: 'Sama Logistics',
    url: 'https://samalogistics.com',
    logo: 'https://samalogistics.com/logo.png',
    description: 'شركة سما لوجستيك - خدمات الشحن البحري والجوي والبري والتخليص الجمركي المتكاملة.',
    foundingDate: '2000',
    email: 'ops@samalogs.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '7 أبراج أرض الجولف، حي الشرق',
        addressLocality: 'Port Said',
        addressRegion: 'Port Said',
        addressCountry: 'EG',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: '+201221300036',
            contactType: 'customer service',
            availableLanguage: ['Arabic', 'English'],
            areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+201210090797',
            contactType: 'operations',
            availableLanguage: ['Arabic', 'English'],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+201283830126',
            contactType: 'operations',
            availableLanguage: ['Arabic', 'English'],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+20663744469',
            contactType: 'sales',
            availableLanguage: ['Arabic', 'English'],
        },
    ],
    sameAs: [
        'https://www.facebook.com/Samalogistics.eg',
        'https://www.instagram.com/sama_logistics_eg',
        'https://www.linkedin.com/company/sama-logistic',
        'https://www.tiktok.com/@sama.logistics.eg',
    ],
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 31.2509721,
            longitude: 32.2930159,
        },
        geoRadius: '5000 km',
    },
};

// LocalBusiness Schema
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://samalogistics.com/#localbusiness',
    name: 'سما لوجستيك | Sama Logistics',
    image: 'https://samalogistics.com/og-image.jpg',
    priceRange: '$$',
    email: 'ops@samalogs.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '7 أبراج أرض الجولف، حي الشرق',
        addressLocality: 'Port Said',
        addressRegion: 'Port Said',
        addressCountry: 'EG',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.2509721,
        longitude: 32.2930159,
    },
    url: 'https://samalogistics.com',
    hasMap: 'https://www.google.com/maps/place/Sama+Logistics/@31.2510921,32.292743,61m/data=!3m1!1e3!4m6!3m5!1s0x14f99d004da964e1:0x86c4303f4082c416!8m2!3d31.2509721!4d32.2930159!16s%2Fg%2F11x8lwxpdg',
    telephone: '+201221300036',
    sameAs: [
        'https://www.facebook.com/Samalogistics.eg',
        'https://www.instagram.com/sama_logistics_eg',
        'https://www.linkedin.com/company/sama-logistic',
        'https://www.tiktok.com/@sama.logistics.eg',
    ],
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
        },
    ],
};

// Service Schema
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'خدمات الشحن واللوجستيات',
    alternateName: 'Shipping and Logistics Services',
    provider: {
        '@type': 'Organization',
        name: 'Sama Logistics',
    },
    serviceType: 'Logistics and Freight Services',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 31.2509721,
            longitude: 32.2930159,
        },
        geoRadius: '5000 km',
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'خدماتنا اللوجستية',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'الشحن البحري',
                    alternateName: 'Sea Freight',
                    description: 'نقل البضائع والحاويات عبر البحار',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'الشحن الجوي',
                    alternateName: 'Air Freight',
                    description: 'شحن سريع للبضائع العاجلة',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'النقل البري',
                    alternateName: 'Land Transport',
                    description: 'أسطول حديث للنقل الداخلي والإقليمي',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'التخليص الجمركي',
                    alternateName: 'Customs Clearance',
                    description: 'إنهاء جميع الإجراءات الجمركية بسرعة ودقة',
                },
            },
        ],
    },
};

// WebSite Schema
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://samalogistics.com',
    name: 'سما لوجستيك',
    alternateName: 'Sama Logistics',
};

// BreadcrumbList Schema
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'الرئيسية',
            item: 'https://samalogistics.com',
        },
    ],
};

export default function JsonLd() {
    return (
        <>
            {/* Organization Schema */}
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
                strategy="afterInteractive"
            />

            {/* LocalBusiness Schema */}
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
                strategy="afterInteractive"
            />

            {/* Service Schema */}
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
                strategy="afterInteractive"
            />

            {/* WebSite Schema */}
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
                strategy="afterInteractive"
            />

            {/* Breadcrumb Schema */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
                strategy="afterInteractive"
            />
        </>
    );
}

// Export individual schemas for use in specific pages
export {
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    websiteSchema,
    breadcrumbSchema,
};
