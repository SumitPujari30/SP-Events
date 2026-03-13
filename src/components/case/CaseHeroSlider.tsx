'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './CaseHeroSlider.module.css';

interface Props {
    images: string[];
    title: string;
    category: string;
}

export default function CaseHeroSlider({ images, title, category }: Props) {
    const [current, setCurrent] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(c => (c + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const goTo = (i: number) => setCurrent((i + images.length) % images.length);

    return (
        <div ref={heroRef} className={styles.hero}>
            {/* Slides */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    className={styles.slide}
                    style={{ scale: bgScale }}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                >
                    {/* Mask wipe overlay */}
                    <motion.div
                        className={styles.wipe}
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <div
                        className={styles.slideImage}
                        style={{ backgroundImage: `url(${images[current]})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className={styles.gradientOverlay} />
            <div className={styles.grain} />

            {/* Content */}
            <motion.div className={styles.content} style={{ y: contentY, opacity }}>
                <motion.span
                    className={styles.categoryPill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className={styles.pillDot} />
                    {category}
                </motion.span>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    {title}
                </motion.h1>
            </motion.div>

            {/* Slide counter + nav */}
            <div className={styles.controls}>
                <div className={styles.counter}>
                    <span className={styles.counterCurrent}>{String(current + 1).padStart(2, '0')}</span>
                    <span className={styles.counterSep} />
                    <span className={styles.counterTotal}>{String(images.length).padStart(2, '0')}</span>
                </div>
                <div className={styles.navBtns}>
                    <button className={styles.navBtn} onClick={() => goTo(current - 1)}>
                        <HiChevronLeft size={20} />
                    </button>
                    <button className={styles.navBtn} onClick={() => goTo(current + 1)}>
                        <HiChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Dot indicators */}
            <div className={styles.dots}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>
        </div>
    );
}
