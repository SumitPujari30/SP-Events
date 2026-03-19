/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';
import HomeBrandsSection from '@/components/HomeBrandsSection';
import JoinUsSection from '@/components/JoinUsSection';

gsap.registerPlugin(ScrollTrigger);

// ─── Event Categories ────────────────────────────────────────
const eventCategories = [
  {
    id: 'corporate',
    label: 'Corporate',
    title: 'Corporate Events',
    desc: 'Boardroom-precision meets experiential design. Conferences, leadership conclaves, AGMs, and team summits that command authority.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    color: '#d4af37',
  },
  {
    id: 'musical',
    label: 'Music',
    title: 'Musical Events',
    desc: 'Concert production, artist management, and stage design that transforms venues into electric arenas. Pure energy, flawlessly staged.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    color: '#a855f7',
  },
  {
    id: 'sports',
    label: 'Sports',
    title: 'Sports Events',
    desc: 'From marathons to tournaments — we handle on-ground logistics, branding, spectator experience, and broadcast coordination.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    color: '#22c55e',
  },
  {
    id: 'launches',
    label: 'Launch',
    title: 'Launch Events',
    desc: 'Day-one buzz engineered from the ground up. Product reveals, brand launches, and store openings that become cultural moments.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    color: '#3b82f6',
  },
  {
    id: 'special',
    label: 'Special',
    title: 'Special Events',
    desc: 'Award nights, gala dinners, anniversary celebrations, and milestone events designed to leave every guest breathless.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    color: '#f97316',
  },
  {
    id: 'weddings',
    label: 'Weddings',
    title: 'Weddings',
    desc: 'Luxury wedding experiences crafted with meticulous attention to every detail — from venue transformation to live entertainment.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    color: '#ec4899',
  },
];

// ─── Clients Data ────────────────────────────────────────────
const clientsRow1 = [
   { name: "Samsung", logo: "/assets/clientLogos/samsung.png" },
   { name: "Reliance", logo: "/assets/clientLogos/reliance_logo.png" },
   { name: "Hero", logo: "/assets/clientLogos/hero_logo.svg" },
   { name: "Infosys", logo: "/assets/clientLogos/infosys-logo-png.png" },
   { name: "KLE", logo: "/assets/clientLogos/kle logo.png" },
   { name: "Jockey", logo: "/assets/clientLogos/jockey.png" },
   { name: "ACC", logo: "/assets/clientLogos/acc.webp" },
   { name: "Adani", logo: "/assets/clientLogos/adani.webp" },
   { name: "Corteva", logo: "/assets/clientLogos/corteva.png" },
   { name: "BNI", logo: "/assets/clientLogos/bni.webp" },
   { name: "Coromandal", logo: "/assets/clientLogos/coromandal.png" },
   { name: "IIT Dharwad", logo: "/assets/clientLogos/iit dharwad.png" },
   { name: "TiECon", logo: "/assets/clientLogos/tiecon.png" },
   { name: "Inorbit", logo: "/assets/clientLogos/inorbit.png" },
   { name: "Rotary", logo: "/assets/clientLogos/rotary.webp" },
   { name: "Miniso", logo: "/assets/clientLogos/minisow.webp" },
   { name: "Sultan Gold", logo: "/assets/clientLogos/sultan gold.png" },
];

const clientsRow2 = [
   { name: "Deshpande Foundation", logo: "/assets/clientLogos/Deshpande-foundation-logo.png" },
   { name: "VRL", logo: "/assets/clientLogos/VRLLOGO.svg" },
   { name: "SELCO", logo: "/assets/clientLogos/SELCO_India_logo.svg.png" },
   { name: "Govt of Karnataka", logo: "/assets/clientLogos/govt of karnataka.png" },
   { name: "Gram Vikas", logo: "/assets/clientLogos/gram vikas.png" },
   { name: "Head Held High", logo: "/assets/clientLogos/head held high.png" },
   { name: "Eskay", logo: "/assets/clientLogos/eskay.png" },
   { name: "Crave", logo: "/assets/clientLogos/crave.png" },
   { name: "IIIT Dharwad", logo: "/assets/clientLogos/iiit dharwad.webp" },
   { name: "Deshpande Startups", logo: "/assets/clientLogos/deshpandes_tartups.png" },
   { name: "SDM Dental", logo: "/assets/clientLogos/sdm dental.png" },
   { name: "Hodek", logo: "/assets/clientLogos/hodek.png" },
   { name: "Samyukta Karnataka", logo: "/assets/clientLogos/samyukta karnataka.png" },
   { name: "Hi Fi Studios", logo: "/assets/clientLogos/hi fi studios.png" },
   { name: "Aristo Pharma", logo: "/assets/clientLogos/aristo pharma.png" },
   { name: "Arrow Clothing", logo: "/assets/clientLogos/arrow clothing.png" },
   { name: "Bally Casino", logo: "/assets/clientLogos/bally casino.png" },
];

const clientsRow3 = [
   { name: "3rd Eye", logo: "/assets/clientLogos/3rd eye techno sols.png" },
   { name: "Agamya Cybertech", logo: "/assets/clientLogos/agamya cybertech.png" },
   { name: "B I S", logo: "/assets/clientLogos/b i s.png" },
   { name: "Dharwad Zilla Panchayat", logo: "/assets/clientLogos/dharwad zilla panchayat.png" },
   { name: "Durga Developers", logo: "/assets/clientLogos/durga developers.png" },
   { name: "Make Your Own Perfume", logo: "/assets/clientLogos/make your own perfume.png" },
   { name: "Metabolic Health India", logo: "/assets/clientLogos/metabolic health india.png" },
   { name: "Nagshanti Group", logo: "/assets/clientLogos/nagshanti group.png" },
   { name: "Nain Startup", logo: "/assets/clientLogos/nain startup.png" },
   { name: "RCF", logo: "/assets/clientLogos/rashtriya chemical fertiliers.png" },
   { name: "Shree Rajeshwari", logo: "/assets/clientLogos/shree rajeshwari properties.png" },
   { name: "Sygnets", logo: "/assets/clientLogos/sygnets.webp" },
   { name: "Tejas School", logo: "/assets/clientLogos/tejas international school.png" },
   { name: "Trust Grow", logo: "/assets/clientLogos/trust grow fertilizers.png" },
   { name: "Uni Abex", logo: "/assets/clientLogos/uni abex.png" },
];

// ─── Stats Data ──────────────────────────────────────────────
const stats = [
  { value: "4+", label: "Years of Excellence" },
  { value: "300+", label: "Happy Clients" },
  { value: "1500+", label: "Magic Experiences" },
  { value: "30+", label: "Professionals" },
];

// ─── Component ───────────────────────────────────────────────
const rhymeWords = ["Unforgettable", "Indelible", "Incredible", "Exceptional", "Unparalleled"];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rhymeWords.length);
    }, 2800); // Cycle every 2.8 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero video fade in ───────────────────────────────────
      gsap.fromTo(
        videoRef.current,
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

      // ── Category cards ───────────────────────────────────────
      gsap.fromTo(
        `.${styles.catCard}`,
        { opacity: 0, y: 70 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.catGrid}`, start: 'top 82%' },
        }
      );

      // ── Divider banner image arrival ─────────────────────────
      gsap.fromTo(
        `.${styles.wowImage}`,
        { y: 120, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: `.${styles.dividerBanner}`, start: 'top 85%' },
        }
      );

      // ── Stats Section ─────────────────────────────────────────
      gsap.fromTo(
        `.${styles.statItem}`,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)',
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
          <video
            ref={videoRef}
            src="https://www.tantraa.net/wp-content/uploads/2024/05/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.videoBgEl}
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
        {/* Soft glowing orb for brand identity */}
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
                Born from over 4+ years of industry mastery, our founding team recognized a profound need for a truly professional, innovation-driven event management partner. We don't just plan events; we engineer environments that resonate.
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
          3. EVENT CATEGORIES — image cards grid
      ════════════════════════════════════════════════════════ */}
      <section className={styles.categoriesSection}>
        <div className="container">

          {/* Section heading */}
          <div className={styles.catHeader}>
            <span className="section-label">We specialise in</span>
            <h2 className={styles.catTitle}>
              Corporate Event<br />
              <span className="gradient-text">Management</span>
            </h2>
          </div>
        </div>

        {/* Image cards grid — Full width to cover screen */}
        <div className={styles.catGridWrapper}>
          <div className={styles.catGrid}>
            {eventCategories.map(cat => (
              <div
                key={cat.id}
                className={styles.catCard}
                style={{ '--cat-color': cat.color } as React.CSSProperties}
              >
                {/* Full bleed background image */}
                <div
                  className={styles.catCardBg}
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                {/* Simple dark gradient at bottom for text readability */}
                <div className={styles.catCardGradient} />

                {/* Content */}
                <div className={styles.catCardContent}>
                  <h3 className={styles.catCardTitle}>{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          4. CREATING WOW EXPERIENCES — Image Banner
      ════════════════════════════════════════════════════════ */}
      <div className={styles.dividerBanner}>
        <div className={styles.dividerBannerInner}>
          <img 
            src="https://www.tantraa.net/wp-content/uploads/2024/05/cwe-1-2048x438.png" 
            alt="Creating Wow Experiences"
            className={styles.wowImage}
          />
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════════
          5. STATS SECTION — Premium Metrics
      ════════════════════════════════════════════════════════ */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statGlass}>
                  <div className={styles.statNumber}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          6. TRUSTED BY — PREMIUM GRID
      ════════════════════════════════════════════════════════ */}
      <HomeBrandsSection 
         brands={[...clientsRow1, ...clientsRow2, ...clientsRow3]} 
      />

      {/* ═══════════════════════════════════════════════════════
          7. JOIN US
      ════════════════════════════════════════════════════════ */}
      <JoinUsSection />

    </div>
  );
}
