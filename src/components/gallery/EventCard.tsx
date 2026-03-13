'use client';

import { motion } from 'framer-motion';
import type { GalleryEvent } from '@/lib/galleryData';
import styles from './EventCard.module.css';

interface EventCardProps {
    event: GalleryEvent;
    size: 'XS' | 'S' | 'M' | 'L';
    onClick: () => void;
}

export default function EventCard({ event, size, onClick }: EventCardProps) {
    return (
        <motion.div
            className={`${styles.card} ${styles[`size${size}`]}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={styles.imageBg}
                style={{ backgroundImage: `url(${event.image})` }}
            />
            
            <div className={styles.overlay} />
            <div className={styles.grain} />

            <div className={styles.content}>
                <div className={styles.topBar}>
                    <span className={styles.categoryPill}>{event.category}</span>
                </div>
                
                <div className={styles.bottomInfo}>
                    <h3 className={styles.title}>{event.title}</h3>
                    <div className={styles.metaRow}>
                        <span>{event.location.split(',')[0]}</span>
                        <span className={styles.dot}>•</span>
                        <span>{event.year}</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.glowBorder} />
        </motion.div>
    );
}
