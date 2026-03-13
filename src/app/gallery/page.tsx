'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GalleryHero from '@/components/gallery/GalleryHero';
import CategoryRail from '@/components/gallery/CategoryRail';
import ModularMatrix from '@/components/gallery/ModularMatrix';
import EventOverlay from '@/components/gallery/overlay/EventOverlay';
import Footer from '@/components/Footer';
import { events } from '@/lib/galleryData';
import type { GalleryEvent } from '@/lib/galleryData';
import styles from './gallery.module.css';

function FooterCurtain() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });
    
    // The curtain stays stuck to the viewport as user scrolls, revealing the footer
    const curtainY = useTransform(scrollYProgress, [0.15, 1], ['0%', '-100%']);

    return (
        <div ref={sectionRef} className={styles.footerCurtainWrap}>
            {/* The revealed footer underneath */}
            <div className={styles.revealedFooterContent}>
                <Footer />
            </div>

            {/* The black curtain that slides up */}
            <motion.div className={styles.curtain} style={{ y: curtainY }}>
                <span className={styles.curtainLabel}>End of Gallery</span>
            </motion.div>
        </div>
    );
}

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

    // Derive unique categories dynamically
    const allCategories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

    const filteredEvents = activeCategory === 'All' 
        ? events 
        : events.filter(e => e.category === activeCategory);

    return (
        <main className={styles.pageWrap}>
            <GalleryHero />
            
            <CategoryRail 
                categories={allCategories} 
                activeCategory={activeCategory} 
                onSelect={setActiveCategory} 
            />

            <ModularMatrix 
                events={filteredEvents}
                onEventClick={setSelectedEvent}
            />

            <FooterCurtain />

            {/* Force hide the global layout footer, but allow the one inside the curtain */}
            <style jsx global>{`
                footer {
                    display: none !important;
                }
                .${styles.footerCurtainWrap} footer {
                    display: block !important;
                    position: relative;
                }
            `}</style>

            <AnimatePresence mode="wait">
                {selectedEvent && (
                    <EventOverlay 
                        event={selectedEvent} 
                        events={events}
                        onClose={() => setSelectedEvent(null)} 
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
