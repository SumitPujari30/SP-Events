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
        // 300 is half of the 600px mask size to center it on cursor
        mouseX.set(e.clientX - rect.left - 300);
        mouseY.set(e.clientY - rect.top - 300);
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
   SECTION 2: BACKSTAGE PARALLAX
   ============================================= */
function BackstageParallax() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    // Parallax transforms - Restored to use vh for noticeable but smooth movement
    const y1 = useTransform(scrollYProgress, [0, 1], ['10vh', '-40vh']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['-20vh', '50vh']);
    const y3 = useTransform(scrollYProgress, [0, 1], ['30vh', '-20vh']);

    // Text appearances - Reduced pixel travel distance heavily to slow it down
    const text1Op = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
    const text1Y = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [30, 0, -30]);

    const text2Op = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [0, 1, 0]);
    const text2Y = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [30, 0, -30]);

    const text3Op = useTransform(scrollYProgress, [0.6, 0.8, 0.95], [0, 1, 0]);
    const text3Y = useTransform(scrollYProgress, [0.6, 0.8, 0.95], [30, 0, -30]);

    return (
        <section ref={targetRef} className={styles.parallaxSection}>
            <div className={styles.parallaxBgDesign} />
            <div className={styles.parallaxGlow} />
            <div className={styles.parallaxFadeTop} />

            <div className={styles.parallaxSticky}>
                {/* Floating Images (Rigging, Cases, Stage) */}
                <motion.div className={`${styles.parallaxItem} ${styles.pLayer1}`} style={{ y: y1 }}>
                    <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Backstage rigging" />
                </motion.div>

                <motion.div className={`${styles.parallaxItem} ${styles.pLayer2}`} style={{ y: y2 }}>
                    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Event setup" />
                </motion.div>

                <motion.div className={`${styles.parallaxItem} ${styles.pLayer3}`} style={{ y: y3 }}>
                    <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" alt="Control desk" />
                </motion.div>

                {/* Central Storytelling Text */}
                <div className={styles.parallaxTextWrap}>
                    <motion.div className={styles.parallaxPanel} style={{ opacity: text1Op, y: text1Y, position: 'absolute', inset: 0 }}>
                        <span className={styles.bgNumber}>01</span>
                        <h2 className={styles.parallaxTitle}>Crafting the<br />Extraordinary</h2>
                        <p className={styles.parallaxDesc}>We don&apos;t just plan events; we architect experiences. From massive stadium builds to intimate luxury galas.</p>
                    </motion.div>

                    <motion.div className={styles.parallaxPanel} style={{ opacity: text2Op, y: text2Y, position: 'absolute', inset: 0 }}>
                        <span className={styles.bgNumber}>02</span>
                        <h2 className={styles.parallaxTitle}>Creative<br />Freedom</h2>
                        <p className={styles.parallaxDesc}>Bold ideas live here. We foster an environment where your wildest concepts are funded, prototyped, and perfectly executed.</p>
                    </motion.div>

                    <motion.div className={styles.parallaxPanel} style={{ opacity: text3Op, y: text3Y, position: 'absolute', inset: 0 }}>
                        <span className={styles.bgNumber}>03</span>
                        <h2 className={styles.parallaxTitle}>Relentless<br />Collaboration</h2>
                        <p className={styles.parallaxDesc}>Work shoulder-to-shoulder with master technicians, designers, and logistics experts who inspire you daily.</p>
                    </motion.div>
                </div>
            </div>

            <div className={styles.parallaxFadeBottom} />
        </section>
    );
}

/* =============================================
   SECTION 3: INTERACTIVE TICKET JOB BOARD
   ============================================= */
const openPositions = [
    {
        id: 'TKT-001',
        title: 'Senior Event Manager',
        dept: 'Operations',
        loc: 'Mumbai HQ',
        reqs: ['5+ years high-end event experience', 'Proven budget management over ₹5Cr', 'Vendor negotiation mastery'],
        desc: 'Lead our flagship accounts from conceptual pitch to final teardown. You are the conductor of the orchestra.',
        rotation: -4,
        xOff: -120,
        yOff: -60
    },
    {
        id: 'TKT-002',
        title: 'Creative Director',
        dept: 'Design',
        loc: 'Mumbai HQ',
        reqs: ['8+ years spatial/event design', 'Expert in 3D visualization (SketchUp/Cinema4D)', 'Pitch presentation skills'],
        desc: 'Own the visual and experiential narrative of all major events. From initial mood boards to material selection.',
        rotation: 6,
        xOff: 120,
        yOff: 30
    },
    {
        id: 'TKT-003',
        title: 'Production Lead',
        dept: 'Technical',
        loc: 'On-Site / Mumbai',
        reqs: ['Extensive AV & rigging knowledge', 'Safety certification preferred', 'Experience handling 5000+ pax events'],
        desc: 'Turn design renders into physical reality. You handle staging, lighting, massive LED arrays, and structural safety.',
        rotation: -2,
        xOff: -30,
        yOff: 80
    },
];

function JobBoard() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section className={styles.jobBoardSection}>
            <div className={styles.jobDesk} />

            <div className={styles.jobHeader}>
                <motion.h2
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', margin: '0 0 16px', textTransform: 'uppercase' }}
                >
                    Open Roles
                </motion.h2>
                <motion.p
                    className={styles.heroPre}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Join The Crew
                </motion.p>
            </div>

            <div className={styles.jobListWrap}>
                {openPositions.map((job) => {
                    const isExpanded = expandedId === job.id;

                    return (
                        <div
                            key={job.id}
                            className={styles.jobRow}
                            style={{ opacity: expandedId && !isExpanded ? 0.3 : 1 }}
                        >
                            <div
                                className={styles.jobRowHeader}
                                onClick={() => setExpandedId(isExpanded ? null : job.id)}
                            >
                                <h3 className={styles.jobRowTitle}>{job.title}</h3>
                                <div className={styles.jobRowMeta}>
                                    {job.loc} <br />
                                    <span style={{ fontSize: '0.8em', color: 'var(--color-gold)' }}>{job.dept}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                        className={styles.jobAccordion}
                                    >
                                        <div className={styles.jobAccordionInner}>
                                            <h4>About The Role</h4>
                                            <p className={styles.expandedDesc}>{job.desc}</p>

                                            <h4>Requirements</h4>
                                            <ul className={styles.reqList}>
                                                {job.reqs.map((req, i) => <li key={i}>{req}</li>)}
                                            </ul>

                                            <div className={styles.applyBtnWrap}>
                                                <a href="mailto:careers@thespevents.com" className={styles.applyBtn}>
                                                    Apply Now
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
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
            {/* Replaced expensive CSS filters with box-shadow spreading for performance */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '10%', left: '-10%',
                    width: '30vw', height: '30vw',
                    background: 'transparent',
                    borderRadius: '50%',
                    boxShadow: '0 0 150px 100px rgba(201, 168, 76, 0.08)',
                    willChange: 'transform, opacity'
                }}
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{
                    position: 'absolute', bottom: '-10%', right: '-10%',
                    width: '40vw', height: '40vw',
                    background: 'transparent',
                    borderRadius: '50%',
                    boxShadow: '0 0 200px 150px rgba(100, 40, 180, 0.08)',
                    willChange: 'transform, opacity'
                }}
            />
        </div>
    );
}

export default function CareersPage() {
    return (
        <main className={styles.pageWrap}>
            <AmbientBackground />
            <StageLightHero />
            <BackstageParallax />
            <JobBoard />
            <CurtainCTA />
        </main>
    );
}
