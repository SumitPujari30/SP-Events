'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineLocationMarker, HiOutlineBriefcase } from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './careers.module.css';

const cultureHighlights = [
    { emoji: '🚀', title: 'Growth Mindset', desc: 'Continuous learning with mentorship programs and skill development opportunities.' },
    { emoji: '🎨', title: 'Creative Freedom', desc: 'Express your creativity in a supportive environment that values bold ideas.' },
    { emoji: '🤝', title: 'Collaborative Spirit', desc: 'Work alongside passionate professionals who inspire and support each other.' },
    { emoji: '🏆', title: 'Recognition', desc: 'Outstanding achievements are celebrated and rewarded at every level.' },
];

const openings = [
    {
        title: 'Senior Event Manager',
        department: 'Event Operations',
        location: 'Mumbai',
        type: 'Full-time',
        desc: 'Lead end-to-end event execution for top-tier corporate clients. Requires 5+ years in event management with proven leadership skills and a passion for creating extraordinary experiences.',
        requirements: ['5+ years event management experience', 'Strong client relationship skills', 'Team leadership experience', 'Budget management expertise'],
    },
    {
        title: 'Creative Director',
        department: 'Design & Creativity',
        location: 'Mumbai',
        type: 'Full-time',
        desc: 'Drive creative strategy and conceptual direction for all events. Looking for a visionary who can blend art with strategy to create unforgettable brand experiences.',
        requirements: ['8+ years in creative/design roles', 'Portfolio of event design work', 'Strong presentation skills', 'Proficiency in design tools'],
    },
    {
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        location: 'Remote / Mumbai',
        type: 'Full-time',
        desc: 'Manage our digital presence and drive marketing campaigns for events. Ideal candidate has strong social media, content strategy, and analytics expertise.',
        requirements: ['3+ years digital marketing experience', 'Social media management', 'Content creation skills', 'Analytics and reporting'],
    },
    {
        title: 'Production Coordinator',
        department: 'Production',
        location: 'Mumbai',
        type: 'Full-time',
        desc: 'Coordinate technical production for large-scale events including AV, staging, and logistics. Detail-oriented professional with strong vendor management skills.',
        requirements: ['3+ years production experience', 'Technical knowledge of AV equipment', 'Vendor management skills', 'Excellent organizational skills'],
    },
    {
        title: 'Event Intern',
        department: 'Event Operations',
        location: 'Mumbai',
        type: 'Internship',
        desc: 'Join our team as an intern and gain hands-on experience in event management. Great opportunity for fresh graduates passionate about the events industry.',
        requirements: ['Recent graduate or final year student', 'Strong communication skills', 'Enthusiasm for events', 'Willingness to learn'],
    },
];

export default function CareersPage() {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        Careers
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        Join Our <span className="text-gold">Team</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        Be part of a team that turns ordinary moments into extraordinary memories.
                    </motion.p>
                </div>
            </section>

            {/* Culture */}
            <section className="section">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Our Culture</span>
                            <h2 className="section-title">Why Work With Us</h2>
                            <p className="section-subtitle">
                                We foster a dynamic environment where talent thrives and creativity knows no bounds.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className={styles.cultureGrid}>
                        {cultureHighlights.map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className={styles.cultureCard}>
                                    <span className={styles.cultureEmoji}>{item.emoji}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="section section-cream">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Open Positions</span>
                            <h2 className="section-title">Current Openings</h2>
                            <p className="section-subtitle">
                                Explore opportunities to make a difference in the world of events.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className={styles.jobList}>
                        {openings.map((job, i) => (
                            <AnimatedSection key={i} delay={i * 0.08}>
                                <div className={styles.jobCard}>
                                    <div
                                        className={styles.jobHeader}
                                        onClick={() => setExpanded(expanded === i ? null : i)}
                                    >
                                        <div className={styles.jobInfo}>
                                            <h3>{job.title}</h3>
                                            <div className={styles.jobMeta}>
                                                <span><HiOutlineBriefcase size={14} /> {job.department}</span>
                                                <span><HiOutlineLocationMarker size={14} /> {job.location}</span>
                                                <span className={styles.jobType}>{job.type}</span>
                                            </div>
                                        </div>
                                        <button className={styles.jobToggle}>
                                            {expanded === i ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                                        </button>
                                    </div>

                                    <motion.div
                                        className={styles.jobDetails}
                                        initial={false}
                                        animate={{
                                            height: expanded === i ? 'auto' : 0,
                                            opacity: expanded === i ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className={styles.jobDetailsInner}>
                                            <p>{job.desc}</p>
                                            <h4>Requirements:</h4>
                                            <ul>
                                                {job.requirements.map((req, j) => (
                                                    <li key={j}>{req}</li>
                                                ))}
                                            </ul>
                                            <button className="btn btn-primary" style={{ marginTop: 16 }}>
                                                Apply Now
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection>
                        <div className={styles.careersCta}>
                            <h3>Don&apos;t see your role?</h3>
                            <p>We&apos;re always looking for talented people. Send us your resume and let&apos;s connect!</p>
                            <a href="mailto:careers@thespevents.com" className="btn btn-outline">
                                Send Your Resume
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
