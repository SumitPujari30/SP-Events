'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiX } from 'react-icons/hi';
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
        name: 'Vikram B Khot',
        role: 'Director, B N Khot International School',
        text: 'I\'ve had the opportunity to work with THE SP EVENTS and Samarth U Patangi on multiple occasions, and every experience has been exceptional. Their professionalism, planning, and flawless execution truly set them apart. Their dedication and commitment to delivering high-quality experiences make THE SP EVENTS a highly reliable event management partner.',
        category: 'Education',
    },
    {
        name: 'Rajesh',
        role: 'Marketing Manager, Volvo',
        text: 'One of the best event organisers I have come across in Hubli region. Best Event Company to rely on in and around Hubli region. Their coordination and response time was good. They made sure the event was well executed in a short notice. Satisfied by the way the team presented themselves. Definitely looking forward for further projects.',
        category: 'Corporate',
    },
    {
        name: 'Dr Arpitha Pawadshettar',
        role: 'Founder & MD, Dr Arpitha\'s Skin Hair & Aesthetics',
        text: 'I would like to thank Team SP Events for their exceptional support and professionalism. They organize every event with great attention to detail and perfection, and the team is always there to guide and support throughout the entire process.',
        category: 'Healthcare',
    },
    {
        name: 'Abdul Riyaz',
        role: 'Director, Sulthan Diamonds & Gold',
        text: 'Samarth and the SP Events team have delivered an outstanding experience. His professionalism, creativity, and attention to detail make every inaugural event vibrant, grand, and perfectly organized. The way his team transforms a vision into a memorable celebration is truly remarkable.',
        category: 'Retail',
    },
    {
        name: 'Radhika Naikar',
        role: 'Marketing Head, Shri Durga Developers & Promoters',
        text: 'We had a wonderful experience working with THE SP EVENTS. Samarth Sir and his team manage every event with great professionalism, punctuality, and attention to detail. Once the requirements are shared, everything is handled smoothly and stress-free. Their dedication truly stands out.',
        category: 'Real Estate',
    },
    {
        name: 'Satya Srinivasan',
        role: 'Producer, Kannada Film Industry',
        text: 'The SP Events came highly recommended by the hotel where my event was hosted, and from the very first interaction, Samarth made an excellent impression. He delivered exactly what was promised and even went above and beyond. What truly sets him apart is his personal involvement — he remained onsite until the very end.',
        category: 'Entertainment',
    },
    {
        name: 'Rakesh Ballary',
        role: 'Co-Managing Director, Shri Rajeshwari Properties',
        text: 'We would like to thank Team The SP Events for the grand launch event. The team executed the entire event with great professionalism. The 40-feet curved LED wall, stage design, and lighting were handled flawlessly. Everything was smooth and highly appreciated by our guests. Highly recommended.',
        category: 'Real Estate',
    },
    {
        name: 'Rakshit Kalyani',
        role: 'COO, dhaRti Foundation, IIT Dharwad',
        text: 'We had an outstanding experience working with SP Events for the inauguration of dhaRti BioNEST at IIT Dharwad, attended by senior government dignitaries including Hon\'ble Ministers. The team demonstrated exceptional professionalism, meticulous planning, and a strong understanding of protocol requirements. Their ability to manage a high-profile institutional event smoothly was truly commendable.',
        category: 'Institutional',
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
   SECTION 2: ADAPTIVE ASYMMETRIC CLIENT MATRIX
   ============================================= */
import { clientsData, ClientRecord } from '@/lib/clientData';

function ClientMatrix() {
    const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

    // Split clients into 3 rows
    const third = Math.ceil(clientsData.length / 3);
    const row1 = clientsData.slice(0, third);
    const row2 = clientsData.slice(third, third * 2);
    const row3 = clientsData.slice(third * 2);

    return (
        <section className={styles.matrixSection} id="roster">
            <div className={styles.sectionContainer} style={{ paddingBottom: '60px' }}>
                <div className={styles.matrixHeader}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.matrixTitle}>Brands We&apos;ve Engineered Experiences For</h2>
                        <p className={styles.matrixSubtitle}>Trusted by global leaders, innovators and creators.</p>
                    </motion.div>
                </div>
            </div>

            <div className={styles.marqueeWrapper}>
                {/* Row 1 — scrolls LEFT */}
                <div className={styles.marqueeRow}>
                    <div className={`${styles.clientTrack} ${styles.scrollLeft}`}>
                        {[...row1, ...row1].map((client, i) => (
                            <LogoCard key={`r1-${i}`} client={client} onClick={() => setSelectedClient(client)} />
                        ))}
                    </div>
                </div>
                {/* Row 2 — scrolls RIGHT */}
                <div className={styles.marqueeRow}>
                    <div className={`${styles.clientTrack} ${styles.scrollRight}`}>
                        {[...row2, ...row2].map((client, i) => (
                            <LogoCard key={`r2-${i}`} client={client} onClick={() => setSelectedClient(client)} />
                        ))}
                    </div>
                </div>
                {/* Row 3 — scrolls LEFT */}
                <div className={styles.marqueeRow}>
                    <div className={`${styles.clientTrack} ${styles.scrollLeft}`}>
                        {[...row3, ...row3].map((client, i) => (
                            <LogoCard key={`r3-${i}`} client={client} onClick={() => setSelectedClient(client)} />
                        ))}
                    </div>
                </div>
                {/* Gradient fade edges */}
                <div className={styles.fadeMaskLeft} />
                <div className={styles.fadeMaskRight} />
            </div>

            {/* Client Detail Overlay */}
            <AnimatePresence>
                {selectedClient && (
                    <motion.div
                        className={styles.detailOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className={styles.detailBackdrop}
                            onClick={() => setSelectedClient(null)}
                        />
                        <motion.div
                            className={styles.detailCard}
                            initial={{ y: 40, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <button
                                className={styles.detailClose}
                                onClick={() => setSelectedClient(null)}
                            >
                                <HiX />
                            </button>
                            <div className={styles.detailLogoWrap}>
                                {selectedClient.logo ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={`/assets/clientLogos/${selectedClient.logo}`} alt={selectedClient.name} />
                                ) : selectedClient.domain ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={`https://logo.clearbit.com/${selectedClient.domain}`} alt={selectedClient.name} />
                                ) : (
                                    <div className={styles.detailInitials}>
                                        {selectedClient.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h3 className={styles.detailName}>{selectedClient.name}</h3>
                            <div className={styles.detailMeta}>
                                <span className={styles.detailIndustry}>
                                    {/* @ts-ignore - industry may not exist on all clients */}
                                    {selectedClient.industry || 'Client Partner'}
                                </span>
                                {/* {selectedClient.domain && (
                                    <a
                                        href={`https://${selectedClient.domain}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.detailDomain}
                                    >
                                        Visit Website
                                    </a>
                                )} */}
                            </div>
                            <div className={styles.detailDesc}>
                                <p>
                                    {/* @ts-ignore - description may not exist on all clients */}
                                    {selectedClient.description || `A valued partner of SP Events. We are proud to have collaborated with ${selectedClient.name} to engineer extraordinary experiences.`}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function LogoCard({ client, onClick }: { client: ClientRecord; onClick: () => void }) {
    const [logoError, setLogoError] = useState(false);
    const initials = client.name.substring(0, 2).toUpperCase();
    const logoSrc = client.logo
        ? `/assets/clientLogos/${client.logo}`
        : client.domain
            ? `https://logo.clearbit.com/${client.domain}`
            : null;

    return (
        <div 
            className={styles.logoCard} 
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {!logoError && logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={logoSrc}
                    alt={client.name}
                    className={styles.logoCardImg}
                    onError={() => setLogoError(true)}
                    loading="lazy"
                />
            ) : (
                <div className={styles.logoCardFallback}>
                    <span>{initials}</span>
                </div>
            )}
            <span className={styles.logoCardName}>{client.name}</span>
        </div>
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
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                                exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } }}
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
                                    <div className={styles.testiFeaturedInitial}>
                                        {t.name.charAt(0)}
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
                                <div className={styles.testiListInitial}>
                                    {item.name.charAt(0)}
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
            <ClientMatrix />
            <TestimonialsSection />
            <AnimatedStats />
            <ImmersiveCTA />
        </main>
    );
}
