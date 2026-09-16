'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import { invalidateSocialCache, PLATFORM_META, SocialPlatform } from '@/hooks/useSocialLinks';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Link as LinkIcon, Plus, Trash2, Save, RefreshCw,
    GripVertical, CheckCircle2, ExternalLink, Eye, EyeOff
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────

interface SocialItem {
    key: string;
    platform: SocialPlatform;
    url: string;
    isActive: boolean;
    order: number;
}

// ── Platform icon SVGs (matching footer style) ─────────────

const PlatformIcon = ({ platform, className = 'w-5 h-5' }: { platform: SocialPlatform; className?: string }) => {
    switch (platform) {
        case 'facebook':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 4h24a6 6 0 016 6v24a6 6 0 01-6 6H24V24h6l1-6h-7v-3c0-2 1-3 3-3h3V6h-4c-5 0-8 3-8 8v4h-5v6h5v12H10a6 6 0 01-6-6V10a6 6 0 016-6z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeLinejoin="round">
                    <circle cx="9" cy="7" r="3.5" strokeWidth="2" />
                    <rect x="5.5" y="15" width="7" height="20" rx="1.5" strokeWidth="2" />
                    <path d="M18.5 35V24c0-5.5 3-9 8.5-9 5.5 0 8.5 3.5 8.5 9v11h-7V25c0-2-1.2-3.2-3.2-3.2h-.6c-2 0-3.2 1.2-3.2 3.2v10z" strokeWidth="2" />
                    <line x1="18.5" y1="15" x2="18.5" y2="35" strokeWidth="2" />
                </svg>
            );
        case 'instagram':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="32" height="32" rx="10" />
                    <circle cx="20" cy="20" r="7.5" />
                    <circle cx="30" cy="10" r="1.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'tiktok':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 5v20.5a8 8 0 11-8-8" />
                    <path d="M22 5c0 5 3.5 8 8 8" />
                    <path d="M22 11c0 2.5 1.8 4.5 4 5" />
                </svg>
            );
        case 'twitter':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l6.5 8.5M4 20l6.5-8.5m0 0L20 4M10.5 12.5L20 20" />
                </svg>
            );
        case 'youtube':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 010-10 2 2 0 011.4-1.4 49.56 49.56 0 0116.2 0A2 2 0 0121.5 7a24.12 24.12 0 010 10 2 2 0 01-1.4 1.4 49.55 49.55 0 01-16.2 0A2 2 0 012.5 17" />
                    <path d="M10 15V9l5 3-5 3z" />
                </svg>
            );
        case 'snapchat':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.5 2 6 4.5 6 8v2c-1 0-2 .5-2 1s1 1 2 1c-.5 2-2 3-4 4 0 .5.5 1 2 1 .5 0 1 0 1.5.5S7 19 8 19.5c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5c1-.5 1.5-1 2-1.5s1-.5 1.5-.5c1.5 0 2-.5 2-1-2-1-3.5-2-4-4 1 0 2-.5 2-1s-1-1-2-1V8c0-3.5-2.5-6-6-6z" />
                </svg>
            );
        case 'whatsapp':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            );
        default:
            return <LinkIcon className={className} />;
    }
};

// ── Default seed data ──────────────────────────────────────

const DEFAULT_ITEMS: SocialItem[] = [
    { key: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/Samallogseg/', isActive: true, order: 0 },
    { key: 'linkedin', platform: 'linkedin', url: 'https://www.linkedin.com/company/sama-logistic', isActive: true, order: 1 },
    { key: 'instagram', platform: 'instagram', url: '#', isActive: true, order: 2 },
    { key: 'tiktok', platform: 'tiktok', url: '#', isActive: true, order: 3 },
];

// ── Available platforms for adding ─────────────────────────

const ALL_PLATFORMS: SocialPlatform[] = [
    'facebook', 'linkedin', 'instagram', 'tiktok', 'twitter', 'youtube', 'snapchat', 'whatsapp', 'other'
];

// ── Component ──────────────────────────────────────────────

export default function SocialLinksTab() {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const [items, setItems] = useState<SocialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    // ── Load from API ──────────────────────────────────────

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/cms/social-links');
            const data = await res.json();

            if (Array.isArray(data) && data.length > 0) {
                const parsed: SocialItem[] = data.map((s: any) => {
                    let extra: Record<string, any> = {};
                    try { extra = s.extra ? JSON.parse(s.extra) : {}; } catch { }
                    return {
                        key: s.key,
                        platform: (extra.platform || s.key) as SocialPlatform,
                        url: s.valueAr || '#',
                        isActive: s.isActive,
                        order: s.order,
                    };
                });
                setItems(parsed.sort((a, b) => a.order - b.order));
            } else {
                setItems(DEFAULT_ITEMS);
            }
        } catch {
            setItems(DEFAULT_ITEMS);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    // ── Save to API ────────────────────────────────────────

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSaved(false);
        try {
            const payload = items.map((item, idx) => ({
                key: item.key,
                valueAr: item.url,
                valueEn: PLATFORM_META[item.platform]?.labelEn || item.platform,
                extra: JSON.stringify({ platform: item.platform }),
                order: idx,
                isActive: item.isActive,
            }));

            const res = await authFetch('/api/cms/social-links', {
                method: 'PUT',
                body: JSON.stringify({ items: payload }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to save');
            }

            invalidateSocialCache();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e: any) {
            setError(e.message || 'حدث خطأ أثناء الحفظ');
        } finally {
            setSaving(false);
        }
    };

    // ── Add new platform ───────────────────────────────────

    const addPlatform = (platform: SocialPlatform) => {
        const existingCount = items.filter(i => i.key.startsWith(platform)).length;
        const key = existingCount === 0 ? platform : `${platform}${existingCount + 1}`;
        setItems(prev => [...prev, {
            key,
            platform,
            url: '',
            isActive: true,
            order: prev.length,
        }]);
    };

    // ── Delete item ────────────────────────────────────────

    const deleteItem = (key: string) => {
        setItems(prev => prev.filter(i => i.key !== key));
    };

    // ── Toggle active ──────────────────────────────────────

    const toggleActive = (key: string) => {
        setItems(prev => prev.map(i =>
            i.key === key ? { ...i, isActive: !i.isActive } : i
        ));
    };

    // ── Update URL ─────────────────────────────────────────

    const updateUrl = (key: string, url: string) => {
        setItems(prev => prev.map(i =>
            i.key === key ? { ...i, url } : i
        ));
    };

    // ── Update platform ────────────────────────────────────

    const updatePlatform = (key: string, platform: SocialPlatform) => {
        setItems(prev => prev.map(i =>
            i.key === key ? { ...i, platform } : i
        ));
    };

    // ── Render ─────────────────────────────────────────────

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 animate-spin text-brand-orange" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with save button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {isRTL ? '🔗 السوشيال ميديا' : '🔗 Social Media Links'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isRTL
                            ? 'إضافة وتعديل روابط السوشيال ميديا — يتم تحديثها تلقائياً في الفوتر وجميع أنحاء الموقع'
                            : 'Add and edit social media links — updates automatically in the footer and across the website'}
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-orange to-brand-gold hover:from-brand-orange/90 hover:to-brand-gold/90 text-white font-bold rounded-xl shadow-lg shadow-brand-orange/30 transition-all disabled:opacity-50"
                >
                    {saving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : saved ? (
                        <CheckCircle2 className="w-4 h-4" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>{saved ? (isRTL ? 'تم الحفظ ✓' : 'Saved ✓') : (isRTL ? 'حفظ' : 'Save')}</span>
                </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Social links list */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                            <LinkIcon className="w-4 h-4 text-brand-orange" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {isRTL ? 'منصات التواصل الاجتماعي' : 'Social Media Platforms'}
                        </h3>
                    </div>

                    {/* Add platform dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 rounded-lg transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                            {isRTL ? 'إضافة منصة' : 'Add Platform'}
                        </button>
                        <div className="absolute left-0 rtl:left-auto rtl:right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl z-50 hidden group-hover:block min-w-[180px]">
                            {ALL_PLATFORMS.map(p => (
                                <button
                                    key={p}
                                    onClick={() => addPlatform(p)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                                >
                                    <PlatformIcon platform={p} className="w-4 h-4 text-brand-orange" />
                                    {isRTL ? PLATFORM_META[p].labelAr : PLATFORM_META[p].labelEn}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Items */}
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.key}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                                item.isActive
                                    ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'
                                    : 'bg-gray-100/50 dark:bg-slate-800/20 border-gray-200/50 dark:border-slate-700/50 opacity-60'
                            }`}
                        >
                            <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />

                            {/* Platform icon */}
                            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                                <PlatformIcon platform={item.platform} className="w-5 h-5 text-brand-orange" />
                            </div>

                            {/* Platform selector */}
                            <select
                                value={item.platform}
                                onChange={(e) => updatePlatform(item.key, e.target.value as SocialPlatform)}
                                className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-xs font-medium focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none flex-shrink-0 min-w-[120px]"
                            >
                                {ALL_PLATFORMS.map(p => (
                                    <option key={p} value={p}>
                                        {isRTL ? PLATFORM_META[p].labelAr : PLATFORM_META[p].labelEn}
                                    </option>
                                ))}
                            </select>

                            {/* URL input */}
                            <div className="flex-1">
                                <input
                                    type="url"
                                    value={item.url === '#' ? '' : item.url}
                                    onChange={(e) => updateUrl(item.key, e.target.value || '#')}
                                    placeholder={PLATFORM_META[item.platform]?.placeholder || 'https://...'}
                                    dir="ltr"
                                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                                />
                            </div>

                            {/* Open link */}
                            {item.url && item.url !== '#' && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-gray-400 hover:text-brand-orange rounded-lg transition-colors flex-shrink-0"
                                    title={isRTL ? 'فتح الرابط' : 'Open link'}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}

                            {/* Toggle active */}
                            <button
                                onClick={() => toggleActive(item.key)}
                                className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                                    item.isActive
                                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                                title={isRTL ? (item.isActive ? 'إخفاء' : 'إظهار') : (item.isActive ? 'Hide' : 'Show')}
                            >
                                {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => deleteItem(item.key)}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                                title={isRTL ? 'حذف' : 'Delete'}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">
                        {isRTL ? 'لا توجد منصات — اضغط "إضافة منصة"' : 'No platforms — click "Add Platform"'}
                    </p>
                )}
            </div>

            {/* Info note */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-400">
                💡 {isRTL
                    ? 'بعد الحفظ، سيتم تحديث أيقونات السوشيال ميديا في الفوتر تلقائياً. المنصات المخفية أو بدون رابط لن تظهر في الموقع.'
                    : 'After saving, social media icons in the footer will update automatically. Hidden platforms or those without a URL won\'t appear on the website.'}
            </div>
        </div>
    );
}
