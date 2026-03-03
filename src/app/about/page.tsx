'use client';

import { motion } from 'framer-motion';
import {
    HiOutlineHeart,
    HiOutlineLightningBolt,
    HiOutlineEye,
    HiOutlineShieldCheck,
    HiOutlineSparkles,
    HiOutlinePuzzle,
} from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';
import CounterAnimation from '@/components/CounterAnimation';
import styles from './about.module.css';

const values = [
    { icon: HiOutlineHeart, title: 'Passion', desc: 'Every event is a labor of love, driven by our unwavering passion for creating extraordinary moments.' },
    { icon: HiOutlineLightningBolt, title: 'Innovation', desc: 'We push boundaries and embrace new ideas to deliver cutting-edge experiences.' },
    { icon: HiOutlineEye, title: 'Vision', desc: 'We see the bigger picture and craft events that align with your strategic goals.' },
    { icon: HiOutlineShieldCheck, title: 'Integrity', desc: 'Trust and transparency form the foundation of every client relationship we build.' },
    { icon: HiOutlineSparkles, title: 'Excellence', desc: 'We pursue perfection in every detail, from concept to execution and beyond.' },
    { icon: HiOutlinePuzzle, title: 'Teamwork', desc: 'Our diverse team collaborates seamlessly to deliver cohesive, stunning results.' },
];

const milestones = [
    { year: '2010', title: 'The Beginning', desc: 'Founded with a vision to revolutionize event management in India.' },
    { year: '2013', title: 'Major Milestone', desc: 'Crossed 500 events and expanded our team to 30+ professionals.' },
    { year: '2016', title: 'National Expansion', desc: 'Extended operations across 15+ cities with government and corporate clients.' },
    { year: '2019', title: 'Innovation Leap', desc: 'Launched our virtual events platform, pioneering hybrid event solutions.' },
    { year: '2022', title: 'Sustainability Focus', desc: 'Became a certified sustainable event management company with ESG commitment.' },
    { year: '2025', title: 'Industry Leader', desc: 'Delivered 6,000+ events, recognized among top event companies nationwide.' },
];

const processSteps = [
    { num: '01', title: 'Brief', desc: 'We listen deeply to understand your vision, audience, and goals.' },
    { num: '02', title: 'Concept', desc: 'Our creative team architects a unique experience around your brand.' },
    { num: '03', title: 'Execution', desc: 'Flawless on-ground delivery by our 100+ dedicated professionals.' },
    { num: '04', title: 'Legacy', desc: 'Crafting moments that your audience remembers for years to come.' },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        About Us
                    </motion.span>
                    <motion.h1
                        className="page-hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        Our <span className="text-gold">Story</span>
                    </motion.h1>
                    <motion.p
                        className="page-hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        A journey of creativity, resilience, and relentless pursuit of excellence in event management.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section section-cream">
                <div className="container">
                    <div className={styles.storyGrid}>
                        <AnimatedSection variant="fadeLeft">
                            <div className={styles.storyImage}>
                                <img
                                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=700&q=80"
                                    alt="Team collaboration"
                                />
                            </div>
                        </AnimatedSection>
                        <AnimatedSection variant="fadeRight" delay={0.2}>
                            <div className={styles.storyContent}>
                                <TextReveal text="The Art of Weaving Experiences" as="h2" className="section-title" />
                                <div className="divider" style={{ margin: '20px 0' }} />
                                <p className={styles.storyText}>
                                    The SP Events was born from a simple yet powerful idea — that every event deserves to be a masterpiece. Founded in 2010 by a team that brought over 100 years of combined industry experience, we identified a gap in the market for a truly professional, innovative, and reliable event management company.
                                </p>
                                <p className={styles.storyText}>
                                    Our name reflects the essence of what we do. Like the art of weaving, where individual threads come together to create something beautiful, we interlace creativity and strategy — what we call our <strong>&ldquo;Taana-Baana&rdquo;</strong> approach — to craft spellbinding experiences that resonate long after the event ends.
                                </p>
                                <p className={styles.storyText}>
                                    Today, with 100+ passionate professionals and 6,000+ successful events, we continue to push the boundaries of what&apos;s possible, transforming ordinary moments into extraordinary memories.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Taana-Baana Approach */}
            <section className="section">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header center">
                            <span className="section-label">Our Approach</span>
                            <h2 className="section-title">Taana-Baana Philosophy</h2>
                            <p className="section-subtitle">
                                The perfect interlacing of creativity and strategy that defines every event we create.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className={styles.approachGrid}>
                        <AnimatedSection variant="fadeLeft" delay={0.1}>
                            <div className={styles.approachCard}>
                                <div className={styles.approachIcon}>🎨</div>
                                <h3>Taana — Creativity</h3>
                                <p>The warp threads of imagination, artistic vision, and boundless creative energy that give each event its unique character and soul.</p>
                                <ul className={styles.approachList}>
                                    <li>Conceptual Design</li>
                                    <li>Visual Storytelling</li>
                                    <li>Immersive Experiences</li>
                                    <li>Artistic Direction</li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection variant="scaleUp" delay={0.2}>
                            <div className={styles.approachCenter}>
                                <div className={styles.weaveIcon}>✦</div>
                                <h3>The Weave</h3>
                                <p>Where magic happens — the perfect intersection of creative brilliance and strategic precision.</p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection variant="fadeRight" delay={0.3}>
                            <div className={styles.approachCard}>
                                <div className={styles.approachIcon}>📊</div>
                                <h3>Baana — Strategy</h3>
                                <p>The weft threads of meticulous planning, data-driven decisions, and flawless execution that bring every vision to life.</p>
                                <ul className={styles.approachList}>
                                    <li>Strategic Planning</li>
                                    <li>Budget Optimization</li>
                                    <li>Logistics Management</li>
                                    <li>Performance Metrics</li>
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <ProcessSection />

            {/* Timeline */}
            <section className="section section-cream">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Our Journey</span>
                            <h2 className="section-title">Milestones</h2>
                        </div>
                    </AnimatedSection>

                    <div className={styles.timeline}>
                        {milestones.map((m, i) => (
                            <AnimatedSection key={i} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
                                <div className={`${styles.timelineItem} ${i % 2 !== 0 ? styles.timelineRight : ''}`}>
                                    <div className={styles.timelineYear}>{m.year}</div>
                                    <div className={styles.timelineCard}>
                                        <h4>{m.title}</h4>
                                        <p>{m.desc}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                        <div className={styles.timelineLine} />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-sm">
                <div className="container">
                    <div className={styles.aboutStats}>
                        {[
                            { value: 6000, suffix: '+', label: 'Events Delivered' },
                            { value: 100, suffix: '+', label: 'Team Members' },
                            { value: 15, suffix: '+', label: 'Cities Covered' },
                            { value: 50, suffix: '+', label: 'Award Wins' },
                        ].map((stat, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className={styles.aboutStatItem}>
                                    <CounterAnimation end={stat.value} suffix={stat.suffix} className={styles.aboutStatValue} />
                                    <span className={styles.aboutStatLabel}>{stat.label}</span>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">What Drives Us</span>
                            <h2 className="section-title">Our Core Values</h2>
                        </div>
                    </AnimatedSection>

                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <AnimatedSection key={i} delay={i * 0.08}>
                                <div className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <v.icon size={24} />
                                    </div>
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

/* ——— Process Section Component ——— */
function ProcessSection() {
    return (
        <section className={styles.processSection}>
            <div className="container">
                <AnimatedSection>
                    <div className="section-header center">
                        <span className="section-label">How We Work</span>
                        <h2 className="section-title">Our Process</h2>
                        <p className="section-subtitle">
                            Every great event starts with a conversation. Here&apos;s how we
                            bring your vision to life — with precision and passion.
                        </p>
                    </div>
                </AnimatedSection>

                <div className={styles.processGrid}>
                    {processSteps.map((step, i) => (
                        <AnimatedSection key={i} variant="fadeUp" delay={i * 0.12}>
                            <div className={styles.processStep}>
                                <div className={styles.processNum}>{step.num}</div>
                                <h3 className={styles.processStepTitle}>{step.title}</h3>
                                <p className={styles.processStepDesc}>{step.desc}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
