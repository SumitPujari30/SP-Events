'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

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
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current || !ref.current) return;
        hasAnimated.current = true;

        const node = ref.current;

        const controls = animate(0, end, {
            duration,
            ease: "easeOut",
            onUpdate(value) {
                if (node) {
                    node.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
                }
            },
        });

        return () => controls.stop();
    }, [isInView, end, duration, prefix, suffix]);

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
