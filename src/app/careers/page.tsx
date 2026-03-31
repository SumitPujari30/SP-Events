'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import styles from './careers.module.css';

/* =============================================
   SECTION 1: STAGE LIGHT HERO
   ============================================= */
function StageLightHero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const maskX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
    const maskY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

    const handlePointerMove = (e: React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // 1000 is half of the 2000px mask size
        mouseX.set(e.clientX - rect.left - 700);
        mouseY.set(e.clientY - rect.bottom - 700);
    };

    return (
        <section className={styles.stageHeroSection} onPointerMove={handlePointerMove}>
            {/* The base unlit layer - dimly visible so users know it's there */}
            <div className={styles.stageHeroBase}>
                <div className={styles.stageHeroGridDark} />
                <div className={styles.stageHeroContent}>
                    <h1 className={styles.stageHeroTitleDark}>
                        SHAPE THE<br />SPECTACLE.
                    </h1>
                </div>
            </div>

            {/* The revealed layer with mask */}
            <motion.div
                className={styles.stageHeroLit}
                style={{
                    WebkitMaskPosition: useTransform([maskX, maskY], ([x, y]) => `${x}px ${y}px`),
                    maskPosition: useTransform([maskX, maskY], ([x, y]) => `${x}px ${y}px`)
                }}
            >
                <div className={styles.stageHeroGridLit} />
                <div className={styles.stageHeroContent}>
                    <p className={styles.heroPreLit}>Join The Crew</p>
                    <h1 className={styles.stageHeroTitleLit}>
                        SHAPE THE<br />
                        <span className={styles.textGold}>SPECTACLE.</span>
                    </h1>
                </div>
            </motion.div>
        </section>
    );
}

/* =============================================
   SECTION 2: BUILT DIFFERENT
   ============================================= */
function BuiltDifferentSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const glowX = useSpring(mouseX, { damping: 25, stiffness: 120 });
    const glowY = useSpring(mouseY, { damping: 25, stiffness: 120 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const items = [
        {
            label: 'Relentless Collaboration',
            body: "We don't just plan events; we architect experiences. From massive stadium builds to intimate luxury galas, bold ideas live here.",
            sub: "We foster an environment where your wildest concepts are funded, prototyped, and perfectly executed alongside master technicians, designers, and logistics experts.",
        },
        {
            label: 'Crafting the Extraordinary',
            body: "Every role here carries consequence. Every decision shapes something thousands of people will witness and remember for years to come.",
            sub: "You won't find ordinary ambitions at SP Events. You'll find a relentless drive to outdo the last spectacle and architect the next one.",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className={styles.builtSection}
            onMouseMove={handleMouseMove}
        >
            {/* Parallax background image */}
            <motion.div className={styles.builtBg} style={{ y: bgY }}>
                <img
                    src="https://images.unsplash.com/photo-1540039155732-d6928e469557?w=1800&q=85"
                    alt="Event spectacle"
                />
                <div className={styles.builtBgOverlay} />
            </motion.div>

            {/* Mouse-tracking gold glow */}
            <motion.div
                className={styles.builtGlow}
                style={{ x: glowX, y: glowY }}
            />

            {/* Floating glass editorial plate */}
            <div className={styles.builtPlate}>
                <span className={styles.builtLabel}>Built Different</span>
                <h2 className={styles.builtTitle}>
                    Where Bold Ideas<br />
                    <em>Find Their Stage</em>
                </h2>
                <div className={styles.builtDivider} />
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className={styles.builtItem}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className={styles.builtItemTitle}>{item.label}</h3>
                        <p className={styles.builtItemBody}>{item.body}</p>
                        <p className={styles.builtItemSub}>{item.sub}</p>
                    </motion.div>
                ))}
                <motion.a
                    href="#apply-form"
                    className={styles.joinBtn}
                    style={{ marginTop: '32px', alignSelf: 'flex-start' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Join the Crew
                    <span style={{ marginLeft: '10px', display: 'inline-block', transition: 'transform 0.3s' }}>→</span>
                </motion.a>
            </div>

            {/* Center image */}
            <div className={styles.builtCenterImg}>
                <img src="/assets/Layout_page.png" alt="SP Events Experience" />
            </div>

            {/* Right side: floating stat cards */}
            <div className={styles.builtRight}>
                {[
                    { value: '200+', label: 'Events Orchestrated' },
                    { value: '40+', label: 'Cities Worldwide' },
                    { value: '98%', label: 'Client Satisfaction' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        className={styles.builtStat}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.builtStatValue}>{stat.value}</span>
                        <span className={styles.builtStatLabel}>{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* =============================================
   SECTION 3: TEAM PHOTOS
   ============================================= */
function TeamPhotosSection() {
    const photos = [
        "/assets/Layout_page.png",
        "/assets/Layout_page.png",
        "/assets/Layout_page.png",
        "/assets/Layout_page.png",
        "/assets/Layout_page.png",
        "/assets/Layout_page.png"
    ];

    return (
        <section className="section" style={{ background: 'var(--color-bg-dark)', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '60px' }}>
                <div className="section-header center">
                    <span className="section-label">Behind The Scenes</span>
                    <h2 className="section-title">The <span className="text-gold">Crew</span></h2>
                    <p className="section-subtitle">Meet the visionaries, the technicians, and the dreamers.</p>
                </div>
            </div>

            <div className={styles.marqueeWrap}>
                <motion.div
                    className={styles.marqueeTrack}
                    animate={{ x: [0, -2580] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {[...photos, ...photos].map((src, i) => (
                        <div key={i} className={styles.marqueeItem}>
                            <img src={src} alt={`Team photo ${i}`} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}



/* =============================================
   SECTION 4: CURTAIN REVEAL CTA
   ============================================= */
function CurtainCTA() {
    return null;
}

function AmbientBackground() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div className={styles.ambientOrb1} />
            <div className={styles.ambientOrb2} />
        </div>
    );
}

import { Lightbulb, Users, TrendingUp, Globe } from 'lucide-react';

/* =============================================
   SECTION 3: OUR CULTURE
   ============================================= */
function CultureSection() {
    const culture = [
        { num: '01', Icon: Lightbulb, title: 'Innovation', desc: 'We don\'t follow trends; we create them. Every project is an opportunity to push creative and technical boundaries.' },
        { num: '02', Icon: Users, title: 'Collaboration', desc: 'No silos. Designers, engineers, and producers work as one seamless creative organism.' },
        { num: '03', Icon: TrendingUp, title: 'Growth', desc: 'We invest heavily in our crew. Continuous learning and fast-tracked mentorship are part of our DNA.' },
        { num: '04', Icon: Globe, title: 'Flexibility', desc: 'Remote-first protocols for global talent, paired with high-impact, in-person deep work sessions.' },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="section section-violet">
            <div className="container">
                <div className="section-header center" style={{ marginBottom: '60px' }}>
                    <span className="section-label">Life at SP Events</span>
                    <h2 className="section-title">A Culture of <span className="text-gold">Spectacle</span></h2>
                    <p className="section-subtitle">
                        We are a collective of dreamers, builders, and perfectionists.
                    </p>
                </div>
                
                <div 
                    className={styles.cultureAccordionWrap}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {culture.map((item, i) => {
                        const isHovered = hoveredIndex === i;
                        return (
                            <div 
                                key={i} 
                                className={`${styles.cultureAccordionCard} ${isHovered ? styles.activeCard : ''}`}
                                onMouseEnter={() => setHoveredIndex(i)}
                            >
                                <div className={styles.accNumber}>{item.num}</div>
                                <div className={styles.accContent}>
                                    <item.Icon className={styles.hoverIcon} strokeWidth={1.5} />
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   SECTION 5: APPLICATION FORM
   ============================================= */
function ApplicationFormSection() {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="section" id="apply-form" style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                <div className="section-header center" style={{ marginBottom: '40px' }}>
                    <span className="section-label">Apply Now</span>
                    <h2 className="section-title">Submit Your <span className="text-gold">Application</span></h2>
                </div>

                <div className={styles.formWrap}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{
                                width: '68px', height: '68px', borderRadius: '50%', background: 'var(--gradient-gold)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                                color: 'black', margin: '0 auto 16px', boxShadow: 'var(--shadow-gold)'
                            }}>
                                ✓
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 600 }}>Application Sent!</h3>
                            <p style={{ color: 'rgba(0, 0, 0,0.6)', lineHeight: 1.7 }}>
                                Thank you for wanting to join the crew. We will review your application and be in touch soon.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input className="form-input" type="text" required placeholder="John Doe" suppressHydrationWarning />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input className="form-input" type="email" required placeholder="john@example.com" suppressHydrationWarning />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input className="form-input" type="tel" placeholder="+91 98765 43210" suppressHydrationWarning />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Portfolio / LinkedIn URL</label>
                                    <input className="form-input" type="url" placeholder="https://" suppressHydrationWarning />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label">Why SP Events? *</label>
                                <textarea className="form-textarea" required placeholder="Tell us why you want to join our spectacle..." suppressHydrationWarning />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} suppressHydrationWarning>
                                Submit Application
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default function CareersPage() {
    return (
        <main className={styles.pageWrap}>
            <AmbientBackground />
            <StageLightHero />
            <BuiltDifferentSection />
            <TeamPhotosSection />
            <CultureSection />
            <ApplicationFormSection />
            <CurtainCTA />
        </main>
    );
}
