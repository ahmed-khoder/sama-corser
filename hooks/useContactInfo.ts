'use client';

import { useState, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────

export interface ContactPhone {
    key: string;
    display: string;       // Formatted display: "+20 122 130 0036"
    raw: string;           // Raw digits for tel: and wa.me links: "201221300036"
    hasWhatsapp: boolean;
    type: 'mobile' | 'landline';
}

export interface ContactEmail {
    key: string;
    value: string;         // "info@samalogs.com"
}

export interface ContactAddress {
    key: string;
    textAr: string;
    textEn: string;
    mapsUrl: string;
    type: 'address' | 'office';
}

export interface ContactInfo {
    phones: ContactPhone[];
    emails: ContactEmail[];
    addresses: ContactAddress[];
    loading: boolean;
}

// ── Default (hardcoded fallback) ─────────────────────────────

const DEFAULT_PHONES: ContactPhone[] = [
    { key: 'phone1', display: '+20 122 130 0036', raw: '201221300036', hasWhatsapp: true, type: 'mobile' },
    { key: 'phone2', display: '+20 121 175 5925', raw: '201211755925', hasWhatsapp: true, type: 'mobile' },
    { key: 'landline', display: '+20 66 374 4469', raw: '20663744469', hasWhatsapp: false, type: 'landline' },
];

const DEFAULT_EMAILS: ContactEmail[] = [
    { key: 'email', value: 'info@samalogs.com' },
];

const DEFAULT_ADDRESSES: ContactAddress[] = [
    {
        key: 'address1',
        textAr: '7 أبراج أرض الجولف، حى الشرق، بورسعيد، جمهورية مصر العربية',
        textEn: '7 Golf Land Towers, Al-Sharq District, Port Said, Egypt',
        mapsUrl: 'https://maps.google.com/?q=7+Golf+Land+Towers+Port+Said+Egypt',
        type: 'address',
    },
    {
        key: 'address2',
        textAr: 'مكتب 12 بساحة النورس، ميناء شرق بورسعيد',
        textEn: 'Office 12, Al-Nawras Square, East Port Said Port',
        mapsUrl: 'https://maps.google.com/?q=East+Port+Said+Port+Egypt',
        type: 'office',
    },
];

// ── Parser ───────────────────────────────────────────────────

interface RawSetting {
    id: string;
    section: string;
    key: string;
    valueAr: string;
    valueEn: string;
    extra?: string | null;
    order: number;
}

function parseContactSettings(settings: RawSetting[]): Omit<ContactInfo, 'loading'> {
    const phones: ContactPhone[] = [];
    const emails: ContactEmail[] = [];
    const addresses: ContactAddress[] = [];

    for (const s of settings) {
        let extra: Record<string, any> = {};
        try {
            if (s.extra) extra = JSON.parse(s.extra);
        } catch { /* ignore parse errors */ }

        const type = extra.type || 'unknown';

        if (type === 'mobile' || type === 'landline') {
            phones.push({
                key: s.key,
                display: s.valueAr, // Both AR/EN have the same phone number
                raw: extra.raw || s.valueAr.replace(/[^0-9]/g, ''),
                hasWhatsapp: !!extra.hasWhatsapp,
                type,
            });
        } else if (type === 'email') {
            emails.push({
                key: s.key,
                value: s.valueAr,
            });
        } else if (type === 'address' || type === 'office') {
            addresses.push({
                key: s.key,
                textAr: s.valueAr,
                textEn: s.valueEn,
                mapsUrl: extra.mapsUrl || '#',
                type,
            });
        }
    }

    return { phones, emails, addresses };
}

// ── Cache key ────────────────────────────────────────────────

const CACHE_KEY = 'contact_info_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── Hook ─────────────────────────────────────────────────────

export function useContactInfo(): ContactInfo {
    const [phones, setPhones] = useState<ContactPhone[]>(DEFAULT_PHONES);
    const [emails, setEmails] = useState<ContactEmail[]>(DEFAULT_EMAILS);
    const [addresses, setAddresses] = useState<ContactAddress[]>(DEFAULT_ADDRESSES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        // 1. Check sessionStorage cache
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
                    const parsed = parseContactSettings(data);
                    if (parsed.phones.length > 0) setPhones(parsed.phones);
                    if (parsed.emails.length > 0) setEmails(parsed.emails);
                    if (parsed.addresses.length > 0) setAddresses(parsed.addresses);
                    setLoading(false);
                    return;
                }
            }
        } catch {
            try { sessionStorage.removeItem(CACHE_KEY); } catch { }
        }

        // 2. Fetch from API
        fetch('/api/cms/contact-info', { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: RawSetting[]) => {
                if (!Array.isArray(data)) throw new Error('Invalid response');

                if (data.length > 0) {
                    const parsed = parseContactSettings(data);
                    if (parsed.phones.length > 0) setPhones(parsed.phones);
                    if (parsed.emails.length > 0) setEmails(parsed.emails);
                    if (parsed.addresses.length > 0) setAddresses(parsed.addresses);
                }

                // Cache
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: data.length > 0 ? data : [],
                        timestamp: Date.now(),
                    }));
                } catch { }
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error('Error loading contact info:', err);
                // Defaults already set
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, []);

    return { phones, emails, addresses, loading };
}

// ── Utility: Invalidate contact cache ────────────────────────

export function invalidateContactCache() {
    try { sessionStorage.removeItem(CACHE_KEY); } catch { }
}
