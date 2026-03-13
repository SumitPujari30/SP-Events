'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './DepthCarousel.module.css';

interface DepthCarouselProps {
    images: string[];
    activeIndex: number;
    onChange: (index: number) => void;
}

export default function DepthCarousel({ images, activeIndex, onChange }: DepthCarouselProps) {
    const [direction, setDirection] = useState(0);
    const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleWheel = (e: React.WheelEvent) => {
        if (wheelTimeout.current) return;
        
        // Only trigger carousel on intentional horizontal scrolls
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
            if (e.deltaX > 0) {
                handleNext();
            } else {
                handlePrev();
            }
            wheelTimeout.current = setTimeout(() => {
                wheelTimeout.current = null;
            }, 600);
        }
    };

    const handleNext = () => {
        setDirection(1);
        onChange((activeIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        onChange((activeIndex - 1 + images.length) % images.length);
    };

    const getTransformStyles = (index: number) => {
        // Calculate shortest distance in a circular array
        let diff = index - activeIndex;
        if (diff > images.length / 2) diff -= images.length;
        if (diff < -images.length / 2) diff += images.length;

        const absDiff = Math.abs(diff);

        // Active image
        if (diff === 0) {
            return {
                x: '0%',
                scale: 1,
                rotateY: 0,
                opacity: 10,
                zIndex: 10,
                filter: 'blur(0px)',
            };
        }

        // Side images
        const sign = Math.sign(diff);
        const xOffset = sign * 40 * absDiff;
        const scale = Math.max(0.6, 1 - absDiff * 0.15);
        const rotateY = sign * -25;
        const opacity = Math.max(0, 1 - absDiff * 0.4);
        
        return {
            x: `${xOffset}%`,
            scale,
            rotateY,
            opacity,
            zIndex: 10 - absDiff,
            filter: `blur(${absDiff * 6}px)`,
        };
    };

    return (
        <div className={styles.carouselContainer} onWheel={handleWheel}>
            <div className={styles.scene}>
                <AnimatePresence initial={false} custom={direction}>
                    {images.map((img, idx) => {
                        const style = getTransformStyles(idx);
                        
                        // Only render if opacity > 0 to save DOM nodes
                        if (style.opacity === 0) return null;

                        return (
                            <motion.div
                                key={img}
                                className={styles.card}
                                initial={false}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x + velocity.x;
                                    if (swipe < -200) {
                                        handleNext();
                                    } else if (swipe > 200) {
                                        handlePrev();
                                    }
                                }}
                                animate={{
                                    x: style.x,
                                    scale: style.scale,
                                    rotateY: style.rotateY,
                                    opacity: style.opacity,
                                    zIndex: style.zIndex,
                                    filter: style.filter,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 1,
                                }}
                                onClick={() => {
                                    if (idx !== activeIndex) {
                                        setDirection(idx > activeIndex ? 1 : -1);
                                        onChange(idx);
                                    }
                                }}
                            >
                                <img src={img} alt="Carousel item" className={styles.image} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
                <HiChevronLeft size={50} />
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
                <HiChevronRight size={50} />
            </button>
        </div>
    );
}
