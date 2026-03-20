'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
        // 450 is half of the 900px mask size to center it on cursor
        mouseX.set(e.clientX - rect.left - 450);
        mouseY.set(e.clientY - rect.top - 450);
    };

    return (
        <section className={styles.stageHeroSection} onPointerMove={handlePointerMove}>
            {/* The base unlit layer - dimly visible so users know it's there */}
            <div className={styles.stageHeroBase}>
                <div className={styles.stageHeroGridDark} />
                <div className={styles.stageHeroContent}>
                    <p className={styles.heroPre}>Hover to illuminate</p>
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
   SECTION 2: EXPERIENCE SECTION (Replacing Parallax)
   ============================================= */
function ExperienceSection() {
    return (
        <section className="section" style={{ background: 'var(--color-bg-dark)', position: 'relative', zIndex: 1 }}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">Our DNA</span>
                    <h2 className="section-title">Crafting the <span className="text-gold">Extraordinary</span></h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-white)' }}>Relentless Collaboration</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '24px' }}>
                            We don&apos;t just plan events; we architect experiences. From massive stadium builds to intimate luxury galas, bold ideas live here.
                        </p>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                            We foster an environment where your wildest concepts are funded, prototyped, and perfectly executed alongside master technicians, designers, and logistics experts.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <img 
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" 
                            alt="Event setup" 
                            style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(0, 0, 0,0.05)' }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}



/* =============================================
   SECTION 4: CURTAIN REVEAL CTA
   ============================================= */
function CurtainCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    // The curtain lifts up (translateY from 0 to -100%) as you scroll to the end
    const curtainY = useTransform(scrollYProgress, [0.4, 1], ['0%', '-100%']);

    return (
        <section ref={sectionRef} className={styles.curtainSection}>
            <img
                src="https://images.unsplash.com/photo-1540039155732-d6928e469557?w=1600&q=80"
                alt="Crowd cheering"
                className={styles.curtainBgVideo}
            />

            <div className={styles.curtainContent}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Ready to hear<br />the roar?
                </motion.h2>
                <motion.a
                    href="mailto:careers@thespevents.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        display: 'inline-block', padding: '20px 40px', background: 'var(--color-white)', color: '#000',
                        fontFamily: 'var(--font-heading)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px',
                        borderRadius: '40px', textDecoration: 'none', fontSize: '1.2rem'
                    }}
                >
                    Pitch Us
                </motion.a>
            </div>

            <motion.div className={styles.curtainDrop} style={{ y: curtainY }}>
                <span className={styles.curtainLabel}>END OF SHOW</span>
            </motion.div>
        </section>
    );
}

function AmbientBackground() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div className={styles.ambientOrb1} />
            <div className={styles.ambientOrb2} />
        </div>
    );
}

/* =============================================
   SECTION 3: OUR CULTURE
   ============================================= */
function CultureSection() {
    const culture = [
        { icon: '🚀', title: 'Moonshot Thinking', desc: 'We don\'t just iterate; we leap. We encourage ideas that seem impossible until we make them happen.' },
        { icon: '🤝', title: 'Radical Collaboration', desc: 'Break the silos. Designers, engineers, and producers work as one single creative organism.' },
        { icon: '💎', title: 'Obsessive Quality', desc: 'We care about the pixels you\'ll never see and the logistics you\'ll never feel. Excellence is our only baseline.' },
    ];

    return (
        <section className="section section-violet">
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">Life at SP Events</span>
                    <h2 className="section-title">A Culture of <span className="text-gold">Spectacle</span></h2>
                    <p className="section-subtitle">
                        We are a collective of dreamers, builders, and perfectionists. Here, your work isn&apos;t just a job — it&apos;s a contribution to a legacy of wonder.
                    </p>
                </div>
                
                <div className={styles.cultureGrid}>
                    {culture.map((item, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.cultureCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className={styles.cultureIcon}>{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================
   SECTION 4: CURRENT OPENINGS
   ============================================= */
function OpeningsSection() {
    const jobs = [
        { title: 'Senior Event Producer', type: 'Full-time', location: 'Hubli / Bangalore' },
        { title: 'Immersive Experience Designer', type: 'Hybrid', location: 'Remote' },
        { title: 'Technical Production Lead', type: 'Contract', location: 'On-site' },
        { title: 'Brand Strategy Consultant', type: 'Part-time', location: 'Bangalore' },
    ];

    return (
        <section className="section section-dark">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Join The Crew</span>
                    <h2 className="section-title">Open Positions</h2>
                </div>

                <div className={styles.openingsGrid}>
                    {jobs.map((job, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.jobCard}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.jobInfo}>
                                <h3>{job.title}</h3>
                                <div className={styles.jobMeta}>
                                    <span>{job.type}</span>
                                    <span>•</span>
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <a href="#apply-form" className={styles.applyBtn}>Apply Now</a>
                        </motion.div>
                    ))}
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
                                    <input className="form-input" type="text" required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input className="form-input" type="email" required placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input className="form-input" type="tel" placeholder="+91 98765 43210" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Role of Interest *</label>
                                    <select className="form-input" required>
                                        <option value="">Select a role</option>
                                        <option value="producer">Senior Event Producer</option>
                                        <option value="designer">Immersive Experience Designer</option>
                                        <option value="tech">Technical Production Lead</option>
                                        <option value="strategy">Brand Strategy Consultant</option>
                                        <option value="other">Other / Open Pitch</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label">Portfolio / LinkedIn URL</label>
                                <input className="form-input" type="url" placeholder="https://" />
                            </div>
                            <div className="form-group" style={{ marginBottom: '24px' }}>
                                <label className="form-label">Why SP Events? *</label>
                                <textarea className="form-textarea" required placeholder="Tell us why you want to join our spectacle..." />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
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
            <ExperienceSection />
            <CultureSection />
            <OpeningsSection />
            <ApplicationFormSection />
            <CurtainCTA />
        </main>
    );
}
