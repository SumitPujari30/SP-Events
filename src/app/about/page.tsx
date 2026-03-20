'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './about.module.css';

const teamMembers = [
    {
        name: 'Rohahn Vardhan',
        role: 'Director & Chief Digital Officer',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=800&q=80',
    },
    {
        name: 'Raoul Vardhan',
        role: 'Director',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=800&q=80',
    },
    {
        name: 'K.T. Majeed',
        role: 'Director & Chief Financial Officer',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=800&q=80',
    },
    {
        name: 'Sunil Mathew',
        role: 'Director & Vice President',
        img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=800&q=80',
    },
    {
        name: 'Harisha Prabhu',
        role: 'Director & Vice President',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=800&q=80',
    }
];

const locations = [
    {
        city: 'Bengaluru',
        img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&q=80',
        address: '#4, 2nd Floor, 1st Cross\nHAL 2nd Stage, Indiranagar\nBengaluru - 560 038\nTel: +91 80 4115 3154'
    },
    {
        city: 'Hubli',
        img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
        address: 'The SP Events \n 1st floor, Marvel Arteza \nVidya Nagar\nHubli 580029, India\nTel: +91 836 225 1234'
    }
];

const grassrootsImages = [
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', artist: 'Event Vibes' },
    { url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', artist: 'Musical Night' },
    { url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', artist: 'Corporate Gala' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', artist: 'DJ Performance' },
    { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', artist: 'Celebration' },
    { url: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&q=80', artist: 'Concert Hall' },
];

export default function AboutPage() {
    return (
        <main className={styles.pageWrap}>
            {/* HERO */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540039155732-d6928e469557?w=1920&q=80)' }} />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About <span className="text-gold">Us</span>
                    </motion.h1>
                </div>
            </section>

            {/* PIONEERING TEXT */}
            <section className={styles.pioneeringSection}>
                <div className="container">
                    <AnimatedSection>
                        <h2 className={styles.pioneeringTitle}>Pioneering Global Event Experiences</h2>
                    </AnimatedSection>
                    
                    <AnimatedSection delay={0.2}>
                        <div className={styles.pioneeringTextBlocks}>
                            <p>
                                We began our journey with a vision to lay the foundation for the live events industry by bringing international acts and incredible luxury experiences to India. Our vision to introduce global experiences and passion for perfection led to the birth of SP Events – a pioneering force in the live events industry.
                            </p>
                            <p>
                                Under our leadership, SP Events thrives on core values such as reliability, consistent quality delivery, equality, respect, and teamwork. These values have not only earned us a strong market reputation but also fostered close relationships with key players in the industry.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* GRASSROOTS SLIDER */}
            <section className={styles.grassrootsSection}>
                <motion.div 
                    className={styles.grassrootsHeader}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <h2 className={styles.grassrootsTitle}>GRASSROOTS</h2>
                </motion.div>

                <div className={styles.sliderContainer}>
                    <motion.div 
                        className={styles.sliderTrack}
                        drag="x"
                        dragConstraints={{ left: -1200, right: 0 }}
                        whileTap={{ cursor: 'grabbing' }}
                    >
                        {grassrootsImages.map((img, i) => (
                            <div key={i} className={styles.sliderItem}>
                                <img src={img.url} alt={img.artist} className={styles.sliderImage} />
                                <div className={styles.sliderOverlay}>
                                    <span className={styles.sliderArtist}>{img.artist}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div 
                    className={styles.grassrootsFooter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <p className={styles.grassrootsSubtitle}>PIONEERING MAGICAL EVENT EXPERIENCES</p>
                </motion.div>
            </section>

            {/* MINDS THAT MATTER (DNA Networks Style) */}
            <section className={styles.mindsSection}>
                <div className="container" style={{ padding: '0 40px' }}>
                    <AnimatedSection>
                        <h2 className={styles.mindsTitle}>MINDS THAT MATTER</h2>
                    </AnimatedSection>

                    <div className={styles.teamContainer}>
                        {teamMembers.map((member, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} className={styles.dnaTeamCard}>
                                <div className={styles.dnaCardImageBox}>
                                    <img src={member.img} alt={member.name} className={styles.dnaTeamImg} />
                                </div>
                                <div className={styles.dnaCardContent}>
                                    <h3 className={styles.dnaTeamName}>{member.name}</h3>
                                    <p className={styles.dnaTeamRole}>{member.role}</p>
                                </div>
                                <div className={styles.dnaTeamLine}></div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHERE YOU CAN FIND US (DNA Networks Style) */}
            <section className={styles.locationsSection}>
                <div className="container" style={{ padding: '0 40px' }}>
                    <AnimatedSection>
                        <h2 className={styles.locationsTitle}>Where You Can Find Us</h2>
                    </AnimatedSection>

                    <div className={styles.dnaLocGrid}>
                        {locations.map((loc, i) => (
                            <AnimatedSection key={i} delay={i * 0.15} style={{ height: '100%' }}>
                                <figure className={styles.dnaLocFigure}>
                                    <img src={loc.img} alt={loc.city} className={styles.dnaLocImage} />
                                    <div className={styles.dnaLocOverlay}></div>
                                    
                                    <div className={styles.dnaLocContent}>
                                        <h2 className={styles.dnaLocCityName}>{loc.city}</h2>
                                        
                                        <div className={styles.dnaLocAddressWrap}>
                                            <p className={styles.dnaLocAddress}>{loc.address}</p>
                                        </div>

                                        <a href="#" className={styles.dnaLocBtn}>
                                            View Location <span style={{ marginLeft: '16px', fontSize: '1.25rem' }}>→</span>
                                        </a>
                                    </div>
                                </figure>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
