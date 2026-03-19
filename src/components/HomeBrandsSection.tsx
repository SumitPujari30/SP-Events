'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HomeBrandsSection.module.css';

interface Brand {
    name: string;
    logo: string;
}

interface Props {
    brands: Brand[];
}

export default function HomeBrandsSection({ brands }: Props) {

    const third = Math.ceil(brands.length / 3);
    const col1 = React.useMemo(() => brands.slice(0, third), [brands, third]);
    const col2 = React.useMemo(() => brands.slice(third, third * 2), [brands, third]);
    const col3 = React.useMemo(() => brands.slice(third * 2), [brands, third]);

    const getImgSrc = (logo: string | undefined) => {
        if (!logo) return '';
        return logo.startsWith('http') || logo.startsWith('/')
            ? logo
            : `/assets/clientLogos/${logo}`;
    };

    const Column = ({
        list,
        direction,
        duration
    }: {
        list: Brand[],
        direction: 'up' | 'down',
        duration: number
    }) => (
        <div className={styles.carouselLogosWrap}>
            <div 
                className={`${styles.carouselLogosCol} ${styles[direction]}`}
                style={{ animationDuration: `${duration}s` }}
            >
                {/* We render exactly 2 identical lists side-by-side to create a seamless infinite loop */}
                {[...Array(2)].map((_, groupIndex) => (
                    <div key={groupIndex} className={styles.marqueeGroup}>
                        {list.map((brand, i) => (
                            <div key={`${groupIndex}-${i}`} className={styles.logoItem}>
                                <Image
                                    src={getImgSrc(brand.logo)}
                                    alt={brand.name === "Govt of Karnataka" ? "GOK" : brand.name} // minor accessibility text fallback optimization
                                    fill
                                    className={styles.logoImage}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

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
                            <Column list={col1} direction="up" duration={28} />
                            <Column list={col2} direction="down" duration={34} />
                            <Column list={col3} direction="up" duration={30} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}