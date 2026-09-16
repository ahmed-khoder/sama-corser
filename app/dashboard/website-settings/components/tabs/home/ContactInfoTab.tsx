'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '@/lib/auth-fetch';
import { invalidateContactCache } from '@/hooks/useContactInfo';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, Mail, MapPin, Plus, Trash2, Save, RefreshCw,
    MessageCircle, Building2, GripVertical, CheckCircle2
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────

interface ContactItem {
    key: string;
    valueAr: string;
    valueEn: string;
    extra: {
        raw?: string;
        hasWhatsapp?: boolean;
        type: 'mobile' | 'landline' | 'email' | 'address' | 'office';
        mapsUrl?: string;
    };
    order: number;
}

// ── Default seed data ──────────────────────────────────────

const DEFAULT_ITEMS: ContactItem[] = [
    { key: 'phone1', valueAr: '+20 122 130 0036', valueEn: '+20 122 130 0036', extra: { raw: '201221300036', hasWhatsapp: true, type: 'mobile' }, order: 0 },
    { key: 'phone2', valueAr: '+20 121 175 5925', valueEn: '+20 121 175 5925', extra: { raw: '201211755925', hasWhatsapp: true, type: 'mobile' }, order: 1 },
    { key: 'landline', valueAr: '+20 66 374 4469', valueEn: '+20 66 374 4469', extra: { raw: '20663744469', hasWhatsapp: false, type: 'landline' }, order: 2 },
    { key: 'email', valueAr: 'info@samalogs.com', valueEn: 'info@samalogs.com', extra: { type: 'email' }, order: 3 },
    { key: 'address1', valueAr: '7 أبراج أرض الجولف، حى الشرق، بورسعيد، جمهورية مصر العربية', valueEn: '7 Golf Land Towers, Al-Sharq District, Port Said, Egypt', extra: { type: 'address', mapsUrl: 'https://maps.google.com/?q=7+Golf+Land+Towers+Port+Said+Egypt' }, order: 4 },
    { key: 'address2', valueAr: 'مكتب 12 بساحة النورس، ميناء شرق بورسعيد', valueEn: 'Office 12, Al-Nawras Square, East Port Said Port', extra: { type: 'office', mapsUrl: 'https://maps.google.com/?q=East+Port+Said+Port+Egypt' }, order: 5 },
];

// ── Helper: generate unique key ────────────────────────────

function generateKey(type: string, items: ContactItem[]): string {
    const existing = items.filter(i => i.key.startsWith(type));
    return `${type}${existing.length + 1}`;
}

// ── Component ──────────────────────────────────────────────

export default function ContactInfoTab() {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const [items, setItems] = useState<ContactItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    // ── Load from API ──────────────────────────────────────

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/cms/contact-info');
            const data = await res.json();

            if (Array.isArray(data) && data.length > 0) {
                const parsed: ContactItem[] = data.map((s: any) => {
                    let extra: ContactItem['extra'] = { type: 'mobile' };
                    try { extra = s.extra ? { type: 'mobile', ...JSON.parse(s.extra) } : { type: 'mobile' }; } catch { }
                    return {
                        key: s.key,
                        valueAr: s.valueAr,
                        valueEn: s.valueEn,
                        extra,
                        order: s.order,
                    };
                });
                setItems(parsed.sort((a, b) => a.order - b.order));
            } else {
                // No data yet — use defaults
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
                valueAr: item.valueAr,
                valueEn: item.valueEn,
                extra: JSON.stringify(item.extra),
                order: idx,
            }));

            const res = await authFetch('/api/cms/contact-info', {
                method: 'PUT',
                body: JSON.stringify({ items: payload }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to save');
            }

            // Invalidate client-side cache so all components reload
            invalidateContactCache();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e: any) {
            setError(e.message || 'حدث خطأ أثناء الحفظ');
        } finally {
            setSaving(false);
        }
    };

    // ── Update item field ──────────────────────────────────

    const updateItem = (key: string, field: string, value: any) => {
        setItems(prev => prev.map(item => {
            if (item.key !== key) return item;
            if (field.startsWith('extra.')) {
                const extraField = field.replace('extra.', '');
                return { ...item, extra: { ...item.extra, [extraField]: value } };
            }
            return { ...item, [field]: value };
        }));
    };

    // ── Add new item ───────────────────────────────────────

    const addPhone = () => {
        const newKey = generateKey('phone', items);
        setItems(prev => [...prev, {
            key: newKey,
            valueAr: '',
            valueEn: '',
            extra: { raw: '', hasWhatsapp: false, type: 'mobile' as const },
            order: prev.length,
        }]);
    };

    const addAddress = () => {
        const newKey = generateKey('address', items);
        setItems(prev => [...prev, {
            key: newKey,
            valueAr: '',
            valueEn: '',
            extra: { type: 'address' as const, mapsUrl: '' },
            order: prev.length,
        }]);
    };

    // ── Delete item ────────────────────────────────────────

    const deleteItem = (key: string) => {
        setItems(prev => prev.filter(i => i.key !== key));
    };

    // ── Render ─────────────────────────────────────────────

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 animate-spin text-brand-orange" />
            </div>
        );
    }

    const phones = items.filter(i => i.extra.type === 'mobile' || i.extra.type === 'landline');
    const emailItems = items.filter(i => i.extra.type === 'email');
    const addressItems = items.filter(i => i.extra.type === 'address' || i.extra.type === 'office');

    return (
        <div className="space-y-6">
            {/* Header with save button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {isRTL ? '📞 بيانات التواصل' : '📞 Contact Information'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isRTL
                            ? 'تحرير أرقام الهاتف والبريد الإلكتروني والعناوين — يتم تحديثها تلقائياً في جميع صفحات الموقع'
                            : 'Edit phone numbers, email, and addresses — updates everywhere on the website automatically'}
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

            {/* ═══ Phone Numbers ═══ */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {isRTL ? 'أرقام الهاتف' : 'Phone Numbers'}
                        </h3>
                    </div>
                    <button
                        onClick={addPhone}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {isRTL ? 'إضافة رقم' : 'Add Number'}
                    </button>
                </div>

                {phones.map((item) => (
                    <PhoneRow
                        key={item.key}
                        item={item}
                        isRTL={isRTL}
                        onUpdate={updateItem}
                        onDelete={deleteItem}
                    />
                ))}

                {phones.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                        {isRTL ? 'لا توجد أرقام — اضغط "إضافة رقم"' : 'No numbers — click "Add Number"'}
                    </p>
                )}
            </div>

            {/* ═══ Email ═══ */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                    </h3>
                </div>

                {emailItems.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                        <input
                            type="email"
                            value={item.valueAr}
                            onChange={(e) => {
                                updateItem(item.key, 'valueAr', e.target.value);
                                updateItem(item.key, 'valueEn', e.target.value);
                            }}
                            placeholder="info@example.com"
                            dir="ltr"
                            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none transition-all"
                        />
                    </div>
                ))}
            </div>

            {/* ═══ Addresses ═══ */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-red-500" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {isRTL ? 'العناوين' : 'Addresses'}
                        </h3>
                    </div>
                    <button
                        onClick={addAddress}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {isRTL ? 'إضافة عنوان' : 'Add Address'}
                    </button>
                </div>

                {addressItems.map((item) => (
                    <AddressRow
                        key={item.key}
                        item={item}
                        isRTL={isRTL}
                        onUpdate={updateItem}
                        onDelete={deleteItem}
                    />
                ))}

                {addressItems.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                        {isRTL ? 'لا توجد عناوين — اضغط "إضافة عنوان"' : 'No addresses — click "Add Address"'}
                    </p>
                )}
            </div>

            {/* Info note */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-400">
                💡 {isRTL
                    ? 'بعد الحفظ، سيتم تحديث بيانات التواصل في جميع صفحات الموقع تلقائياً (الفوتر، صفحة تواصل معنا، صفحات الخدمات).'
                    : 'After saving, contact info will be updated across all pages automatically (footer, contact page, service pages).'}
            </div>
        </div>
    );
}

// ── Phone Row ──────────────────────────────────────────────

function PhoneRow({
    item,
    isRTL,
    onUpdate,
    onDelete,
}: {
    item: ContactItem;
    isRTL: boolean;
    onUpdate: (key: string, field: string, value: any) => void;
    onDelete: (key: string) => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700"
        >
            <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />

                {/* Display number */}
                <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                        {isRTL ? 'الرقم (كما يظهر)' : 'Display Number'}
                    </label>
                    <input
                        type="text"
                        value={item.valueAr}
                        onChange={(e) => {
                            onUpdate(item.key, 'valueAr', e.target.value);
                            onUpdate(item.key, 'valueEn', e.target.value);
                        }}
                        placeholder="+20 122 130 0036"
                        dir="ltr"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    />
                </div>

                {/* Raw number for links */}
                <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">
                        {isRTL ? 'الرقم بدون مسافات (للروابط)' : 'Raw Number (for links)'}
                    </label>
                    <input
                        type="text"
                        value={item.extra.raw || ''}
                        onChange={(e) => onUpdate(item.key, 'extra.raw', e.target.value)}
                        placeholder="201221300036"
                        dir="ltr"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Type selector */}
                <div className="flex items-center gap-2">
                    <select
                        value={item.extra.type}
                        onChange={(e) => onUpdate(item.key, 'extra.type', e.target.value)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    >
                        <option value="mobile">{isRTL ? '📱 موبايل' : '📱 Mobile'}</option>
                        <option value="landline">{isRTL ? '☎️ أرضي' : '☎️ Landline'}</option>
                    </select>
                </div>

                {/* WhatsApp toggle */}
                {(item.extra.type === 'mobile') && (
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={!!item.extra.hasWhatsapp}
                            onChange={(e) => onUpdate(item.key, 'extra.hasWhatsapp', e.target.checked)}
                            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        <MessageCircle className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-green-600">
                            {isRTL ? 'واتساب' : 'WhatsApp'}
                        </span>
                    </label>
                )}

                <div className="flex-1" />

                {/* Delete */}
                <button
                    onClick={() => onDelete(item.key)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={isRTL ? 'حذف' : 'Delete'}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

// ── Address Row ────────────────────────────────────────────

function AddressRow({
    item,
    isRTL,
    onUpdate,
    onDelete,
}: {
    item: ContactItem;
    isRTL: boolean;
    onUpdate: (key: string, field: string, value: any) => void;
    onDelete: (key: string) => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700 space-y-3"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                    <select
                        value={item.extra.type}
                        onChange={(e) => onUpdate(item.key, 'extra.type', e.target.value)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    >
                        <option value="address">{isRTL ? '📍 عنوان رئيسي' : '📍 Main Address'}</option>
                        <option value="office">{isRTL ? '🏢 مكتب / فرع' : '🏢 Office / Branch'}</option>
                    </select>
                </div>
                <button
                    onClick={() => onDelete(item.key)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                        {isRTL ? 'العنوان بالعربي' : 'Address (Arabic)'}
                    </label>
                    <input
                        type="text"
                        value={item.valueAr}
                        onChange={(e) => onUpdate(item.key, 'valueAr', e.target.value)}
                        placeholder={isRTL ? 'العنوان بالعربي' : 'Arabic address'}
                        dir="rtl"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                        {isRTL ? 'العنوان بالإنجليزي' : 'Address (English)'}
                    </label>
                    <input
                        type="text"
                        value={item.valueEn}
                        onChange={(e) => onUpdate(item.key, 'valueEn', e.target.value)}
                        placeholder={isRTL ? 'العنوان بالإنجليزي' : 'English address'}
                        dir="ltr"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-gray-500 mb-1 block">
                    {isRTL ? 'رابط خرائط Google' : 'Google Maps URL'}
                </label>
                <input
                    type="url"
                    value={item.extra.mapsUrl || ''}
                    onChange={(e) => onUpdate(item.key, 'extra.mapsUrl', e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    dir="ltr"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange outline-none"
                />
            </div>
        </motion.div>
    );
}
