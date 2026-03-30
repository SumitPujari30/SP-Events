'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { clientsData, ClientRecord } from '@/lib/clientData';
import styles from './ClientGrid.module.css';

/* ── Use all clients since we are showing placeholder logos ── */
const clientsWithLogos = clientsData;


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
    currentLogo: ClientRecord;
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
    if (!client) return null;

    const brandName = "Client Brand";
    const src = "/assets/Layout_page.png";

    return (
        <div className={styles.logoWrap}>
            <AnimatePresence mode="wait">
                {/* Fade the text */}
                <motion.div
                    key={client.name + "-text"}
                    className={styles.clientName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {brandName}
                </motion.div>

                {/* Flip the logo */}
                <motion.div
                    key={client.name + "-logo"}
                    className={styles.logoImageContainer}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <Image
                        src={src}
                        alt={brandName}
                        fill
                        sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, (max-width: 992px) 22vw, 16vw"
                        className={styles.logoImage}
                        loading="lazy"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ── Component ── */
export default function ClientGrid({ children }: { children?: React.ReactNode }) {
    const [, setRenderTrigger] = useState(0);

    const slotsRef = useRef<SlotData[]>([]);
    const hiddenPoolRef = useRef<ClientRecord[]>([]);

    useEffect(() => {
        // Use all clients with logos, no filtering
        const pool = clientsWithLogos;

        // Shuffle the pool for a unique grid every time
        const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

        const numSlots = Math.min(shuffledPool.length, 30); // max 30 slots shown

        slotsRef.current = shuffledPool.slice(0, numSlots).map((record, i) => ({
            id: i,
            currentLogo: record,
        }));

        hiddenPoolRef.current = shuffledPool.slice(numSlots);
        setRenderTrigger((prev) => prev + 1);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleNextFlip = () => {
            if (slotsRef.current.length === 0 || hiddenPoolRef.current.length === 0) {
                timeoutId = setTimeout(scheduleNextFlip, 1000);
                return;
            }

            // Flip less frequently (e.g. 3, 6, 9 seconds)
            const delays = [2000, 4000, 6000];
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

            // Pick 1 to 2 random slots to flip at once for calmer animation
            const numFlips = Math.floor(Math.random() * 2) + 1;
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

                currentHidden.splice(hiddenIdx, 1);

                const oldLogo = slot.currentLogo;
                if (oldLogo) currentHidden.push(oldLogo);

                currentSlots[idx] = {
                    ...slot,
                    currentLogo: newlySelectedLogo,
                };
            });

            slotsRef.current = currentSlots;
            hiddenPoolRef.current = currentHidden;
            setRenderTrigger((prev) => prev + 1);
        };

        scheduleNextFlip();

        return () => clearTimeout(timeoutId);
    }, []);

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

                {/* Filter buttons removed as requested */}
            </div>

            <div className={styles.gridContainer}>
                <AnimatePresence mode="wait">
                {slotsRef.current.length > 0 && (
                    <motion.div
                        key="grid-1"
                        className={styles.grid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                    >
                        {slotsRef.current.slice(0, 15).map((slot) => (
                            <motion.div
                                key={slot.id}
                                className={styles.flipCard}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.015 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                tabIndex={0}
                            >
                                <LogoFace client={slot.currentLogo} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            {children && <div className={styles.breakSection}>{children}</div>}

            <div className={styles.gridContainer}>
                <AnimatePresence mode="wait">
                {slotsRef.current.length > 15 && (
                    <motion.div
                        key="grid-2"
                        className={styles.grid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                    >
                        {slotsRef.current.slice(15, 30).map((slot) => (
                            <motion.div
                                key={slot.id}
                                className={styles.flipCard}
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.015 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                tabIndex={0}
                            >
                                <LogoFace client={slot.currentLogo} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </section>
    );
}
