'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import FlipLogoCard, { ClientLogo } from './FlipLogoCard';
import styles from './ClientsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface Testimonial {
    name: string;
    role: string;
    text: string;
}

interface ClientsSectionProps {
    clients: ClientLogo[];
    testimonials: Testimonial[];
}

export default function ClientsSection({ clients, testimonials }: ClientsSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const t = testimonials[active];
    const progress = ((active + 1) / testimonials.length) * 100;

    // 1. UNIQUE LOGO DISTRIBUTION
    // We want to use every brand exactly once across all card faces.
    // Total cards = TopCards + BottomCards
    const topCardCount = clients.length > 24 ? 12 : 8;
    const bottomCardCount = Math.floor((clients.length - (topCardCount * 2)) / 2);
    const totalCards = topCardCount + Math.max(0, bottomCardCount);

    // Initial state for all cards
    const [flipStates, setFlipStates] = useState<boolean[]>(new Array(totalCards).fill(false));

    // Create unique pairs
    const allPairs: [ClientLogo, ClientLogo][] = [];
    for (let i = 0; i < totalCards * 2; i += 2) {
        if (clients[i] && clients[i + 1]) {
            allPairs.push([clients[i], clients[i + 1]]);
        } else if (clients[i]) {
            // Handle odd balance if necessary
            allPairs.push([clients[i], clients[0]]);
        }
    }

    const topPairs = allPairs.slice(0, topCardCount);
    const bottomPairs = allPairs.slice(topCardCount);

    // 2. CENTRAL FLIP CONTROLLER
    useEffect(() => {
        if (totalCards === 0) return;

        // User requested exactly 5 seconds
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * totalCards);
            setFlipStates(prev => {
                const next = [...prev];
                next[randomIndex] = !next[randomIndex];
                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [totalCards]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                {
                    opacity: 1, 
                    duration: 1, 
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(`.${styles.topGrid} > div`,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: `.${styles.topGrid}`,
                        start: "top 85%"
                    }
                }
            );
        }, containerRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Brands That Trust Our Craft</h2>
                    <p className={styles.subtitle}>A legacy of partnerships built on innovation and flawless execution.</p>
                </div>

                <div className={styles.topGrid}>
                    {topPairs.map((pair, i) => (
                        <div key={i}>
                            <FlipLogoCard 
                                frontClient={pair[0]} 
                                backClient={pair[1]} 
                                isFlipped={flipStates[i]} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ──────────────── MIDDLE LAYER: ORIGINAL SPLIT-PANEL TESTIMONIALS ──────────────── */}
            <div className={styles.testiSection}>
                <div className={styles.testiInner}>
                    <div className={styles.testiTopRow}>
                        <div>
                            <span className={styles.sectionLabel}>Testimonials</span>
                            <h2 className={styles.testiHeaderTitle}>Client Perspectives</h2>
                        </div>
                        <p className={styles.testiHeaderSubtitle}>
                            Straight from the leaders who have experienced the unparalleled SP Events standard firsthand.
                        </p>
                    </div>

                    <div className={styles.testiSplitPanel}>
                        {/* LEFT: Featured quote area */}
                        <div className={styles.testiFeatured}>
                            <div className={styles.testiGiantQuote}>&ldquo;</div>
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className={styles.testiFeaturedContent}
                                >
                                    <div className={styles.testiFeaturedTag}>
                                        <span className={styles.testiFeaturedTagDot} />
                                        <span className={styles.testiFeaturedTagLabel}>Featured Story</span>
                                    </div>

                                    <p className={styles.testiFeaturedText}>&ldquo;{t.text}&rdquo;</p>

                                    <div className={styles.testiFeaturedAuthor}>
                                        <div className={styles.testiFeaturedInitial}>{t.name.charAt(0)}</div>
                                        <div>
                                            <div className={styles.testiFeaturedName}>{t.name}</div>
                                            <div className={styles.testiFeaturedRole}>{t.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: Author selector list */}
                        <div className={styles.testiList}>
                            {testimonials.map((item, i) => (
                                <div
                                    key={i}
                                    className={`${styles.testiListItem} ${active === i ? styles.activeItem : ''}`}
                                    onMouseEnter={() => setActive(i)}
                                >
                                    <div className={styles.testiListInitial}>{item.name.charAt(0)}</div>
                                    <div className={styles.testiListInfo}>
                                        <div className={styles.testiListName}>{item.name}</div>
                                        <div className={styles.testiListRole}>{item.role}</div>
                                    </div>
                                    <HiArrowRight className={styles.testiListArrow} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className={styles.testiProgress}>
                        <div className={styles.testiProgressBar}>
                            <div className={styles.testiProgressFill} style={{ width: `${progress}%` }} />
                        </div>
                        <div className={styles.testiProgressCount}>
                            {String(active + 1).padStart(2, '0')} <span>/</span> {String(testimonials.length).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.bottomGrid}>
                    {bottomPairs.map((pair, i) => (
                        <div key={i}>
                            <FlipLogoCard 
                                frontClient={pair[0]} 
                                backClient={pair[1]} 
                                isFlipped={flipStates[topCardCount + i]} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
