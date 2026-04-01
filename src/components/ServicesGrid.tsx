import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ServicesGrid.module.css';

export interface ServiceCategory {
    id: string;
    title: string;
    image: string;
}

interface ServicesGridProps {
    categories: ServiceCategory[];
    onCategoryClick?: (index: number) => void;
}

export default function ServicesGrid({ categories, onCategoryClick }: ServicesGridProps) {
    return (
        <div className={styles.gridContainer}>
            {categories.map((category, index) => (
                <motion.div
                    key={category.id}
                    className={styles.gridBox}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => onCategoryClick && onCategoryClick(index)}
                >
                    <img src={category.image} alt={category.title} className={styles.gridImage} />
                    <div className={styles.overlayTextContainer}>
                        <h3 className={styles.overlayTitle}>{category.title}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
