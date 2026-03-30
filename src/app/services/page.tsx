'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './services.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */
const LAYOUT_IMG = '/assets/Layout_page.png';

interface SubEvent {
    id: string;
    title: string;
    image: string;
}

interface ServiceCategory {
    id: string;
    num: string;
    title: string;
    tagline: string;
    desc: string;
    events: SubEvent[];
}

const services: ServiceCategory[] = [
    {
        id: 'corporate', num: '01', title: 'Corporate',
        tagline: 'Strategy meets spectacle',
        desc: 'We elevate corporate gatherings into powerful brand moments. Annual conferences, conclaves, town halls, leadership summits — every element is crafted to reinforce your brand identity, engage your audience, and deliver measurable results.',
        events: [
            { id: 'corp-1', title: 'Annual Conference', image: LAYOUT_IMG },
            { id: 'corp-2', title: 'Leadership Summit', image: LAYOUT_IMG },
            { id: 'corp-3', title: 'Awards Night', image: LAYOUT_IMG },
            { id: 'corp-4', title: 'Team Offsite', image: LAYOUT_IMG },
            { id: 'corp-5', title: 'Product Launch Party', image: LAYOUT_IMG },
            { id: 'corp-6', title: 'Gala Dinner', image: LAYOUT_IMG },
        ],
    },
    {
        id: 'special', num: '02', title: 'Special',
        tagline: 'Moments that become memories',
        desc: 'Life\'s most meaningful occasions deserve flawless execution. Whether it\'s a grand gala, a cultural celebration, a charity ball, or a milestone anniversary — we design experiences tailored to the emotion and significance of the moment.',
        events: [
            { id: 'spl-1', title: 'Gala Night', image: LAYOUT_IMG },
            { id: 'spl-2', title: 'Cultural Festival', image: LAYOUT_IMG },
            { id: 'spl-3', title: 'Charity Ball', image: LAYOUT_IMG },
            { id: 'spl-4', title: 'Anniversary Celebration', image: LAYOUT_IMG },
            { id: 'spl-5', title: 'Theme Party', image: LAYOUT_IMG },
            { id: 'spl-6', title: 'VIP Reception', image: LAYOUT_IMG },
        ],
    },
    {
        id: 'launch', num: '03', title: 'Launch',
        tagline: 'First impressions, perfected',
        desc: 'A product launch is your brand\'s most critical moment. We craft immersive reveal experiences — from intimate media previews to large-scale public launches — that generate buzz, drive coverage, and leave your audience wanting more.',
        events: [
            { id: 'lnch-1', title: 'Product Unveiling', image: LAYOUT_IMG },
            { id: 'lnch-2', title: 'Store Opening', image: LAYOUT_IMG },
            { id: 'lnch-3', title: 'Press Conference', image: LAYOUT_IMG },
            { id: 'lnch-4', title: 'Brand Activation', image: LAYOUT_IMG },
            { id: 'lnch-5', title: 'Pop-Up Experience', image: LAYOUT_IMG },
            { id: 'lnch-6', title: 'Digital Launch Event', image: LAYOUT_IMG },
        ],
    },
    {
        id: 'music', num: '04', title: 'Music',
        tagline: 'Sonic experiences that move crowds',
        desc: 'From intimate acoustic evenings to stadium-filling concerts, we design and execute music events that resonate. Our team handles artist management, stage production, sound engineering, crowd flow, and everything in between.',
        events: [
            { id: 'mus-1', title: 'Live Concert', image: LAYOUT_IMG },
            { id: 'mus-2', title: 'Music Festival', image: LAYOUT_IMG },
            { id: 'mus-3', title: 'Acoustic Night', image: LAYOUT_IMG },
            { id: 'mus-4', title: 'DJ Night', image: LAYOUT_IMG },
            { id: 'mus-5', title: 'Album Launch', image: LAYOUT_IMG },
            { id: 'mus-6', title: 'Band Performance', image: LAYOUT_IMG },
        ],
    },
    {
        id: 'sports', num: '05', title: 'Sports',
        tagline: 'Where champions are celebrated',
        desc: 'We bring the energy of sport to life — from corporate sports days and marathons to championship award ceremonies and league launches. Precision logistics, broadcast-ready production, and electrifying atmospheres are our standard.',
        events: [
            { id: 'spt-1', title: 'Cricket Tournament', image: LAYOUT_IMG },
            { id: 'spt-2', title: 'Marathon Event', image: LAYOUT_IMG },
            { id: 'spt-3', title: 'Sports Day', image: LAYOUT_IMG },
            { id: 'spt-4', title: 'Award Ceremony', image: LAYOUT_IMG },
            { id: 'spt-5', title: 'League Launch', image: LAYOUT_IMG },
            { id: 'spt-6', title: 'Fitness Challenge', image: LAYOUT_IMG },
        ],
    },
    {
        id: 'wedding', num: '06', title: 'Wedding',
        tagline: 'Love stories brought to life',
        desc: 'Every love story is unique — and your wedding should be too. Our wedding specialists craft each detail from florals and décor to catering, entertainment, and guest experience, creating celebrations that reflect your story.',
        events: [
            { id: 'wed-1', title: 'Destination Wedding', image: LAYOUT_IMG },
            { id: 'wed-2', title: 'Grand Reception', image: LAYOUT_IMG },
            { id: 'wed-3', title: 'Sangeet Night', image: LAYOUT_IMG },
            { id: 'wed-4', title: 'Haldi Ceremony', image: LAYOUT_IMG },
            { id: 'wed-5', title: 'Engagement Party', image: LAYOUT_IMG },
            { id: 'wed-6', title: 'Intimate Ceremony', image: LAYOUT_IMG },
        ],
    },
];

/* Gallery images — 12 placeholders */
const galleryImages = Array.from({ length: 12 }, (_, i) => ({
    id: `gal-${i}`,
    src: LAYOUT_IMG,
    alt: `Event photo ${i + 1}`,
}));

/* ────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────── */
const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pageVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.25 } },
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
    initial: { opacity: 0, y: 50, scale: 0.93 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

/* ────────────────────────────────────────────
   URL HASH HELPERS (persist state across refresh)
   ──────────────────────────────────────────── */
function getStateFromHash(): { view: 'categories' | 'events' | 'gallery'; catIndex: number; eventId: string | null } {
    if (typeof window === 'undefined') return { view: 'categories', catIndex: 0, eventId: null };
    const hash = window.location.hash.slice(1); // remove #
    if (!hash) return { view: 'categories', catIndex: 0, eventId: null };
    const params = new URLSearchParams(hash);
    const view = params.get('v') as 'categories' | 'events' | 'gallery' || 'categories';
    const catIndex = parseInt(params.get('c') || '0', 10);
    const eventId = params.get('e') || null;
    return { view, catIndex, eventId };
}

function setHash(view: string, catIndex: number, eventId?: string | null) {
    const params = new URLSearchParams();
    params.set('v', view);
    params.set('c', String(catIndex));
    if (eventId) params.set('e', eventId);
    window.location.hash = params.toString();
}

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */
type View = 'categories' | 'events' | 'gallery';

export default function ServicesPage() {
    const [view, setView] = useState<View>('categories');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<SubEvent | null>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [mounted, setMounted] = useState(false);

    /* Lightbox state */
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    /* Gallery GSAP refs */
    const galleryTrackRef = useRef<HTMLDivElement>(null);
    const gallerySectionRef = useRef<HTMLDivElement>(null);

    /* ── Restore state from URL hash on mount ── */
    useEffect(() => {
        const state = getStateFromHash();
        setActiveIndex(state.catIndex);
        setView(state.view);
        if (state.eventId && state.view === 'gallery') {
            const cat = services[state.catIndex];
            const ev = cat?.events.find(e => e.id === state.eventId);
            if (ev) setSelectedEvent(ev);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeCategory = services[activeIndex];

    /* ── Navigation handlers (all update URL hash) ── */
    const handleViewEvents = useCallback(() => {
        setView('events');
        setHash('events', activeIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeIndex]);

    const handleSelectEvent = useCallback((ev: SubEvent) => {
        setSelectedEvent(ev);
        setView('gallery');
        setHash('gallery', activeIndex, ev.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeIndex]);

    const handleBackToCategories = useCallback(() => {
        setView('categories');
        setSelectedEvent(null);
        setHash('categories', activeIndex);
    }, [activeIndex]);

    const handleBackToEvents = useCallback(() => {
        setView('events');
        setSelectedEvent(null);
        setHash('events', activeIndex);
    }, [activeIndex]);

    const handleCategoryClick = useCallback((i: number) => {
        setActiveIndex(i);
        if (view !== 'categories') {
            setView('events');
            setSelectedEvent(null);
            setHash('events', i);
        } else {
            setHash('categories', i);
        }
    }, [view]);

    /* Lightbox handlers */
    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const lightboxPrev = useCallback(() => {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }, []);

    const lightboxNext = useCallback(() => {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    }, []);

    /* Keyboard navigation for lightbox */
    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'ArrowRight') lightboxNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);

    /* ── GSAP ScrollTrigger: horizontal scroll gallery ── */
    useEffect(() => {
        if (view !== 'gallery' || !mounted) return;

        // Wait for DOM to render
        const raf = requestAnimationFrame(() => {
            const track = galleryTrackRef.current;
            const section = gallerySectionRef.current;
            if (!track || !section) return;

            // Kill any existing ScrollTrigger instances in this context
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === section) st.kill();
            });

            const totalScroll = track.scrollWidth - window.innerWidth;

            const tween = gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${totalScroll}`,
                    invalidateOnRefresh: true,
                },
            });

            // Store cleanup
            return () => {
                tween.kill();
                ScrollTrigger.getAll().forEach(st => {
                    if (st.vars.trigger === section) st.kill();
                });
            };
        });

        return () => {
            cancelAnimationFrame(raf);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [view, selectedEvent, mounted]);

    /* Don't render until hash state is restored */
    if (!mounted) return null;

    return (
        <main className={styles.mainContainer}>
            <div className={styles.bgOverlay} />

            <AnimatePresence mode="wait">

                {/* ═══════ LEVEL 1: Categories (sidebar + glass card) ═══════ */}
                {view === 'categories' && (
                    <motion.div key="level-categories" {...pageVariants} className={styles.categoriesLayout}>
                        <aside className={styles.sidebar}>
                            <p className={styles.navLabel}>Our Expertise</p>
                            <nav className={styles.navList}>
                                {services.map((s, i) => (
                                    <button
                                        key={s.id}
                                        className={`${styles.navItem} ${i === activeIndex ? styles.navItemActive : ''}`}
                                        onMouseEnter={() => { if (!isMobile) setActiveIndex(i); }}
                                        onClick={() => handleCategoryClick(i)}
                                    >
                                        <span className={styles.navNum}>{s.num}</span>
                                        <span className={styles.navText}>{s.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        <div className={styles.detailCol}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.45, ease: easeOut }}
                                    className={styles.glassCard}
                                >
                                    <span className={styles.cardNum}>{activeCategory.num}.</span>
                                    <h2 className={styles.cardTitle}>{activeCategory.title} Events</h2>
                                    <p className={styles.cardTagline}>{activeCategory.tagline}</p>
                                    <div className={styles.cardDivider} />
                                    <p className={styles.cardDesc}>{activeCategory.desc}</p>
                                    <button className={styles.ctaBtn} onClick={handleViewEvents}>
                                        View Events <HiArrowRight />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* ═══════ LEVEL 2: Sub-Event Cards (full page) ═══════ */}
                {view === 'events' && (
                    <motion.div key="level-events" {...pageVariants} className={styles.fullPage}>
                        <div className={styles.eventsHeader}>
                            <button className={styles.backBtn} onClick={handleBackToCategories}>
                                <HiArrowLeft /> Back to Services
                            </button>
                            <h2 className={styles.eventsTitle}>{activeCategory.title} <span className={styles.eventsTitleGold}>Events</span></h2>
                            <p className={styles.eventsSubtitle}>{activeCategory.tagline}</p>
                        </div>

                        <motion.div
                            className={styles.eventsGrid}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {activeCategory.events.map((ev) => (
                                <motion.div
                                    key={ev.id}
                                    className={styles.eventCard}
                                    variants={cardVariant}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    onClick={() => handleSelectEvent(ev)}
                                >
                                    <div className={styles.eventCardImgWrap}>
                                        <img src={ev.image} alt={ev.title} className={styles.eventCardImg} />
                                        <div className={styles.eventCardOverlay} />
                                    </div>
                                    <div className={styles.eventCardInfo}>
                                        <h3 className={styles.eventCardTitle}>{ev.title}</h3>
                                        <span className={styles.eventCardArrow}><HiArrowRight /></span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* ═══════ LEVEL 3: Gallery (GSAP pinned horizontal scroll) ═══════
                Rendered OUTSIDE AnimatePresence so GSAP pin is not disrupted */}
            {view === 'gallery' && selectedEvent && (
                <section className={styles.gallerySection} ref={gallerySectionRef}>
                    <div className={styles.galleryStickyWrap}>
                        <div className={styles.galleryHeader}>
                            <button className={styles.backBtn} onClick={handleBackToEvents}>
                                <HiArrowLeft /> Back to {activeCategory.title} Events
                            </button>
                            <h2 className={styles.galleryTitle}>{selectedEvent.title}</h2>
                            <p className={styles.galleryHint}>Scroll down to browse photos →</p>
                        </div>

                        <div className={styles.galleryTrack} ref={galleryTrackRef}>
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={styles.galleryItem}
                                    onClick={() => openLightbox(idx)}
                                >
                                    <img src={img.src} alt={img.alt} className={styles.galleryImg} draggable={false} />
                                    <div className={styles.galleryImgOverlay} />
                                    <div className={styles.galleryZoomIcon}>🔍</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ LIGHTBOX OVERLAY ═══════ */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.lightboxBackdrop} onClick={closeLightbox} />

                        <button className={styles.lightboxClose} onClick={closeLightbox}>
                            <HiX />
                        </button>

                        <button className={styles.lightboxArrow} data-dir="left" onClick={lightboxPrev}>
                            <HiChevronLeft />
                        </button>

                        <motion.div
                            className={styles.lightboxContent}
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={galleryImages[lightboxIndex].src}
                                alt={galleryImages[lightboxIndex].alt}
                                className={styles.lightboxImg}
                                draggable={false}
                            />
                        </motion.div>

                        <button className={styles.lightboxArrow} data-dir="right" onClick={lightboxNext}>
                            <HiChevronRight />
                        </button>

                        <div className={styles.lightboxCounter}>
                            {lightboxIndex + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
