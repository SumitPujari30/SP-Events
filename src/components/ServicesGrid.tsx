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
        <div className={styles.gridContainerWrapper}>
            {/* Architectural decorative crosshairs for the grid container */}
            <svg className={styles.gridCrosshair} style={{ top: '-10px', left: '-10px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0V20M0 10H20" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1"/>
            </svg>
            <svg className={styles.gridCrosshair} style={{ top: '-10px', right: '-10px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0V20M0 10H20" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1"/>
            </svg>
            <svg className={styles.gridCrosshair} style={{ bottom: '-10px', left: '-10px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0V20M0 10H20" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1"/>
            </svg>
            <svg className={styles.gridCrosshair} style={{ bottom: '-10px', right: '-10px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0V20M0 10H20" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1"/>
            </svg>

            <div className={styles.gridContainer}>
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        className={styles.gridBoxWrapper}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    >
                        {/* Background wireframe bounding box */}
                        <div className={styles.boundingBox}></div>

                        <div 
                            className={styles.gridBox}
                            onClick={() => onCategoryClick && onCategoryClick(index)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {/* Corner geometric dots (replacing text) */}
                            <svg className={styles.techGraphicTop} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.4)"/>
                                <circle cx="10" cy="2" r="1.5" fill="rgba(255,255,255,0.4)"/>
                                <circle cx="2" cy="10" r="1.5" fill="rgba(255,255,255,0.4)"/>
                                <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.4)"/>
                            </svg>
                            
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
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
