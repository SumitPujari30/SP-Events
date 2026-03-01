'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

interface Props {
    title: string;
    category: string;
    image: string;
    index?: number;
}

export default function ProjectCard({ title, category, image, index = 0 }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 12);
        setRotateY(-(x - centerX) / 12);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={styles.card}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
            }}
        >
            <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className={styles.overlay}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.viewBtn}>View Project</div>
            </div>
            <div className={styles.shine} />
        </motion.div>
    );
}
