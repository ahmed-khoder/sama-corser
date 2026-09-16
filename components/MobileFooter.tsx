'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin,
    ChevronDown, ArrowLeft, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContactInfo } from '@/hooks/useContactInfo';
import { useSocialLinks, SocialPlatform } from '@/hooks/useSocialLinks';
import Link from 'next/link';
import DynamicLogo from './DynamicLogo';


// ══════════════════════════════════════════════════════════════
// Hapag-Lloyd style outlined social media SVG icons (mobile)
// Outline / Line Art — thin uniform orange strokes, no fill
// ══════════════════════════════════════════════════════════════

// Facebook: Rounded square with "f" — stem merges with borders
const HLFacebookIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4h24a6 6 0 016 6v24a6 6 0 01-6 6H24V24h6l1-6h-7v-3c0-2 1-3 3-3h3V6h-4c-5 0-8 3-8 8v4h-5v6h5v12H10a6 6 0 01-6-6V10a6 6 0 016-6z" />
  </svg>
);

// LinkedIn: Thick hollow outlined "in" block letters — no box
const HLLinkedInIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3.5" strokeWidth="2" />
    <rect x="5.5" y="15" width="7" height="20" rx="1.5" strokeWidth="2" />
    <path d="M18.5 35V24c0-5.5 3-9 8.5-9 5.5 0 8.5 3.5 8.5 9v11h-7V25c0-2-1.2-3.2-3.2-3.2h-.6c-2 0-3.2 1.2-3.2 3.2v10z" strokeWidth="2" />
    <line x1="18.5" y1="15" x2="18.5" y2="35" strokeWidth="2" />
  </svg>
);

// Instagram: Squircle, center circle, top-right dot
const HLInstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="32" height="32" rx="10" />
    <circle cx="20" cy="20" r="7.5" />
    <circle cx="30" cy="10" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

// TikTok: Thick outlined musical note — actual TikTok brand shape
const HLTikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 5v20.5a8 8 0 11-8-8" />
    <path d="M22 5c0 5 3.5 8 8 8" />
    <path d="M22 11c0 2.5 1.8 4.5 4 5" />
  </svg>
);

// WhatsApp: Official outline speech bubble with telephone handset
const HLWhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Twitter / X: Modern minimal outline
const HLTwitterIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l6.5 8.5M4 20l6.5-8.5m0 0L20 4M10.5 12.5L20 20" />
  </svg>
);

// YouTube: Outlined rounded rectangle with play triangle
const HLYoutubeIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 010-10 2 2 0 011.4-1.4 49.56 49.56 0 0116.2 0A2 2 0 0121.5 7a24.12 24.12 0 010 10 2 2 0 01-1.4 1.4 49.55 49.55 0 01-16.2 0A2 2 0 012.5 17" />
    <path d="M10 15V9l5 3-5 3z" />
  </svg>
);

// Snapchat: Ghost outline
const HLSnapchatIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.5 2 6 4.5 6 8v2c-1 0-2 .5-2 1s1 1 2 1c-.5 2-2 3-4 4 0 .5.5 1 2 1 .5 0 1 0 1.5.5S7 19 8 19.5c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5c1-.5 1.5-1 2-1.5s1-.5 1.5-.5c1.5 0 2-.5 2-1-2-1-3.5-2-4-4 1 0 2-.5 2-1s-1-1-2-1V8c0-3.5-2.5-6-6-6z" />
  </svg>
);

// Generic Link / Web icon fallback
const HLLinkIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
// MOBILE FOOTER — Shown only on md:hidden
// Dark navy, orange accents, accordion sections
// ⚠️ This is a NEW component — does NOT modify the existing Footer.
// ══════════════════════════════════════════════════════════════

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 dark:border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="text-sm font-bold text-gray-900 dark:text-white">{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4 text-brand-orange" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MobileFooterLink({ href, label, isRTL }: { href: string; label: string; isRTL: boolean }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors"
        >
            {isRTL
                ? <ArrowLeft className="w-3 h-3 text-brand-orange/50" />
                : <ArrowRight className="w-3 h-3 text-brand-orange/50" />
            }
            <span>{label}</span>
        </Link>
    );
}

// Expandable nav item — parent link always visible, chevron toggles sub-links
function NavExpandable({ label, href, isRTL, children }: {
    label: string;
    href: string;
    isRTL: boolean;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
                <Link
                    href={href}
                    className="flex-1 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-orange transition-colors"
                >
                    {label}
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -me-2"
                    aria-label="Toggle submenu"
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ChevronDown className="w-4 h-4 text-brand-orange" />
                    </motion.div>
                </button>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-3 ps-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

export default function MobileFooter() {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const year = new Date().getFullYear();

    // Dynamic services (same logic as original footer)
    const [services, setServices] = useState<any[]>([]);
    useEffect(() => {
        try {
            const cached = sessionStorage.getItem('footer_services');
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 5 * 60 * 1000) {
                    setServices(data);
                    return;
                }
            }
        } catch { }

        fetch('/api/cms/services')
            .then(res => res.json())
            .then(data => {
                const activeServices = data.filter((s: any) => s.isActive);
                setServices(activeServices);
                try {
                    sessionStorage.setItem('footer_services', JSON.stringify({
                        data: activeServices,
                        timestamp: Date.now()
                    }));
                } catch { }
            })
            .catch(() => { });
    }, []);

    return (
        <footer className="md:hidden bg-white dark:bg-[#0B1929] text-gray-900 dark:text-white">

            {/* ── Logo + Description ──────────────────────────── */}
            <div className="px-6 pt-10 pb-6">
                <Link href="/" className="inline-block mb-4">
                    <DynamicLogo className="h-10 w-40" />
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {isRTL
                        ? 'شريكك الموثوق في الحلول اللوجستية المتكاملة. خدمات شحن بحري وجوي وبري وتخليص جمركي بأعلى معايير الجودة.'
                        : 'Your trusted partner in integrated logistics. Sea, air & land freight with customs clearance at the highest quality standards.'}
                </p>

                {/* Dynamic Social Icons */}
                <DynamicMobileSocialIcons />
            </div>

            {/* ── Divider ────────────────────────────────────── */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-brand-orange/30 to-transparent" />

            {/* ── Navigation Links ──────────────────────────── */}
            <nav className="px-6 py-4">
                <ul className="space-y-0">

                    {/* الرئيسية — plain link */}
                    <li className="border-b border-gray-200 dark:border-white/10">
                        <Link href="/" className="flex items-center gap-2 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-orange transition-colors">
                            {t('home')}
                        </Link>
                    </li>

                    {/* خدماتنا — expandable */}
                    <NavExpandable
                        label={isRTL ? 'خدماتنا' : 'Our Services'}
                        href="/services"
                        isRTL={isRTL}
                    >
                        {services.map((service) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors"
                            >
                                {isRTL
                                    ? <ArrowLeft className="w-3 h-3 text-brand-orange/40" />
                                    : <ArrowRight className="w-3 h-3 text-brand-orange/40" />
                                }
                                {isRTL ? service.titleAr : service.titleEn}
                            </Link>
                        ))}
                        {services.length === 0 && (
                            <p className="text-xs text-gray-500 py-2">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
                        )}
                    </NavExpandable>

                    {/* عن الشركة — expandable */}
                    <NavExpandable
                        label={isRTL ? 'عن الشركة' : 'About Us'}
                        href="/about"
                        isRTL={isRTL}
                    >
                        <Link href="/about" className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors">
                            {isRTL ? <ArrowLeft className="w-3 h-3 text-brand-orange/40" /> : <ArrowRight className="w-3 h-3 text-brand-orange/40" />}
                            {isRTL ? 'من نحن' : 'Who We Are'}
                        </Link>
                        <Link href="/about#vision" className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors">
                            {isRTL ? <ArrowLeft className="w-3 h-3 text-brand-orange/40" /> : <ArrowRight className="w-3 h-3 text-brand-orange/40" />}
                            {isRTL ? 'رؤيتنا ورسالتنا' : 'Vision & Mission'}
                        </Link>
                        <Link href="/about#team" className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-orange transition-colors">
                            {isRTL ? <ArrowLeft className="w-3 h-3 text-brand-orange/40" /> : <ArrowRight className="w-3 h-3 text-brand-orange/40" />}
                            {isRTL ? 'فريق العمل' : 'Our Team'}
                        </Link>
                    </NavExpandable>

                    {/* الوظائف — plain link */}
                    <li className="border-b border-gray-200 dark:border-white/10">
                        <Link href="/careers" className="flex items-center gap-2 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-orange transition-colors">
                            {isRTL ? 'الوظائف' : 'Careers'}
                        </Link>
                    </li>

                    {/* المدونة — plain link */}
                    <li className="border-b border-gray-200 dark:border-white/10">
                        <Link href="/blog" className="flex items-center gap-2 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-orange transition-colors">
                            {t('blog') || (isRTL ? 'المدونة' : 'Blog')}
                        </Link>
                    </li>

                    {/* تواصل معنا — plain link */}
                    <li className="border-b border-gray-200 dark:border-white/10">
                        <Link href="/contact" className="flex items-center gap-2 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-orange transition-colors">
                            {t('contact')}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* ── Contact Info — Dynamic ────────────────────────────────── */}
            <div className="px-6 pb-2">
                <DynamicMobileContactInfo isRTL={isRTL} />
            </div>



            {/* ── Copyright ──────────────────────────────────── */}
            <div className="mx-6 pt-5 pb-6">
                <p className="text-center text-xs text-gray-500">
                    © {year} SAMA Logistics. {t('copyright')}
                </p>
                <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                    <Link href="#" className="hover:text-brand-orange transition-colors">
                        {isRTL ? 'سياسة الخصوصية' : 'Privacy'}
                    </Link>
                    <span className="text-gray-300 dark:text-gray-700">|</span>
                    <Link href="#" className="hover:text-brand-orange transition-colors">
                        {isRTL ? 'شروط الخدمة' : 'Terms'}
                    </Link>
                </div>
            </div>
        </footer>
    );
}

// ── Dynamic Contact Info for Mobile Footer ─────────────────
function DynamicMobileContactInfo({ isRTL }: { isRTL: boolean }) {
    const { phones, emails, addresses } = useContactInfo();
    const mobilePhones = phones.filter(p => p.type === 'mobile');
    const landlinePhones = phones.filter(p => p.type === 'landline');

    return (
        <div className="space-y-3">
            {/* Mobile phones with WhatsApp */}
            {mobilePhones.length > 0 && (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange/15 to-green-500/15 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                        {mobilePhones.map((phone, idx) => (
                            <div key={phone.key} className={`flex items-center gap-1.5${idx > 0 ? '' : ' mb-1'}`} dir="ltr">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.display}</span>
                                <a href={`tel:+${phone.raw}`} className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange active:scale-90 transition-transform"><Phone className="w-3.5 h-3.5" /></a>
                                {phone.hasWhatsapp && (
                                    <a href={`https://wa.me/${phone.raw}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 active:scale-90 transition-transform"><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Landline phones */}
            {landlinePhones.map((phone) => (
                <div key={phone.key} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5" dir="ltr">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{phone.display}</span>
                            <a href={`tel:+${phone.raw}`} className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange active:scale-90 transition-transform"><Phone className="w-3.5 h-3.5" /></a>
                        </div>
                    </div>
                </div>
            ))}

            {/* Emails */}
            {emails.map((email) => (
                <a key={email.key} href={`mailto:${email.value}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-brand-orange transition-colors">
                            {email.value}
                        </span>
                    </div>
                </a>
            ))}

            {/* Addresses */}
            {addresses.map((addr) => (
                <a
                    key={addr.key}
                    href={addr.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-brand-orange transition-colors">
                            {isRTL ? addr.textAr : addr.textEn}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
}

// ── Dynamic Social Icons for Mobile Footer ──────────────────
function DynamicMobileSocialIcons() {
    const { links } = useSocialLinks();

    // Map platform to icon component
    const getIconForPlatform = (platform: SocialPlatform) => {
        switch (platform) {
            case 'facebook': return <HLFacebookIcon className="w-7 h-7" />;
            case 'linkedin': return <HLLinkedInIcon className="w-7 h-7" />;
            case 'instagram': return <HLInstagramIcon className="w-7 h-7" />;
            case 'tiktok': return <HLTikTokIcon className="w-7 h-7" />;
            case 'whatsapp': return <HLWhatsAppIcon className="w-7 h-7" />;
            case 'twitter': return <HLTwitterIcon className="w-7 h-7" />;
            case 'youtube': return <HLYoutubeIcon className="w-7 h-7" />;
            case 'snapchat': return <HLSnapchatIcon className="w-7 h-7" />;
            default: return <HLLinkIcon className="w-7 h-7" />;
        }
    };

    // Filter active links with valid URLs
    const activeLinks = links.filter(l => l.isActive && l.url && l.url !== '#');

    return (
        <div className="flex items-center gap-1 mt-5">
            {activeLinks.map((link) => (
                <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center text-brand-orange hover:bg-brand-orange/10 rounded-xl transition-colors"
                    title={link.label}
                >
                    {getIconForPlatform(link.platform)}
                </a>
            ))}
        </div>
    );
}
