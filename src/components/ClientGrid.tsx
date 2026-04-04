'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { clientsData, ClientRecord } from '@/lib/clientData';
import styles from './ClientGrid.module.css';

/* ── Constants ── */
const NUM_SLOTS = 30;

/* ── Animation variants ── */
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
    },
};

/* ── Flip Variants ── */
const flipVariants = {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
};

/* ── Types ── */
type SlotData = {
    id: number;
    currentLogo: ClientRecord;
    isFlippable: boolean;
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

function getLogoSrc(logo?: string): string {
    if (!logo) return '/assets/Layout_page.png';
    return `/assets/webp_client/${encodeURIComponent(logo)}`;
}

function LogoFace({ client, index }: { client: ClientRecord | null, index: number }) {
    const [imgError, setImgError] = useState(false);
    
    useEffect(() => {
        setImgError(false);
    }, [client]);

    if (!client) return null;

    const brandName = client.name;
    const src = getLogoSrc(client.logo);
    const initials = getInitials(client.name);
    const isPriority = index < 15;

    return (
        <div className={styles.cardContent}>
            <div className={styles.nameSection}>
                <span className={styles.clientName}>{brandName}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.logoSection}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={client.name}
                        variants={flipVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                        {client.logo && !imgError ? (
                            <Image
                                src={src}
                                alt={brandName}
                                fill
                                sizes="140px"
                                className={styles.logoImage}
                                priority={isPriority}
                                style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className={styles.backInitials}>{initials}</div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ── Component ── */
export default function ClientGrid({ children }: { children?: React.ReactNode }) {
    const [, setFlipTrigger] = useState(0);

    const initialData = useMemo(() => {
        const pool = [...clientsData];
        const initialShown = pool.slice(0, NUM_SLOTS);
        const remainingPool = pool.slice(NUM_SLOTS);
        
        const bottomIndices = Array.from({ length: 15 }, (_, i) => i + 15);
        const flippableBottomIndices = bottomIndices.slice(0, 10);
        
        const slots: SlotData[] = initialShown.map((record, i) => ({
            id: i,
            currentLogo: record,
            isFlippable: i < 15 || flippableBottomIndices.includes(i)
        }));

        return { slots, remainingPool };
    }, []);

    const slotsRef = useRef<SlotData[]>(initialData.slots);
    const hiddenPoolRef = useRef<ClientRecord[]>(initialData.remainingPool);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleNextFlip = () => {
            if (slotsRef.current.length === 0 || hiddenPoolRef.current.length === 0) {
                timeoutId = setTimeout(scheduleNextFlip, 1000);
                return;
            }

            const delays = [5000, 7000, 9000];
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

            const flippableIndices = currentSlots
                .map((slot, i) => (slot.isFlippable ? i : -1))
                .filter(idx => idx !== -1);

            const numFlips = Math.floor(Math.random() * 2) + 1;
            const chosenIndices: number[] = [];

            for (let i = 0; i < numFlips; i++) {
                if (flippableIndices.length === 0) break;
                const randIdx = Math.floor(Math.random() * flippableIndices.length);
                chosenIndices.push(flippableIndices[randIdx]);
                flippableIndices.splice(randIdx, 1);
            }

            chosenIndices.forEach((idx) => {
                if (currentHidden.length === 0) return;

                const slot = currentSlots[idx];
                const hiddenIdx = Math.floor(Math.random() * currentHidden.length);
                const newlySelectedLogo = currentHidden[hiddenIdx];

                currentHidden.splice(hiddenIdx, 1);
                currentHidden.push(slot.currentLogo);

                currentSlots[idx] = {
                    ...slot,
                    currentLogo: newlySelectedLogo,
                };
            });

            slotsRef.current = currentSlots;
            hiddenPoolRef.current = currentHidden;
            setFlipTrigger(prev => prev + 1);
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
                    Trusted <span style={{color: "var(--color-gold)"}}>By</span>
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
            </div>

            <div className={styles.gridContainer}>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {slotsRef.current.slice(0, 15).map((slot, index) => (
                        <motion.div
                            key={slot.id}
                            className={styles.flipCard}
                            variants={cardVariants}
                            tabIndex={0}
                        >
                            <LogoFace client={slot.currentLogo} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {children && <div className={styles.breakSection}>{children}</div>}

            <div className={styles.gridContainer}>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {slotsRef.current.slice(15, 30).map((slot, index) => (
                        <motion.div
                            key={slot.id}
                            className={styles.flipCard}
                            variants={cardVariants}
                            tabIndex={0}
                        >
                            <LogoFace client={slot.currentLogo} index={index + 15} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
