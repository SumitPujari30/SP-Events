'use client';

import { motion } from 'framer-motion';
import {
    HiOutlineGlobe,
    HiOutlineCalculator,
    HiOutlineRefresh,
    HiOutlineLocationMarker,
    HiOutlineDocumentText,
    HiOutlineTruck,
    HiOutlineTrash,
} from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import CounterAnimation from '@/components/CounterAnimation';
import styles from './esg.module.css';

const pillars = [
    {
        icon: '🔍',
        title: 'Understand',
        desc: 'We begin by deeply understanding the environmental impact landscape of your event, identifying key areas for improvement.',
    },
    {
        icon: '📐',
        title: 'Measure',
        desc: 'Using advanced methodologies, we accurately measure the carbon footprint of every aspect of your event.',
    },
    {
        icon: '🌱',
        title: 'Offset',
        desc: 'We implement targeted solutions to offset and reduce environmental impact, making your events genuinely sustainable.',
    },
];

const steps = [
    { icon: HiOutlineCalculator, title: 'Calculate Carbon Footprint', desc: 'Comprehensive assessment of the event\'s environmental impact using industry-leading methodologies.' },
    { icon: HiOutlineLocationMarker, title: 'Eco-Friendly Venues', desc: 'Selecting venues with green certifications and sustainable infrastructure for minimal environmental impact.' },
    { icon: HiOutlineDocumentText, title: 'Go Paperless', desc: 'Digital invitations, e-tickets, and digital signage to eliminate paper waste entirely.' },
    { icon: HiOutlineTruck, title: 'Sustainable Mobility', desc: 'Promoting carpooling, public transport, and electric vehicle options for attendees and crew.' },
    { icon: HiOutlineRefresh, title: 'Recyclable Materials', desc: 'Using cloth-based backdrops, reusable decor, and recyclable materials throughout the event.' },
    { icon: HiOutlineTrash, title: 'Waste Management', desc: 'Comprehensive waste segregation, composting organic waste, and minimizing single-use plastics.' },
    { icon: HiOutlineGlobe, title: 'Eco Giveaways & Food', desc: 'Sustainable merchandise, locally sourced organic food, and efficient food-waste management systems.' },
];

export default function ESGPage() {
    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        ESG
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        Sustainability in <span className="text-gold">Events</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        Leading the industry towards eco-conscious events that protect our planet while delivering exceptional experiences.
                    </motion.p>
                </div>
            </section>

            {/* Pillars */}
            <section className="section">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Our ESG Approach</span>
                            <h2 className="section-title">A Fresh Perspective on Sustainable Events</h2>
                            <p className="section-subtitle">
                                We help our partners understand, measure, and offset their carbon footprints through innovative event solutions.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className={styles.pillarsGrid}>
                        {pillars.map((p, i) => (
                            <AnimatedSection key={i} delay={i * 0.15} variant="scaleUp">
                                <div className={styles.pillarCard}>
                                    <span className={styles.pillarIcon}>{p.icon}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                    <div className={styles.pillarNumber}>0{i + 1}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7 Steps */}
            <section className="section section-violet">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Our Process</span>
                            <h2 className="section-title">7 Steps to Sustainable Events</h2>
                            <p className="section-subtitle">
                                A comprehensive framework for creating events that are as kind to the planet as they are impactful.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className={styles.stepsGrid}>
                        {steps.map((step, i) => (
                            <AnimatedSection key={i} delay={i * 0.08}>
                                <div className={styles.stepCard}>
                                    <div className={styles.stepNum}>0{i + 1}</div>
                                    <div className={styles.stepIcon}>
                                        <step.icon size={24} />
                                    </div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="section-sm">
                <div className="container">
                    <AnimatedSection>
                        <div className="section-header">
                            <span className="section-label">Our Impact</span>
                            <h2 className="section-title">Making a Difference</h2>
                        </div>
                    </AnimatedSection>

                    <div className={styles.impactGrid}>
                        {[
                            { value: 200, suffix: '+', label: 'Green Events Delivered' },
                            { value: 85, suffix: '%', label: 'Waste Reduction Achieved' },
                            { value: 1500, suffix: 'T', label: 'CO₂ Offset' },
                            { value: 50, suffix: '+', label: 'Eco-Certified Venues Used' },
                        ].map((stat, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className={styles.impactItem}>
                                    <CounterAnimation end={stat.value} suffix={stat.suffix} className={styles.impactValue} />
                                    <span className={styles.impactLabel}>{stat.label}</span>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
