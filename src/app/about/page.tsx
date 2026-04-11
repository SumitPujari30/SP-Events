'use client';

import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import CounterAnimation from '@/components/CounterAnimation';
import Stats3DBackground from '@/components/Stats3DBackground';
import styles from './about.module.css';

const grassrootsImages = [
    { url: '/assets/grassroots/IMG_0350.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_0452.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_0491.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_0756.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_0968.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_1450.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_1660.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_1925.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_2033.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_2813.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_3468.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_3535.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_3970.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_4210.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_4838.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_5489.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_5560.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_6278.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_7610.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_8331.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_9034.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_9054.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_9056.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/IMG_9830.webp', artist: 'Grassroots' },
];

const locations = [
    {
        city: 'HUBLI',
        type: 'HEAD QUARTERS',
        img: '/assets/hubli_city.png',
        address: '"Marvel Artiza" , CTS No. 4A/2, First Floor - 133, Jayanagara, Vidyanagar, Opposite KIMS, Hubli-580021, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Marvel+Artiza+Hubli'
    },
    {
        city: 'BANGALORE',
        type: 'CORPORATE OFFICE',
        img: '/assets/bangaluru.jpeg',
        address: '"The SP Events" , ITPL Main Road, Opp Capitol Towers, Kadugodi, Whitefield, Bengaluru - 560 066, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=The+SP+Events+Whitefield+Bangalore'
    }
];

export default function AboutPage() {
    const [particles, setParticles] = useState<any[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false); // only for UI styling if needed, logic is native

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 5); // 5px buffer
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth } = sliderRef.current;
            if (scrollLeft <= 10) {
                // At the start, jump to the end
                sliderRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: -(window.innerWidth / 3), behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: window.innerWidth / 3, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let isDown = false;
        let startPoint = 0;
        let initialScroll = 0;
        let rafId: number | null = null;

        const handleDown = (e: MouseEvent | TouchEvent) => {
            isDown = true;
            slider.classList.add(styles.grabbing);
            
            // Handle both mouse and touch pageX
            const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            startPoint = pageX - slider.offsetLeft;
            initialScroll = slider.scrollLeft;
            setIsDragging(true);

            // Prevent text selection/drag starts on desktop
            if (!('touches' in e)) {
                // Keep default only for buttons if needed, but slider track is safe
            }
        };

        const handleUpOrLeave = () => {
            isDown = false;
            slider.classList.remove(styles.grabbing);
            setIsDragging(false);
            if (rafId) cancelAnimationFrame(rafId);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDown) return;
            
            // Allow vertical scrolling on touch devices while dragging horizontally? 
            // Usually not on a horizontal slider, so we prevent default
            if (e.cancelable) e.preventDefault();

            const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            const x = pageX - slider.offsetLeft;
            const walk = (x - startPoint) * 1.5; // Drag speed multiplier
            
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                slider.scrollLeft = initialScroll - walk;
            });
        };

        // Mouse Events
        slider.addEventListener('mousedown', handleDown);
        slider.addEventListener('mouseleave', handleUpOrLeave);
        slider.addEventListener('mouseup', handleUpOrLeave);
        slider.addEventListener('mousemove', handleMove);

        // Touch Events
        slider.addEventListener('touchstart', handleDown, { passive: false });
        slider.addEventListener('touchend', handleUpOrLeave);
        slider.addEventListener('touchmove', handleMove, { passive: false });

        // Scroll listener for UI state (navigation arrows)
        const checkScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = slider;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        };

        slider.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();

        return () => {
            slider.removeEventListener('mousedown', handleDown);
            slider.removeEventListener('mouseleave', handleUpOrLeave);
            slider.removeEventListener('mouseup', handleUpOrLeave);
            slider.removeEventListener('mousemove', handleMove);
            slider.removeEventListener('touchstart', handleDown);
            slider.removeEventListener('touchend', handleUpOrLeave);
            slider.removeEventListener('touchmove', handleMove);
            slider.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

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
            {/* ═══════════════════════════════════════════════════════
                1. HERO — pure video/image, matching homepage
            ════════════════════════════════════════════════════════ */}
            <section className={styles.heroSection}>
                <div className={styles.videoBg}>
                    <Image
                        src="/assets/Layout_page.png"
                        alt="About SP Events Hero"
                        fill
                        className={styles.heroImage}
                        priority
                        quality={90}
                    />
                    <div className={styles.videoOverlayBase} />
                    <div className={styles.videoOverlayGradient} />
                </div>

                {/* Scroll indicator with simple line */}
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollLine} />
                    <span className={styles.scrollText}></span>
                </div>
            </section>

            {/* INTRO TEXT SECTION */}
            <section className={styles.introSection}>
                <AnimatedSection delay={0.2}>
                    <h2 className={styles.pioneeringTitle}>A Method to the Madness That is <span style={{ color: 'var(--color-accent-gold, #d4af37)', fontStyle: 'italic' }}>Creating Magic</span></h2>
                    <div className={styles.pioneeringTextBlocks}>
                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE MAGIC</div>
                            <p>
                                At THE SP EVENTS, we design luxury, innovative, and impact-driven experiences that leave a lasting impression. Blending creativity with strategic thinking and flawless execution, we transform ideas into extraordinary events. Every detail is approached with precision and originality, ensuring each experience whether intimate or large scale is delivered with elegance, seamless coordination, and a commitment to excellence.
                            </p>
                            <div className={styles.pioneeringVerticalLine} />
                        </div>
                        
                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE METHOD</div>
                            <p>
                                Founded in 2022, THE SP EVENTS was created to redefine event management through a more professional, reliable, and innovation-led approach. With a growing foundation of experience and a passion for high-quality execution, we continue to evolve as a trusted partner, crafting memorable events that resonate long after they are experienced.
                            </p>
                            <div className={styles.pioneeringVerticalLine} />
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* GRASSROOTS SECTION */}
            <section className={styles.grassrootsSection}>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.grassrootsTopTitle}>
                    GRASSROOTS
                </motion.h2>

                <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* FOUNDER'S WORDS CARD */}
                        <motion.div 
                            className={styles.grassrootsCard}
                            whileHover={{ y: -10, scale: 1.01 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className={styles.founderPhotoContainer}>
                                <div className={styles.founderHalo} />
                                <div className={styles.founderPhotoWrap}>
                                    <Image 
                                        src="/assets/samarth.png" 
                                        alt="Samarth U Patangi" 
                                        fill
                                        className={styles.founderPhoto} 
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                </div>
                            </div>
                            
                            <div className={styles.founderContent}>
                                <div className={styles.bgQuoteIcon}>“</div>
                                <div className={styles.founderEyebrow}>THE FOUNDER'S VISION</div>
                                <div className={styles.founderQuote}>
                                    <p>Mr. Samarth U Patangi is the visionary Founder and Managing Director of THE SP EVENTS. An engineer by education and an entrepreneur by passion, he built the company to transform creative ideas into unforgettable experiences.</p>
                                    <p>What began as a passion for music and live entertainment has evolved into a dynamic platform delivering world-class corporate events, social celebrations, and large-scale productions.</p>
                                </div>
                                <div className={styles.founderInfo}>
                                    <h4 className={styles.founderName}>
                                        Samarth U Patangi
                                        <div className={styles.signatureUnderline} />
                                    </h4>
                                    <p className={styles.founderRole}>Founder & Visionary</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* IMAGE SLIDER SECTION */}
                <div className={styles.sliderSection}>
                    <button 
                        className={`${styles.sliderNavBtn} ${styles.sliderNavBtnLeft}`} 
                        onClick={scrollLeft} 
                        aria-label="Scroll Left"
                    >
                        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                    </button>
                    <div 
                        className={styles.sliderTrack} 
                        ref={sliderRef}
                    >
                        {/* Double array for seamless feel or single, since we have arrows single is fine */}
                        {grassrootsImages.map((img, i) => (
                            <div key={i} className={styles.sliderItem} draggable={false}>
                                <Image 
                                    src={img.url} 
                                    alt={`Gallery ${i}`} 
                                    fill
                                    draggable={false} 
                                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                    <button 
                        className={`${styles.sliderNavBtn} ${styles.sliderNavBtnRight}`} 
                        onClick={scrollRight} 
                        aria-label="Scroll Right"
                    >
                        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                    </button>
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
                                        <stop offset="0%" stopColor="rgba(212, 175, 55, 0.05)" />
                                        <stop offset="50%" stopColor="rgba(212, 175, 55, 0.3)" />
                                        <stop offset="100%" stopColor="rgba(212, 175, 55, 0.6)" />
                                    </linearGradient>

                                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="50%" stopColor="rgba(212, 175, 55, 0.95)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>

                                    <linearGradient id="textShimmer" x1="-100%" y1="0%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="white" />
                                        <stop offset="50%" stopColor="#d4af37" />
                                        <stop offset="100%" stopColor="white" />
                                        <animate attributeName="x1" from="-100%" to="100%" dur="4s" repeatCount="indefinite" />
                                        <animate attributeName="x2" from="0%" to="200%" dur="4s" repeatCount="indefinite" />
                                    </linearGradient>

                                    <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
                                        <polygon points="0 0, 12 6, 0 12" fill="rgba(212, 175, 55, 0.9)" />
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
                                        style={{ willChange: 'transform, opacity' }}
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
                                    { id: 'vp1', d: "M 200 300 Q 600 30 1550 20", delay: 0 },
                                    { id: 'vp2', d: "M 200 300 Q 750 160 1550 170", delay: 0.2 },
                                    { id: 'vp3', d: "M 200 300 Q 800 315 1550 310", delay: 0.4 },
                                    { id: 'vp4', d: "M 200 300 Q 750 440 1550 430", delay: 0.6 },
                                    { id: 'vp5', d: "M 200 300 Q 600 570 1550 580", delay: 0.8 }
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
                                            stroke="rgba(212, 175, 55, 0.4)" strokeWidth="2" fill="none"
                                            strokeDasharray="60 180"
                                            animate={{ strokeDashoffset: [0, -1000] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        />

                                        {/* Traveling Energy Pulse Ping */}
                                        <motion.circle r="5" fill="#d4af37" filter="url(#glow)">
                                            <animateMotion
                                                path={path.d}
                                                dur={`${5 + idx}s`}
                                                repeatCount="indefinite"
                                                rotate="auto"
                                                begin={`${idx * 1.2}s`}
                                            />
                                        </motion.circle>

                                        {/* Arrowhead at the end of eac h curved path */}
                                        <use href={`#${path.id}`} stroke="none" markerEnd="url(#arrowhead)" />
                                    </g>
                                ))}

                                {/* Curved Value Labels - Pushed out even further for BIG circle (Offset 55-60%) */}
                                <g style={{ pointerEvents: 'none' }}>
                                    {[
                                        { id: 'vp1', text: '01 EXCELLENCE', offset: '55%' },
                                        { id: 'vp2', text: '02 CREATIVITY', offset: '58%' },
                                        { id: 'vp3', text: '03 PRECISION', offset: '62%' },
                                        { id: 'vp4', text: '04 RELIABILITY', offset: '58%' },
                                        { id: 'vp5', text: '05 COMMITMENT', offset: '55%' }
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
                                        cx="200" cy="300" r="180"
                                        fill="none" stroke="white" strokeWidth="2"
                                        animate={{ r: [180, 200, 180], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <circle cx="200" cy="300" r="180" fill="rgba(8,8,8,0.9)" stroke="white" strokeWidth="8" filter="url(#glow)" />

                                    <text x="200" y="275" fill="white" fontSize="64" fontWeight="950" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '3px' }}>
                                        OUR
                                    </text>
                                    <text x="200" y="350" fill="white" fontSize="64" fontWeight="950" textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '3px' }}>
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
                    <div className={styles.locationsHeader}>
                        <AnimatedSection>
                            <h2 className={styles.locationsTitle}>Where You Can Find <span style={{color:'var(--color-accent-gold)'}}>Us</span></h2>
                            <p className={styles.locationsSubheading}>
                                Our services and expertise extend across multiple locations, ensuring seamless event execution wherever you need us.
                            </p>
                        </AnimatedSection>
                    </div>

                    <div className={styles.locationCardsGrid}>
                        {locations.map((loc, i) => (
                            <AnimatedSection key={i} delay={i * 0.15}>
                                <div className={styles.locationCard}>
                                    <h3 className={styles.locationType}>{loc.type}</h3>
                                    <a 
                                        href={loc.mapLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.locationLinkWrapper}
                                    >
                                        <div className={styles.locationCardImgWrap}>
                                            <Image 
                                                src={loc.img} 
                                                alt={loc.city} 
                                                fill
                                                className={styles.locationCardImg} 
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className={styles.locationOverlayContent}>
                                                <h2 className={styles.locationCity}>{loc.city}</h2>
                                                <div className={styles.locationDetails}>
                                                    <p>{loc.address}</p>
                                                    <div className={styles.locationBtnSmall}>
                                                        View Location →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

       
        </main>
    );
}

