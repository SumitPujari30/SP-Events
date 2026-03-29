'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CheckCircle, Award, Users, Handshake, Star } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './about.module.css';

const grassrootsImages = [
    { url: '/assets/Layout_page.png', artist: 'Event Vibes' },
    { url: '/assets/Layout_page.png', artist: 'Musical Night' },
    { url: '/assets/Layout_page.png', artist: 'Corporate Gala' },
    { url: '/assets/Layout_page.png', artist: 'DJ Performance' },
    { url: '/assets/Layout_page.png', artist: 'Celebration' },
    { url: '/assets/Layout_page.png', artist: 'Concert Hall' },
    { url: '/assets/Layout_page.png', artist: 'Festival' },
    { url: '/assets/Layout_page.png', artist: 'Crowd Concert' },
    { url: '/assets/Layout_page.png', artist: 'Party Lights' },
];

const valuesList = [
    { id: '01', title: 'Reliability', icon: CheckCircle, desc: 'We deliver consistent performance under all conditions.' },
    { id: '02', title: 'Consistent Quality', icon: Award, desc: 'We maintain high standards across every product and event.' },
    { id: '03', title: 'Equality', icon: Users, desc: 'We ensure fairness, respect, and equal opportunity for all.' },
    { id: '04', title: 'Respect', icon: Handshake, desc: 'We genuinely value every individual and their contributions.' },
    { id: '05', title: 'Teamwork', icon: Star, desc: 'We achieve significantly more through collaboration.' },
];

const locations = [
    {
        city: 'Hubli',
        img: 'https://images.unsplash.com/photo-1514222134-b57cdd8ce073?w=800&q=80',
        address: 'The SP Events \n 1st floor, Marvel Arteza \nVidya Nagar\nHubli 580029, India\nTel: +91 836 225 1234',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=SP+Events+Marvel+Arteza+Hubli'
    },
    {
        city: 'Bengaluru',
        img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80',
        address: '#4, 2nd Floor, 1st Cross\nHAL 2nd Stage, Indiranagar\nBengaluru - 560 038\nTel: +91 80 4115 3154',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=SP+Events+HAL+2nd+Stage+Indiranagar+Bengaluru'
    }
];

export default function AboutPage() {
    const [activeValue, setActiveValue] = useState<number | null>(null);

    return (
        <main className={styles.pageWrap}>
            {/* HERO SECTION */}
            <section className={styles.heroSection}>
                <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto' }}>
                    <div className={styles.heroOuterBox}>
                        
                        {/* Left Image Box */}
                        <motion.div 
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={styles.heroImageBox}
                        >
                            <img 
                                src="/assets/Layout_page.png" 
                                alt="Layout Page" 
                                className={styles.heroImage}
                            />
                        </motion.div>

                        {/* Overlapping Main Title */}
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                            className={styles.heroOverlayTitle}
                        >
                            ABOUT US
                        </motion.h1>
                        
                        {/* Right Content Block */}
                        <AnimatedSection delay={0.2} className={styles.heroRightContent}>
                            <h2 className={styles.pioneeringTitle}>A method to the madness that is <span style={{ color: 'var(--color-accent-gold, #d4af37)' }}>CREATING MAGIC</span></h2>
                            <div className={styles.pioneeringTextBlocks}>
                                <p>
                                    SP Events is a premier event management company, built on the solid pillars of enterprise, excellence, and innovation. Driven by the vision of our dynamic founder, Mr. Samarth U Patangi, we have rapidly established ourselves as a pioneering force since our humble beginnings in 2020.
                                </p>
                                <p>
                                    By crafting unforgettable live entertainment, high-profile sports events, tailored corporate experiences, and luxury weddings, we have consistently broken new ground. Today, SP Events proudly stands as one of the most dependable and sought-after event organizers across North Karnataka.
                                </p>
                            </div>
                        </AnimatedSection>

                    </div>
                </div>
            </section>

            {/* GRASSROOTS SECTION */}
            <section className={styles.grassrootsSection}>
                <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className={styles.grassrootsOuterBox}
                    >
                        
                        <h2 className={styles.grassrootsTopTitle}>GRASSROOTS</h2>

                        <div className={styles.grassrootsFlex}>
                            {/* Column 1 */}
                            <div className={styles.grassrootsCol}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }} className={styles.grassrootsBox}><img src={grassrootsImages[0].url} alt={grassrootsImages[0].artist} /></motion.div>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }} className={styles.grassrootsBox}><img src={grassrootsImages[1].url} alt={grassrootsImages[1].artist} /></motion.div>
                            </div>
                            
                            {/* Column 2 */}
                            <div className={styles.grassrootsColCenter}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className={styles.grassrootsBox}><img src={grassrootsImages[2].url} alt={grassrootsImages[2].artist} /></motion.div>
                            </div>

                            {/* Column 3 */}
                            <div className={styles.grassrootsColTop}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} className={styles.grassrootsBox}><img src={grassrootsImages[3].url} alt={grassrootsImages[3].artist} /></motion.div>
                            </div>

                            {/* Column 4 - Wide Middle */}
                            <div className={`${styles.grassrootsColCenter} ${styles.grassrootsMiddleWide}`}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} className={`${styles.grassrootsBox} ${styles.grassrootsBoxWide}`}><img src={grassrootsImages[4].url} alt={grassrootsImages[4].artist} /></motion.div>
                            </div>

                            {/* Column 5 */}
                            <div className={styles.grassrootsColTop}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} className={styles.grassrootsBox}><img src={grassrootsImages[5].url} alt={grassrootsImages[5].artist} /></motion.div>
                            </div>

                            {/* Column 6 */}
                            <div className={styles.grassrootsColCenter}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className={styles.grassrootsBox}><img src={grassrootsImages[6].url} alt={grassrootsImages[6].artist} /></motion.div>
                            </div>

                            {/* Column 7 */}
                            <div className={styles.grassrootsCol}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }} className={styles.grassrootsBox}><img src={grassrootsImages[7].url} alt={grassrootsImages[7].artist} /></motion.div>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }} className={styles.grassrootsBox}><img src={grassrootsImages[8].url} alt={grassrootsImages[8].artist} /></motion.div>
                            </div>
                        </div>

                        <div className={styles.grassrootsFooterText}>
                            <div className={styles.grassrootsFooterLine}>
                                <h3 className={styles.grassrootsSubHeading}><span style={{ color: 'var(--color-accent-gold, #d4af37)' }}>Pioneering GlobalMusic Experiences</span></h3>
                            </div>
                            <p className={styles.grassrootsDesc}>
                                In 1986, Dr. T Venkat Vardhan began his journey by securing the rights to air MTV's top 20 music videos in india. Obtaining these rights inspired his goal to lay the foundation for our live music industry by bringing international music acts to India. His vision to introduce global experiences and passion for music led to the birth of DNA Networks – a pioneering force in the live music and events industry in India.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* OUR VALUES SECTION - Pure CSS Hub Diagram */}
            <section className={styles.valuesSection}>
                <div className="container" style={{ padding: '0 40px' }}>
                    <div className={styles.valuesHubWrapper}>
                        {/* Central Hub */}
                        <motion.div 
                            className={styles.hubCentral}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeValue === null ? 'default' : activeValue}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeValue !== null ? (
                                        <span style={{ fontSize: '1.4rem', fontWeight: 900 }}>{valuesList[activeValue].title}</span>
                                    ) : (
                                        <>OUR<br/>VALUES</>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* CSS Arc Background */}
                        <div className={styles.hubArcBackground} />

                        {/* Right Side Cards */}
                        <div className={styles.hubNodesList}>
                            {valuesList.map((val, i) => (
                                <motion.div
                                    key={i}
                                    className={`${styles.valueHubCard} ${activeValue === i ? styles.valueHubCardActive : ''}`}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    onClick={() => setActiveValue(activeValue === i ? null : i)}
                                >
                                    {/* Pure CSS Connector Line and Dot */}
                                    <motion.div 
                                        className={styles.hubConnector}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 'auto' }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 + (i * 0.1), duration: 0.6 }}
                                    >
                                        <div className={styles.hubConnectorDot} />
                                    </motion.div>

                                    <div className={styles.hubIconCircle}>
                                        <val.icon size={28} />
                                    </div>
                                    <div className={styles.hubCardBody}>
                                        <div className={styles.hubTitle}>{val.title}</div>
                                        <AnimatePresence>
                                            {activeValue === i && (
                                                <motion.div
                                                    className={styles.hubDescText}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {val.desc}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className={styles.hubBadge}>{val.id}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCATIONS SECTION */}
            <section className={styles.locationsSection}>
                <div className="container" style={{ padding: '0 40px' }}>
                    <AnimatedSection>
                        <h2 className={styles.locationsTitle}>Where You Can Find Us</h2>
                    </AnimatedSection>

                    <div className={styles.locationCardsGrid}>
                        {locations.map((loc, i) => (
                            <AnimatedSection key={i} delay={i * 0.15}>
                                <div className={styles.locationCard}>
                                    <h3 className={styles.locationCardTitle}>Layout</h3>
                                    <div className={styles.locationCardImgWrap}>
                                         <img src={loc.img} alt={loc.city} className={styles.locationCardImg} />
                                    </div>
                                    <h2 className={styles.locationCity}>{loc.city}</h2>
                                    <div className={styles.locationDetails}>
                                        <p>{loc.address}</p>
                                    </div>
                                    <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className={styles.locationBtn}>
                                        View Location
                                    </a>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS FOOTER SECTION */}
            <section className={styles.statsSection}>
                <div className="container" style={{ padding: '0 40px' }}>
                    <div className={styles.statsGrid}>
                        <AnimatedSection delay={0.1} className={styles.statBox}>
                            <h4>4+</h4>
                            <p>Years of Excellence</p>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2} className={styles.statBox}>
                            <h4>300+</h4>
                            <p>Happy Clients</p>
                        </AnimatedSection>
                        <AnimatedSection delay={0.3} className={styles.statBox}>
                            <h4>1,500+</h4>
                            <p>Magic Experiences</p>
                        </AnimatedSection>
                        <AnimatedSection delay={0.4} className={styles.statBox}>
                            <h4>30+</h4>
                            <p>Professionals</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </main>
    );
}

