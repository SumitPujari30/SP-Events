'use client';

import { useRef, useState, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useInView,
    AnimatePresence,
} from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import styles from './clients.module.css';

/* ——— DATA ——— */
const clients = [
    { name: 'Udaya' },
    { name: 'Govt of Karnataka' },
    { name: 'Deshpande Startups' },
    { name: 'Digvijay News' },
    { name: 'JK Tyre' },
    { name: 'Jockey' },
    { name: 'Samsung' },
    { name: 'KLE Institute' },
    { name: 'Reliance Ltd' },
    { name: 'Toyota' },
    { name: 'USV' },
    { name: 'Vijayvani' },
    { name: 'Hero MotoCorp' },
    { name: 'HDFC Bank' },
    { name: 'HDFC Ergo' },
    { name: 'Mini Sou' },
    { name: 'Red FM' },
    { name: 'Tata Power Solar' },
];

const marqueeItems = [
    'Corporate Summits', 'Product Launches', 'Awards Galas', 'Global Conventions',
    'Brand Activations', 'Luxury Events', 'Tech Conferences', 'Sports Events',
];

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'CMO, TechVision Inc.',
        text: 'SP Events completely transformed our annual summit. Their attention to detail and creative execution resulted in our highest attendee engagement ever. They didn\'t just manage an event — they crafted an experience.',
        category: 'Corporate Summit',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    {
        name: 'David Chen',
        role: 'Director, Global Innovations',
        text: 'From the initial concept to the final tear-down, the SP Events team was flawless. The launch of our product line was a massive success, widely covered by international media.',
        category: 'Product Launch',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
    {
        name: 'Priya Sharma',
        role: 'Founder, The Artisan Collective',
        text: 'We wanted an intimate, luxury feel for our brand anniversary gala. The floral arrangements, the ambient lighting, and the seamless flow of the evening were nothing short of perfection.',
        category: 'Gala Dinner',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
    {
        name: 'Marcus Thorne',
        role: 'VP Marketing, Apex Sports',
        text: 'The logistics involved in our city-wide marathon were staggering, but SP Events handled every hurdle with immaculate grace. Their operational expertise is truly unmatched in the industry.',
        category: 'Sports Event',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
];

const stats = [
    { value: 6000, suffix: '+', label: 'Events Delivered' },
    { value: 15, suffix: '+', label: 'Years of Excellence' },
    { value: 500, suffix: '+', label: 'Global Clients' },
    { value: 100, suffix: '+', label: 'Team Members' },
];

/* =============================================
   SECTION 1: SPLIT-TEXT REVEAL HERO
   ============================================= */
function SplitTextHero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const line1 = 'OUR';
    const line2 = 'CLIENTS';
    const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.heroSticky}>
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85"
                    alt="Event background"
                    className={styles.heroBgImage}
                />
                <div className={styles.heroBgOverlay} />

                {/* Split text letters */}
                <div className={styles.heroTextContainer}>
                    <div className={styles.heroTextRow}>
                        {line1.split('').map((char, i) => (
                            <SplitLetter
                                key={`l1-${i}`}
                                char={char}
                                index={i}
                                total={line1.length}
                                scrollYProgress={scrollYProgress}
                                isGold={false}
                            />
                        ))}
                    </div>
                    <div className={styles.heroTextRow}>
                        {line2.split('').map((char, i) => (
                            <SplitLetter
                                key={`l2-${i}`}
                                char={char}
                                index={i}
                                total={line2.length}
                                scrollYProgress={scrollYProgress}
                                isGold={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Subtitle fades in after letters spread */}
                <motion.div className={styles.heroSubtitle} style={{ opacity: subtitleOpacity }}>
                    <h2>
                        Trusted by the world&apos;s <em>finest brands</em>
                    </h2>
                    <p className={styles.heroSubtitleText}>
                        We design immersive experiences that leave a lasting impact — a constellation
                        of success stories forged with industry leaders worldwide.
                    </p>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    className={styles.heroScrollHint}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                >
                    <div className={styles.scrollDot} />
                    <span>Scroll</span>
                </motion.div>
            </div>
        </section>
    );
}

function SplitLetter({
    char, index, total, scrollYProgress, isGold,
}: {
    char: string;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    isGold: boolean;
}) {
    const center = (total - 1) / 2;
    const offset = index - center;
    const spreadX = offset * 170;
    // stable but varied vertical spread based on index
    const spreadY = ((index % 3) - 1) * 140;
    const rotation = offset * 12;

    const x = useTransform(scrollYProgress, [0.08, 0.55], [0, spreadX]);
    const y = useTransform(scrollYProgress, [0.08, 0.55], [0, spreadY]);
    const rotate = useTransform(scrollYProgress, [0.08, 0.55], [0, rotation]);
    const opacity = useTransform(scrollYProgress, [0.35, 0.62], [1, 0]);

    return (
        <motion.span
            className={`${styles.heroLetter} ${isGold ? styles.gold : ''}`}
            style={{ x, y, rotate, opacity }}
        >
            {char}
        </motion.span>
    );
}

/* =============================================
   MARQUEE STRIP
   ============================================= */
function MarqueeStrip() {
    const items = [...marqueeItems, ...marqueeItems];
    return (
        <div className={styles.marqueeStrip}>
            <motion.div
                className={styles.marqueeTrack}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
                {items.map((item, i) => (
                    <span key={i} className={styles.marqueeItem}>
                        {item}
                        <span className={styles.marqueeDot} />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/* =============================================
   SECTION 2: INTERACTIVE ROSTER (BRAND SHOWCASE)
   ============================================= */
// Real SP Events clients. Removed external logo URLs that were failing due to CORS / hotlinking blocks.
const rosterClients = [
    { name: 'Govt of Karnataka', color: '#B32821' }, // Red theme for Karnataka Govt
    { name: 'Deshpande Startups', color: '#1B4D82' },
    { name: 'Digvijay News', color: '#D32F2F' },
    { name: 'Red FM', color: '#E53935' },
    { name: 'Vijayvani', color: '#FFB300' },

    { name: 'JK Tyre', color: '#FDD835' },
    { name: 'Toyota', color: '#D32F2F' },
    { name: 'Hero MotoCorp', color: '#D32F2F' },
    { name: 'Tata Power Solar', color: '#1976D2' },

    { name: 'HDFC Bank', color: '#1565C0' },
    { name: 'HDFC Ergo', color: '#C62828' },
    { name: 'Reliance Ltd', color: '#0277BD' },

    { name: 'Samsung', color: '#0D47A1' },
    { name: 'Jockey', color: '#D32F2F' },
    { name: 'USV', color: '#00838F' },
    { name: 'KLE Institute', color: '#F57C00' },
    { name: 'Udaya', color: '#FBC02D' },
    { name: 'Mini Sou', color: '#E91E63' },
];

// Group clients into rows of varying lengths
const bentoRows = [
    rosterClients.slice(0, 5),
    rosterClients.slice(5, 9),
    rosterClients.slice(9, 12),
    rosterClients.slice(12, 18),
];

// A pre-defined array of varied flex values to make the grid look "scrambled"
const flexPattern = [1.4, 0.8, 1.2, 0.9, 1.5, 1, 0.75, 1.3];

function BentoGrid() {
    return (
        <section className={styles.bentoSection} id="roster">
            <div className={styles.sectionContainer} style={{ paddingBottom: '40px' }}>
                <div className={styles.sectionHeader}>
                    <motion.span
                        className={styles.sectionLabel}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Constellation
                    </motion.span>
                    <motion.h2
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Brands We&apos;ve Elevated
                    </motion.h2>
                    <motion.p
                        className={styles.sectionSubtitle}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        From government agencies to global brands — we partner with visionaries to craft moments that redefine what&apos;s possible.
                    </motion.p>
                </div>
            </div>

            <div className={styles.bentoWrap}>
                {bentoRows.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.bentoRow}>
                        {row.map((client, i) => {
                            const flexVal = flexPattern[(rowIndex * 7 + i) % flexPattern.length];
                            const initials = client.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                            return (
                                <div
                                    key={client.name + i}
                                    className={styles.bentoCard}
                                    style={{ '--base-flex': flexVal } as React.CSSProperties}
                                >
                                    {/* Brand Box shown by default */}
                                    <div className={styles.bentoLogoWrap}>
                                        <div
                                            className={styles.bentoBrandBox}
                                            style={{ backgroundColor: client.color || '#333' }}
                                        >
                                            <span className={styles.bentoInitials}>{initials}</span>
                                        </div>
                                    </div>

                                    {/* Company name on hover */}
                                    <div className={styles.bentoHoverName}>
                                        <span>{client.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}


/* =============================================
   SECTION 3: TESTIMONIALS — INTERACTIVE SPLIT PANEL
   ============================================= */
function TestimonialsSection() {
    const [active, setActive] = useState(0);

    const t = testimonials[active];
    const progress = ((active + 1) / testimonials.length) * 100;

    return (
        <section className={styles.testiSection}>
            <motion.div
                className={styles.testiInner}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Header row — title left, subtitle right */}
                <div className={styles.testiTopRow}>
                    <div>
                        <motion.span
                            className={styles.sectionLabel}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Voices of Trust
                        </motion.span>
                        <motion.h2
                            className={styles.testiHeaderTitle}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            What They Say
                        </motion.h2>
                    </div>
                    <motion.p
                        className={styles.testiHeaderSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Don&apos;t take our word for it. Hear from the leaders who have experienced
                        the unparalleled SP Events caliber firsthand.
                    </motion.p>
                </div>

                {/* Split panel */}
                <div className={styles.testiSplitPanel}>

                    {/* LEFT: Animated featured quote */}
                    <div className={styles.testiFeatured}>
                        <div className={styles.testiGiantQuote}>&ldquo;</div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className={styles.testiFeaturedContent}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Category tag */}
                                <div className={styles.testiFeaturedTag}>
                                    <div className={styles.testiFeaturedTagDot} />
                                    <span className={styles.testiFeaturedTagLabel}>{t.category}</span>
                                </div>

                                {/* Big quote */}
                                <p className={styles.testiFeaturedText}>
                                    &ldquo;{t.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className={styles.testiFeaturedAuthor}>
                                    <div className={styles.testiFeaturedAvatar}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={t.image} alt={t.name} />
                                    </div>
                                    <div>
                                        <div className={styles.testiFeaturedName}>{t.name}</div>
                                        <div className={styles.testiFeaturedRole}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: Author selector list */}
                    <div className={styles.testiList}>
                        {testimonials.map((item, i) => (
                            <div
                                key={i}
                                className={`${styles.testiListItem} ${active === i ? styles.activeItem : ''}`}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => setActive(i)}
                            >
                                <div className={styles.testiListAvatar}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={styles.testiListInfo}>
                                    <div className={styles.testiListName}>{item.name}</div>
                                    <div className={styles.testiListRole}>{item.role}</div>
                                </div>
                                <div className={styles.testiListArrow}>›</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress indicator */}
                <div className={styles.testiProgress}>
                    <div className={styles.testiProgressBar}>
                        <div
                            className={styles.testiProgressFill}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className={styles.testiProgressCount}>
                        {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </span>
                </div>
            </motion.div>
        </section>
    );
}


/* =============================================
   SECTION 4: ANIMATED STATS
   ============================================= */
function AnimatedStats() {
    return (
        <section className={styles.statsSection}>
            <div className={styles.statsInner}>
                <div className={styles.statsHeader}>
                    <motion.span
                        className={styles.sectionLabel}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Proven Track Record
                    </motion.span>
                    <motion.h2
                        className={styles.statsTitle}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        By The Numbers
                    </motion.h2>
                    <motion.p
                        className={styles.statsSubtitle}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Our numbers tell a story of dedication, immense scale, and an unwavering
                        commitment to excellence across every single project we take on.
                    </motion.p>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, i) => (
                        <StatCounter key={i} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let current = 0;
        const target = stat.value;
        const step = target / (1800 / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={ref}
            className={styles.statItem}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className={styles.statNumber}>{count.toLocaleString()}{stat.suffix}</div>
            <div className={styles.statLabel}>{stat.label}</div>
        </motion.div>
    );
}

/* =============================================
   SECTION 5: IMMERSIVE CTA
   ============================================= */
function ImmersiveCTA() {
    const particles = Array.from({ length: 24 }, (_, i) => ({
        left: `${5 + (i * 4.17) % 90}%`,
        animationDelay: `${(i * 0.37) % 8}s`,
        animationDuration: `${7 + (i * 0.5) % 5}s`,
        size: 3 + (i % 4),
    }));

    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaParticles}>
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className={styles.ctaParticle}
                        style={{
                            left: p.left,
                            bottom: '-20px',
                            width: p.size,
                            height: p.size,
                            animationDelay: p.animationDelay,
                            animationDuration: p.animationDuration,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className={styles.ctaContent}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 className={styles.ctaTitle}>
                    Ready to join<br />the <em>constellation?</em>
                </h2>
                <p className={styles.ctaSubtitle}>
                    Let&apos;s craft something extraordinary together. Your brand deserves nothing less than perfection.
                </p>
                <Link href="/contact" className={styles.ctaBtn}>
                    Start a Conversation <HiArrowRight />
                </Link>
            </motion.div>
        </section>
    );
}

/* =============================================
   MAIN PAGE
   ============================================= */
export default function ClientsPage() {
    return (
        <main className={styles.pageWrap}>
            <SplitTextHero />
            <MarqueeStrip />
            <BentoGrid />
            <TestimonialsSection />
            <AnimatedStats />
            <ImmersiveCTA />
        </main>
    );
}
