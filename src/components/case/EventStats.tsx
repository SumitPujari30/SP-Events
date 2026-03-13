'use client';

import { motion } from 'framer-motion';
import CounterAnimation from '@/components/CounterAnimation';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './EventStats.module.css';

interface Props {
    description: string;
    client: string;
    location: string;
    summary: string;
    stats: {
        guests: number;
        teamSize: number;
        setupDays: number;
        stageSqFt: number;
    };
}

export default function EventStats({ description, client, location, summary, stats }: Props) {
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {/* Left — Intelligence block */}
                <AnimatedSection variant="fadeLeft">
                    <div className={styles.leftCol}>
                        <span className={styles.sectionLabel}>Event Intelligence</span>
                        <p className={styles.description}>{description}</p>

                        <div className={styles.metaItems}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Client</span>
                                <span className={styles.metaValue}>{client}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Location</span>
                                <span className={styles.metaValue}>{location}</span>
                            </div>
                        </div>

                        <div className={styles.summaryWrap}>
                            <div className={styles.summaryBar} />
                            <p className={styles.summary}>{summary}</p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Right — Animated stat counters */}
                <AnimatedSection variant="fadeRight" delay={0.15}>
                    <div className={styles.rightCol}>
                        <div className={styles.statsGrid}>
                            {[
                                { label: 'Guests Attended', value: stats.guests, suffix: '+' },
                                { label: 'Team Members', value: stats.teamSize, suffix: '' },
                                { label: 'Setup Days', value: stats.setupDays, suffix: '' },
                                { label: 'Sq Ft Stage', value: stats.stageSqFt, suffix: '' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.statCard}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <CounterAnimation
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        duration={2}
                                        className={styles.statValue}
                                    />
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
