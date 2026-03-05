'use client';

import { useRef } from 'react';
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

export default function CareersPage() {
    return (
        <main className={styles.pageWrap}>
            <AmbientBackground />
            <StageLightHero />
            <BackstageParallax />
            <CurtainCTA />
        </main>
    );
}
