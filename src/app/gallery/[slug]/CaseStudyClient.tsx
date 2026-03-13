'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import type { GalleryEvent } from '@/lib/galleryData';
import { events as allEvents } from '@/lib/galleryData';
import CaseHeroSlider from '@/components/case/CaseHeroSlider';
import EventStats from '@/components/case/EventStats';
import MasonryGallery from '@/components/case/MasonryGallery';
import TestimonialSection from '@/components/case/TestimonialSection';
import NextEventsStrip from '@/components/case/NextEventsStrip';
import styles from './case.module.css';

interface Props { event: GalleryEvent; }

function CaseCTA({ title }: { title: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
    const curtainY = useTransform(scrollYProgress, [0.3, 1], ['0%', '-100%']);

    return (
        <div ref={ref} className={styles.ctaSection}>
            <div className={styles.ctaBg} />
            <motion.div
                className={styles.ctaContent}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={styles.ctaLabel}>Ready to Begin?</span>
                <h2 className={styles.ctaTitle}>
                    Let&apos;s engineer your<br />
                    <em>next experience.</em>
                </h2>
                <p className={styles.ctaSub}>
                    Every event like <em>{title}</em> starts with a single conversation.
                </p>
                <Link href="/contact" className={styles.ctaBtn}>
                    Start a Conversation <HiArrowRight />
                </Link>
            </motion.div>
            <motion.div className={styles.curtain} style={{ y: curtainY }}>
                <span className={styles.curtainLabel}>— End of Case Study —</span>
            </motion.div>
        </div>
    );
}

export default function CaseStudyClient({ event }: Props) {
    const otherEvents = allEvents.filter(e => e.slug !== event.slug);

    return (
        <main className={styles.pageWrap}>
            {/* Back link */}
            <div className={styles.backBar}>
                <Link href="/gallery" className={styles.backLink}>
                    <HiArrowLeft size={16} />
                    Gallery
                </Link>
            </div>

            {/* Section 4 — Fullscreen hero slider */}
            <CaseHeroSlider
                images={event.heroImages}
                title={event.title}
                category={event.category}
            />

            {/* Section 5 — Event intelligence + stats */}
            <EventStats
                description={event.description}
                client={event.client}
                location={event.location}
                summary={event.summary}
                stats={event.stats}
            />

            {/* Section 7 — Masonry gallery */}
            <MasonryGallery images={event.gallery} />

            {/* Section 8 — Testimonial */}
            <TestimonialSection
                quote={event.testimonial.quote}
                name={event.testimonial.name}
                role={event.testimonial.role}
                avatar={event.testimonial.avatar}
                bgImage={event.heroImages[0]}
            />

            {/* Section 9 — Next events strip */}
            <NextEventsStrip events={otherEvents.slice(0, 4)} />

            {/* Section 10 — CTA curtain */}
            <CaseCTA title={event.title} />
        </main>
    );
}
