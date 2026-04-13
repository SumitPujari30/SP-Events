'use client';

import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ServicesGrid.module.css';

export interface ServiceCategory {
    id: string;
    title: string;
    image: string;
}

interface ServicesGridProps {
    categories: ServiceCategory[];
    onCategoryClick?: (index: number) => void;
}

export default function ServicesGrid({ categories, onCategoryClick }: ServicesGridProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; // max 4deg
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, []);

    const handleMouseLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    }, []);

    return (
        <div className={styles.gridContainer}>
            {categories.map((category, index) => (
                <motion.div
                    key={category.id}
                    className={styles.gridBox}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onCategoryClick && onCategoryClick(index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                >
                    {/* Corner accent marks */}
                    <span className={`${styles.cornerAccent} ${styles.cornerTopLeft}`} />
                    <span className={`${styles.cornerAccent} ${styles.cornerBottomRight}`} />

                    <Image 
                        src={category.image} 
                        alt={category.title} 
                        width={400} 
                        height={500} 
                        className={styles.gridImage} 
                    />
                    <div className={styles.overlayTextContainer}>
                        <h3 className={styles.overlayTitle}>{category.title}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
