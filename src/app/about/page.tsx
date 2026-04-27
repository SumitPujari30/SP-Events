'use client';

import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '@/components/AnimatedSection';
import CounterAnimation from '@/components/CounterAnimation';
import Stats3DBackground from '@/components/Stats3DBackground';
import FloatingParticles from '@/components/FloatingParticles';
import styles from './about.module.css';

gsap.registerPlugin(ScrollTrigger);

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
        address: '"The SP Events" , ITPL Main Road, Opp Capitol Towers, Kadugodi, Whitefield, Bengaluru - 560066, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=The+SP+Events+Whitefield+Bangalore'
    }
];

const coreValues = [
    { num: '01', title: 'EXCELLENCE', desc: 'We strive for perfection in every detail, ensuring world-class outcomes.' },
    { num: '02', title: 'CREATIVITY', desc: 'Innovation and originality are at the heart of our magical experiences.' },
    { num: '03', title: 'PRECISION', desc: 'Flawless execution driven by meticulous planning and organization.' },
    { num: '04', title: 'RELIABILITY', desc: 'A trusted partner you can count on to deliver beyond expectations.' },
    { num: '05', title: 'COMMITMENT', desc: 'Dedicated to turning your vision into a remarkable reality.' },
];


export default function AboutPage() {
    const [particles, setParticles] = useState<any[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
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

    // ── GSAP scroll-driven effects ──
    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Intro section — text blocks stagger reveal ──
            const introBlocks = document.querySelectorAll(`.${styles.pioneeringBlock}`);
            if (introBlocks.length) {
                gsap.fromTo(introBlocks, 
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 1, stagger: 0.2, ease: 'power3.out',
                        scrollTrigger: { trigger: `.${styles.introSection}`, start: 'top 75%' },
                    }
                );
            }

            // ── Grassroots Title reveal ──
            gsap.fromTo(`.${styles.grassrootsTopTitle}`,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: `.${styles.grassrootsSection}`, start: 'top 80%' }
                }
            );

            // ── Grassroots Card reveal ──
            gsap.fromTo(`.${styles.grassrootsCard}`,
                { y: 80, opacity: 0, scale: 0.98 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: `.${styles.grassrootsCard}`, start: 'top 85%' }
                }
            );

            // ── Slider Section reveal ──
            gsap.fromTo(`.${styles.sliderSection}`,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: `.${styles.sliderSection}`, start: 'top 90%' }
                }
            );

            // ── Values Title reveal ──
            gsap.fromTo(`.${styles.valuesMainTitle}`,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: `.${styles.valuesSection}`, start: 'top 80%' }
                }
            );

            // ── Values Pillars rising reveal ──
            const pillars = document.querySelectorAll('.value-pillar-item');
            if (pillars.length) {
                gsap.fromTo(pillars,
                    { y: 150, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 1.5,
                        stagger: 0.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: `.${styles.valuesPillarGrid}`,
                            start: 'top 85%',
                        }
                    }
                );
            }

            // ── Locations Title reveal ──
            gsap.fromTo([`.${styles.locationsTitle}`, `.${styles.locationsSubheading}`],
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: `.${styles.locationsHeader}`, start: 'top 85%' }
                }
            );

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className={styles.pageWrap} ref={pageRef}>
            {/* ═══════════════════════════════════════════════════════
                1. HERO — pure video/image, matching homepage
            ════════════════════════════════════════════════════════ */}
            <section className={styles.heroSection}>
                <div className={styles.videoBg}>
                    <video
                        src="/assets/Hero.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.heroImage}
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
                <FloatingParticles count={8} shapes={['dot', 'diamond', 'dotWhite']} seed={789} />
                <AnimatedSection delay={0.2}>
                    <h2 className={styles.pioneeringTitle}>A Method to the Madness <span style={{ color: 'var(--color-accent-gold, #d4af37)', fontStyle: 'italic' }}>Creating Magic</span></h2>
                    <div className={styles.pioneeringTextBlocks}>
                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE MAGIC</div>
                            <p>
                                Building on this vision, he further expanded into the luxury segment with the launch of MANE MADUVE, a dedicated wedding planning venture crafted to deliver premium and bespoke wedding experiences under the creative direction of THE SP EVENTS. Driven by creativity, precision, and strong leadership values, he continues to lead the brand towards becoming a leading name in the event and experiential industry.
                            </p>
                            <div className={styles.pioneeringVerticalLine} />
                        </div>
                        
                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE METHOD</div>
                            <p>
                                Under his leadership, THE SP EVENTS has developed strong relationships with reputed organizations including KLE Society, Government of Karnataka, Deshpande Startups, IIIT Dharwad, Bureau of Indian Standards, VRL, Inorbit Malls, KIMS Hubli, BNI, Rotary Club, Vijayavani, Inner Wheel Club, Hodek, Adani Cement, and IIT Dharwad. Beyond work, his inspiration is rooted in music, live experiences, and creative collaborations.
                            </p>
                            <div className={styles.pioneeringVerticalLine} />
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* GRASSROOTS SECTION */}
            <section className={styles.grassrootsSection}>
                <FloatingParticles count={6} shapes={['dotPurple', 'ring']} seed={321} />
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
                                <div className={styles.bgQuoteIcon}>"</div>
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

            {/* OUR VALUES SECTION - Glass Pillar Grid */}
            <section className={styles.valuesSection}>
                <div className={styles.valuesMainTitleWrapper}>
                    <AnimatedSection>
                        <h2 className={styles.valuesMainTitle}>
                            OUR <span>VALUES</span>
                        </h2>
                    </AnimatedSection>
                </div>

                <div className={styles.valuesPillarGrid}>
                    {coreValues.map((value, i) => (
                        <div
                            key={i}
                            className={`${styles.valuePillar} value-pillar-item`}
                        >
                            {/* Decorative architectural elements */}
                            <div className={styles.pillarGlow} />
                            <div className={styles.pillarTopCap} />
                            
                            <div className={styles.pillarContent}>
                                <div className={styles.pillarBigNumber}>{value.num}</div>
                                <div className={styles.pillarInner}>
                                    <h3 className={styles.pillarTitle}>{value.title}</h3>
                                    <p className={styles.pillarDesc}>{value.desc}</p>
                                </div>
                            </div>
                            
                            <div className={styles.pillarBottomCap} />
                        </div>
                    ))}
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
                                                unoptimized
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
