'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './services.module.css';
import ServicesGrid from '@/components/ServicesGrid';

gsap.registerPlugin(ScrollTrigger);
//changes

const LAYOUT_IMG = '/assets/Layout_page.png';

import { services, type SubEvent, type ServiceCategory } from '@/data/servicesData';

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

function setHash(router: any, view: string, catIndex: number, eventId?: string | null) {
    const params = new URLSearchParams();
    params.set('v', view);
    params.set('c', String(catIndex));
    if (eventId) params.set('e', eventId);
    router.replace(`#${params.toString()}`, { scroll: false });
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

    const activeCategory = services[activeIndex] || services[0];
    const categoryImages = selectedEvent?.allImages || [];

    const router = useRouter();

    /* ── Navigation handlers (all update URL hash) ── */
    const handleViewEvents = useCallback(() => {
        setView('events');
        setHash(router, 'events', activeIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeIndex, router]);

    const handleSelectEvent = useCallback((ev: SubEvent) => {
        setSelectedEvent(ev);
        setView('gallery');
        setHash(router, 'gallery', activeIndex, ev.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeIndex, router]);

    const handleBackToCategories = useCallback(() => {
        setView('categories');
        setSelectedEvent(null);
        setHash(router, 'categories', activeIndex);
    }, [activeIndex, router]);

    const handleBackToEvents = useCallback(() => {
        setView('events');
        setSelectedEvent(null);
        setHash(router, 'events', activeIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeIndex, router]);

    const handleCategoryClick = useCallback((i: number) => {
        setActiveIndex(i);
        setView('events');
        setSelectedEvent(null);
        setHash(router, 'events', i);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [router]);

    /* Lightbox handlers */
    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const lightboxPrev = useCallback(() => {
        setLightboxIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length);
    }, [categoryImages.length]);

    const lightboxNext = useCallback(() => {
        setLightboxIndex((prev) => (prev + 1) % categoryImages.length);
    }, [categoryImages.length]);

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

    /* ── No longer using GSAP horizontal scroll ── */

    /* Don't render until hash state is restored */
    if (!mounted) return null;

    return (
        <main className={styles.mainContainer}>
            <div className={styles.bgOverlay} />

            <AnimatePresence mode="wait">

                {/* ═══════ LEVEL 1: Categories (sidebar + glass card) ═══════ */}
                {view === 'categories' && (
                    <motion.div key="level-categories" {...pageVariants} className={styles.gridPageLayout}>
                        <div className={styles.gridPageHeader}>
                            <h1 className={styles.gridPageTitle}>Our <span style={{ color: 'var(--color-accent-gold, #d4af37)' }}>Expertise</span></h1>
                            <p className={styles.gridPageSubtitle}>Discover the diverse range of events we meticulously craft to perfection.</p>
                        </div>
                        <div className={styles.gridWrapper}>
                            <ServicesGrid 
                                categories={services.map(s => ({
                                    id: s.id,
                                    title: `${s.title} Events`,
                                    image: s.bgImage
                                }))}
                                onCategoryClick={handleCategoryClick}
                            />
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
                                        <Image
                                            src={ev.image}
                                            alt={ev.title}
                                            width={600}
                                            height={450}
                                            className={styles.eventCardImg}
                                            loading="lazy"
                                        />
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

            {view === 'gallery' && selectedEvent && (
                <section className={styles.galleryPage}>
                    <div className={styles.galleryContainer}>
                        <div className={styles.galleryHeader}>
                            <button className={styles.backBtn} onClick={handleBackToEvents}>
                                <HiArrowLeft /> Back to {activeCategory.title} Events
                            </button>
                            <div className={styles.galleryTitles}>
                                <h2 className={styles.galleryTitle}>{selectedEvent.title}</h2>
                                <p className={styles.gallerySubtitle}>SCROLL DOWN TO BROWSE PHOTOS →</p>
                            </div>
                        </div>

                        <div className={styles.galleryMasonry}>
                            {selectedEvent.allImages.map((src, idx) => (
                                <div
                                    key={`${selectedEvent.id}-img-${idx}`}
                                    className={styles.galleryMasonryItem}
                                    onClick={() => openLightbox(idx)}
                                >
                                    <Image
                                        src={src}
                                        alt={`${selectedEvent.title} photo ${idx + 1}`}
                                        width={500}
                                        height={500}
                                        className={styles.galleryImg}
                                        draggable={false}
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
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
                            <Image
                                src={categoryImages[lightboxIndex]}
                                alt={`${selectedEvent?.title} peak`}
                                fill
                                className={styles.lightboxImg}
                                draggable={false}
                                priority
                                sizes="85vw"
                                style={{ objectFit: 'contain' }}
                            />
                        </motion.div>

                        <button className={styles.lightboxArrow} data-dir="right" onClick={lightboxNext}>
                            <HiChevronRight />
                        </button>

                        <div className={styles.lightboxCounter}>
                            {lightboxIndex + 1} / {categoryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
