'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './FlipLogoCard.module.css';

export interface ClientLogo {
    name: string;
    logo: string;
}

interface Props {
    frontClient: ClientLogo;
    backClient: ClientLogo;
    isFlipped: boolean;
}

export default function FlipLogoCard({ frontClient, backClient, isFlipped }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Helper for safe image paths
    const getImgSrc = (logo: string | undefined) => {
        if (!logo) return '';
        return logo.startsWith('http') || logo.startsWith('/') 
            ? logo 
            : `/assets/clientLogos/${logo}`;
    };

    return (
        <motion.div 
            className={styles.cardContainer}
            ref={cardRef}
            whileHover={{ scale: 1.03 }} /* Very subtle luxury scale */
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            tabIndex={0}
        >
            <motion.div
                className={styles.cardInner}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }} // Slower, elegant flip
            >
                {/* FRONT FACE (Discovery Brand A) */}
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className={styles.imageWrapper}>
                        {frontClient.logo ? (
                            <Image
                                src={getImgSrc(frontClient.logo)}
                                alt={frontClient.name}
                                fill
                                className={styles.logoImage}
                            />
                        ) : (
                            <div className={styles.fallbackLogo}>{frontClient.name.substring(0, 2)}</div>
                        )}
                    </div>
                </div>

                {/* BACK FACE (Discovery Brand B) */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.imageWrapper}>
                        {backClient.logo ? (
                            <Image
                                src={getImgSrc(backClient.logo)}
                                alt={backClient.name}
                                fill
                                className={`${styles.logoImage} ${styles.backLogoPatch}`}
                            />
                        ) : (
                            <div className={styles.fallbackLogoBack}>{backClient.name.substring(0, 2)}</div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
