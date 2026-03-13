'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './MasonryGallery.module.css';

interface Image { src: string; tall?: boolean; }

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function MasonryGallery({ images }: { images: Image[] }) {
    const [selected, setSelected] = useState<number | null>(null);

    const goNext = () => setSelected(s => s !== null ? (s + 1) % images.length : null);
    const goPrev = () => setSelected(s => s !== null ? (s === 0 ? images.length - 1 : s - 1) : null);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Visual Archive</span>
                    <h2 className={styles.title}>Event Gallery</h2>
                </div>

                <motion.div
                    className={styles.grid}
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.item} ${img.tall ? styles.tall : ''}`}
                            variants={cardAnim}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelected(i)}
                        >
                            <div
                                className={styles.image}
                                style={{ backgroundImage: `url(${img.src})` }}
                            />
                            {/* Grayscale→color hover + overlay */}
                            <div className={styles.overlay} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Cinematic Lightbox */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <button className={styles.lbClose} onClick={() => setSelected(null)}>
                            <HiX size={22} />
                        </button>
                        <button className={`${styles.lbNav} ${styles.lbPrev}`}
                            onClick={e => { e.stopPropagation(); goPrev(); }}>
                            <HiChevronLeft size={28} />
                        </button>
                        <motion.div
                            key={selected}
                            className={styles.lbContent}
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={images[selected].src} alt="" className={styles.lbImage} />
                            <div className={styles.lbCounter}>
                                {selected + 1} / {images.length}
                            </div>
                        </motion.div>
                        <button className={`${styles.lbNav} ${styles.lbNext}`}
                            onClick={e => { e.stopPropagation(); goNext(); }}>
                            <HiChevronRight size={28} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
