'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiX } from 'react-icons/hi';
import styles from './clients.module.css';
import ClientGrid from '@/components/ClientGrid';
import CounterAnimation from '@/components/CounterAnimation';

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
  'Corporate Events',
  'Political Campaigns',
  'Conferences & Summits',
  'AV Solutions',
  'Luxury Weddings',
  'Music Festivals',
  'Photography & Videography',
  'Private Celebrations',
  'Artist Management',
  'Sports Events',
  'Exhibitions',
  'Brand Launches',
  'Community Events',
  'Event Production',
  'Roadshows',
  'Hospitality Management'
];

const testimonials = [
    {
        name: 'Vikram B Khot',
        role: 'Director, B N Khot International School',
        text: 'I\'ve had the opportunity to work with THE SP EVENTS and Samarth U Patangi on multiple occasions, and every experience has been exceptional. Their professionalism, planning, and flawless execution truly set them apart. Samarth and his team pay great attention to detail and ensure that every event runs smoothly. Their dedication and commitment to delivering high-quality experiences make THE SP EVENTS a highly reliable event management partner.',
        category: 'Education',
    },
    {
        name: 'Rajesh',
        role: 'Marketing Manager, Volvo',
        text: 'Dear Team SP Events A Very Big Shout Out to all of you!!! One of the best event organisers I have come across in Hubli region. Best Event Company to rely on in and around Hubli region. Their coordination and response time was good. They made sure the event was well executed in a short notice. Satisfied by the way the team presented themselves. Definitely looking forward for further projects.',
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
        text: 'Samarth and the SP Events team have delivered an outstanding experience. His professionalism, creativity, and attention to detail make every inaugural event vibrant, grand, and perfectly organized. The way his team transforms a vision into a memorable celebration is truly remarkable. Thank you, Samarth and SP Events, for consistently making our inaugurations elegant and unforgettable.',
        category: 'Retail',
    },
    {
        name: 'Radhika Naikar',
        role: 'Marketing Head, Shri Durga Developers & Promoters',
        text: 'We had a wonderful experience working with THE SP EVENTS. Samarth Sir and his team manage every event with great professionalism, punctuality, and attention to detail. Once the requirements are shared, everything is handled smoothly and stress-free. Their dedication and commitment to delivering perfectly organized events truly stand out.',
        category: 'Real Estate',
    },
    {
        name: 'Satya Srinivasan',
        role: 'Producer, Kannada Film Industry',
        text: 'The SP Events came highly recommended by the hotel where my event was hosted, and from the very first interaction, Samarth made an excellent impression. His professionalism, positive attitude, and commitment to excellence were evident right from the start. He delivered exactly what was promised and even went above and beyond to ensure the entire event was seamless and memorable. What truly sets him apart is his personal involvement — he remained onsite until the very end to ensure everything ran smoothly.',
        category: 'Entertainment',
    },
    {
        name: 'Rakesh Ballary',
        role: 'Co-Managing Director, Shri Rajeshwari Properties',
        text: 'We would like to thank Team The SP Events for the grand launch of Rajeshwari Orion Park Launch event successfully and the experience was excellent. The team executed the entire event with great professionalism. The 40-feet curved LED wall, stage design, and lighting were handled flawlessly. Everything was smooth and highly appreciated by our guests. Highly recommended for quality event management.',
        category: 'Real Estate',
    },
    {
        name: 'Rakshit Kalyani',
        role: 'COO, dhaRti Foundation, IIT Dharwad',
        text: 'We had an outstanding experience working with SP Events for the inauguration of dhaRti BioNEST at IIT Dharwad, a significant event attended by senior government dignitaries including Hon\'ble Ministers. The team demonstrated exceptional professionalism, meticulous planning, and a strong understanding of protocol requirements. Their ability to manage a high-profile institutional event smoothly was truly commendable.',
        category: 'Institutional',
    },
    {
        name: 'Prof. B C Goudar',
        role: 'Founder Trustee & Director, Adarsh PU Science College',
        text: '" The SP EVENTS " is highly professional, reliable and well organised. Beautifully manages events. They have great customizable planning, smooth coordination and very friendly team allowing clients to relax. HIGHLY RECOMMEND.',
        category: 'Education',
    },
    {
        name: 'Siddu Kadakol',
        role: 'Principal, KLE\'s BCA HUBLI',
        text: 'A BIG shoutout to the SP Events team for Amazing work of LED stage setup, lighting, and sound system arranged for ACUMEN 2025 national level IT Fest at our college were absolutely outstanding. The entire setup was flawless and enriched the overall experience. You truly elevated the entire event experience.',
        category: 'Institutional',
    },
    {
        name: 'Smitha Mahesh',
        role: 'Co-Conveyor, Inner Wheel Club Of Hubli West',
        text: 'We were very impressed with the professionalism and creativity of THE SP EVENTS. Samarth and his team handled everything with great attention to detail and made the entire event stress-free for us. Truly a dependable and talented event management team.',
        category: 'Non-Profit',
    },
    {
        name: 'Mahesh Vastrad',
        role: 'Founder & MD, Agamya Cyber Tech',
        text: 'The Agamya team had the opportunity to collaborate with SP Events for our recent tech summit, and the experience was exceptional. Their professionalism and attention to detail were evident across all aspects of the event setup. SP Events demonstrated excellent coordination, timely execution, and a clear understanding of event requirements, making them one of the best service providers we have worked with.',
        category: 'Technology',
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

    const line1 = 'Our';
    const line2 = 'Clients';
    const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.heroSticky}>
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/client_bg.png"
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

                {/* Subtitle revealed after scroll */}
                <motion.div className={styles.heroSubtitle} style={{ opacity: subtitleOpacity }}>
                    <h2>
                        
                    </h2>
                    <p className={styles.heroSubtitleText}>
                        WHO WE WORK WITH
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
    const spreadX = offset * 60; // Reduced for subtle drift
    const spreadY = ((index % 3) - 1) * 30; // Reduced for elite feel
    const rotation = offset * 8;

    const x = useTransform(scrollYProgress, [0.08, 0.55], [0, spreadX]);
    const y = useTransform(scrollYProgress, [0.08, 0.55], [0, spreadY]);
    const rotate = useTransform(scrollYProgress, [0.08, 0.55], [0, rotation]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.65], [1, 0]);

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
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
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

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};


/* =============================================
   SECTION 3: TESTIMONIALS 
   ============================================= */
function TestimonialsSection() {
    const [active, setActive] = useState(0);

    // Auto-cycle logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 7000); // 7 sec delay
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
    const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const t = testimonials[active];

    return (
        <section className={styles.testiSection}>
            <motion.div
                className={styles.testiGlassCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Navigation Arrows inside card edge */}
                <button 
                    onClick={handlePrev} 
                    className={`${styles.testiArrowBtn} ${styles.leftArrow}`}
                    aria-label="Previous testimonial"
                >
                    ‹
                </button>
                <button 
                    onClick={handleNext} 
                    className={`${styles.testiArrowBtn} ${styles.rightArrow}`}
                    aria-label="Next testimonial"
                >
                    ›
                </button>

                <div className={styles.testiContentWrap}>
                    <div className={styles.quoteIconLeft}>&ldquo;</div>
                    <div className={styles.quoteIconRight}>&rdquo;</div>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className={styles.testiQuoteBody}
                            initial={{ opacity: 0, translateY: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, translateY: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                            exit={{ opacity: 0, translateY: -10, filter: 'blur(5px)', transition: { duration: 0.3, ease: 'easeIn' } }}
                        >
                            <p className={styles.testiText}>
                                "{t.text}"
                            </p>
                            <div className={styles.testiAuthorInfo}>
                                <h4 className={styles.testiAuthorName}>{t.name}</h4>
                                <span className={styles.testiAuthorRole}>{t.role}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Dots */}
                <div className={styles.testiDots}>
                    {testimonials.map((_, i) => (
                        <div 
                            key={i} 
                            className={`${styles.testiDot} ${i === active ? styles.activeDot : ''}`} 
                            onClick={() => setActive(i)}
                        />
                    ))}
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
        <></>
    );
}

// /* =============================================
//    SECTION 5: CONTACT CTA
//    ============================================= */
// function ContactCTA() {
//     return (
//         <section className={styles.contactSection}>
//             <motion.div
//                 className={styles.contactInner}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//             >
//                 {/* Top Label */}
//                 <div className={styles.contactHeaderWrap}>
//                     <div className={styles.contactLine} />
//                     <span className={styles.contactLabel}>Let&apos;s Connect</span>
//                     <div className={styles.contactLine} />
//                 </div>

//                 {/* Main Title */}
//                 <h2 className={styles.contactTitle}>
//                     Let&apos;s create<br />
//                     something <em>epic</em><br />
//                     together.
//                 </h2>

//                 {/* Subtitle */}
//                 <p className={styles.contactSubtitle}>
//                     Whether you&apos;re a brand seeking to break through the noise or a visionary who wants to partner on groundbreaking ideas — this is your moment.
//                 </p>

//                 {/* Button Row */}
//                 <div className={styles.contactActionRow}>
//                     <Link href="/contact" className={styles.contactBtn}>
//                         Start a Conversation
//                     </Link>
//                     <div className={styles.contactPhoneWrap}>
//                         <a href="tel:+917411863227" className={styles.contactPhone}>+91 74118 63227</a>
//                         <div className={styles.contactPhoneLine} />
//                     </div>
//                 </div>

//                 {/* Footer Columns */}
//                 <div className={styles.contactFooterGrid}>
//                     <div className={styles.contactFooterCol}>
//                         <span className={styles.contactColHead}>Address</span>
//                         <span className={styles.contactColText}>
//                             Marvel Artiza, Vidya Nagar<br />
//                             Hubli — 580029, Karnataka
//                         </span>
//                     </div>
//                     <div className={styles.contactFooterCol}>
//                         <span className={styles.contactColHead}>Email</span>
//                         <span className={styles.contactColText}>
//                             <a href="mailto:thespevents@gmail.com">thespevents@gmail.com</a>
//                         </span>
//                     </div>
//                     <div className={styles.contactFooterCol}>
//                         <span className={styles.contactColHead}>Website</span>
//                         <span className={styles.contactColText}>
//                             <a href="https://www.thespevents.com" target="_blank" rel="noopener noreferrer">www.thespevents.com</a>
//                         </span>
//                     </div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }

/* =============================================
   MAIN PAGE
   ============================================= */
export default function ClientsPage() {
    return (
        <main className={styles.pageWrap}>
            <SplitTextHero />
            <MarqueeStrip />
            {/* We now pass the TestimonialsSection correctly as children inside the ClientGrid
                so it stays aligned centrally between the two client card halves. */}
            <ClientGrid>
                <TestimonialsSection />
            </ClientGrid>
            <AnimatedStats />
            {/* <ContactCTA /> */}
        </main>
    );
}