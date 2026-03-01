'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import CounterAnimation from '@/components/CounterAnimation';
import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';

/* ——— Data ——— */
const services = [
  { num: '01', title: 'Corporate Events', desc: 'Elevating brands through meticulously crafted gatherings that forge connections and inspire action.' },
  { num: '02', title: 'Exhibitions & Activations', desc: 'Immersive experiential spaces designed to captivate, engage, and tell your brand story.' },
  { num: '03', title: 'Award Ceremonies', desc: 'Grand celebrations of excellence — designed with elegance, prestige, and theatrical flair.' },
  { num: '04', title: 'Product Launches', desc: 'High-impact reveal events that turn your product debut into a cultural moment.' },
  { num: '05', title: 'Virtual & Hybrid', desc: 'Seamless digital experiences connecting global audiences through cutting-edge technology.' },
  { num: '06', title: 'Summits & Conclaves', desc: 'Bringing together industry leaders for transformative conversations and meaningful impact.' },
];

const horizontalProjects = [
  { title: 'Innovation Summit 2024', category: 'Summit', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80' },
  { title: 'Luxury Brand Reveal', category: 'Product Launch', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80' },
  { title: 'Annual Excellence Awards', category: 'Awards', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80' },
  { title: 'Tech Expo International', category: 'Exhibition', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80' },
  { title: 'Music Festival Vibes', category: 'Music', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80' },
  { title: 'Global Health Conclave', category: 'Summit', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80' },
];

const testimonials = [
  { quote: 'The SP Events elevated our annual summit to a whole new level. The seamless execution and creative vision set a new benchmark for our industry.', author: 'Rajesh Kumar', role: 'CEO, TechVista India' },
  { quote: 'Working with this team was transformative. They turned our product launch into an experience that our audience is still talking about months later.', author: 'Priya Sharma', role: 'Marketing Director, Luxe Brands' },
  { quote: 'Impeccable attention to detail, creative masterminds, and a team that truly cares about delivering excellence. They exceeded every expectation.', author: 'Amit Patel', role: 'VP Operations, Global Corp' },
];

/* ——— Scroll-Zoom Hero (Smooth 3-Phase) ——— */
function ScrollZoomHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ALL hooks called at the top — never inside JSX

  // Background dims during zoom, brightens after
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.75], [1, 0.4, 0.4, 0.9]);

  // Badge + tagline: visible at start, fades as logo enters
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);

  // Scroll indicator fades early
  const scrollIndOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Logo: fades in → holds → fades out while scaling 1→50x
  const logoOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.5, 0.6], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.18, 0.58], [1, 50]);

  // Content: fades in after zoom is completely done
  const contentOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.65, 0.8], [40, 0]);

  return (
    <section ref={containerRef} className={styles.heroWrap}>
      <div className={styles.heroSticky}>
        {/* Background video — always visible, opacity shifts */}
        <motion.div className={styles.heroBgImage} style={{ opacity: bgOpacity }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85"
            className={styles.heroBgVideo}
          >
            <source src="https://cdn.coverr.co/videos/coverr-concert-crowd-in-vibrant-lighting-7982/1080p.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroBgOverlay} />
        </motion.div>

        {/* Badge + tagline — centered, visible first */}
        <motion.div
          className={styles.heroTopContent}
          style={{ opacity: badgeOpacity, y: badgeY }}
        >
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Premier Event Management
          </span>
          <p className={styles.heroTagline}>
            Crafting unforgettable experiences across India
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.heroScroll}
          style={{ opacity: scrollIndOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <HiArrowDown size={16} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>

        {/* Logo that scales up */}
        <motion.div
          className={styles.heroLogoWrap}
          style={{ scale, opacity: logoOpacity }}
        >
          <div className={styles.heroLogo}>
            <span className={styles.heroLogoThe}>THE</span>
            <span className={styles.heroLogoSP}>SP</span>
            <span className={styles.heroLogoEvents}>EVENTS</span>
          </div>
        </motion.div>

        {/* Content — appears after zoom */}
        <motion.div
          className={styles.heroBottomContent}
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <p className={styles.heroDesc}>
            We create extraordinary experiences that captivate audiences,
            inspire action, and build lasting brand legacies.
          </p>
          <div className={styles.heroActions}>
            <Link href="/work" className={styles.heroCta}>
              Explore Our Work <HiArrowRight />
            </Link>
            <Link href="/contact" className={styles.heroCtaLine}>
              Get In Touch
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.heroStats}
          style={{ opacity: contentOpacity }}
        >
          {[
            { val: 6000, suf: '+', lab: 'Events' },
            { val: 15, suf: '+', lab: 'Years' },
            { val: 100, suf: '+', lab: 'Team' },
            { val: 500, suf: '+', lab: 'Clients' },
          ].map((s, i) => (
            <div key={i} className={styles.heroStatItem}>
              <span className={styles.heroStatVal}>
                <CounterAnimation end={s.val} suffix={s.suf} />
              </span>
              <span className={styles.heroStatLab}>{s.lab}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Horizontal Scroll Portfolio ——— */
function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section ref={containerRef} className={styles.horizontalWrap}>
      <div className={styles.horizontalSticky}>
        <div className={styles.horizontalHeader}>
          <div className="container">
            <AnimatedSection>
              <div className={styles.horizontalTop}>
                <div>
                  <span className="section-label">Portfolio</span>
                  <h2 className={styles.horizontalTitle}>Selected Work</h2>
                </div>
                <Link href="/work" className="btn btn-outline-light btn-sm">
                  View All <HiArrowRight />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <motion.div className={styles.horizontalTrack} style={{ x }}>
          {horizontalProjects.map((project, i) => (
            <div key={i} className={styles.horizontalCard}>
              <div className={styles.hCardImage} style={{ backgroundImage: `url(${project.image})` }} />
              <div className={styles.hCardContent}>
                <span className={styles.hCardCat}>{project.category}</span>
                <h3 className={styles.hCardTitle}>{project.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Main Page ——— */
export default function HomePage() {
  return (
    <>
      {/* ===== SCROLL-ZOOM HERO ===== */}
      <ScrollZoomHero />

      {/* ===== ABOUT STRIP ===== */}
      <section className={`section ${styles.aboutStrip}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <AnimatedSection variant="fadeLeft">
              <div>
                <span className="section-label">About Us</span>
                <h2 className={styles.aboutHeading}>
                  Where vision meets
                  <br />
                  <em>flawless execution</em>
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div className={styles.aboutRight}>
                <p>
                  At The SP Events, every event tells a story. We blend creative artistry
                  with strategic precision — our signature philosophy.
                  Like master craftsmen, we shape raw ideas into spellbinding
                  experiences that captivate audiences and create lasting impact.
                </p>
                <p>
                  With over 6,000 events delivered across India, our team of 100+ passionate
                  professionals transforms visions into realities that people remember.
                </p>
                <Link href="/about" className="btn btn-outline btn-sm" style={{ marginTop: 8 }}>
                  Learn More <HiArrowRight />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section section-cream">
        <div className="container">
          <AnimatedSection>
            <div className="section-header center">
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Our Expertise</h2>
              <p className="section-subtitle">
                From intimate brand activations to grand-scale spectacles — we bring vision
                and mastery to every format of event.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className={styles.serviceRow}>
                  <span className={styles.serviceNum}>{s.num}</span>
                  <div className={styles.serviceInfo}>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <HiArrowRight className={styles.serviceArrow} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HORIZONTAL SCROLL PORTFOLIO ===== */}
      <HorizontalScroll />

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section-cream">
        <div className="container">
          <AnimatedSection>
            <div className="section-header center">
              <span className="section-label">Testimonials</span>
              <h2 className="section-title">Client Stories</h2>
            </div>
          </AnimatedSection>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className={styles.testimonialCard}>
                  <div className={styles.quoteIcon}>&ldquo;</div>
                  <p className={styles.quoteText}>{t.quote}</p>
                  <div className={styles.quoteAuthor}>
                    <div className={styles.authorAvatar}>{t.author.charAt(0)}</div>
                    <div>
                      <strong>{t.author}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection variant="scaleUp">
            <div className={styles.ctaContent}>
              <span className="section-label">Ready?</span>
              <h2 className={styles.ctaTitle}>
                Let&apos;s craft your next
                <br />
                <em>unforgettable moment</em>
              </h2>
              <p className={styles.ctaSub}>
                Whether it&apos;s a corporate summit, product launch, or grand celebration —
                we&apos;re here to make it extraordinary.
              </p>
              <Link href="/contact" className={styles.ctaBtnLink}>
                Start a Conversation <HiArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
