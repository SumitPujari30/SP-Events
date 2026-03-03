'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiOutlineLocationMarker, HiOutlineBriefcase } from 'react-icons/hi';
import styles from './careers.module.css';

/* ——— Data ——— */
const cultureSlides = [
    {
        id: 1,
        title: 'Crafting the Extraordinary',
        desc: 'We don\'t just plan events; we architect experiences. From massive stadium builds to intimate luxury galas, you\'ll be part of a team that turns impossible ideas into flawless realities.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85',
    },
    {
        id: 2,
        title: 'Creative Freedom',
        desc: 'Bold ideas live here. We foster an environment where your wildest creative concepts are not just heard — they are funded, prototyped, and brought to life.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
    },
    {
        id: 3,
        title: 'Relentless Collaboration',
        desc: 'Great events are never built in silos. You\'ll work shoulder-to-shoulder with visionary designers, master technicians, and logistics experts who inspire you daily.',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=85',
    },
];

const openPositions = [
    {
        id: 'TKT-001',
        title: 'Senior Event Manager',
        dept: 'Operations',
        loc: 'Mumbai HQ',
        type: 'Full-Time',
        reqs: ['5+ years high-end event experience', 'Proven budget management over ₹5Cr', 'Vendor negotiation mastery'],
        desc: 'Lead our flagship accounts from conceptual pitch to final teardown. You are the conductor of the orchestra.',
    },
    {
        id: 'TKT-002',
        title: 'Creative Director',
        dept: 'Design',
        loc: 'Mumbai HQ',
        type: 'Full-Time',
        reqs: ['8+ years spatial/event design', 'Expert in 3D visualization (SketchUp/Cinema4D)', 'Pitch presentation skills'],
        desc: 'Own the visual and experiential narrative of all major events. From initial mood boards to material selection.',
    },
    {
        id: 'TKT-003',
        title: 'Production Lead',
        dept: 'Technical',
        loc: 'On-Site / Mumbai',
        type: 'Full-Time',
        reqs: ['Extensive AV & rigging knowledge', 'Safety certification preferred', 'Experience handling 5000+ pax events'],
        desc: 'Turn design renders into physical reality. You handle staging, lighting, massive LED arrays, and structural safety.',
    },
];

/* ——— Components ——— */

function TicketCard({ job }: { job: typeof openPositions[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className={`${styles.ticketWrap} ${isOpen ? styles.ticketOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.ticketMain}>
                <div className={styles.ticketStub}>
                    <span className={styles.stubId}>{job.id}</span>
                    <div className={styles.stubBarcode} />
                    <span className={styles.stubAdmit}>ADMIT ONE</span>
                </div>

                <div className={styles.ticketBody}>
                    <div className={styles.ticketHeader}>
                        <h3 className={styles.ticketTitle}>{job.title}</h3>
                        <span className={styles.ticketType}>{job.type}</span>
                    </div>

                    <div className={styles.ticketMeta}>
                        <span><HiOutlineBriefcase /> {job.dept}</span>
                        <span><HiOutlineLocationMarker /> {job.loc}</span>
                    </div>

                    <p className={styles.ticketDesc}>{job.desc}</p>

                    <span className={styles.ticketAction}>
                        {isOpen ? 'Close Details' : 'View Requirements'} <HiArrowRight />
                    </span>

                    {/* Faux gold stamp that appears on hover */}
                    <div className={styles.ticketStamp}>APPLY</div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.ticketDrawer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className={styles.drawerInner}>
                            <div className={styles.drawerCutout} /> {/* Visual ticket perforation */}
                            <h4>Essential Requirements</h4>
                            <ul>
                                {job.reqs.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                            <a href="mailto:careers@thespevents.com" className="btn btn-primary" onClick={(e) => e.stopPropagation()}>
                                Submit Portfolio & Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function CareersPage() {
    // Horizontal scroll setup
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Convert vertical scroll to horizontal translation
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

    return (
        <main className={styles.pageWrap}>

            {/* ——— Hero Section ——— */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.p
                        className={styles.heroPre}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Join The SP Events
                    </motion.p>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Don&apos;t just witness the <br />
                        <span className="text-gold">spectacle.</span> Build it.
                    </motion.h1>
                    <motion.div
                        className={styles.scrollIndicator}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span>Scroll to explore</span>
                        <div className={styles.scrollLine} />
                    </motion.div>
                </div>
            </section>

            {/* ——— Horizontal Scroll Culture Journey ——— */}
            <section ref={targetRef} className={styles.horizontalWrap}>
                <div className={styles.horizontalSticky}>
                    <motion.div style={{ x }} className={styles.horizontalTrack}>
                        {cultureSlides.map((slide) => (
                            <div key={slide.id} className={styles.slide}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={slide.image} alt={slide.title} className={styles.slideImg} />
                                <div className={styles.slideOverlay} />
                                <div className={styles.slideContent}>
                                    <span className={styles.slideNum}>0{slide.id}</span>
                                    <h2 className={styles.slideTitle}>{slide.title}</h2>
                                    <p className={styles.slideDesc}>{slide.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ——— Ticket Job Board ——— */}
            <section className={styles.jobBoard}>
                <div className="container">
                    <div className={styles.jobHeader}>
                        <h2 className="section-title">Open Positions</h2>
                        <p className="section-subtitle" style={{ maxWidth: 500, margin: '0 auto' }}>
                            Ready for your VIP pass? Select a role below to view requirements and apply.
                        </p>
                    </div>

                    <div className={styles.ticketGrid}>
                        {openPositions.map(job => (
                            <TicketCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ——— Backstage Pass CTA ——— */}
            <section className={styles.lanyardCta}>
                <motion.div
                    className={styles.passCard}
                    initial={{ rotate: -5, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                >
                    <div className={styles.passHole} />
                    <div className={styles.passHeader}>ALL ACCESS</div>
                    <div className={styles.passBody}>
                        <h3>Don&apos;t see your role?</h3>
                        <p>We are always looking for rogue talent. Pitch us why we need you.</p>
                        <a href="mailto:careers@thespevents.com" className={styles.passBtn}>
                            Send Pitch
                        </a>
                    </div>
                    <div className={styles.passFooter}>THE SP EVENTS CREW</div>
                </motion.div>
            </section>

        </main>
    );
}
