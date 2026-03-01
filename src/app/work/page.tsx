'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import ProjectCard from '@/components/ProjectCard';
import styles from './work.module.css';

const categories = ['All', 'Corporate', 'Summit', 'Exhibition', 'Awards', 'Product Launch', 'Music', 'Government'];

const projects = [
    { title: 'Innovation Summit 2024', category: 'Summit', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
    { title: 'Grand Celebration Gala', category: 'Corporate', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
    { title: 'Annual Excellence Awards', category: 'Awards', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80' },
    { title: 'Corporate Leadership Meet', category: 'Corporate', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80' },
    { title: 'Tech Exhibition Expo', category: 'Exhibition', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80' },
    { title: 'Team Building Retreat', category: 'Corporate', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80' },
    { title: 'Electronica Music Fest', category: 'Music', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80' },
    { title: 'Product Launch Event', category: 'Product Launch', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80' },
    { title: 'Government Policy Summit', category: 'Government', image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80' },
];

export default function WorkPage() {
    const [active, setActive] = useState('All');
    const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        Our Work
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        Featured <span className="text-gold">Projects</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        A curated selection of events that showcase our creativity and execution excellence.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filter Pills */}
                    <motion.div
                        className={styles.filters}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
                                onClick={() => setActive(cat)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    <motion.div
                        className={styles.projectsGrid}
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <ProjectCard
                                        title={project.title}
                                        category={project.category}
                                        image={project.image}
                                        index={0}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <div className={styles.noResults}>No projects found in this category.</div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section section-dark">
                <div className="container">
                    <AnimatedSection variant="scaleUp">
                        <div className={styles.workCta}>
                            <h2>Have a project in mind?</h2>
                            <p>Let&apos;s collaborate and create something extraordinary together.</p>
                            <Link href="/contact" className="btn btn-gold">
                                Start a Conversation <HiArrowRight />
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
