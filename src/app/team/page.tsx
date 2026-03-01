'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './team.module.css';

/* ——— Leadership data ——— */
const leadership = [
    {
        name: 'Sanjay Patel',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85',
        bio: 'With 20+ years of industry experience, Sanjay founded The SP Events with a vision to revolutionize event management in India. His leadership has guided the company from a small startup to an industry powerhouse delivering 6,000+ events.',
        quote: '"Every event is a canvas — and our job is to paint something the audience will never forget."',
        linkedin: '#',
    },
    {
        name: 'Priya Malhotra',
        role: 'Creative Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85',
        bio: 'Priya brings bold creative vision and artistic direction that transforms concepts into immersive experiences. Her eye for detail and passion for storytelling has won multiple industry awards and set new creative benchmarks.',
        quote: '"Creativity isn\'t about being different — it\'s about being unforgettable."',
        linkedin: '#',
    },
    {
        name: 'Arjun Mehta',
        role: 'Head of Operations',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=85',
        bio: 'The logistics mastermind behind 6,000+ flawlessly executed events. Arjun ensures every detail is perfected — from venue logistics to last-mile delivery — making the impossible look effortless every single time.',
        quote: '"Perfection isn\'t an accident. It\'s the result of obsessive preparation."',
        linkedin: '#',
    },
];

/* ——— Core team data ——— */
const team = [
    { name: 'Anika Sharma', role: 'Senior Event Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
    { name: 'Rohan Desai', role: 'Production Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: 'Meera Krishnan', role: 'Brand Strategist', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80' },
    { name: 'Vikram Singh', role: 'Tech & AV Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
    { name: 'Neha Gupta', role: 'Design Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
    { name: 'Karthik Rajan', role: 'Client Relations', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
    { name: 'Divya Nair', role: 'Content Strategist', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
    { name: 'Rahul Verma', role: 'Logistics Manager', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
];

/* ——— Character Reveal Panel (GTA6-style) ——— */
function CharacterPanel({ person, index }: { person: typeof leadership[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Image parallax
    const imgY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
    // Text slide-in
    const textX = useTransform(scrollYProgress, [0.1, 0.35], [80, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
    // Quote fade
    const quoteOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const quoteY = useTransform(scrollYProgress, [0.3, 0.5], [30, 0]);
    // Number
    const numOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 0.1]);
    const numScale = useTransform(scrollYProgress, [0.05, 0.2], [0.8, 1]);

    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={styles.charPanel}>
            <div className={`${styles.charInner} ${isEven ? '' : styles.charReverse}`}>
                {/* Image side */}
                <div className={styles.charImageCol}>
                    <motion.div
                        className={styles.charImageWrap}
                        style={{ y: imgY }}
                    >
                        <img src={person.image} alt={person.name} className={styles.charImage} />
                        <div className={styles.charImageGradient} />
                    </motion.div>

                    {/* Big number overlay */}
                    <motion.div
                        className={styles.charNumber}
                        style={{ opacity: numOpacity, scale: numScale }}
                    >
                        0{index + 1}
                    </motion.div>
                </div>

                {/* Text side */}
                <div className={styles.charTextCol}>
                    <motion.div style={{ x: textX, opacity: textOpacity }}>
                        <span className={styles.charRole}>{person.role}</span>
                        <h2 className={styles.charName}>{person.name}</h2>
                        <div className={styles.charDivider} />
                        <p className={styles.charBio}>{person.bio}</p>
                        <div className={styles.charSocials}>
                            <a href={person.linkedin} className={styles.socialLink} aria-label="LinkedIn">
                                <FaLinkedinIn size={14} />
                            </a>
                        </div>
                    </motion.div>
                    <motion.blockquote
                        className={styles.charQuote}
                        style={{ opacity: quoteOpacity, y: quoteY }}
                    >
                        {person.quote}
                    </motion.blockquote>
                </div>
            </div>
        </div>
    );
}

/* ——— Stagger variants ——— */
const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ——— Page ——— */
export default function TeamPage() {
    return (
        <>
            {/* Hero */}
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        Our Team
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        The People Behind <span className="text-gold">The Magic</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        100+ passionate professionals driven by creativity, precision, and a shared love for extraordinary events.
                    </motion.p>
                </div>
            </section>

            {/* Leadership — GTA6-style scroll reveals */}
            <section className={styles.leaderSection}>
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header center">
                            <span className="section-label">Leadership</span>
                            <h2 className="section-title">Meet Our Leaders</h2>
                        </div>
                    </AnimatedSection>
                </div>

                {leadership.map((person, i) => (
                    <CharacterPanel key={i} person={person} index={i} />
                ))}
            </section>

            {/* Core Team Grid */}
            <section className="section section-cream">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header center">
                            <span className="section-label">Core Team</span>
                            <h2 className="section-title">The Dreamers & Doers</h2>
                            <p className="section-subtitle">
                                The talented individuals who bring every event to life with their unique expertise and passion.
                            </p>
                        </div>
                    </AnimatedSection>

                    <motion.div
                        className={styles.teamGrid}
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {team.map((person, i) => (
                            <motion.div
                                key={i}
                                className={styles.teamCard}
                                variants={cardUp}
                                whileHover={{ y: -8 }}
                            >
                                <div className={styles.teamImageWrap}>
                                    <img src={person.image} alt={person.name} className={styles.teamImage} />
                                    <div className={styles.teamImageOverlay}>
                                        <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                            <FaLinkedinIn size={14} />
                                        </a>
                                        <a href="#" className={styles.socialLink} aria-label="Instagram">
                                            <FaInstagram size={14} />
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.teamInfo}>
                                    <h4>{person.name}</h4>
                                    <span>{person.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="section section-dark" style={{ textAlign: 'center' }}>
                <div className="container">
                    <AnimatedSection variant="scaleUp">
                        <div className={styles.joinCta}>
                            <span className="section-label">Join Us</span>
                            <h2 className={styles.joinTitle}>
                                Want to be part of
                                <br />
                                <em>something extraordinary?</em>
                            </h2>
                            <p className={styles.joinSub}>
                                We&apos;re always looking for passionate, creative, and driven professionals to join our team.
                            </p>
                            <a href="/careers" className={styles.joinBtn}>
                                View Open Positions
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
