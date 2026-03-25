'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './JoinUsSection.module.css';

export default function JoinUsSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // ─── 3D Tilt Logic ──────────────────────────────────────────
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized rotation values (-0.5 to 0.5)
    const cardX = (e.clientX - rect.left) / rect.width;
    const cardY = (e.clientY - rect.top) / rect.height;
    
    x.set(cardX - 0.5);
    y.set(cardY - 0.5);

    // Set absolute mouse position for the glow effect
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          ref={cardRef}
          className={styles.card}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Dynamic Glow Effect */}
          <motion.div 
            className={styles.glow}
            style={{
              left: mouseX,
              top: mouseY,
            }}
          />

          <Link href="/contact" className={styles.cardLink}>
            {/* Left Side: Content */}
            <div className={styles.content} style={{ transform: "translateZ(50px)" }}>
              <motion.h2 className={styles.title}>
                Join <span className={styles.accent}>us</span>
              </motion.h2>
              <p className={styles.text}>
                People are at the center of everything we do. If you're looking for a dynamic opportunity for creativity and growth – we should talk.
              </p>
              <div className={styles.buttonWrapper}>
                <motion.span 
                  className={styles.button}
                  whileHover={{ scale: 1.1, x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  MORE
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </div>
            </div>

            {/* Right Side: Image Section */}
            <div className={styles.imageSection} style={{ transform: "translateZ(30px)" }}>
              <div className={styles.imageLabelWrap}>
                <span className={styles.imageLabel}>Team Work Layout</span>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/assets/Layout_page.png"
                  alt="The SP Events Team"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.image}
                  priority
                />
              </div>
              {/* Subtle glass reflection overlay */}
              <div className={styles.glassOverlay} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
