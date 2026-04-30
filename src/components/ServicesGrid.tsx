import React, { useCallback, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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

function ServiceCard({ category, index, onCategoryClick }: { category: ServiceCategory, index: number, onCategoryClick?: (index: number) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects for mobile: zoom and slight horizontal drift
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);
    const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((mouseY - centerY) / centerY) * -4; 
        const rotateY = ((mouseX - centerX) / centerX) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        if (isMobile) return;
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    }, [isMobile]);

    return (
        <motion.div
            className={styles.gridBoxWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
        >
            <div className={styles.boundingBox}></div>

            <div 
                ref={cardRef}
                className={styles.gridBox}
                onClick={() => onCategoryClick && onCategoryClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <svg className={styles.techGraphicTop} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="10" cy="2" r="1.5" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="2" cy="10" r="1.5" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.4)"/>
                </svg>
                
                <span className={`${styles.cornerAccent} ${styles.cornerTopLeft}`} />
                <span className={`${styles.cornerAccent} ${styles.cornerBottomRight}`} />

                <motion.div 
                    className={styles.parallaxImageContainer}
                    style={{ 
                        scale: isMobile ? scale : 1,
                        x: isMobile ? x : 0,
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Image 
                        src={category.image} 
                        alt={category.title} 
                        fill
                        className={styles.gridImage} 
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </motion.div>

                <div className={styles.overlayTextContainer}>
                    <h3 className={styles.overlayTitle}>{category.title}</h3>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesGrid({ categories, onCategoryClick }: ServicesGridProps) {
    return (
        <div className={styles.gridContainerWrapper}>
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
                    <ServiceCard 
                        key={category.id} 
                        category={category} 
                        index={index} 
                        onCategoryClick={onCategoryClick} 
                    />
                ))}
            </div>
        </div>
    );
}
