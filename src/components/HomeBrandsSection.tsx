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
            <Image
                src={getImgSrc(brand.logo)}
                alt={brand.name}
                fill
                className={styles.logoImage}
            />
        </div>
    );
}

/**
 * Single horizontal marquee row.
 */
function MarqueeRow({
    list,
    direction,
    duration,
    getImgSrc,
}: {
    list: Brand[];
    direction: 'left' | 'right';
    duration: number;
    getImgSrc: (l?: string) => string;
}) {
    const cards = list.map((brand, i) => (
        <LogoCard key={i} brand={brand} getImgSrc={getImgSrc} />
    ));

    return (
        <div className={styles.marqueeRowWrap}>
            <div
                className={`${styles.marqueeTrack} ${styles[direction]}`}
                style={{
                    '--marquee-duration': `${duration}s`,
                } as React.CSSProperties}
            >
                {/* Original set */}
                <div className={styles.marqueeGroup}>
                    {cards}
                </div>
                {/* Clone for seamless loop */}
                <div className={styles.marqueeGroup} aria-hidden="true">
                    {cards}
                </div>
                {/* Second clone for wider screens if needed */}
                <div className={styles.marqueeGroup} aria-hidden="true">
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default function HomeBrandsSection({ brands }: Props) {
    // Use the first 22 brands to match the "22 logo layout" instruction exactly
    const selectedBrands = React.useMemo(() => brands.slice(0, 22), [brands]);
    
    const rows = React.useMemo(() => [
        selectedBrands.slice(0, 5),      // Row 1: 5 items
        selectedBrands.slice(5, 11),     // Row 2: 6 items
        selectedBrands.slice(11, 17),    // Row 3: 6 items
        selectedBrands.slice(17, 22),    // Row 4: 5 items
    ], [selectedBrands]);

    const getImgSrc = useCallback((logo: string | undefined) => {
        // User requested to use Layout_page.png for all logos
        return '/assets/Layout_page.png';
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Trusted By</h2>
                
                <div className={styles.marqueeContainer}>
                    <MarqueeRow list={rows[0]} direction="left"  duration={30} getImgSrc={getImgSrc} />
                    <MarqueeRow list={rows[1]} direction="right" duration={35} getImgSrc={getImgSrc} />
                    <MarqueeRow list={rows[2]} direction="left"  duration={32} getImgSrc={getImgSrc} />
                    <MarqueeRow list={rows[3]} direction="right" duration={38} getImgSrc={getImgSrc} />
                </div>
            </div>
        </section>
    );
}
