'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/* ── Single word — opacity 0.15 → 1, slight y drift ── */
function Word({
    word,
    range,
    progress,
    color,
    dimColor,
}: {
    word: string;
    range: [number, number];
    progress: MotionValue<number>;
    color: string;
    dimColor: string;
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [8, 0]);
    const colorVal = useTransform(progress, range, [dimColor, color]);

    return (
        <motion.span
            style={{ opacity, y, color: colorVal, display: 'inline-block', marginRight: '0.28em' }}
        >
            {word}
        </motion.span>
    );
}

interface Props {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
    /** Fully-revealed colour */
    color?: string;
    /** Dim/unrevealed colour */
    dimColor?: string;
}

/**
 * ScrollRevealText
 * Mirrors the pattern from tantra-replica/SectionRevealText:
 *   - offset: ['start 0.9', 'start 0.3']  → reveal as element enters viewport
 *   - each word gets its own slice of [0 … 1]
 *   - opacity 0.15 → 1 + y 8px → 0 per word
 */
export default function ScrollRevealText({
    text,
    className,
    style,
    as: Tag = 'p',
    color = '#ffffff',
    dimColor = 'rgba(255,255,255,0.18)',
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.25'],
    });

    const words = text.split(' ');

    return (
        <div ref={ref}>
            <Tag
                className={className}
                style={{ ...style, display: 'flex', flexWrap: 'wrap', lineHeight: 'inherit' }}
            >
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (
                        <Word
                            key={i}
                            word={word}
                            range={[start, end]}
                            progress={scrollYProgress}
                            color={color}
                            dimColor={dimColor}
                        />
                    );
                })}
            </Tag>
        </div>
    );
}
