/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP on client
    const ctx = gsap.context(() => {
      
      // Custom Cursor Mouse Tracking
      const cursorDot = cursorDotRef.current;
      const cursorRing = cursorRingRef.current;

      if (cursorDot && cursorRing) {
        gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
          gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
          gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(`button, a, .glass-panel, .${styles.logoCard}`);
        interactiveElements.forEach((el) => {
          el.addEventListener('mouseenter', () => {
             gsap.to(cursorRing, { scale: 1.8, borderColor: 'rgba(212, 175, 55, 0.8)', backgroundColor: 'rgba(212, 175, 55, 0.08)', duration: 0.3 });
             gsap.to(cursorDot, { scale: 0, duration: 0.3 });
          });
          el.addEventListener('mouseleave', () => {
             gsap.to(cursorRing, { scale: 1, borderColor: 'rgba(212, 175, 55, 0.5)', backgroundColor: 'transparent', duration: 0.3 });
             gsap.to(cursorDot, { scale: 1, duration: 0.3 });
          });
        });

        return () => window.removeEventListener('mousemove', onMouseMove);
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      
      {/* Custom Cursor */}
      <div className={styles.cursorDot} ref={cursorDotRef} />
      <div className={styles.cursorRing} ref={cursorRingRef} />

      {/* 4. TRUSTED BY — THREE ROW MARQUEE */}
      <section className={styles.marqueeSection} style={{ marginTop: '100px' }}>
         <h4 className={styles.marqueeTitle}>Trusted By Industry Leaders</h4>
         <div className={styles.marqueeWrapper}>
           {/* Row 1 — scrolls LEFT */}
           <div className={styles.marqueeRow}>
             <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
               {[...clientsRow1, ...clientsRow1].map((c, i) => (
                 <div key={i} className={styles.logoCard}>
                   <img src={c.logo} alt={c.name} className={styles.logoImg} />
                 </div>
               ))}
             </div>
           </div>
           {/* Row 2 — scrolls RIGHT */}
           <div className={styles.marqueeRow}>
             <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
               {[...clientsRow2, ...clientsRow2].map((c, i) => (
                 <div key={i} className={styles.logoCard}>
                   <img src={c.logo} alt={c.name} className={styles.logoImg} />
                 </div>
               ))}
             </div>
           </div>
           {/* Row 3 — scrolls LEFT */}
           <div className={styles.marqueeRow}>
             <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
               {[...clientsRow3, ...clientsRow3].map((c, i) => (
                 <div key={i} className={styles.logoCard}>
                   <img src={c.logo} alt={c.name} className={styles.logoImg} />
                 </div>
               ))}
             </div>
           </div>
           {/* Gradient fade edges */}
           <div className={styles.fadeMaskLeft} />
           <div className={styles.fadeMaskRight} />
         </div>
      </section>

    </div>
  );
}

// Data Sets
const clientsRow1 = [
   { name: "Samsung", logo: "/assets/clientLogos/samsung.png" },
   { name: "Reliance", logo: "/assets/clientLogos/reliance_logo.png" },
   { name: "Hero", logo: "/assets/clientLogos/hero_logo.svg" },
   { name: "Infosys", logo: "/assets/clientLogos/infosys-logo-png.png" },
   { name: "KLE", logo: "/assets/clientLogos/kle logo.png" },
   { name: "Jockey", logo: "/assets/clientLogos/jockey.png" },
   { name: "ACC", logo: "/assets/clientLogos/acc.webp" },
   { name: "Adani", logo: "/assets/clientLogos/adani.webp" },
   { name: "Corteva", logo: "/assets/clientLogos/corteva.png" },
   { name: "BNI", logo: "/assets/clientLogos/bni.webp" },
   { name: "Coromandal", logo: "/assets/clientLogos/coromandal.png" },
   { name: "IIT Dharwad", logo: "/assets/clientLogos/iit dharwad.png" },
   { name: "TiECon", logo: "/assets/clientLogos/tiecon.png" },
   { name: "Inorbit", logo: "/assets/clientLogos/inorbit.png" },
   { name: "Rotary", logo: "/assets/clientLogos/rotary.webp" },
   { name: "Miniso", logo: "/assets/clientLogos/minisow.webp" },
   { name: "Sultan Gold", logo: "/assets/clientLogos/sultan gold.png" },
];

const clientsRow2 = [
   { name: "Deshpande Foundation", logo: "/assets/clientLogos/Deshpande-foundation-logo.png" },
   { name: "VRL", logo: "/assets/clientLogos/VRLLOGO.svg" },
   { name: "SELCO", logo: "/assets/clientLogos/SELCO_India_logo.svg.png" },
   { name: "Govt of Karnataka", logo: "/assets/clientLogos/govt of karnataka.png" },
   { name: "Gram Vikas", logo: "/assets/clientLogos/gram vikas.png" },
   { name: "Head Held High", logo: "/assets/clientLogos/head held high.png" },
   { name: "Eskay", logo: "/assets/clientLogos/eskay.png" },
   { name: "Crave", logo: "/assets/clientLogos/crave.png" },
   { name: "IIIT Dharwad", logo: "/assets/clientLogos/iiit dharwad.webp" },
   { name: "Deshpande Startups", logo: "/assets/clientLogos/deshpandes_tartups.png" },
   { name: "SDM Dental", logo: "/assets/clientLogos/sdm dental.png" },
   { name: "Hodek", logo: "/assets/clientLogos/hodek.png" },
   { name: "Samyukta Karnataka", logo: "/assets/clientLogos/samyukta karnataka.png" },
   { name: "Hi Fi Studios", logo: "/assets/clientLogos/hi fi studios.png" },
   { name: "Aristo Pharma", logo: "/assets/clientLogos/aristo pharma.png" },
   { name: "Arrow Clothing", logo: "/assets/clientLogos/arrow clothing.png" },
   { name: "Bally Casino", logo: "/assets/clientLogos/bally casino.png" },
];

const clientsRow3 = [
   { name: "3rd Eye", logo: "/assets/clientLogos/3rd eye techno sols.png" },
   { name: "Agamya Cybertech", logo: "/assets/clientLogos/agamya cybertech.png" },
   { name: "B I S", logo: "/assets/clientLogos/b i s.png" },
   { name: "Dharwad Zilla Panchayat", logo: "/assets/clientLogos/dharwad zilla panchayat.png" },
   { name: "Durga Developers", logo: "/assets/clientLogos/durga developers.png" },
   { name: "Make Your Own Perfume", logo: "/assets/clientLogos/make your own perfume.png" },
   { name: "Metabolic Health India", logo: "/assets/clientLogos/metabolic health india.png" },
   { name: "Nagshanti Group", logo: "/assets/clientLogos/nagshanti group.png" },
   { name: "Nain Startup", logo: "/assets/clientLogos/nain startup.png" },
   { name: "RCF", logo: "/assets/clientLogos/rashtriya chemical fertiliers.png" },
   { name: "Shree Rajeshwari", logo: "/assets/clientLogos/shree rajeshwari properties.png" },
   { name: "Sygnets", logo: "/assets/clientLogos/sygnets.webp" },
   { name: "Tejas School", logo: "/assets/clientLogos/tejas international school.png" },
   { name: "Trust Grow", logo: "/assets/clientLogos/trust grow fertilizers.png" },
   { name: "Uni Abex", logo: "/assets/clientLogos/uni abex.png" },
];
