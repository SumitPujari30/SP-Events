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
import { HiPhone, HiMail } from 'react-icons/hi';
import styles from './about.module.css';

gsap.registerPlugin(ScrollTrigger);

const grassrootsImages = [
    { url: '/assets/grassroots/0.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/1.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/2.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/3.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/4.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/5.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/6.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/7.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/8.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/9.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/10.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/11.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/12.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/13.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/14.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/15.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/16.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/17.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/18.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/19.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/20.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/21.webp', artist: 'Grassroots' },
    { url: '/assets/grassroots/22.webp', artist: 'Grassroots' },
];

const locations = [
    {
        city: 'HUBBALLI',
        type: 'HEAD QUARTERS',
        img: '/assets/hubli_city.webp',
        address: '"Marvel Artiza" , CTS No. 4A/2, 1st Floor - 133, Jayanagara, Vidyanagar, Opposite KIMS, Hubli-580021, Karnataka, India.',
        mapLink: 'https://maps.app.goo.gl/RAGkNyDVjg6FiiZX7',
        phones: ['+91 74118 63227'],
        email: 'thespevents@gmail.com'
    },
    {
        city: 'BENGALURU',
        type: 'CORPORATE OFFICE',
        img: '/assets/banglore_lineart.webp',
        address: '"The SP Events" , ITPL Main Road, Opp Capitol Towers, Kadugodi, Whitefield, Bengaluru - 560066, Karnataka, India.',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=The+SP+Events+Whitefield+Bangalore',
        phones: ['+91 93530 63227'],
        email: 'info.thespevents@gmail.com'
    }
];

const coreValues = [
    { num: '01', title: 'EXCELLENCE', desc: 'We strive for perfection in every detail, ensuring world-class outcomes. Our commitment to quality defines every production we undertake.' },
    { num: '02', title: 'CREATIVITY', desc: 'Innovation and originality are at the heart of our magical experiences. We push boundaries to create unique stories that resonate.' },
    { num: '03', title: 'PRECISION', desc: 'Flawless execution driven by meticulous planning and organization. We ensure every second counts for a seamless event flow.' },
    { num: '04', title: 'RELIABILITY', desc: 'A trusted partner you can count on to deliver beyond expectations. We build trust through consistency and proactive delivery.' },
    { num: '05', title: 'COMMITMENT', desc: 'Dedicated to turning your vision into a remarkable reality. We work tirelessly to align every element with your unique goals.' },
];


export default function AboutPage() {
    const [particles, setParticles] = useState<any[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const trailRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 5); // 5px buffer
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    const scrollLeft = () => {
        if (!sliderRef.current) return;

        const container = sliderRef.current;
        const item = container.querySelector(`.${styles.sliderItem}`) as HTMLElement;
        if (!item) return;

        const itemWidth = item.getBoundingClientRect().width + 12; // 12px gap
        const currentScroll = container.scrollLeft;

        if (currentScroll <= 10) {
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
            const currentIndex = Math.round(currentScroll / itemWidth);
            const targetScroll = (currentIndex - 1) * itemWidth;
            container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (!sliderRef.current) return;

        const container = sliderRef.current;
        const item = container.querySelector(`.${styles.sliderItem}`) as HTMLElement;
        if (!item) return;

        const itemWidth = item.getBoundingClientRect().width + 12; // 12px gap
        const { clientWidth, scrollWidth, scrollLeft } = container;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            const currentIndex = Math.round(scrollLeft / itemWidth);
            const targetScroll = (currentIndex + 1) * itemWidth;
            container.scrollTo({ left: targetScroll, behavior: 'smooth' });
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
            // Only allow manual drag on desktop
            if (window.innerWidth <= 768) return;

            isDown = true;
            slider.classList.add(styles.grabbing);

            const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            startPoint = pageX - slider.offsetLeft;
            initialScroll = slider.scrollLeft;
            setIsDragging(true);
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

    // ── Mouse Trail Effect ──
    useEffect(() => {
        const headline = headlineRef.current;
        if (!headline) return;

        let lastPos = { x: 0, y: 0 };
        let currentIndex = 0;
        const threshold = 50; // pixels to move before dropping a new image

        // Cache offset to avoid layout thrashing
        let offsetLeft = 0;
        let offsetTop = 0;

        const updateOffset = () => {
            const rect = headline.getBoundingClientRect();
            offsetLeft = rect.left;
            offsetTop = rect.top;
        };

        updateOffset();
        window.addEventListener('scroll', updateOffset);
        window.addEventListener('resize', updateOffset);

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX - offsetLeft;
            const y = e.clientY - offsetTop;

            const dist = Math.hypot(x - lastPos.x, y - lastPos.y);

            if (dist > threshold) {
                lastPos = { x, y };

                const img = trailRefs.current[currentIndex];
                if (img) {
                    gsap.killTweensOf(img);

                    gsap.set(img, {
                        x: x - 75,
                        y: y - 75,
                        scale: 1,
                        opacity: 1,
                        zIndex: currentIndex
                    });

                    gsap.to(img, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 2, // 2 seconds fade out
                        ease: "power1.out"
                    });
                }

                currentIndex = (currentIndex + 1) % trailRefs.current.length;
            }

            // --- Unique Out of the Box Text Interaction ---
            // The text physically tilts towards the cursor with a dynamic gold shadow
            if (textRef.current) {
                const rect = textRef.current.getBoundingClientRect();
                const textCenterX = rect.left + rect.width / 2;
                const textCenterY = rect.top + rect.height / 2;

                // Calculate tilt angle (max 20 degrees)
                const rotateX = ((e.clientY - textCenterY) / (window.innerHeight / 2)) * -20;
                const rotateY = ((e.clientX - textCenterX) / (window.innerWidth / 2)) * 20;

                gsap.to(textRef.current, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    textShadow: `${-rotateY}px ${rotateX}px 30px rgba(212, 175, 55, 0.4)`, // Cast shadow opposite to light
                    transformPerspective: 1200,
                    ease: "power2.out",
                    duration: 0.5
                });
            }
        };

        const handleMouseLeave = () => {
            if (textRef.current) {
                gsap.to(textRef.current, {
                    rotateX: 0,
                    rotateY: 0,
                    textShadow: `0px 0px 0px rgba(212, 175, 55, 0)`,
                    ease: "elastic.out(1, 0.3)",
                    duration: 1.5
                });
            }
        };

        headline.addEventListener('mousemove', handleMouseMove);
        headline.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            headline.removeEventListener('mousemove', handleMouseMove);
            headline.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', updateOffset);
            window.removeEventListener('resize', updateOffset);
        };
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


            {/* HEADLINE SECTION */}
            <section className={styles.headlineSection} ref={headlineRef}>
                {/* Trail Images - Render a large pool of all available images so they don't recycle while fading */}
                {[...grassrootsImages, ...grassrootsImages, ...grassrootsImages].map((img, i) => (
                    <Image
                        key={`trail-${i}`}
                        src={img.url}
                        alt="Trail"
                        width={150}
                        height={150}
                        className={styles.trailImage}
                        ref={(el) => {
                            if (trailRefs.current) {
                                trailRefs.current[i] = el;
                            }
                        }}
                    />
                ))}
                <FloatingParticles count={4} shapes={['dot', 'diamond']} seed={789} />
                <AnimatedSection delay={0.2} style={{ zIndex: 50, position: 'relative' }}>
                    <h2
                        ref={textRef}
                        className={styles.pioneeringTitle}
                        style={{ marginBottom: 0, transformStyle: 'preserve-3d', willChange: 'transform' }}
                    >
                        A Method to the Madness of <br />
                        <span style={{ color: 'var(--color-accent-gold, #d4af37)', fontStyle: 'italic', display: 'inline-block' }}>Creating Magic...</span>
                    </h2>
                </AnimatedSection>
            </section>

            {/* TEXT BLOCKS SECTION */}
            <section className={styles.introSection} style={{ paddingTop: '20px' }}>
                <FloatingParticles count={4} shapes={['dotWhite']} seed={123} />
                <AnimatedSection delay={0.3}>
                    <div className={styles.pioneeringTextBlocks} style={{ marginTop: '0' }}>
                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE MAGIC</div>
                            <p>
                                Leading THE SP EVENTS with a focus on creativity and precision, the vision is delivering impactful and memorable experiences. Expanding into luxury through MANE MADUVE, premium and personalized weddings are being crafted with attention to detail. Driven by strong execution and creative direction, the brand is steadily growing in the event and experiential space.
                            </p>
                            <div className={styles.pioneeringVerticalLine} />
                        </div>

                        <div className={styles.pioneeringBlock}>
                            <div className={styles.pioneeringLabel}>THE METHOD</div>
                            <p>
                                Under his leadership, THE SP EVENTS has established a strong portfolio of collaborations with esteemed organizations, including KLE Society, the Government of Karnataka, Deshpande Startups, IIIT Dharwad, the Bureau of Indian Standards, VRL Group, Inorbit Malls, KIMS Hubli, BNI, Rotary International, Vijayavani, PVR INOX, Sulthan Diamonds, Hodek Vibrations, Adani Cement, and IIT Dharwad.
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
                                        src="/assets/samarth_2.0.webp"
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
                                    <p><strong><strong>Mr. Samarth Udaykumar Patangi</strong></strong> is the visionary Founder and Managing Director of <strong><strong>THE SP EVENTS</strong></strong>. An engineer by education and an entrepreneur by passion, he built the company to transform creative ideas into unforgettable experiences.</p>
                                    <p>What began as a passion for music and live entertainment has evolved into a dynamic platform delivering world-class corporate events, social celebrations, and large-scale productions.</p>
                                    <p>Driven by creativity, precision, and strong leadership values, he continues to lead THE SP EVENTS toward becoming a leading name in the event and experiential industry. Beyond work, his inspiration continues to come from music, live experiences, and creative collaborations.</p>

                                </div>
                                <div className={styles.founderInfo}>
                                    <h4 className={styles.founderName}>
                                        Samarth Udaykumar Patangi
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
                        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
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
                        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
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
                            <h2 className={styles.locationsTitle}>Where You Can Find <span style={{ color: 'var(--color-accent-gold)' }}>Us</span></h2>
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
                                                sizes="100%"
                                            />
                                            <div className={styles.locationOverlayContent}>
                                                <h2 className={styles.locationCity}>{loc.city}</h2>
                                                <div className={styles.locationDetails}>
                                                    <p>{loc.address}</p>
                                                    <div className={styles.locationContact}>
                                                        {loc.phones.map((phone, pIdx) => (
                                                            <a key={pIdx} href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.locationContactItem}>
                                                                <HiPhone className={styles.locationContactIcon} />
                                                                <span>{phone}</span>
                                                            </a>
                                                        ))}
                                                        <a href={`mailto:${loc.email}`} className={styles.locationContactItem}>
                                                            <HiMail className={styles.locationContactIcon} />
                                                            <span>{loc.email}</span>
                                                        </a>
                                                    </div>
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
