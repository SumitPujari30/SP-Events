'use client';

import React, { useCallback, useMemo } from 'react';
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
                            width={180} // Increased from 140 for larger impact
                            height={120} // Increased from 80 for larger impact
                            className={styles.logoImage}
                            priority={i < 15}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomeBrandsSection({ brands }: Props) {
    // Divide brands into 3 columns for vertical marquee
    const columns = useMemo(() => {
        const brandsPerCol = Math.ceil(brands.length / 3);
        return [
            brands.slice(0, brandsPerCol),
            brands.slice(brandsPerCol, brandsPerCol * 2),
            brands.slice(brandsPerCol * 2),
        ];
    }, [brands]);

    const getImgSrc = useCallback((logo: string | undefined) => {
        if (!logo) return '/assets/Layout_page.png';
        return `/assets/webp_client/${logo}`;
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                
                {/* ▬▬▬ LEFT: BOLD TITLE (Refined for uniqueness) ▬▬▬ */}
                <div className={styles.titleSide}>
                    <h2 className={styles.mainTitle}>
                        <span className={styles.titleWhite}>OUR PARTNERS IN</span>
                        <span className={styles.titleAccent}>EXCELLENCE:</span>
                        <span className={styles.titleWhite}>TRANSCENDING</span>
                        <span className={styles.titleWhite}>BOUNDARIES TO</span>
                        <span className={styles.titleAccent}>DELIVER MAGICAL</span>
                        <span className={styles.titleWhite}>EXPERIENCES.</span>
                    </h2>
                </div>

                {/* ▬▬▬ RIGHT: MULTI-COLUMN VERTICAL MARQUEE ▬▬▬ */}
                <div className={styles.marqueeSide}>
                    <VerticalMarqueeColumn 
                        list={columns[0]} 
                        duration={35} // Slightly faster given higher volume
                        getImgSrc={getImgSrc} 
                    />
                    <VerticalMarqueeColumn 
                        list={columns[1]} 
                        duration={50} 
                        reverse 
                        getImgSrc={getImgSrc} 
                    />
                    <VerticalMarqueeColumn 
                        list={columns[2]} 
                        duration={45} 
                        getImgSrc={getImgSrc} 
                    />
                </div>

            </div>
        </section>
    );
}
