/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';
import HomeBrandsSection from '@/components/HomeBrandsSection';
import JoinUsSection from '@/components/JoinUsSection';
import CounterAnimation from '@/components/CounterAnimation';
import Stats3DBackground from '@/components/Stats3DBackground';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// ─── Event Categories ────────────────────────────────────────
const eventCategories = [
  {
    id: 'corporate',
    title: 'Corporate Events',
    image: '/assets/Layout_page.png',
    color: '#d4af37',
  },
  {
    id: 'launches',
    title: 'Launch Events',
    image: '/assets/Layout_page.png',
    color: '#3b82f6',
  },
  {
    id: 'special',
    title: 'Special Events',
    image: '/assets/Layout_page.png',
    color: '#f97316',
  },
  {
    id: 'musical',
    title: 'Musical Events',
    image: '/assets/Layout_page.png',
    color: '#a855f7',
  },
  {
    id: 'sports',
    title: 'Sports Events',
    image: '/assets/Layout_page.png',
    color: '#22c55e',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    image: '/assets/Layout_page.png',
    color: '#ec4899',
  },
];


// ─── Stats Data ──────────────────────────────────────────────
const stats = [
  { value: 4, suffix: "+", label: "Years of Excellence" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 1500, suffix: "+", label: "Magic Experiences" },
  { value: 30, suffix: "+", label: "Professionals" },
];

// ─── Component ───────────────────────────────────────────────
const rhymeWords = ["Unforgettable", "Indelible", "Incredible", "Exceptional", "Unparalleled"];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rhymeWords.length);
    }, 2800); // Cycle every 2.8 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero image fade in ───────────────────────────────────
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out', delay: 0.2 }
      );

      // Scroll line bounce
      gsap.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });
      gsap.to(scrollIndicatorRef.current, {
        y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut', delay: 1.4,
      });

      // ── Experiences Unique Text Reveal ─────────────────────
      const expTitleLines = document.querySelectorAll(`.${styles.expUniqueLineInner}`);
      if (expTitleLines.length) {
        gsap.fromTo(
          expTitleLines,
          { y: '100%', rotation: 5 },
          {
            y: '0%',
            rotation: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: `.${styles.experiencesSection}`,
              start: 'top 70%',
            },
          }
        );
      }

      // Exp text fade in
      gsap.fromTo(
        `.${styles.expTextFade}`,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.expRight}`, start: 'top 75%' },
        }
      );

      // ── Category Header Arrival ──────────────────────────────
      gsap.fromTo(
        [`.${styles.catBadge}`, `.${styles.catTitle}`],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.catHeader}`, start: 'top 85%' },
        }
      );

      // ── Horizontal Scroll Pinning ──────────────────────────────
      if (sliderRef.current && sectionRef.current) {
        const getScrollAmount = () => {
          if (!sliderRef.current) return 0;
          const sliderWidth = sliderRef.current.scrollWidth;
          const paddingLeft = window.innerWidth * 0.05; // Matches 5vw padding-left of wrapper
          return -(sliderWidth + paddingLeft - window.innerWidth);
        };

        const horizontalTween = gsap.to(sliderRef.current, {
          x: getScrollAmount,
          ease: 'none',
          id: 'horizontalScrollAnimation',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1, // Smooth dampening
            start: 'top top',
            end: () => `+=${sliderRef.current?.scrollWidth || window.innerWidth}`, 
            invalidateOnRefresh: true,
          },
        });
      }

      // ── Divider banner image arrival ─────────────────────────
      gsap.fromTo(
        `.${styles.wowImage}`,
        { y: 120, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: `.${styles.dividerBanner}`, start: 'top 85%' },
        }
      );

      // Magic Text arrival
      gsap.fromTo(
        `.${styles.magicTextWrapper}`,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1, delay: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.dividerBanner}`, start: 'top 85%' },
        }
      );

      // ── Stats Section ─────────────────────────────────────────
      gsap.fromTo(
        `.${styles.statItem}`,
        { opacity: 0, y: 80, scale: 0.8, rotationX: 15 },
        {
          opacity: 1, y: 0, scale: 1, rotationX: 0, 
          duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: `.${styles.statsGrid}`, start: 'top 85%' },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>

      {/* ═══════════════════════════════════════════════════════
          1. HERO — pure video, no text/buttons over it
      ════════════════════════════════════════════════════════ */}
      <section className={styles.heroSection}>

        <div className={styles.videoBg}>
          <img
            ref={heroImageRef}
            src="/assets/Layout_page.png"
            alt="The SP Events Hero"
            className={styles.heroImage}
          />
          <div className={styles.videoOverlayBase} />
          <div className={styles.videoOverlayGradient} />
        </div>

        {/* Scroll indicator only */}
        <div className={styles.scrollIndicator} ref={scrollIndicatorRef}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>SCROLL</span>
        </div>

        <div className={styles.heroBottomFade} />
      </section>


      {/* ═══════════════════════════════════════════════════════
          2. EXPERIENCES — Custom SP Events Design
      ════════════════════════════════════════════════════════ */}
      <section className={styles.experiencesSection}>
        {/* Soft glowing orbs for brand identity */}
        <div className={styles.expOrbGold} />
        <div className={styles.expOrbPurple} />
        
        <div className={`container ${styles.expContainer}`}>
          
          {/* Left Column - Unique Staggered Title */}
          <div className={styles.expLeft}>
            <div className={styles.expBadge}>
              <span className={styles.expBadgeDiamond}>✧</span>
              Our Philosophy
            </div>
            
            <h2 className={styles.expTitle}>
              <div className={styles.expUniqueLine}>
                <span className={styles.expUniqueLineInner}>Architecting</span>
              </div>
              <div className={styles.expUniqueLine}>
                <span className={`${styles.expUniqueLineInner} ${styles.rhymeHoverWrapper}`}>
                  <span key={wordIndex} className={`${styles.animatedWord} ${styles.expTextGoldItalic}`}>
                    {rhymeWords[wordIndex]}
                  </span>
                </span>
              </div>
              <div className={styles.expUniqueLine}>
                <span className={styles.expUniqueLineInner}>Moments.</span>
              </div>
            </h2>
          </div>

          {/* Right Column - Brand Story */}
          <div className={styles.expRight}>
            <div className={styles.expStoryBlock}>
              <p className={`${styles.expText} ${styles.expTextFade}`}>
                At <strong className={styles.expTextHighlight}>The SP Events</strong>, ideas transform into immersive realities. We fuse bold creativity with microscopic attention to detail and razor-sharp execution. For us, the magic lies in orchestrating the perfect balance between the grand vision and the smallest touchpoints.
              </p>
              
              <div className={`${styles.expDivider} ${styles.expTextFade}`} />
              
              <p className={`${styles.expTextSecondary} ${styles.expTextFade}`}>
                Born from over 4+ years of industry mastery, our founding team recognized a profound need for a truly professional, innovation-driven event management partner. We don&apos;t just plan events; we engineer environments that resonate.
              </p>
            </div>
            
            <div className={`${styles.expAction} ${styles.expTextFade}`}>
              <a href="/about" className={styles.expButton}>
                <span className={styles.expButtonText}>Discover Our Story</span>
                <span className={styles.expButtonArrow}>→</span>
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          3. OUR SERVICES — Horizontal Scroll
      ════════════════════════════════════════════════════════ */}
      <section className={styles.categoriesSection} ref={sectionRef}>
        <div className={styles.catStickyWrapper}>
          <div className="container">
            {/* Section heading */}
            <div className={styles.catHeader}>
              <div className={styles.catBadge}>
                <span className={styles.catBadgeDiamond}>✧</span>
                OUR EXPERTISE
              </div>
              <h2 className={styles.catTitle}>
                Our <span className={styles.catTitleGold}>Services</span>
              </h2>
            </div>
          </div>

          {/* Horizontal Slider */}
          <div className={styles.catSliderWrapper}>
            <div className={styles.catGrid} ref={sliderRef}>
              {eventCategories.map(cat => (
                <div
                  key={cat.id}
                  className={styles.catCard}
                  style={{ '--cat-color': cat.color } as React.CSSProperties}
                >
                  {/* Full bleed background image or main card content */}
                  <div className={styles.catCardInner}>
                    <img src={cat.image} alt={cat.title} className={styles.catCardImg} />
                    <div className={styles.catCardTitleWrapper}>
                      <span className={styles.catCardTitle}>{cat.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. CREATING WOW EXPERIENCES — Image Banner
      ════════════════════════════════════════════════════════ */}
      <div className={styles.dividerBanner}>
        <div className={styles.dividerBannerInner}>
          <img 
            src="/assets/Layout_page.png" 
            alt="Creating Magic Layout"
            className={styles.wowImage}
          />
          <div className={styles.magicTextWrapper}>
            <span className={styles.magicText}>Creating Magic Layout</span>
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════════
          5. STATS SECTION — Premium Metrics
      ════════════════════════════════════════════════════════ */}
      <section className={styles.statsSection}>
        <Stats3DBackground />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
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


      {/* ═══════════════════════════════════════════════════════
          6. TRUSTED BY — PREMIUM GRID
      ════════════════════════════════════════════════════════ */}
      <HomeBrandsSection />

      {/* ═══════════════════════════════════════════════════════
          7. JOIN US
      ════════════════════════════════════════════════════════ */}
      <JoinUsSection />

    </div>
  );
}
