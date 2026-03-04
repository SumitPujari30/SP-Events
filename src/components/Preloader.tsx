'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const preparationTexts = [
    "Rigging Lights...",
    "Tuning Audio...",
    "Mapping Projections...",
    "Securing the Perimeter...",
    "Syncing Visuals...",
    "Calibrating Lasers...",
    "Final Soundcheck...",
    "Preparing the Spectacle...",
    "Showtime."
];

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [prepIndex, setPrepIndex] = useState(0);

    useEffect(() => {
        // Fast counter logic
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 8 + 2;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return next;
            });
        }, 60);

        // Flashing text logic - cycles faster as progress increases
        const textTimer = setInterval(() => {
            setPrepIndex((prev) => (prev + 1) % preparationTexts.length);
        }, 200);

        return () => {
            clearInterval(timer);
            clearInterval(textTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <div className={styles.preloaderContainer}>
                    {/* The Background Panels that split apart */}
                    <motion.div
                        className={styles.curtainPanelLeft}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <motion.div
                        className={styles.curtainPanelRight}
                        exit={{ x: '100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    />

                    {/* Centered Content */}
                    <motion.div
                        className={styles.content}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className={styles.counterWrap}>
                            <span className={styles.bigNumber}>{Math.floor(progress)}</span>
                            <span className={styles.percentSymbol}>%</span>
                        </div>

                        <div className={styles.prepTextWrap}>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={prepIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1 }}
                                    className={styles.prepText}
                                >
                                    {preparationTexts[prepIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
