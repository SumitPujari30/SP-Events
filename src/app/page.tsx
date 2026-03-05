'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import styles from './page.module.css';

/* ——— Data ——— */
const showcaseItems = [
  { title: 'Corporate', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80', num: '01' },
  { title: 'Exhibitions', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80', num: '02' },
  { title: 'Awards', img: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80', num: '03' },
  { title: 'Launches', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80', num: '04' },
];

const philosophyBlocks = [
  "We don't just plan events. We architect precise, living environments that shift perceptions.",
  "Every detail matters. The lighting, the sound, the space — all calibrated to forge genuine human connection.",
  "From the subtle to the spectacular, we build legacies that resonate long after the lights go down."
];

/* ——— MASK REVEAL HERO ——— */
function MaskRevealHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Calculate the clip path from a small circle to expanding and covering the whole view
  // We use string interpolation to make it a circle
  const clipSize = useTransform(scrollYProgress, [0, 0.4], [10, 150]);

  // To handle string conversion smoothly in Framer Motion, best to pass it to style
  const clipPathStyle = useTransform(clipSize, (val) => `circle(${val}% at 50% 50%)`);

  // Move the scattered text away as the circle expands
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0]);

  // Fade the video slightly as you scroll down further
  const videoOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <section ref={containerRef} className={styles.heroWrap}>
      <div className={styles.heroSticky}>

        {/* Dark Intro Text — Disappears quickly */}
        <motion.h1
          className={styles.heroIntroText}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          We architect<br /><em>extraordinary</em>
        </motion.h1>

        {/* Scattered Background Text */}
        <motion.div className={styles.heroLogoScattered} style={{ scale: textScale, opacity: textOpacity }}>
          <span className={styles.scatterWord1}>THE SP</span>
          <span className={styles.scatterWord2}>EVENTS</span>
          <span className={styles.scatterWord3}>EXPERIENCE</span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div className={styles.scrollIndicator} style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}>
          <div className={styles.scrollLine}>
            <div className={styles.scrollLineInner} />
          </div>
          <span>Discover</span>
        </motion.div>

        {/* Expanding Video Reveal */}
        <motion.div
          className={styles.heroVideoWrap}
          style={{ clipPath: clipPathStyle, opacity: videoOpacity }}
        >
          <video
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85"
            className={styles.heroVideo}
          >
            <source src="https://cdn.coverr.co/videos/coverr-concert-crowd-in-vibrant-lighting-7982/1080p.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroVideoOverlay} />
        </motion.div>
      </div>
    </section>
  );
}

/* ——— SCROLL MANIFESTO ——— */
function ScrollManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end center'],
  });

  const words = [
    "We ", "believe ", "that ", "a ", "truly ", "great ", "event ",
    "is ", "not ", "measured ", "by ", "the ", "number ", "of ",
    "attendees, ", "but ", "by ", "the ", "intensity ", "of ", "the ",
    "memories ", "created. ", "Welcome ", "to ", "the ", "new ", "standard ",
    "of ", "experiential ", "design."
  ];

  return (
    <section ref={containerRef} className={styles.manifestoWrap}>
      <h2 className={styles.manifestoText}>
        {words.map((word, i) => {
          const step = 1 / words.length;
          const start = i * step;
          const end = start + step;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          const isGold = word.includes("memories") || word.includes("experiential");

          return (
            <motion.span
              key={i}
              className={`${styles.manifestoWord} ${isGold ? styles.manifestoWordGold : ''}`}
              style={{ opacity }}
            >
              {word}
            </motion.span>
          );
        })}
      </h2>
    </section>
  );
}

/* ——— SHOWCASE ——— */
function CursorFollowerShowcase() {
  return (
    <section className={styles.showcaseWrap}>
      <div className="container">
        <div className={styles.showcaseHeader}>
          <p className="section-label">Our Expertise</p>
          <h2 className="section-title">Showcase</h2>
        </div>

        <div className={styles.showcaseList}>
          {showcaseItems.map((item, i) => (
            <Link
              key={i}
              href="/services"
              className={styles.showcaseRow}
            >
              <span className={styles.showcaseNum}>{item.num}</span>
              <span className={styles.showcaseTitle}>{item.title}</span>
              <HiArrowRight className={styles.showcaseArrow} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— STICKY PHILOSOPHY ——— */
function StickyPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.philosophyWrap} ref={containerRef}>
      <div className={styles.philosophyContainer}>
        {/* Left: Sticky pinned */}
        <div>
          <div className={styles.philosophySticky}>
            <div className={styles.philosophyLabel}>Our Philosophy</div>
            <h2 className={styles.philosophyTitle}>
              Beyond Standard.<br />
              <em>Beyond Expected.</em>
            </h2>
          </div>
        </div>

        {/* Right: Scrolling Text Blocks */}
        <div className={styles.philosophyContent}>
          {philosophyBlocks.map((text, i) => (
            <PhilosophyBlock key={i} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component to handle in-view tracking per paragraph
function PhilosophyBlock({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 30%'] // Element highlights as it reaches center of screen
  });

  // Transform opacity based on position in viewport
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.p ref={ref} className={styles.philosophyBlock} style={{ opacity, scale }}>
      {text}
    </motion.p>
  );
}

/* ——— 3D FLIP STATS GRID ——— */
function FlipStatsGrid() {
  const stats = [
    { val: '6000+', lab: 'Events Delivered', desc: 'Across India & Abroad', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { val: '15+', lab: 'Years Experience', desc: 'In Premium Event Management', img: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80' },
    { val: '100+', lab: 'Team Members', desc: 'Passionate Professionals', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
    { val: '500+', lab: 'Happy Clients', desc: 'Global & Local Brands', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80' },
  ];

  return (
    <section className={styles.statsWrap}>
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCardWrap}>
            <div className={styles.statCardInner}>
              {/* Front side just shows the big number */}
              <div className={styles.statCardFront}>
                <span className={styles.statVal}>{s.val}</span>
              </div>

              {/* Back side flips to show image, label, and desc */}
              <div className={styles.statCardBack}>
                <div className={styles.statBackImage} style={{ backgroundImage: `url(${s.img})` }} />
                <span className={styles.statLab}>{s.lab}</span>
                <span className={styles.statDesc}>{s.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ——— CURTAIN REVEAL CTA ——— */
function CurtainRevealCta() {
  return (
    <>
      <div className={styles.ctaSpacer} />
      <section className={styles.ctaRevealFixed}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85" alt="Footer Event" className={styles.ctaBgImage} />
        <div className={styles.ctaOverlay} />

        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Let&apos;s craft your next<br />
            <em>unforgettable moment</em>
          </h2>
          <Link href="/contact" className={styles.ctaBtn}>
            Start a Conversation <HiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ——— Main Page Component ——— */
export default function HomePage() {
  return (
    <>
      <MaskRevealHero />
      <ScrollManifesto />
      <CursorFollowerShowcase />
      <StickyPhilosophy />
      <FlipStatsGrid />
      <CurtainRevealCta />
    </>
  );
}
