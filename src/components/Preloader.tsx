'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [logoError, setLogoError] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        // 1. Enforce a MINIMUM realistic loading time (2.5s) so the animation isn't skipped on fast networks
        const minTimer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2800);

        // 2. Track actual browser/window load AND image decoding
        const checkImagesAndLoad = async () => {
            // Find all images currently in the DOM
            const images = Array.from(document.querySelectorAll('img'));
            
            if (images.length === 0) {
                setPageLoaded(true);
                return;
            }

            // Wait for all images to fully load/decode
            const promises = images.map((img) => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true }); // resolve on error so we don't hang
                });
            });

            await Promise.all(promises);
            setPageLoaded(true);
        };

        if (document.readyState === 'complete') {
            checkImagesAndLoad();
        } else {
            window.addEventListener('load', checkImagesAndLoad);
        }

        // 3. Fallback: Maximum load time (8s) so users don't get stuck forever
        const maxTimer = setTimeout(() => {
            setPageLoaded(true);
        }, 8000);

        return () => {
            clearTimeout(minTimer);
            clearTimeout(maxTimer);
            window.removeEventListener('load', checkImagesAndLoad);
        };
    }, []);

    // Combine both requirements: Page actually loaded AND minimum animation time completed
    useEffect(() => {
        if (minTimeElapsed && pageLoaded) {
            setLoading(false);
        }
    }, [minTimeElapsed, pageLoaded]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.preloaderContainer}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className={styles.logoWrap}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* 1. The Skeletal Blueprint (Subtle Outline) */}
                        <img
                            src="/assets/loading/empty_logo.png"
                            alt="SP Events Outline"
                            className={styles.emptyLogo}
                        />

                        {/* 2. The Cinematic Forge Layer */}
                        <div className={styles.forgeContainer}>
                            
                            {/* Primary Ultra-Fast Sweep (Whie-Hot Energy) */}
                            <motion.div 
                                className={styles.lightSweepMain}
                                initial={{ x: '-150%' }}
                                animate={{ x: '150%' }}
                                transition={{ 
                                    duration: 1.4, 
                                    ease: [0.85, 0, 0.15, 1],
                                    delay: 0.6
                                }}
                            />

                            {/* Secondary Metallic Glint (Pulling Back) */}
                            <motion.div 
                                className={styles.lightSweepGlint}
                                initial={{ x: '150%', opacity: 0 }}
                                animate={{ x: '-150%', opacity: [0, 1, 0] }}
                                transition={{ 
                                    duration: 2.5, 
                                    ease: 'easeInOut',
                                    delay: 1.4
                                }}
                            />

                            {/* Razor-Sharp Golden Reveal */}
                            <motion.div
                                className={styles.filledLogoWrap}
                                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                transition={{ 
                                    duration: 1.4, 
                                    ease: [0.85, 0, 0.15, 1],
                                    delay: 0.6
                                }}
                            >
                                <img
                                    src="/assets/loading/filled_logo.png"
                                    alt="SP Events Golden"
                                    className={styles.filledLogo}
                                />
                            </motion.div>
                        </div>

                        {/* 3. Subtitle Fade-In (Rockstar Signature) */}
                        <motion.div
                            className={styles.subtitleWrap}
                            initial={{ opacity: 0, letterSpacing: '12px' }}
                            animate={{ opacity: 1, letterSpacing: '6px' }}
                            transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
                        >
                            <span className={styles.subtitleText}>CREATING MAGIC</span>
                        </motion.div>

                        {/* 4. Final 'Impact' Bloom */}
                        <motion.div
                            className={styles.finalImpactBloom}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
                            transition={{ duration: 1.5, delay: 2.2 }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
