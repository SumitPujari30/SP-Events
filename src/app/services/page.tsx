'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiX, HiChevronLeft, HiChevronRight, HiRefresh } from 'react-icons/hi';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './services.module.css';
import ServicesGrid from '@/components/ServicesGrid';

const DeckCard = ({ src, index, deckIndex, setDeckIndex, isTop, totalCards, openLightbox, registerInteraction }: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const offsetIndex = index - deckIndex;
    const isUnder = offsetIndex > 0;
    const isSwiped = offsetIndex < 0;
    
    const staticScale = isUnder ? Math.max(0.85, 1 - offsetIndex * 0.05) : 1;
    const staticY = isUnder ? offsetIndex * 15 : 0;
    const seedRotate = (index % 7 - 3) * 2; 

    const rotate = useTransform(x, [-200, 200], [-15, 15]);

    const handleDragStart = () => {
        if (registerInteraction) registerInteraction();
    };

    const handleDragEnd = (event: any, info: any) => {
        if (registerInteraction) registerInteraction();
        const offset = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
        const velocity = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
        if (offset > 120 || velocity > 500) {
            setDeckIndex(deckIndex + 1);
        }
    };

    return (
        <motion.div
            style={{
                position: 'absolute',
                inset: 0,
                x: isTop ? x : 0,
                y: isTop ? y : staticY,
                rotate: isTop && !isSwiped ? rotate : seedRotate,
                scale: staticScale,
                zIndex: totalCards - index,
                cursor: isTop ? 'grab' : 'auto',
                pointerEvents: isSwiped ? 'none' : 'auto',
            }}
            drag={isTop}
            dragElastic={1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
            animate={isSwiped ? {
                x: x.get() !== 0 ? (x.get() >= 0 ? 1000 : -1000) : 0,     // Keep horizontal position steady if auto-swiped
                y: y.get() !== 0 ? (y.get() >= 0 ? 1000 : -1000) : -1000, // Always glide UP gracefully if auto-swiped
                opacity: 0,
                scale: 0.85,
                transition: { duration: 0.8, ease: 'easeInOut' } // Slower, elegant slide out
            } : {
                x: 0,
                y: isTop ? 0 : staticY,
                rotate: isTop ? 0 : seedRotate,
                opacity: 1,
                scale: staticScale,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 1 }} // Much softer, smoother arrival for the next image
            className={styles.deckCardWrapper}
        >
            <div 
                className={styles.deckCardInner} 
                onClick={() => { if (isTop && Math.abs(x.get()) < 5 && Math.abs(y.get()) < 5) openLightbox(index); }}
            >
                <Image src={src} alt={`Deck Image ${index}`} fill className={styles.deckCardImage} draggable={false} sizes="(max-width: 768px) 90vw, 50vw" priority={index < 3} />
            </div>
        </motion.div>
    );
};

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
    const [deckIndex, setDeckIndex] = useState(0);

    /* Lightbox state */
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    /* Gallery GSAP refs & Interaction */
    const galleryTrackRef = useRef<HTMLDivElement>(null);
    const gallerySectionRef = useRef<HTMLDivElement>(null);
    const lastInteractionRef = useRef<number>(Date.now());

    const registerInteraction = useCallback(() => {
        lastInteractionRef.current = Date.now();
    }, []);

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
        setDeckIndex(0);
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

    /* Autoplay slideshow for the gallery deck */
    useEffect(() => {
        if (view !== 'gallery' || !selectedEvent || lightboxOpen) return;
        
        lastInteractionRef.current = Date.now(); // Reset timer when gallery opens

        const autoplayTimer = setInterval(() => {
            const timeSinceInteraction = Date.now() - lastInteractionRef.current;
            
            // Only auto-swipe if the user hasn't interacted for at least 3 seconds
            if (timeSinceInteraction >= 3000) {
                setDeckIndex((prev) => {
                    if (prev >= selectedEvent.allImages.length) {
                        return 0; // Rewind back to the start
                    }
                    return prev + 1;
                });
                lastInteractionRef.current = Date.now(); // Reset interaction timer after an auto-swipe
            }
        }, 1000); // Check every 1 second

        return () => clearInterval(autoplayTimer);
    }, [view, selectedEvent, lightboxOpen]);

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
                            <p className={styles.gridPageSubtitle}>Delivering versatile expertise across corporate events, government events, launch events, music festivals, political events, and bespoke celebrations where every vision is transformed into a seamless and unforgettable experience.</p>
                        </div>
                        <div className={styles.gridWrapper}>
                            <ServicesGrid 
                                categories={services.map(s => ({
                                    id: s.id,
                                    title: s.title,
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
                            <h2 className={styles.eventsTitle}>
                                {activeCategory.title.replace(/\s*Events\s*$/i, '')} <span className={styles.eventsTitleGold}>Events</span>
                            </h2>
                            <p className={styles.eventsSubtitle}>{activeCategory.tagline}</p>
                        </div>

                        <motion.div
                            className={styles.eventsGrid}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {activeCategory.events.map((ev, index) => (
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
                                            width={800}
                                            height={450}
                                            className={styles.eventCardImg}
                                            priority={index < 6}
                                            loading={index < 6 ? undefined : "lazy"}
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
                <section className={styles.galleryOverlay}>
                    <Image
                        src={selectedEvent.allImages[deckIndex] || selectedEvent.allImages[selectedEvent.allImages.length - 1]}
                        alt={selectedEvent.title}
                        fill
                        className={styles.galleryBlurredBg}
                        priority
                    />
                    
                    <button className={styles.galleryOverlayClose} onClick={handleBackToEvents}>
                        <HiX />
                    </button>

                    <div className={styles.galleryDeckContainer}>
                        {selectedEvent.allImages.map((src, idx) => (
                            <DeckCard 
                                key={`${selectedEvent.id}-img-${idx}`}
                                src={src}
                                index={idx}
                                deckIndex={deckIndex}
                                setDeckIndex={setDeckIndex}
                                isTop={idx === deckIndex}
                                totalCards={selectedEvent.allImages.length}
                                openLightbox={openLightbox}
                                registerInteraction={registerInteraction}
                            />
                        ))}
                    </div>

                    <div className={styles.galleryBottomInfo}>
                        <h2 className={styles.galleryActiveTitle}>{selectedEvent.title}</h2>
                        <div className={styles.galleryNavArrows}>
                            {deckIndex >= selectedEvent.allImages.length ? (
                                <button className={styles.galleryNavBtn} onClick={() => setDeckIndex(0)}>
                                    <HiRefresh /> Restart Gallery
                                </button>
                            ) : (
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '2px' }}>SWIPE TO EXPLORE</p>
                            )}
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
