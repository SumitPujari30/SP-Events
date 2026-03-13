'use client';

import type { GalleryEvent } from '@/lib/galleryData';
import styles from './EventDetails.module.css';

interface EventDetailsProps {
    event: GalleryEvent;
}

export default function EventDetails({ event }: EventDetailsProps) {
    return (
        <div className='mt-1'>
            <div className={styles.detailsWrap}>
                <div className={styles.header}>
                    <span className={styles.category}>{event.category}</span>
                    <h2 className={styles.title}>{event.title}</h2>
                </div>

                <div className={styles.grid}>
                    <div className={styles.mainInfo}>
                        <p className={styles.description}>{event.description}</p>
                        <p className={styles.summary}>{event.summary}</p>
                    </div>

                    <div className={styles.metaInfo}>
                        <div className={styles.metaBlock}>
                            <span className={styles.metaLabel}>Client</span>
                            <span className={styles.metaVal}>{event.client}</span>
                        </div>

                        <div className={styles.metaBlock}>
                            <span className={styles.metaLabel}>Location</span>
                            <span className={styles.metaVal}>{event.location}</span>
                        </div>

                        <div className={styles.statGrid}>
                            <div className={styles.statBox}>
                                <span className={styles.statNum}>{event.stats.guests.toLocaleString()}+</span>
                                <span className={styles.statText}>Attendees</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statNum}>{event.stats.setupDays}</span>
                                <span className={styles.statText}>Days Build</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
