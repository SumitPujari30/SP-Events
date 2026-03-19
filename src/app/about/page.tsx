'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const grassrootsImages = [
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', artist: 'Event Vibes' },
    { url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', artist: 'Musical Night' },
    { url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', artist: 'Corporate Gala' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', artist: 'DJ Performance' },
    { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', artist: 'Celebration' },
    { url: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&q=80', artist: 'Concert Hall' },
];

const destinations = [
    { name: 'BENGALURU', url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&q=80', size: 'large' },
    { name: 'MUMBAI', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&q=80', size: 'large' },
    { name: 'KOLKATA', url: 'https://images.unsplash.com/photo-1558431382-7f28df621a00?w=600&q=80', size: 'small' },
    { name: 'HYDERABAD', url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=600&q=80', size: 'small' },
    { name: 'DELHI', url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', size: 'small' },
    { name: 'DUBAI', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', size: 'small' },
    { name: 'CAPE TOWN', url: 'https://images.unsplash.com/photo-1580619305218-85e23b49e894?w=600&q=80', size: 'small' },
];

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <>
            {/* Hero */}
            <section ref={heroRef} className={styles.heroSection}>
                <motion.div 
                    className={styles.heroBg}
                    style={{ 
                        scale: bgScale,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)'
                    }}
                />
                <div className={styles.heroOverlay} />
                
                <motion.div 
                    className={styles.heroContent}
                    style={{ opacity: opacityHero }}
                >
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        About Us
                    </motion.span>
                    <motion.h1
                        className={styles.heroTitle}
                        style={{ y: yTitle }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        Our <span className="text-gold">Story</span>
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        style={{ y: ySubtitle }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        A journey of creativity, resilience, and relentless pursuit of excellence in event management.
                    </motion.p>
                </motion.div>
            </section>

            {/* Grassroots Slider Section */}
            <section className={styles.grassrootsSection}>
                <motion.div 
                    className={styles.grassrootsHeader}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <h2 className={styles.grassrootsTitle}>GRASSROOTS</h2>
                </motion.div>

                <div className={styles.sliderContainer}>
                    <motion.div 
                        className={styles.sliderTrack}
                        drag="x"
                        dragConstraints={{ left: -1200, right: 0 }}
                        whileTap={{ cursor: 'grabbing' }}
                    >
                        {grassrootsImages.map((img, i) => (
                            <div key={i} className={styles.sliderItem}>
                                <img src={img.url} alt={img.artist} className={styles.sliderImage} />
                                <div className={styles.sliderOverlay}>
                                    <span className={styles.sliderArtist}>{img.artist}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div 
                    className={styles.grassrootsFooter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <p className={styles.grassrootsSubtitle}>PIONEERING MAGICAL EVENT EXPERIENCES</p>
                </motion.div>
            </section>

            {/* Values — Moved to item 3 */}
            <section className="section bg-dark-alt">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">03. Our Values</span>
                            <h2 className="section-title">The Foundation of <span className="text-gold">Excellence</span></h2>
                        </div>
                    </AnimatedSection>

                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <AnimatedSection key={i} delay={i * 0.08}>
                                <div className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <v.icon size={26} />
                                    </div>
                                    <div className={styles.valueCardContent}>
                                        <h4>{v.title}</h4>
                                        <p>{v.desc}</p>
                                    </div>
                                    <div className={styles.valueCardEdge} />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destinations — Where You Can Find Us */}
            <section className={styles.destinationsSection}>
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header center mb-0">
                            <h2 className={styles.destTitle}>WHERE YOU CAN<br />FIND US</h2>
                            <p className={styles.destSubtitle}>
                                Our expertise and services extended to these destinations for your convenience.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>

                <div className={styles.destGrid}>
                    <div className={styles.destLargeRow}>
                        {destinations.filter(d => d.size === 'large').map((dest, i) => (
                            <AnimatedSection key={i} variant={i === 0 ? 'fadeLeft' : 'fadeRight'} className={styles.destCardLarge}>
                                <div className={styles.destCard}>
                                    <img src={dest.url} alt={dest.name} className={styles.destImage} />
                                    <div className={styles.destOverlay}>
                                        <span className={styles.destCity}>{dest.name}</span>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                    <div className={styles.destSmallRow}>
                        {destinations.filter(d => d.size === 'small').map((dest, i) => (
                            <AnimatedSection key={i} variant="fadeUp" delay={0.1 * i} className={styles.destCardSmall}>
                                <div className={styles.destCard}>
                                    <img src={dest.url} alt={dest.name} className={styles.destImage} />
                                    <div className={styles.destOverlay}>
                                        <span className={styles.destCitySmall}>{dest.name}</span>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <ProcessSection />

            {/* Milestones */}
            <section className="section section-violet">
                {/* <div className="container">
                    <AnimatedSection>
                        <div className="section-header center">
                            <span className="section-label">Our Journey</span>
                            <h2 className="section-title">Milestones of Excellence</h2>
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
                </div> */}
            </section>

            {/* Stats */}
            <section className="section-sm">
                <div className="container">
                    <div className={styles.aboutStats}>
                        {[
                            { value: 4, suffix: '+', label: 'Years of Excellence' },
                            { value: 300, suffix: '+', label: 'Happy Clients' },
                            { value: 1500, suffix: '+', label: 'Magic Experiences' },
                            { value: 30, suffix: '+', label: 'Professionals' },
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
