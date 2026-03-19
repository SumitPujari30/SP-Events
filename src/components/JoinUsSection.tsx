'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './JoinUsSection.module.css';

export default function JoinUsSection() {
  return (
    <section className={styles.section}>
      <Link href="/contact" className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join us</h2>
          <p className={styles.text}>
            People are at the center of everything we do. If you're looking for a dynamic opportunity for creativity and growth – we should talk.
          </p>
          <div className={styles.button}>MORE</div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            // Generic high-quality corporate team photo acting as placeholder
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="The SP Events Team"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className={styles.image}
          />
        </div>
      </Link>
    </section>
  );
}
