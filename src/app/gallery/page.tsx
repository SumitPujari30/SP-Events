'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './gallery.module.css';

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Innovation Summit', category: 'Summit', tall: true },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', title: 'Grand Celebration', category: 'Event', tall: false },
    { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80', title: 'Award Night', category: 'Awards', tall: false },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', title: 'Corporate Gala', category: 'Corporate', tall: true },
    { src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', title: 'Tech Exhibition', category: 'Exhibition', tall: false },
    { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', title: 'Team Workshop', category: 'Corporate', tall: true },
    { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', title: 'Music Festival', category: 'Music', tall: false },
    { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', title: 'Conference Stage', category: 'Summit', tall: false },
    { src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80', title: 'Exhibition Hall', category: 'Exhibition', tall: true },
    { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', title: 'Health Summit', category: 'Summit', tall: false },
    { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', title: 'CSR Initiative', category: 'CSR', tall: false },
    { src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80', title: 'Government Event', category: 'Government', tall: true },
];

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const cardAnim = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function GalleryPage() {
    const [selected, setSelected] = useState<number | null>(null);

    const goNext = () => {
        if (selected !== null)
            setSelected((selected + 1) % galleryImages.length);
    };
    const goPrev = () => {
        if (selected !== null)
            setSelected(selected === 0 ? galleryImages.length - 1 : selected - 1);
    };

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        Gallery
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        Event <span className="text-gold">Gallery</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        Visual stories from our most memorable events and celebrations.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <motion.div
                        className={styles.grid}
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.gridItem} ${img.tall ? styles.gridTall : ''}`}
                                variants={cardAnim}
                                whileHover={{ y: -6 }}
                                onClick={() => setSelected(i)}
                            >
                                <div className={styles.gridImage}>
                                    <img src={img.src} alt={img.title} loading="lazy" />
                                </div>
                                <div className={styles.gridOverlay}>
                                    <span className={styles.gridCat}>{img.category}</span>
                                    <h4 className={styles.gridTitle}>{img.title}</h4>
                                </div>
                                <div className={styles.gridShine} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Lightbox with nav */}
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
                            <HiX size={24} />
                        </button>

                        <button
                            className={`${styles.lbNav} ${styles.lbPrev}`}
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        >
                            <HiChevronLeft size={28} />
                        </button>

                        <motion.div
                            key={selected}
                            className={styles.lbContent}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={galleryImages[selected].src} alt={galleryImages[selected].title} />
                            <div className={styles.lbInfo}>
                                <span className={styles.gridCat}>{galleryImages[selected].category}</span>
                                <h3>{galleryImages[selected].title}</h3>
                                <span className={styles.lbCount}>{selected + 1} / {galleryImages.length}</span>
                            </div>
                        </motion.div>

                        <button
                            className={`${styles.lbNav} ${styles.lbNext}`}
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                        >
                            <HiChevronRight size={28} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
