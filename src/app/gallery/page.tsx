'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GalleryHero from '@/components/gallery/GalleryHero';
import CategoryRail from '@/components/gallery/CategoryRail';
import ModularMatrix from '@/components/gallery/ModularMatrix';
import EventOverlay from '@/components/gallery/overlay/EventOverlay';
import { events } from '@/lib/galleryData';
import type { GalleryEvent } from '@/lib/galleryData';
import styles from './gallery.module.css';
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
