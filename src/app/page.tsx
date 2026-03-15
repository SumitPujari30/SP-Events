/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLImageElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  
  // Custom Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP on client
    const ctx = gsap.context(() => {
      
      // 1. Cinematic GTA VI Style Hero Scroll Pin & Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        }
      });

      // Initially state: Huge, slightly tilted, transparent
      gsap.set(heroLogoRef.current, { scale: 5, opacity: 0, y: 300, rotationX: 45 });
      gsap.set(heroSubRef.current, { opacity: 0, y: 50 });

      // Phase 1: Logo zooms in dramatically from massive to normal
      tl.to(heroLogoRef.current, 
        { scale: 1, opacity: 1, y: 0, rotationX: 0, duration: 2, ease: 'power3.out' }
      )
      .to(heroSubRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
      // Phase 2: Logo shrinks and flies upward to navbar position
      .to(heroLogoRef.current, {
        scale: 0.18,
        y: -(window.innerHeight * 0.42),
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, '+=0.3')
      .to(heroSubRef.current, { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, '<');

      // 1.5 Cinematic 3D Screen Reveal
      const cinemaWrapper = document.querySelector(`.${styles.cinemaWrapper}`);
      const cinemaSection = document.querySelector(`.${styles.cinemaSection}`);
      if (cinemaWrapper && cinemaSection) {
        gsap.fromTo(cinemaWrapper, 
          { 
            rotationX: 30, 
            scale: 0.85, 
            y: 200, 
            opacity: 0,
            boxShadow: '0 0 10px rgba(0,0,0,1)'
          },
          { 
            rotationX: 0, 
            scale: 1, 
            y: 0, 
            opacity: 1,
            boxShadow: '0 0 120px rgba(58, 1, 92, 0.4), 0 0 60px rgba(212, 175, 55, 0.15)',
            ease: "none",
            scrollTrigger: {
              trigger: cinemaSection,
              start: "top 95%",
              end: "center center",
              scrub: 1.5
            }
          }
        );
      }

      // 2. Vision Text Reveal — split word animation feel
      const visionText = document.querySelector(`.${styles.visionText}`);
      const visionDesc = document.querySelector(`.${styles.visionDesc}`);
      if (visionText) {
        gsap.fromTo(visionText,
          { opacity: 0, y: 120, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out',
            scrollTrigger: {
              trigger: `.${styles.visionSection}`,
              start: 'top 70%',
            }
          }
        );
      }
      if (visionDesc) {
        gsap.fromTo(visionDesc,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: visionDesc,
              start: 'top 85%',
            }
          }
        );
      }

      // Stats Counter Animation
      const statNumbers = gsap.utils.toArray(`.${styles.statNumber}`);
      statNumbers.forEach((elem: any) => {
        const target = parseInt(elem.getAttribute('data-count') || '0');
        const suffix = elem.getAttribute('data-suffix') || '';
        gsap.fromTo(elem, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
            },
            onUpdate: function() {
              elem.textContent = Math.round(this.targets()[0].innerText) + suffix;
            }
          }
        );
      });

      // 3. Staggered Expertise List Reveal
      const expertiseItems = gsap.utils.toArray(`.${styles.expertiseItem}`);
      expertiseItems.forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 88%',
            }
          }
        );
      });

      // 4. Fade Up animations for ESG Section
      const esgElements = gsap.utils.toArray(`.${styles.esgSection} .fade-up`);
      esgElements.forEach((elem: any) => {
        gsap.fromTo(elem, 
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

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
        const interactiveElements = document.querySelectorAll(`button, a, .glass-panel, .${styles.expertiseItem}, .${styles.cinemaMedia}`);
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

      {/* Immersive Video Background */}
      <div className={styles.bgVideoContainer}>
         <video 
           autoPlay 
           loop 
           muted 
           playsInline 
           className={styles.bgVideo}
           poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
         >
           <source src="https://cdn.coverr.co/videos/coverr-concert-crowd-in-vibrant-lighting-7982/1080p.mp4" type="video/mp4" />
         </video>
         <div className={styles.bgOverlay} />
      </div>
      
      {/* 1. HERO SECTION */}
      <section ref={heroSectionRef} className={`hero-section ${styles.hero}`}>
        <div className={styles.heroContent}>
           <img 
             ref={heroLogoRef} 
             src="/assets/GOLD N ORANGE.png" 
             alt="SP Events Logo" 
             className={styles.heroLogoImage} 
           />
           <p ref={heroSubRef} className={styles.heroSubtitle}>
             creating magical experiences
           </p>
        </div>
      </section>

      {/* Spacer needed because of the pinned hero */}
      <div style={{ height: '50vh' }}></div>

      {/* 1.5 CINEMA SCREEN SECTION */}
      <section className={styles.cinemaSection}>
        <div className={styles.cinemaWrapper}>
          <div className={styles.cinemaOverlay} />
          <div className={styles.cinemaScreen}>
             <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" className={styles.cinemaMedia} alt="Event 1" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" className={styles.cinemaMedia} alt="Event 2" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" className={styles.cinemaMedia} alt="Event 3" />
             </div>
             
             <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
                <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80" className={styles.cinemaMedia} alt="Event 4" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '4px', gridColumn: 'span 2' }}>
                <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80" className={styles.cinemaMedia} alt="Event 5" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. VISION SECTION */}
      <section className={styles.visionSection}>
        <div className="container">
           <h2 className={styles.visionText}>
             We Create <span className={styles.visionHighlight}>Elevated</span>, Unforgettable, Purposeful Brand Experiences.
           </h2>
           <p className={styles.visionDesc}>
             At SP Events, visionary ideas turn into reality with a blend of elite creativity, relentless excellence, and razor-sharp execution. We never shy away from going the extra mile to nail every detail.
           </p>
        </div>
      </section>

      {/* STATS COUNTER SECTION */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statNumber} data-count={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR EXPERTISE SECTION */}
      <section className={styles.expertiseSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our <span className="gradient-text">Expertise</span></h2>
            <p className={styles.sectionSubtitle}>Decades of combined experience. Limitless imagination.</p>
          </div>
          
          <div className={styles.expertiseGrid}>
             {expertiseList.map((item, i) => (
                <div key={i} className={styles.expertiseItem}>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                     <span className={styles.expertiseNum}>0{i + 1}</span>
                     <h3 className={styles.expertiseTitle}>{item}</h3>
                   </div>
                   <span className={styles.expertiseArrow}>→</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. TRUSTED BY — THREE ROW MARQUEE */}
      <section className={styles.marqueeSection}>
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

      {/* 5. ESG SECTION */}
      <section className={styles.esgSection}>
         <div className={`container ${styles.esgContent}`}>
            <div className={`fade-up ${styles.esgBadge}`}>Sustainability Focus</div>
            <h2 className={`fade-up ${styles.esgTitle}`}>Transforming Corporate Events To Go <span className="gradient-text">Net Zero</span></h2>
            <p className={`fade-up ${styles.esgDesc}`}>
               Riding the global wave for climate action, we've flipped the script on event management. Our fresh ESG approach centers on sustainability planning, guiding partners in understanding, measuring, and offsetting carbon footprints.
            </p>
            <button className={`fade-up ${styles.btnPrimary}`}>Greenify Your Event</button>
         </div>
      </section>

    </div>
  );
}

// Data Sets
const stats = [
  { value: 500, suffix: '+', label: 'Events Delivered' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 200, suffix: '+', label: 'Brands Served' },
  { value: 50, suffix: 'K+', label: 'Attendees Hosted' },
];

const expertiseList = [
   "Exhibition & Experiential",
   "Govt. & Institutional",
   "Awards & Launches",
   "Virtual Events",
   "Summits & Conclaves",
   "Corporate Social Responsibility",
   "Brand Activations",
   "Media & Influencer Events",
];

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
