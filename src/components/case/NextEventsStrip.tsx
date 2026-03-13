'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { GalleryEvent } from '@/lib/galleryData';
import styles from './NextEventsStrip.module.css';

interface Props { events: GalleryEvent[]; }

function MiniCard({ event }: { event: GalleryEvent }) {
    const router = useRouter();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const cardX = useSpring(mx, { damping: 30, stiffness: 200 });
    const cardY = useSpring(my, { damping: 30, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left - rect.width / 2) * 0.1);
        my.set((e.clientY - rect.top - rect.height / 2) * 0.1);
    };

    return (
        <motion.div
            className={styles.miniCard}
            style={{ x: cardX, y: cardY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            onClick={() => router.push(`/gallery/${event.slug}`)}
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
            <div
                className={styles.miniCardImage}
                style={{ backgroundImage: `url(${event.image})` }}
            />
            <div className={styles.miniCardOverlay} />
            <div className={styles.miniCardContent}>
                <span className={styles.miniCat}>{event.category}</span>
                <h4 className={styles.miniTitle}>{event.title}</h4>
                <span className={styles.miniYear}>{event.year}</span>
            </div>
        </motion.div>
    );
}

export default function NextEventsStrip({ events }: Props) {
    const stripRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <span className={styles.label}>Explore More</span>
                <h2 className={styles.title}>More Events</h2>
            </div>
            <div ref={stripRef} className={styles.strip}>
                {events.map(event => (
                    <MiniCard key={event.slug} event={event} />
                ))}
            </div>
        </section>
    );
}
