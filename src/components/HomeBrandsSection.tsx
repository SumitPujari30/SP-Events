'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './HomeBrandsSection.module.css';

interface Brand {
    name: string;
    logo?: string;
}

interface Props {
    brands: Brand[];
}

/**
 * Renders a single logo card.
 */
function LogoCard({ brand, getImgSrc }: { brand: Brand; getImgSrc: (l?: string) => string }) {
    return (
        <div className={styles.logoItem}>
            {brand.logo ? (
                <Image
                    src={getImgSrc(brand.logo)}
                    alt={brand.name}
                    fill
                    className={styles.logoImage}
                />
            ) : (
                <div className={styles.logoFallback}>{brand.name}</div>
            )}
        </div>
    );
}

/**
 * Single marquee column.
 * Renders THREE identical groups (clones) so the CSS animation
 * can shift by exactly one group-height → seamless infinite loop.
 *
 * We measure the first group's pixel height with a ResizeObserver
 * and feed it as `--group-h` to the CSS animation.
 */
function MarqueeColumn({
    list,
    direction,
    duration,
    getImgSrc,
}: {
    list: Brand[];
    direction: 'up' | 'down';
    duration: number;
    getImgSrc: (l?: string) => string;
}) {
    const groupRef = useRef<HTMLDivElement>(null);
    const [groupHeight, setGroupHeight] = useState(0);

    // Measure the first marquee-group's rendered height.
    // ResizeObserver catches font-load shifts and image lazy-load reflows too.
    useEffect(() => {
        const el = groupRef.current;
        if (!el) return;

        const measure = () => {
            const h = el.getBoundingClientRect().height;
            if (h > 0) setGroupHeight(h);
        };

        // Initial measurement
        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);

        // Also remeasure after images settle
        const timer = setTimeout(measure, 1500);

        return () => {
            ro.disconnect();
            clearTimeout(timer);
        };
    }, [list]);

    const cards = list.map((brand, i) => (
        <LogoCard key={i} brand={brand} getImgSrc={getImgSrc} />
    ));

    return (
        <div className={styles.carouselLogosWrap}>
            <div
                className={`${styles.marqueeTrack} ${styles[direction]}`}
                style={{
                    '--marquee-duration': `${duration}s`,
                    '--group-h': `${groupHeight}px`,
                } as React.CSSProperties}
            >
                {/* Group 0 — the one we measure */}
                <div ref={groupRef} className={styles.marqueeGroup}>
                    {cards}
                </div>
                {/* Group 1 — clone */}
                <div className={styles.marqueeGroup} aria-hidden="true">
                    {cards}
                </div>
                {/* Group 2 — clone */}
                <div className={styles.marqueeGroup} aria-hidden="true">
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default function HomeBrandsSection({ brands }: Props) {
    const third = Math.ceil(brands.length / 3);
    const col1 = React.useMemo(() => brands.slice(0, third), [brands, third]);
    const col2 = React.useMemo(() => brands.slice(third, third * 2), [brands, third]);
    const col3 = React.useMemo(() => brands.slice(third * 2), [brands, third]);

    const getImgSrc = useCallback((logo: string | undefined) => {
        if (!logo) return '';
        return logo.startsWith('http') || logo.startsWith('/')
            ? logo
            : `/assets/clientLogos/${logo}`;
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.textSide}>
                        <h2 className={styles.mainTitle}>
                            <span className={styles.brandName}>SP EVENTS</span> IS THE <br />
                            <span className={styles.highlight}>WORLD&apos;S LEADING</span> <br />
                            STRATEGIC EXPERIENCE <br />
                            MARKETING AGENCY
                        </h2>
                    </div>

                    <div className={styles.logoSide}>
                        <div className={styles.marqueeContainer}>
                            <MarqueeColumn list={col1} direction="up"   duration={45} getImgSrc={getImgSrc} />
                            <MarqueeColumn list={col2} direction="down" duration={55} getImgSrc={getImgSrc} />
                            <MarqueeColumn list={col3} direction="up"   duration={50} getImgSrc={getImgSrc} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
