'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { clientsData, ClientRecord } from '@/lib/clientData';
import styles from './ClientGrid.module.css';

/* ── Only show clients that have a logo file ── */
const clientsWithLogos = clientsData.filter((c) => c.logo);

const categories = ['All', 'Corporate', 'Government', 'Education', 'Startup', 'Foundation', 'Other'] as const;

/* ── Grid animation variants ── */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
};

/* ── Types ── */
type SlotData = {
    id: number;
    rotation: number;
    frontLogo: ClientRecord | null;
    backLogo: ClientRecord | null;
};

/* ── Helpers ── */
function getInitials(name: string): string {
    return name
        .split(/[\s&]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

function getLogoSrc(logo: string): string {
    if (logo.startsWith('http') || logo.startsWith('/')) return logo;
    return `/assets/clientLogos/${logo}`;
}

function LogoFace({ client }: { client: ClientRecord | null }) {
    const [imgError, setImgError] = useState(false);
    if (!client) return null;

    const initials = getInitials(client.name);
    const src = client.logo ? getLogoSrc(client.logo) : null;

    return (
        <div className={styles.logoWrap}>
            <div className={styles.clientName}>{client.name}</div>
            {src && !imgError ? (
                <Image
                    src={src}
                    alt={client.name === 'Govt of Karnataka' ? 'GOK' : client.name}
                    fill
                    sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, (max-width: 992px) 22vw, 16vw"
                    className={styles.logoImage}
                    onError={() => setImgError(true)}
                    loading="lazy"
                />
            ) : (
                <div className={styles.backInitials} style={{ width: 56, height: 56, fontSize: '1.3rem' }}>
                    {initials}
                </div>
            )}
        </div>
    );
}

/* ── Component ── */
export default function ClientGrid() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [, setRenderTrigger] = useState(0);

    const slotsRef = useRef<SlotData[]>([]);
    const hiddenPoolRef = useRef<ClientRecord[]>([]);

    useEffect(() => {
        const pool =
            activeCategory === 'All'
                ? clientsWithLogos
                : clientsWithLogos.filter((c) => c.category === activeCategory);

        // Shuffle the pool for a unique grid every time
        const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

        const numSlots = Math.min(shuffledPool.length, 24); // max 24 slots shown

        slotsRef.current = shuffledPool.slice(0, numSlots).map((record, i) => ({
            id: i,
            rotation: 0,
            frontLogo: record,
            backLogo: null,
        }));

        hiddenPoolRef.current = shuffledPool.slice(numSlots);
        setRenderTrigger((prev) => prev + 1);
    }, [activeCategory]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleNextFlip = () => {
            if (slotsRef.current.length === 0 || hiddenPoolRef.current.length === 0) {
                // If filtering resulted in 0 hidden logos, wait and check later (in case of category changes)
                timeoutId = setTimeout(scheduleNextFlip, 1000);
                return;
            }

            // Flip exactly every 1, 2, or 3 seconds
            const delays = [1000, 2000, 3000];
            const nextDelay = delays[Math.floor(Math.random() * delays.length)];

            timeoutId = setTimeout(() => {
                triggerFlips();
                scheduleNextFlip();
            }, nextDelay);
        };

        const triggerFlips = () => {
            const currentSlots = [...slotsRef.current];
            const currentHidden = [...hiddenPoolRef.current];

            if (currentHidden.length === 0) return;

            // Pick 1 to 3 random slots to flip at once
            const numFlips = Math.floor(Math.random() * 3) + 1;
            const availableIndices = currentSlots.map((_, i) => i);
            const indicesToFlip: number[] = [];

            for (let i = 0; i < numFlips; i++) {
                if (availableIndices.length === 0) break;
                const randIdx = Math.floor(Math.random() * availableIndices.length);
                indicesToFlip.push(availableIndices[randIdx]);
                availableIndices.splice(randIdx, 1);
            }

            indicesToFlip.forEach((idx) => {
                if (currentHidden.length === 0) return;

                const slot = currentSlots[idx];
                const hiddenIdx = Math.floor(Math.random() * currentHidden.length);
                const newlySelectedLogo = currentHidden[hiddenIdx];

                // Remove securely from hidden pool to ensure uniqueness on grid
                currentHidden.splice(hiddenIdx, 1);

                const isFrontVisible = slot.rotation % 360 === 0;

                // Move old logo gracefully back into the hidden pool to be possibly chosen later
                const oldLogo = isFrontVisible ? slot.frontLogo : slot.backLogo;
                if (oldLogo) currentHidden.push(oldLogo);

                const newRotation = slot.rotation + 180;
                const willFrontBeVisible = newRotation % 360 === 0;

                currentSlots[idx] = {
                    ...slot,
                    rotation: newRotation,
                    frontLogo: willFrontBeVisible ? newlySelectedLogo : slot.frontLogo,
                    backLogo: !willFrontBeVisible ? newlySelectedLogo : slot.backLogo,
                };
            });

            slotsRef.current = currentSlots;
            hiddenPoolRef.current = currentHidden;
            setRenderTrigger((prev) => prev + 1); // Cause React re-render
        };

        scheduleNextFlip();

        return () => clearTimeout(timeoutId);
    }, [activeCategory]);

    return (
        <section className={styles.section} id="client-grid">
            <div className={styles.header}>
                <motion.span
                    className={styles.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Trusted Partnerships
                </motion.span>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                >
                    Our Clientele
                </motion.h2>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Brands that trust us to architect their most important moments
                </motion.p>

                <div className={styles.filterContainer}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {slotsRef.current.length > 0 && (
                    <motion.div
                        key={activeCategory}
                        className={styles.grid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                    >
                        {slotsRef.current.map((slot) => (
                            <motion.div
                                key={slot.id}
                                className={styles.flipCard}
                                variants={cardVariants}
                                tabIndex={0}
                                role="button"
                            >
                                <div
                                    className={styles.flipCardInner}
                                    style={{ transform: `rotateY(${slot.rotation}deg)` }}
                                >
                                    <div className={styles.flipCardFront}>
                                        <LogoFace client={slot.frontLogo} />
                                    </div>
                                    <div className={styles.flipCardBack}>
                                        <LogoFace client={slot.backLogo} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
