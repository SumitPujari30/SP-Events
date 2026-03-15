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
                        // Phase 1: Fade in with a massive gold neon glow
                        // Phase 2: Glow settles down but LEAVES a subtle gold backlight
                        // so the black "P" does not blend into the dark background.
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            filter: 'drop-shadow(0 0 0px rgba(201, 168, 76, 0))'
                        }}
                        animate={{
                            opacity: [0, 1, 1, 1],
                            scale: [0.9, 1, 1, 1.05],
                            filter: [
                                // Start: Invisible
                                'drop-shadow(0 0 0px rgba(201, 168, 76, 0))',
                                // 1s in: Massive neon gold glow outline
                                'drop-shadow(0 0 50px rgba(201, 168, 76, 1))',
                                // 2.5s in: Settles down to a permanent, crisp gold backlight
                                // This backlight ensures the Black 'P' and text is cut out from the dark purple bg
                                'drop-shadow(0 0 12px rgba(201, 168, 76, 0.8))',
                                // End
                                'drop-shadow(0 0 12px rgba(201, 168, 76, 0.8))'
                            ]
                        }}
                        transition={{
                            duration: 3.5,
                            times: [0, 0.2, 0.6, 1],
                            ease: 'easeInOut'
                        }}
                        exit={{ opacity: 0, scale: 1.2 }}
                    >
                        {!logoError ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src="/assets/Sp_loaading.png"
                                alt="SP Events"
                                className={styles.logoImage}
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <span className={styles.fallbackText}>SP</span>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
