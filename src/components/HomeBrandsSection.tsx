'use client';

import React from 'react';
import styles from './HomeBrandsSection.module.css';

export default function HomeBrandsSection() {
    // Create 24 layout boxes for the grid
    const layoutBoxes = Array.from({ length: 24 }, (_, i) => i + 1);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.mainTitle}>Trusted Partnerships</h2>
                    <h3 className={styles.subTitle}>Our Clientele</h3>
                    <p className={styles.description}>
                        Brands that trust us to architect their their most important moments
                    </p>
                </div>
                
                <div className={styles.gridContainer}>
                    {layoutBoxes.map((box) => (
                        <div key={box} className={styles.layoutBox}>
                            <span className={styles.layoutText}>Layout</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
