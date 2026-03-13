'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import type { GalleryEvent } from '@/lib/galleryData';
import DepthCarousel from './DepthCarousel';
import ThumbnailStrip from './ThumbnailStrip';
import EventDetails from './EventDetails';
import styles from './EventOverlay.module.css';

interface EventOverlayProps {
    event: GalleryEvent;
    events: GalleryEvent[];
    onClose: () => void;
}

export default function EventOverlay({ event, onClose }: EventOverlayProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Combine hero images with gallery images for the carousel
    const allImages = [...event.heroImages, ...event.gallery.map(g => g.src)];

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Esc to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <motion.div 
            className={styles.overlayWrap}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div 
                className={styles.dynamicBg}
                key={allImages[activeIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundImage: `url(${allImages[activeIndex]})` }}
            />
            <div className={styles.bgBlur} />
            
            <div className={styles.topBar}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <HiX size={18} />
                    <span>Close</span>
                </button>
            </div>

            <div className={styles.scrollContent} data-lenis-prevent="true">
                <DepthCarousel 
                    images={allImages} 
                    activeIndex={activeIndex} 
                    onChange={setActiveIndex} 
                />
                
                <ThumbnailStrip 
                    images={allImages}
                    activeIndex={activeIndex}
                    onChange={setActiveIndex}
                />

                <EventDetails event={event} />
            </div>
        </motion.div>
    );
}
