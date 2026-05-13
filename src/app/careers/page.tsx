'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import styles from './careers.module.css';

/* =============================================
   SECTION 1: STAGE LIGHT HERO
   ============================================= */
function StageLightHero() {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const maskX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
    const maskY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

    useEffect(() => {
        // Center the spotlight initially so the text is "turned on" and visible immediately
        // for both PC and mobile users before any interaction.
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set(centerX - 1000);
        mouseY.set(centerY - 1000);
    }, [mouseX, mouseY]);

    const handlePointerMove = (e: React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // offset is half of the 2000px mask size so the spotlight is centered on the cursor
        mouseX.set(e.clientX - rect.left - 1000);
        mouseY.set(e.clientY - rect.top - 1000);
    };

    return (
        <section className={styles.stageHeroSection} onPointerMove={handlePointerMove}>
            {/* The base unlit layer - dimly visible so users know it's there */}
            <div className={styles.stageHeroBase}>
                <div className={styles.stageHeroGridDark} />
                <div className={styles.stageHeroContent}>
                    <h1 className={styles.stageHeroTitleDark}>
                        SHAPE THE<br />SPECTACLE
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
                        <span className={styles.textGold}>SPECTACLE</span>
                    </h1>
                </div>
            </motion.div>
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
        <section className="section section-dark" style={{ paddingTop: '20px' }}>
            <div className="container">
                <div className="section-header center" style={{ marginBottom: '60px' }}>
                    <span className="section-label">Life at SP Events</span>
                    <h2 className="section-title">A Culture of <span className="text-gold">Spectacle</span></h2>
                    <p className="section-subtitle">
                        THE SP EVENTS is at the forefront of the evolving world of experiential events. We believe the future lies in innovation, creativity, and flawless execution. Join us in creating immersive experiences that redefine the industry.
                    </p>
                </div>
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
        </section>
    );
}

/* =============================================
   SECTION 5: APPLICATION FORM
   ============================================= */
function ApplicationFormSection() {
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const phone = form.get('phone');
        const portfolio = form.get('portfolio');
        const why = form.get('why');

        const text = `Hello SP Events,

I am interested in joining your crew! Here is my application:

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Portfolio/LinkedIn:* ${portfolio || 'Not provided'}

*Why The SP Events:*
${why}`;

        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/917411863227?text=${encodedText}`;
        
        window.open(waUrl, '_blank');
        
        setSubmitted(true);
        e.currentTarget.reset();
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="section section-dark" id="apply-form">
            <div className="container">
                <div className="section-header center" style={{ marginBottom: '40px' }}>
                    <span className="section-label">Apply Now</span>
                    <h2 className="section-title">Join The <span className="text-gold">Team</span></h2>
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
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.7 }}>
                                Thank you for wanting to join the crew. We will review your application and be in touch soon.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input name="name" className="form-input" type="text" required placeholder="Enter your name" suppressHydrationWarning />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input name="email" className="form-input" type="email" required placeholder="hello@yourdomain.com" suppressHydrationWarning />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input name="phone" className="form-input" type="tel" placeholder="+91 98765 43210" suppressHydrationWarning />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Portfolio / LinkedIn URL</label>
                                    <input name="portfolio" className="form-input" type="url" placeholder="linkedin.com/in/yourprofile" suppressHydrationWarning />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label">Why The SP Events? *</label>
                                <textarea name="why" className="form-textarea" required placeholder="What unique magic do you bring to the spectacle?" suppressHydrationWarning />
                            </div>
                            <button type="submit" className={`btn btn-primary ${styles.formSubmitBtn}`} style={{ width: '100%', justifyContent: 'center', padding: '16px' }} suppressHydrationWarning>
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
            <CultureSection />
            <ApplicationFormSection />
            <CurtainCTA />
        </main>
    );
}
