'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './TestimonialSection.module.css';

interface Props {
    quote: string;
    name: string;
    role: string;
    avatar: string;
    bgImage: string;
}

export default function TestimonialSection({ quote, name, role, avatar, bgImage }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const cardY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
    const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section ref={ref} className={styles.section}>
            {/* Blurred event background */}
            <motion.div
                className={styles.bg}
                style={{
                    backgroundImage: `url(${bgImage})`,
                    y: bgParallax,
                }}
            />
            <div className={styles.bgBlur} />
            <div className={styles.bgOverlay} />

            {/* Floating glass card */}
            <motion.div className={styles.card} style={{ y: cardY }}>
                <div className={styles.quoteIcon}>&ldquo;</div>

                <motion.p
                    className={styles.quote}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    {quote}
                </motion.p>

                <motion.div
                    className={styles.author}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt={name} className={styles.avatar} />
                    <div>
                        <div className={styles.authorName}>{name}</div>
                        <div className={styles.authorRole}>{role}</div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
