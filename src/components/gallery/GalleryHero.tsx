'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './GalleryHero.module.css';

const words = ['Moments', 'Crafted', 'For', 'Eternity.'];

export default function GalleryHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <div ref={heroRef} className={styles.hero}>
            {/* Video background with parallax scale */}
            <motion.div className={styles.videoBg} style={{ scale: bgScale, opacity: bgOpacity }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className={styles.video}
                >
                    <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className={styles.videoOverlay} />
            </motion.div>

            {/* Grain noise texture */}
            <div className={styles.grain} />

            {/* Particle dots */}
            <div className={styles.particles}>
                {Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${5 + (i * 5.3) % 90}%`,
                            top: `${10 + (i * 7.1) % 80}%`,
                            animationDelay: `${(i * 0.4) % 6}s`,
                            animationDuration: `${6 + (i * 0.5) % 4}s`,
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                        }}
                    />
                ))}
            </div>

            {/* Editorial heading — word stagger reveal */}
            <motion.div className={styles.content} style={{ y: contentY }}>
                <motion.span
                    className={styles.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Event Portfolio
                </motion.span>

                <h1 className={styles.heading} aria-label={words.join(' ')}>
                    {words.map((word, i) => (
                        <span key={i} className={styles.wordWrap}>
                            <motion.span
                                className={styles.word}
                                initial={{ y: '110%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.4 + i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                >
                    A visual archive of experiential events — each one engineered to leave a lasting impression.
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                    className={styles.scrollHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    <div className={styles.scrollDot} />
                    <span className={styles.scrollText}>Scroll to explore</span>
                    <div className={styles.scrollLine} />
                </motion.div>
            </motion.div>
        </div>
    );
}
