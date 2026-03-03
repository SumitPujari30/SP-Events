'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './clients.module.css';

const trustedBrands = [
    'Microsoft', 'Google', 'Amazon', 'Meta',
    'Netflix', 'Apple', 'Spotify', 'Adobe',
    'Salesforce', 'Intel', 'Cisco', 'IBM'
];

const spotlights = [
    {
        name: 'The Tech Summit',
        client: 'Microsoft',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        desc: 'A seamless integration of technology and human experience.'
    },
    {
        name: 'Innovation Awards',
        client: 'Google',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        desc: 'Celebrating the visionaries of the digital age.'
    }
];

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'CMO, TechVision Inc.',
        text: 'SP Events completely transformed our annual summit. Their attention to detail and creative execution resulted in our highest attendee engagement ever.',
        category: 'Corporate Summit',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    {
        name: 'David Chen',
        role: 'Director, Global Innovations',
        text: 'From the initial concept to the final teardown, the SP Events team was flawless. The launch of our new product line was a massive success.',
        category: 'Product Launch',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
    {
        name: 'Priya Sharma',
        role: 'Founder, The Artisan Collective',
        text: 'We wanted an intimate, luxury feel for our brand anniversary gala. The floral arrangements and ambient lighting were nothing short of perfection.',
        category: 'Gala Dinner',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    }
];

export default function ClientsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    // Ticker transforms
    const tickerX1 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
    const tickerX2 = useTransform(scrollYProgress, [0, 1], ['-40%', '0%']);

    return (
        <main className={styles.pageWrap} ref={containerRef}>

            {/* ——— Cinematic Pinned Hero ——— */}
            <div className={styles.heroSpacer}>
                <motion.section
                    className={styles.heroSticky}
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    <div className={styles.heroContent}>
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Global Partners
                        </motion.span>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            The Company We Keep.<br />
                            <span className="text-gold">Excellence in every frame.</span>
                        </motion.h1>
                    </div>
                </motion.section>
            </div>

            {/* Content Overlay */}
            <div className={styles.contentOverlay}>

                {/* ——— Brand Ticker ——— */}
                <section className={styles.brandsSection}>
                    <div className={styles.tickerContainer}>
                        <motion.div className={styles.tickerRow} style={{ x: tickerX1 }}>
                            {[...trustedBrands, ...trustedBrands].map((brand, i) => (
                                <span key={`b1-${i}`} className={styles.brandItem}>{brand}</span>
                            ))}
                        </motion.div>
                        <motion.div className={styles.tickerRow} style={{ x: tickerX2 }}>
                            {[...trustedBrands.reverse(), ...trustedBrands.reverse()].map((brand, i) => (
                                <span key={`b2-${i}`} className={styles.brandItem}>{brand}</span>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ——— Client Spotlight ——— */}
                <section className={styles.spotlightSection}>
                    <div className="container">
                        <div className={styles.testiHeader}>
                            <p className="section-label">Case Studies</p>
                            <h2 className="section-title">Client Spotlight</h2>
                        </div>

                        <div className={styles.spotlightGrid}>
                            {spotlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.spotlightCard}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.image} alt={item.name} className={styles.spotlightImage} />
                                    <div className={styles.spotlightContent}>
                                        <span>{item.client}</span>
                                        <h3>{item.name}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ——— Testimonials ——— */}
                <section className={styles.testimonialsSection}>
                    <div className="container">
                        <div className={styles.testiHeader}>
                            <p className="section-label">Testimonials</p>
                            <h2 className="section-title">Word on the Street</h2>
                        </div>

                        <div className={styles.stickyStackWrapper}>
                            {testimonials.map((testi, i) => (
                                <div key={i} className={styles.stickyCardWrap}>
                                    <motion.div
                                        className={styles.stickyCard}
                                        style={{ top: `calc(120px + ${i * 40}px)` }}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ amount: 0.5 }}
                                    >
                                        <p className={styles.testiText}>&ldquo;{testi.text}&rdquo;</p>
                                        <div className={styles.testiFooter}>
                                            <div className={styles.testiAuthor}>
                                                <div className={styles.authorImg}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={testi.image} alt={testi.name} />
                                                </div>
                                                <div>
                                                    <h4>{testi.name}</h4>
                                                    <span>{testi.role}</span>
                                                </div>
                                            </div>
                                            <div className={styles.testiBadge}>
                                                {testi.category}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ——— CTA ——— */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaInner}>
                        <AnimatedSection>
                            <h2>Let&apos;s Create Together</h2>
                            <p>Elevate your brand presence with the most visionary event architects in the industry.</p>
                            <a href="/contact" className={styles.ctaBtn}>
                                Start a Conversation
                            </a>
                        </AnimatedSection>
                    </div>
                </section>
            </div>
        </main>
    );
}
