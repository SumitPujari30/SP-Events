'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryEvent } from '@/lib/galleryData';
import EventCard from './EventCard';
import styles from './ModularMatrix.module.css';

interface ModularMatrixProps {
    events: GalleryEvent[];
    onEventClick: (event: GalleryEvent) => void;
}

// 8 event cycle pattern to create a curated, non-repetitive editorial layout
const getPattern = (index: number) => {
    const cycle = index % 8;
    switch (cycle) {
        case 0: return { type: 'event', size: 'L', span: 6 };
        case 1: return { type: 'event', size: 'M', span: 6 };
        case 2: return { type: 'event', size: 'XS', span: 3 };
        case 3: return { type: 'event', size: 'XS', span: 3 };
        case 4: return { type: 'event', size: 'M', span: 6 };
        case 5: return { type: 'event', size: 'S', span: 4 };
        case 6: return { type: 'event', size: 'S', span: 4 };
        case 7: return { type: 'event', size: 'S', span: 4 };
        default: return { type: 'event', size: 'M', span: 6 };
    }
};

export default function ModularMatrix({ events, onEventClick }: ModularMatrixProps) {
    if (!events.length) {
        return (
            <div className={styles.emptyState}>
                <p>No events found for this category.</p>
            </div>
        );
    }

    // Build the grid items list, injecting decorative panels naturally based on index.
    const gridItems: React.ReactNode[] = [];
    
    events.forEach((event, i) => {
        const pattern = getPattern(i);
        
        gridItems.push(
            <motion.div key={event.slug} layout className={styles[`span${pattern.span}`]}>
                <EventCard event={event} size={pattern.size as 'XS' | 'S' | 'M' | 'L'} onClick={() => onEventClick(event)} />
            </motion.div>
        );
    });

    return (
        <section className={styles.matrixWrap}>
            <motion.div layout className={styles.grid}>
                <AnimatePresence>
                    {gridItems}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
