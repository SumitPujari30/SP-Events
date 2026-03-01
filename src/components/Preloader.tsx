'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 400);
                    return 100;
                }
                return prev + Math.random() * 12 + 3;
            });
        }, 80);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.preloader}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.content}>
                        <motion.div
                            className={styles.logoBox}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <span className={styles.logoText}>SP</span>
                        </motion.div>

                        <motion.p
                            className={styles.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            The SP Events
                        </motion.p>

                        <div className={styles.progressWrap}>
                            <motion.div
                                className={styles.progressBar}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: Math.min(progress / 100, 1) }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>

                        <motion.span
                            className={styles.percent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {Math.min(Math.floor(progress), 100)}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
