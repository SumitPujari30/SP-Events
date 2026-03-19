'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
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

    const sectionRef = useRef<HTMLDivElement>(null);

    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    const col1 = React.useMemo(() => brands.slice(0, 15), [brands]);
    const col2 = React.useMemo(() => brands.slice(15, 30), [brands]);
    const col3 = React.useMemo(() => brands.slice(30, 45), [brands]);

    const getImgSrc = (logo: string | undefined) => {
        if (!logo) return '';
        return logo.startsWith('http') || logo.startsWith('/')
            ? logo
            : `/assets/clientLogos/${logo}`;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const createInfiniteLoop = (
                el: HTMLDivElement | null,
                duration = 30,
                direction: 'up' | 'down' = 'up'
            ) => {
                if (!el) return;

                let tween: gsap.core.Tween | null = null;
                let lastHeight = 0;

                const initTween = () => {
                    const currentHeight = el.scrollHeight;
                    if (currentHeight <= 0 || currentHeight === lastHeight) return;
                    lastHeight = currentHeight;

                    if (tween) tween.kill();
                    
                    if (direction === 'up') {
                        tween = gsap.fromTo(
                            el,
                            { yPercent: 0 },
                            {
                                yPercent: -50,
                                duration,
                                ease: 'none',
                                repeat: -1,
                            }
                        );
                    } else {
                        tween = gsap.fromTo(
                            el,
                            { yPercent: -50 },
                            {
                                yPercent: 0,
                                duration,
                                ease: 'none',
                                repeat: -1,
                            }
                        );
                    }
                };

                const observer = new ResizeObserver(() => {
                    initTween();
                });
                observer.observe(el);

                el.addEventListener('mouseenter', () => {
                    if (tween) gsap.to(tween, { timeScale: 0, duration: 0.4 });
                });

                el.addEventListener('mouseleave', () => {
                    if (tween) gsap.to(tween, { timeScale: 1, duration: 0.4 });
                });

                return () => {
                    observer.disconnect();
                    if (tween) tween.kill();
                };
            };

            const cleanup1 = createInfiniteLoop(col1Ref.current, 28, 'up');
            const cleanup2 = createInfiniteLoop(col2Ref.current, 34, 'down');
            const cleanup3 = createInfiniteLoop(col3Ref.current, 30, 'up');

            return () => {
                cleanup1?.();
                cleanup2?.();
                cleanup3?.();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, [brands]); // Add brands to dependencies to ensure correct slices are used if they change

    const Column = ({
        list,
        innerRef
    }: {
        list: Brand[],
        innerRef: React.RefObject<HTMLDivElement | null>
    }) => (
        <div className={styles.carouselLogosWrap}>
            <div className={styles.carouselLogosCol} ref={innerRef}>
                {list.concat(list).map((brand, i) => (
                    <div key={i} className={styles.logoItem}>
                        <Image
                            src={getImgSrc(brand.logo)}
                            alt={brand.name}
                            fill
                            className={styles.logoImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className={styles.section} ref={sectionRef}>
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
                            <Column list={col1} innerRef={col1Ref} />
                            <Column list={col2} innerRef={col2Ref} />
                            <Column list={col3} innerRef={col3Ref} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}