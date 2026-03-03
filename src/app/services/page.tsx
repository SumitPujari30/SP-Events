'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';
import styles from './services.module.css';

const services = [
    {
        id: '01',
        title: 'Music',
        tagline: 'Sonic experiences that move crowds',
        desc: 'From intimate acoustic evenings to stadium-filling concerts, we design and execute music events that resonate. Our team handles artist management, stage production, sound engineering, crowd flow, and everything in between — so the only thing your audience remembers is the music.',
        offerings: ['Live Concerts & Festivals', 'Artist Coordination & Hospitality', 'Stage & Sound Design', 'Ticketing & Crowd Management'],
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=85',
    },
    {
        id: '02',
        title: 'Sports',
        tagline: 'Where champions are celebrated',
        desc: 'We bring the energy of sport to life — from corporate sports days and marathons to championship award ceremonies and league launches. Precision logistics, broadcast-ready production, and electrifying atmospheres are our standard.',
        offerings: ['Sport Tournaments & Leagues', 'Marathon & Run Events', 'Award Ceremonies', 'Player & VIP Hospitality'],
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=85',
    },
    {
        id: '03',
        title: 'Corporate',
        tagline: 'Strategy meets spectacle',
        desc: 'We elevate corporate gatherings into powerful brand moments. Annual conferences, conclaves, town halls, leadership summits — every element is crafted to reinforce your brand identity, engage your audience, and deliver measurable results.',
        offerings: ['Conferences & Summits', 'Town Halls & AGMs', 'Awards Nights', 'Team Offsites & Retreats'],
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=85',
    },
    {
        id: '04',
        title: 'Special',
        tagline: 'Moments that become memories',
        desc: 'Life\'s most meaningful occasions deserve flawless execution. Whether it\'s a grand gala, a cultural celebration, a charity ball, or a milestone anniversary — we design experiences tailored to the emotion and significance of the moment.',
        offerings: ['Gala Dinners & Charity Balls', 'Cultural Festivals', 'Anniversary Celebrations', 'Theme-Based Experiences'],
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85',
    },
    {
        id: '05',
        title: 'Launch',
        tagline: 'First impressions, perfected',
        desc: 'A product launch is your brand\'s most critical moment. We craft immersive reveal experiences — from intimate media previews to large-scale public launches — that generate buzz, drive coverage, and leave your audience wanting more.',
        offerings: ['Product & Brand Launches', 'Store Openings', 'Press Conferences', 'Brand Activation Campaigns'],
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
    },
    {
        id: '06',
        title: 'Wedding',
        tagline: 'Love stories brought to life',
        desc: 'Every love story is unique — and your wedding should be too. Our wedding specialists craft each detail from florals and décor to catering, entertainment, and guest experience, creating celebrations that reflect your story and exceed every dream.',
        offerings: ['Destination & Grand Weddings', 'Intimate Ceremonies', 'Pre-Wedding Functions', 'Floral & Décor Design'],
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85',
    },
];

export default function ServicesPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);

    // Check viewport width cleanly
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        // Initial check
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <main className={styles.mainContainer}>
            {/* Background Layer: absolute behind all content, fading based on activeIndex */}
            {services.map((s, i) => (
                <div
                    key={`bg-${s.id}`}
                    className={`${styles.bgImage} ${i === activeIndex ? styles.bgActive : ''}`}
                    style={{ backgroundImage: `url(${s.image})` }}
                />
            ))}
            {/* Overlay to ensure text readability */}
            <div className={styles.bgOverlay} />

            <div className={`container ${styles.contentGrid}`}>

                {/* Left Column: Huge typography menu */}
                <div className={styles.navCol}>
                    <p className={styles.navLabel}>Our Expertise</p>
                    <nav className={styles.navList}>
                        {services.map((s, i) => (
                            <button
                                key={`nav-${s.id}`}
                                className={`${styles.navItem} ${i === activeIndex ? styles.navItemActive : ''}`}
                                onMouseEnter={() => {
                                    if (!isMobile) setActiveIndex(i);
                                }}
                                onClick={() => setActiveIndex(i)}
                            >
                                <span className={styles.navNum}>{s.id}</span>
                                <span className={styles.navText}>{s.title}</span> {/* Drop "Events" so text is huge */}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Column: Floating glass detail card */}
                <div className={styles.detailCol}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className={styles.glassCard}
                        >
                            <h2 className={styles.cardTitle}>{services[activeIndex].title} Events</h2>
                            <p className={styles.cardTagline}>{services[activeIndex].tagline}</p>

                            <div className={styles.cardDivider} />

                            <p className={styles.cardDesc}>{services[activeIndex].desc}</p>

                            <div className={styles.offeringsWrap}>
                                <h4 className={styles.offeringsLabel}>What we handle:</h4>
                                <ul className={styles.cardList}>
                                    {services[activeIndex].offerings.map((off, idx) => (
                                        <li key={idx}>{off}</li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/contact" className={styles.ctaBtn}>
                                Request a Proposal <HiArrowRight />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </main>
    );
}
