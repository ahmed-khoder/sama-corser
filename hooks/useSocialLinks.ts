'use client';

import { useState, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────

export type SocialPlatform = 'facebook' | 'linkedin' | 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'snapchat' | 'whatsapp' | 'other';

export interface SocialLink {
    key: string;
    platform: SocialPlatform;
    url: string;
    label: string;       // Display name: "Facebook", "LinkedIn", etc.
    isActive: boolean;
    order: number;
}

// ── Platform metadata ────────────────────────────────────────

export const PLATFORM_META: Record<SocialPlatform, { labelAr: string; labelEn: string; placeholder: string }> = {
    facebook: { labelAr: 'فيسبوك', labelEn: 'Facebook', placeholder: 'https://www.facebook.com/...' },
    linkedin: { labelAr: 'لينكد إن', labelEn: 'LinkedIn', placeholder: 'https://www.linkedin.com/company/...' },
    instagram: { labelAr: 'إنستجرام', labelEn: 'Instagram', placeholder: 'https://www.instagram.com/...' },
    tiktok: { labelAr: 'تيك توك', labelEn: 'TikTok', placeholder: 'https://www.tiktok.com/@...' },
    twitter: { labelAr: 'تويتر / X', labelEn: 'Twitter / X', placeholder: 'https://twitter.com/...' },
    youtube: { labelAr: 'يوتيوب', labelEn: 'YouTube', placeholder: 'https://www.youtube.com/...' },
    snapchat: { labelAr: 'سناب شات', labelEn: 'Snapchat', placeholder: 'https://www.snapchat.com/add/...' },
    whatsapp: { labelAr: 'واتساب', labelEn: 'WhatsApp', placeholder: 'https://wa.me/...' },
    other: { labelAr: 'أخرى', labelEn: 'Other', placeholder: 'https://...' },
};

// ── Default fallback ─────────────────────────────────────────

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { key: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/Samallogseg/', label: 'Facebook', isActive: true, order: 0 },
    { key: 'linkedin', platform: 'linkedin', url: 'https://www.linkedin.com/company/sama-logistic', label: 'LinkedIn', isActive: true, order: 1 },
    { key: 'instagram', platform: 'instagram', url: '#', label: 'Instagram', isActive: true, order: 2 },
    { key: 'tiktok', platform: 'tiktok', url: '#', label: 'TikTok', isActive: true, order: 3 },
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
    isActive: boolean;
}

function parseSocialSettings(settings: RawSetting[]): SocialLink[] {
    return settings.map((s) => {
        let extra: Record<string, any> = {};
        try {
            if (s.extra) extra = JSON.parse(s.extra);
        } catch { /* ignore */ }

        return {
            key: s.key,
            platform: (extra.platform || s.key) as SocialPlatform,
            url: s.valueAr || '#',
            label: s.valueEn || s.key,
            isActive: s.isActive,
            order: s.order,
        };
    });
}

// ── Cache ────────────────────────────────────────────────────

const CACHE_KEY = 'social_links_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── Hook ─────────────────────────────────────────────────────

export function useSocialLinks(): { links: SocialLink[]; loading: boolean } {
    const [links, setLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        // 1. Check sessionStorage cache
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
                    const parsed = parseSocialSettings(data);
                    if (parsed.length > 0) setLinks(parsed);
                    setLoading(false);
                    return;
                }
            }
        } catch {
            try { sessionStorage.removeItem(CACHE_KEY); } catch { }
        }

        // 2. Fetch from API
        fetch('/api/cms/social-links', { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: RawSetting[]) => {
                if (!Array.isArray(data)) throw new Error('Invalid response');

                if (data.length > 0) {
                    const parsed = parseSocialSettings(data);
                    if (parsed.length > 0) setLinks(parsed);
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
                console.error('Error loading social links:', err);
                // Defaults already set
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, []);

    return { links, loading };
}

// ── Utility: Invalidate social cache ─────────────────────────

export function invalidateSocialCache() {
    try { sessionStorage.removeItem(CACHE_KEY); } catch { }
}
