'use client';

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomeBrandsSection.module.css';

interface Brand {
    name: string;
    logo?: string;
}

interface Props {
    brands?: Brand[]; // Optional, as we now fetch dynamically
}

/**
 * Vertical Marquee column.
 */
function VerticalMarqueeColumn({
    list,
    duration,
    reverse,
    getImgSrc
}: {
    list: Brand[];
    duration: number;
    reverse?: boolean;
    getImgSrc: (l?: string) => string;
}) {
    // Double the list for seamless vertical looping
    const doubleList = useMemo(() => [...list, ...list], [list]);

    return (
        <div className={styles.marqueeColumn}>
            <div
                className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ''}`}
                style={{ '--duration': `${duration}s` } as React.CSSProperties}
            >
                {doubleList.map((brand, i) => (
                    <div key={i} className={styles.logoItem}>
                        <Image
                            src={getImgSrc(brand.logo)}
                            alt={brand.name}
                            width={320} // Massive scaling
                            height={200} // Massive scaling
                            className={styles.logoImage}
                            priority={i < 15}
                            unoptimized={true} // Bypasses Next.js image cache for edited backgrounds
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomeBrandsSection({ brands: initialBrands }: Props) {
    const [brands, setBrands] = useState<Brand[]>(initialBrands || []);

    useEffect(() => {
        // Fetch dynamic logos from our new API
        const fetchLogos = async () => {
            try {
                const response = await fetch('/api/logos');
                if (!response.ok) throw new Error('Failed to fetch logos');
                const data = await response.json();
                
                // Randomly shuffle the brands as requested
                const shuffled = [...data.brands].sort(() => Math.random() - 0.5);
                setBrands(shuffled);
            } catch (error) {
                console.error('Error loading dynamic logos:', error);
                // Fallback to initialBrands if provided
                if (initialBrands) setBrands(initialBrands);
            }
        };

        fetchLogos();
    }, [initialBrands]);

    // Divide brands into 3 columns for vertical marquee
    const columns = useMemo(() => {
        if (brands.length === 0) return [[], [], []];
        const brandsPerCol = Math.ceil(brands.length / 3);
        return [
            brands.slice(0, brandsPerCol),
            brands.slice(brandsPerCol, brandsPerCol * 2),
            brands.slice(brandsPerCol * 2),
        ];
    }, [brands]);

    const getImgSrc = useCallback((logo: string | undefined) => {
        if (!logo) return '/assets/client_transparent_images/Infosys.png';
        return `/assets/client_transparent_images/${encodeURIComponent(logo)}`;
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* ▬▬▬ LEFT: BOLD TITLE (Refined for uniqueness) ▬▬▬ */}
                <div className={styles.titleSide}>
                    <div className={styles.headerGroup}>
                        <h3 className={styles.preTitle}>Trusted By</h3>
                        <div className={styles.underline} />
                    </div>

                    <h2 className={styles.mainTitle}>
                        <span className={styles.titleAccent}>OUR PARTNERS IN</span>
                        <span className={styles.titleAccent}>EXCELLENCE <span style={{ color: "white" }}>:</span></span>
                        <span className={styles.titleWhite}>TRANSCENDING</span>
                        <span className={styles.titleWhite}>BOUNDARIES TO</span>
                        <span className={styles.titleWhite}>DELIVER MAGICAL</span>
                        <span className={styles.titleWhite}>EXPERIENCES.</span>
                    </h2>

                    <div className={styles.subtextContainer}>
                        <p className={styles.subtext}>DRIVEN BY INNOVATION · DEFINED BY EXCELLENCE</p>
                    </div>
                </div>

                {/* ▬▬▬ RIGHT: MULTI-COLUMN VERTICAL MARQUEE ▬▬▬ */}
                <div className={styles.marqueeSide}>
                    {columns[0].length > 0 && (
                        <VerticalMarqueeColumn
                            list={columns[0]}
                            duration={35} // Slightly faster given higher volume
                            getImgSrc={getImgSrc}
                        />
                    )}
                    {columns[1].length > 0 && (
                        <VerticalMarqueeColumn
                            list={columns[1]}
                            duration={50}
                            reverse
                            getImgSrc={getImgSrc}
                        />
                    )}
                    {columns[2].length > 0 && (
                        <VerticalMarqueeColumn
                            list={columns[2]}
                            duration={45}
                            getImgSrc={getImgSrc}
                        />
                    )}
                </div>

            </div>
        </section>
    );
}

