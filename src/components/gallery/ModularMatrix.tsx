'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryEvent } from '@/lib/galleryData';
import EventCard from './EventCard';
import styles from './ModularMatrix.module.css';

interface ModularMatrixProps {
    events: GalleryEvent[];
    onEventClick: (event: GalleryEvent) => void;
}

/*
 * 12-card cycle – every row adds up to exactly 12 columns.
 * Row 1:  7 + 5          = 12
 * Row 2:  4 + 4 + 4      = 12
 * Row 3:  5 + 7          = 12
 * Row 4:  3 + 3 + 3 + 3  = 12
 * Total:  48 cols = 4 clean rows, then repeat.
 */
const getPattern = (index: number) => {
    const cycle = index % 12;
    switch (cycle) {
        /* Row 1 */
        case 0:  return { type: 'event', size: 'L',  span: 7 };
        case 1:  return { type: 'event', size: 'M',  span: 5 };
        /* Row 2 */
        case 2:  return { type: 'event', size: 'S',  span: 4 };
        case 3:  return { type: 'event', size: 'S',  span: 4 };
        case 4:  return { type: 'event', size: 'S',  span: 4 };
        /* Row 3 */
        case 5:  return { type: 'event', size: 'M',  span: 5 };
        case 6:  return { type: 'event', size: 'L',  span: 7 };
        /* Row 4 */
        case 7:  return { type: 'event', size: 'XS', span: 3 };
        case 8:  return { type: 'event', size: 'XS', span: 3 };
        case 9:  return { type: 'event', size: 'XS', span: 3 };
        case 10: return { type: 'event', size: 'XS', span: 3 };
        /* fallback (case 11 is never reached but keeps TS happy) */
        default: return { type: 'event', size: 'M',  span: 6 };
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
