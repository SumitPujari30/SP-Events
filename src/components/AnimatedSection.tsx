'use client';

import { motion, type Variants } from 'framer-motion';

type Variant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'fade';

interface Props {
    children: React.ReactNode;
    variant?: Variant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
    style?: React.CSSProperties;
}

const variants: Record<Variant, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

export default function AnimatedSection({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.7,
    className,
    once = true,
    amount = 0.2,
    style,
}: Props) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
