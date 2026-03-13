'use client';

import { motion } from 'framer-motion';
import styles from './CategoryRail.module.css';

interface CategoryRailProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export default function CategoryRail({ categories, activeCategory, onSelect }: CategoryRailProps) {
    return (
        <div className={styles.railWrapper}>
            <div className={styles.railInner}>
                {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            className={`${styles.categoryBtn} ${isActive ? styles.active : ''}`}
                            onClick={() => onSelect(cat)}
                        >
                            <span className={styles.label}>{cat}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="category-underline"
                                    className={styles.underline}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
