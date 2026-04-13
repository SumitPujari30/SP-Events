/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';
import HomeBrandsSection from '@/components/HomeBrandsSection';
import CounterAnimation from '@/components/CounterAnimation';
import Stats3DBackground from '@/components/Stats3DBackground';
import FloatingParticles from '@/components/FloatingParticles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { clientsData } from '@/lib/clientData';
import ServicesGrid from '@/components/ServicesGrid';
gsap.registerPlugin(ScrollTrigger);

// ─── Event Categories ────────────────────────────────────────
const eventCategories = [
  {
    id: 'corporate',
    title: 'Corporate Events',
    image: '/assets/Layout_page.png',
  },
  {
    id: 'launches',
    title: 'Launch Events',
    image: '/assets/Layout_page.png',
  },
  {
    id: 'musical',
    title: 'Music Events',
    image: '/assets/Layout_page.png',
  },
  {
    id: 'special',
    title: 'Special Events',
    image: '/assets/Layout_page.png',
  },
  {
    id: 'sports',
    title: 'Sports Events',
    image: '/assets/Layout_page.png',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    image: '/assets/Layout_page.png',
  },
];

// ─── Stats Data ──────────────────────────────────────────────
const stats = [
  { value: 3, suffix: "+", label: "Years of Excellence" },
  { value: 315, suffix: "+", label: "Repeat Clients" },
  { value: 1450, suffix: "+", label: "Magic Experiences" },
  { value: 15, suffix: "+", label: "Professional Folks" },
  { value: 150, suffix: "+", label: "Events Per Year" },
];

// ─── Component ───────────────────────────────────────────────
const rhymeWords = ["Unforgettable", "Indelible", "Incredible", "Exceptional", "Unparalleled"];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const dividerImageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rhymeWords.length);
    }, 2800); // Cycle every 2.8 seconds
    return () => clearInterval(interval);
  }, []);

  // ── Magnetic button effect ──
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      if (btn) btn.style.transition = '';
    }, 500);
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
        [`.${styles.catBadge}`, `.${styles.uniqueTitle}`],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.catHeader}`, start: 'top 85%' },
        }
      );

      // ── Divider banner image parallax + arrival ─────────────
      if (dividerImageRef.current) {
        gsap.fromTo(
          dividerImageRef.current,
          { y: 120, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: `.${styles.dividerBanner}`, start: 'top 85%' },
          }
        );

        // Parallax effect while scrolling through
        gsap.to(dividerImageRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: `.${styles.dividerBanner}`,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

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

      // ── Founder Section Cinematic Reveal ─────────────────────
      gsap.fromTo(
        `.${styles.founderCard}`,
        { opacity: 0, y: 100, scale: 0.95, rotationX: 5 },
        {
          opacity: 1, y: 0, scale: 1, rotationX: 0,
          duration: 1.8, ease: 'power4.out',
          scrollTrigger: { trigger: `.${styles.founderSection}`, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        [`.${styles.founderImageWrapper}`, `.${styles.founderQuote}`, `.${styles.founderNameBlock}`, `.${styles.founderText}`],
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 1.2, stagger: 0.15, delay: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.founderSection}`, start: 'top 80%' },
        }
      );

      // ── Horizontal slide-in for services section title ──────
      gsap.fromTo(
        `.${styles.catHeader}`,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.categoriesSection}`,
            start: 'top 80%',
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Founder card tilt ──
  const founderCardRef = useRef<HTMLDivElement>(null);
  const handleFounderTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = founderCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleFounderTiltLeave = useCallback(() => {
    const card = founderCardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    setTimeout(() => {
      if (card) card.style.transition = '';
    }, 600);
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

        {/* Floating micro-graphics */}
        <FloatingParticles count={10} shapes={['dot', 'dotWhite', 'diamond']} seed={123} />

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
                <strong className={styles.expTextHighlight}>THE SP EVENTS</strong> is an emerging event management and experiential production company known for delivering impactful and professionally executed events. Founded in 2022 by <strong className={styles.expTextHighlight}>Mr. Samarth U. Patangi</strong>, the company is built on the core pillars of enterprise, excellence, and innovation.
              </p>

              <div className={`${styles.expDivider} ${styles.expTextFade}`} />

              <p className={`${styles.expTextSecondary} ${styles.expTextFade}`}>
                Since its inception, THE SP EVENTS has built a trusted reputation across North Karnataka by delivering high-quality, creative, and seamless experiences in entertainment, sports, corporate events, and weddings.
              </p>

            </div>

            <div className={`${styles.expAction} ${styles.expTextFade}`}>
              <a
                href="/about"
                className={styles.expButton}
                ref={magneticBtnRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <span className={styles.expButtonText}>Discover Our Story</span>
                <span className={styles.expButtonArrow}>→</span>
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          3. OUR SERVICES — 3x2 Grid View
      ════════════════════════════════════════════════════════ */}
      <section className={styles.categoriesSection}>
        <div style={{ width: '100%', margin: '0 auto', paddingBottom: '40px' }}>
          {/* Main heading */}
          <div className={styles.catHeader}>
            <h2 className={styles.uniqueTitle}>
              Corporate Event Management Company in India
            </h2>
          </div>
        </div>

        <ServicesGrid
          categories={eventCategories}
          onCategoryClick={(index) => router.push(`/services#v=events&c=${index}`)}
        />
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. CREATING WOW EXPERIENCES — Image Banner
      ════════════════════════════════════════════════════════ */}
      <div className={styles.dividerBanner}>
        <div className={styles.dividerBannerInner}>
          <img
            ref={dividerImageRef}
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
        {/* Floating particles behind stats */}
        <FloatingParticles count={8} shapes={['dotPurple', 'ring', 'dotWhite']} seed={456} />
        <div className={styles.statsGrid} style={{ position: 'relative', zIndex: 1 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.statItem}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className={styles.statGlass}>
                {/* Inner sweep light effect */}
                <div className={styles.statSweepLight} />
                <CounterAnimation end={stat.value} suffix={stat.suffix} className={styles.statNumber} />
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          5.5 FOUNDER SECTION
      ════════════════════════════════════════════════════════ */}
      <section className={styles.founderSection}>
        <div className={styles.founderSpotlight} />

        <div
          className={styles.founderCard}
          ref={founderCardRef}
          onMouseMove={handleFounderTilt}
          onMouseLeave={handleFounderTiltLeave}
        >
          <div className={styles.founderImageWrapper}>
            <img src="/assets/samarth.png" alt="Samarth U Patangi" className={styles.founderImage} />
          </div>
          <div className={styles.founderContent}>
            <div className={styles.quoteIcon}>"</div>
            <h2 className={styles.founderQuote}>
              Great events are not measured by scale, but by the impact they leave behind.
            </h2>
            <div className={styles.founderNameBlock}>
              <h3 className={styles.founderName}>SAMARTH UDAYKUMAR PATANGI</h3>
              <p className={styles.founderTitle}>FOUNDER & MANAGING DIRECTOR</p>
            </div>
            <p className={styles.founderText}>
              A true North Karnataka native at heart, Mr. Samarth U. Patangi is the Founder & Managing Director of THE SP EVENTS — an emerging event management and experiential production company known for delivering impactful and professionally executed events.
              <br /><br />
              Known for his precision, creativity, and execution excellence, he ensures every event reflects quality and purpose. Under his leadership, THE SP EVENTS is rapidly evolving into one of the fastest-growing and most trusted event companies in the region.
            </p>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          6. TRUSTED BY — PREMIUM GRID
      ════════════════════════════════════════════════════════ */}
      <HomeBrandsSection brands={clientsData} />

      {/* ═══════════════════════════════════════════════════════
          7. JOIN US
      ════════════════════════════════════════════════════════ */}


    </div>
  );
}
