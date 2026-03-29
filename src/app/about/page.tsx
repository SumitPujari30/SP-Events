'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import CounterAnimation from '@/components/CounterAnimation';
import Stats3DBackground from '@/components/Stats3DBackground';
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

const locations = [
    {
        city: 'HUBLI',
        type: 'HEAD QUARTERS',
        img: '/assets/Layout_page.png',
        address: '"Marvel Artiza" , CTS No. 4A/2, First Floor - 133, Jayanagara, Vidyanagar, Opposite KIMS, Hubli-580021, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Marvel+Artiza+Hubli'
    },
    {
        city: 'BANGLORE',
        type: 'CORPORATE OFFICE',
        img: '/assets/Layout_page.png',
        address: '“The SP Events” , ITPL Main Road, Opp Capitol Towers, Kadugodi, Whitefield, Bengaluru - 560 066, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=The+SP+Events+Whitefield+Bangalore'
    }
];

export default function AboutPage() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const generated = [...Array(15)].map(() => ({
            cx: 100 + Math.random() * 400,
            cy: 200 + Math.random() * 200,
            r: 1 + Math.random() * 3,
            moveX: Math.random() * 40 - 20,
            moveY: Math.random() * 40 - 20,
            duration: 4 + Math.random() * 6
        }));
        setParticles(generated);
    }, []);

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

            {/* OUR VALUES SECTION - Elegant Radial Vector Layout */}
            <section className={styles.valuesSection}>
                <div className={styles.valuesOverlay} />
                <div className="container" style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    
                    <div className={styles.valuesLayoutWrapper}>
                        {/* Unified Liquid Electric SVG Layout */}
                        <div className={styles.valuesLinesContainer}>
                            <svg width="100%" height="100%" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                                    </linearGradient>
                                    
                                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                    
                                    <linearGradient id="textShimmer" x1="-100%" y1="0%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="white" />
                                        <stop offset="50%" stopColor="#89f7fe" />
                                        <stop offset="100%" stopColor="white" />
                                        <animate attributeName="x1" from="-100%" to="100%" dur="4s" repeatCount="indefinite" />
                                        <animate attributeName="x2" from="0%" to="200%" dur="4s" repeatCount="indefinite" />
                                    </linearGradient>

                                    <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
                                      <polygon points="0 0, 12 6, 0 12" fill="rgba(255,255,255,0.8)" />
                                    </marker>
                                    
                                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Nebula Particles - Memoized to prevent Hydration errors */}
                                {particles.map((p: any, i: number) => (
                                    <motion.circle
                                        key={`particle-${i}`}
                                        cx={p.cx}
                                        cy={p.cy}
                                        r={p.r}
                                        fill="white"
                                        initial={{ opacity: 0.1 }}
                                        animate={{ 
                                            opacity: [0.1, 0.5, 0.1],
                                            scale: [1, 2, 1],
                                            x: [0, p.moveX, 0],
                                            y: [0, p.moveY, 0]
                                        }}
                                        transition={{ duration: p.duration, repeat: Infinity }}
                                    />
                                ))}
                                                               {/* Organic Curved Paths (Quadratic Bezier) - Compacted for 600px height */}
                                {[
                                    { id: 'vp1', d: "M 200 300 Q 600 20 1550 10", delay: 0 },
                                    { id: 'vp2', d: "M 200 300 Q 750 150 1550 160", delay: 0.2 },
                                    { id: 'vp3', d: "M 200 300 Q 800 300 1550 300.1", delay: 0.4 },
                                    { id: 'vp4', d: "M 200 300 Q 750 450 1550 440", delay: 0.6 },
                                    { id: 'vp5', d: "M 200 300 Q 600 580 1550 590", delay: 0.8 }
                                ].map((path, idx) => (
                                    <g key={path.id}>
                                        {/* Base Organic Path */}
                                        <motion.path 
                                            id={path.id} d={path.d} 
                                            stroke="url(#lineGrad)" strokeWidth="2" fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }} 
                                            whileInView={{ pathLength: 1, opacity: 1 }} 
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: path.delay }}
                                        />
                                        
                                        {/* Electric Flow Animation Layer */}
                                        <motion.path 
                                            d={path.d} 
                                            stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none"
                                            strokeDasharray="60 180"
                                            animate={{ strokeDashoffset: [0, -1000] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        />
                                        
                                        {/* Traveling Energy Pulse Ping */}
                                        <motion.circle r="5" fill="white" filter="url(#glow)">
                                            <animateMotion 
                                                path={path.d} 
                                                dur={`${5 + idx}s`} 
                                                repeatCount="indefinite" 
                                                rotate="auto"
                                                begin={`${idx * 1.2}s`}
                                            />
                                        </motion.circle>
                                        
                                        {/* Arrowhead at the end of each curved path */}
                                        <use href={`#${path.id}`} stroke="none" markerEnd="url(#arrowhead)" />
                                    </g>
                                ))}

                                {/* Curved Value Labels - Pushed out even further for BIG circle (Offset 55-60%) */}
                                <g style={{ pointerEvents: 'none' }}>
                                    {[
                                        { id: 'vp1', text: '01 RELIABILITY', offset: '55%' },
                                        { id: 'vp2', text: '02 CONSISTENT QUALITY', offset: '58%' },
                                        { id: 'vp3', text: '03 EQUALITY', offset: '62%' },
                                        { id: 'vp4', text: '04 RESPECT', offset: '58%' },
                                        { id: 'vp5', text: '05 TEAMWORK', offset: '55%' }
                                    ].map((item, i) => (
                                        <motion.text key={i} fill="url(#textShimmer)" fontSize="36" fontWeight="950" 
                                            initial={{ opacity: 0, scale: 0.8 }} 
                                            whileInView={{ opacity: 1, scale: 1 }} 
                                            transition={{ duration: 0.8, delay: 1.5 + (i * 0.2) }}
                                        >
                                            <textPath href={`#${item.id}`} startOffset={item.offset} textAnchor="start" dy="-30">{item.text}</textPath>
                                        </motion.text>
                                    ))}
                                </g>

                                {/* Central BIG Hub - Compacted Center */}
                                <motion.g
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, type: "spring", damping: 10 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Breathing Outer Ring - LARGER SCALE */}
                                    <motion.circle 
                                        cx="200" cy="300" r="220" 
                                        fill="none" stroke="white" strokeWidth="2" 
                                        animate={{ r: [220, 240, 220], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <circle cx="200" cy="300" r="220" fill="rgba(8,8,8,0.9)" stroke="white" strokeWidth="8" filter="url(#glow)" />
                                    
                                    <text x="200" y="275" fill="white" fontSize="74" fontWeight="950" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '3px' }}>
                                        OUR
                                    </text>
                                    <text x="200" y="365" fill="white" fontSize="74" fontWeight="950" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '3px' }}>
                                        VALUES
                                    </text>
                                </motion.g>
                            </svg>
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
                                    <h3 className={styles.locationType}>{loc.type}</h3>
                                    <div className={styles.locationCardImgWrap}>
                                         <img src={loc.img} alt={loc.city} className={styles.locationCardImg} />
                                         <h2 className={styles.locationCity}>{loc.city}</h2>
                                    </div>
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

                    {/* HORIZONTAL QUICK CONNECT SECTION */}
                    <AnimatedSection delay={0.4}>
                        <div className={styles.quickConnectHorizontalBox}>
                            <h2 className={styles.quickConnectTitle}>QUICK CONNECT</h2>
                            <div className={styles.quickConnectRow}>
                                <div className={styles.quickConnectItem}>
                                    <strong>Call :</strong> <span>+91 74118 63227, +91 93530 63227</span>
                                </div>
                                <div className={styles.quickConnectItem}>
                                    <strong>Website :</strong> <a href="http://www.thespevents.com" target="_blank" rel="noopener noreferrer">www.thespevents.com</a>
                                </div>
                                <div className={styles.quickConnectItem}>
                                    <strong>Email :</strong> <a href="mailto:thespevents@gmail.com">thespevents@gmail.com</a>
                                </div>
                                <div className={styles.quickConnectItem}>
                                    <strong>Whatsapp :</strong> <span>+91 74118 63227</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                STATISTICS SECTION — CINEMATIC METRICS
            ════════════════════════════════════════════════════════ */}
            <section className={styles.statsSection}>
                <Stats3DBackground />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className={styles.statsGrid}>
                        {[
                            { value: 4, suffix: "+", label: "Years of Excellence" },
                            { value: 300, suffix: "+", label: "Happy Clients" },
                            { value: 1500, suffix: "+", label: "Magic Experiences" },
                            { value: 30, suffix: "+", label: "Professionals" }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.statItem}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <div className={styles.statGlass}>
                                    <CounterAnimation end={stat.value} suffix={stat.suffix} className={styles.statNumber} />
                                    <div className={styles.statLabel}>{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

