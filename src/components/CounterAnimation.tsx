'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate, useMotionValue, useTransform, motion } from 'framer-motion';

interface Props {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function CounterAnimation({
    end,
    duration = 2.5,
    suffix = '',
    prefix = '',
    className,
}: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, end, {
                duration,
                ease: "easeOut",
            });
            return () => controls.stop();
        }
    }, [isInView, end, duration, count]);

    return (
        <motion.span ref={ref} className={className}>
            {rounded}
        </motion.span>
    );
}
