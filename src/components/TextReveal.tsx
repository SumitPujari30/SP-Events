'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
    text: string;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function TextReveal({
    text,
    className,
    delay = 0,
    as: Tag = 'h2',
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const words = text.split(' ');

    return (
        <div ref={ref} style={{ overflow: 'hidden' }}>
            <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
                {words.map((word, i) => (
                    <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                        <motion.span
                            style={{ display: 'inline-block' }}
                            initial={{ y: '110%', opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: delay + i * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </Tag>
        </div>
    );
}
