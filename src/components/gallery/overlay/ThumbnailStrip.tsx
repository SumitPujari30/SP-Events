'use client';

import { useRef, useEffect } from 'react';
import styles from './ThumbnailStrip.module.css';

interface ThumbnailStripProps {
    images: string[];
    activeIndex: number;
    onChange: (index: number) => void;
}

export default function ThumbnailStrip({ images, activeIndex, onChange }: ThumbnailStripProps) {
    const stripRef = useRef<HTMLDivElement>(null);

    // Auto-scroll the active thumbnail into view
    useEffect(() => {
        if (!stripRef.current) return;
        const activeItem = stripRef.current.children[activeIndex] as HTMLElement;
        if (activeItem) {
            const stripWidth = stripRef.current.clientWidth;
            const itemLeft = activeItem.offsetLeft;
            const itemWidth = activeItem.offsetWidth;

            stripRef.current.scrollTo({
                left: itemLeft - stripWidth / 2 + itemWidth / 2,
                behavior: 'smooth'
            });
        }
    }, [activeIndex]);

    return (
        <div className='align-items-center'>
            <div className={styles.stripWrap} >
                <div ref={stripRef} className={styles.stripInner}>
                    {images.map((img, i) => (
                        <button
                            key={`${img}-${i}`}
                            className={`${styles.thumbBtn} ${i === activeIndex ? styles.active : ''}`}
                            onClick={() => onChange(i)}
                        >
                            <img src={img} alt="Thumbnail preview" className={styles.thumbImage} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
