/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { HiOutlineCalendar, HiOutlineTicket, HiOutlineUserGroup, HiOutlineChartBar, HiLocationMarker } from 'react-icons/hi';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLImageElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP on client
    const ctx = gsap.context(() => {
      
      // 1. Cinematic GTA VI Style Hero Scroll Pin & Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=150%', // Pin for 1.5x screen height to ensure settling feel
          scrub: 1,
          pin: true,
        }
      });

      // Initially state: Huge, slightly tilted, transparent
      gsap.set(heroLogoRef.current, { scale: 5, opacity: 0, y: 300, rotationX: 45 });
      gsap.set(heroSubRef.current, { opacity: 0, y: 50 });
      gsap.set(ctaRef.current, { opacity: 0, y: 50 });

      // Animate in strongly
      tl.to(heroLogoRef.current, 
        { scale: 1, opacity: 1, y: 0, rotationX: 0, duration: 2, ease: 'power3.out' }
      )
      .to(heroSubRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=1')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.8');

      // 1.5 Cinematic 3D Screen Reveal (Standalone ScrollTrigger)
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
            boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 60px rgba(201, 168, 76, 0.4)',
            ease: "none",
            scrollTrigger: {
              trigger: cinemaSection,
              start: "top 95%",  // Start animating just as it enters from the bottom
              end: "center center", // Finish rotating when it reaches the center
              scrub: 1.5 // Smooth scrubbing
            }
          }
        );
      }

      // 2. Fade Up animations for all section headers and cards
      const fadeElements = gsap.utils.toArray('.fade-up');
      fadeElements.forEach((elem: any) => {
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

      // 3. Staggered feature cards
      const featureSection = document.querySelector(`.${styles.featuresGrid}`);
      if (featureSection) {
        gsap.fromTo(featureSection.children, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: featureSection, start: 'top 80%' }
          }
        );
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
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
             Plan, organize, and manage unforgettable events with one powerful platform.
           </p>
           <div ref={ctaRef} className={styles.heroCta}>
             <button className={styles.btnPrimary}>Create Event</button>
             <button className={styles.btnOutline}>Explore Features</button>
           </div>
        </div>
      </section>

      {/* Spacer needed because of the pinned hero */}
      <div style={{ height: '50vh' }}></div>

      {/* 1.5 CINEMA SCREEN SECTION */}
      <section className={styles.cinemaSection}>
        <div className={styles.cinemaWrapper}>
          <div className={styles.cinemaOverlay} />
          <div className={styles.cinemaScreen}>
             {/* Built-in Media Grid Placeholder */}
             <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" className={styles.cinemaMedia} alt="Event 1" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" className={styles.cinemaMedia} alt="Event 2" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" className={styles.cinemaMedia} alt="Event 3" />
             </div>
             
             <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80" className={styles.cinemaMedia} alt="Event 4" />
             </div>
             <div style={{ overflow: 'hidden', borderRadius: '8px', gridColumn: 'span 2' }}>
                <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80" className={styles.cinemaMedia} alt="Event 5" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className={`${styles.section} container`}>
        <div className={`fade-up ${styles.sectionHeader}`}>
          <h2 className={styles.sectionTitle}>
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className={styles.sectionSubtitle}>Everything you need to orchestrate the perfect event, seamlessly integrated into one platform.</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
             <div key={i} className={`glass-panel ${styles.featureCard}`}>
               <div className={styles.featureIcon}>{feature.icon}</div>
               <h3>{feature.title}</h3>
               <p>{feature.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className={`${styles.section} container`}>
        <div className={`fade-up ${styles.sectionHeader}`}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>A simplified workflow designed for maximum efficiency.</p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, i) => (
            <div key={i} className={`fade-up glass-panel ${styles.stepRow}`}>
              <div className={styles.stepNum}>0{i+1}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className={`${styles.section} container`}>
        <div className={`fade-up ${styles.sectionHeader}`}>
          <h2 className={styles.sectionTitle}>What Our <span className="gradient-text">Clients Say</span></h2>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((test, i) => (
            <div key={i} className={`fade-up glass-panel ${styles.testimonialCard}`}>
              <p className={styles.quote}>"{test.quote}"</p>
              <div className={styles.author}>
                <img src={test.img} alt={test.author} className={styles.authorImg} />
                <div className={styles.authorInfo}>
                  <h4>{test.author}</h4>
                  <p>{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL-TO-ACTION SECTION */}
      <section className={`fade-up ${styles.ctaSection}`}>
        <h2>Ready to <span className="gradient-text">Make Magic?</span></h2>
        <p>Join thousands of event organizers creating world-class experiences.</p>
        <button className={styles.btnPrimary} style={{ transform: 'scale(1.2)' }}>Get Started For Free</button>
      </section>

    </div>
  );
}

// Data Sets
const features = [
  { icon: <HiOutlineCalendar />, title: 'Event Scheduling', desc: 'Effortlessly plan and schedule dates, sessions, and multi-day events with our intuitive calendar interface.' },
  { icon: <HiOutlineTicket />, title: 'Ticket Management', desc: 'Custom ticketing tiers, discount codes, and seamless checkout integrations for higher conversions.' },
  { icon: <HiOutlineUserGroup />, title: 'Attendee Tracking', desc: 'Real-time check-ins, automated badge printing, and live attendee engagement metrics.' },
  { icon: <HiOutlineChartBar />, title: 'Real-time Analytics', desc: 'Comprehensive dashboards breaking down sales, demographics, and engagement live.' },
];

const steps = [
  { title: 'Create Your Event', desc: 'Set up your landing page, configure tickets, and design your schedule using our sleek builder.' },
  { title: 'Manage Attendees', desc: 'Send invites, process payments, and track RSVPs instantly through the unified dashboard.' },
  { title: 'Run the Show', desc: 'Use our mobile app to scan tickets, manage capacity, and ensure a flawless execution.' },
];

const testimonials = [
  { quote: "SP Events completely transformed how we run our annual conference. The 3D ticket visualizer alone boosted our premium sales by 40%.", author: "Sarah Jenkins", role: "VP of Operations at TechFlow", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { quote: "Flawless execution. The attendee tracking feature gave us insights we never thought possible. Highly recommended for large scale events.", author: "James Doeherty", role: "Event Director at LiveNation", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { quote: "The interface is stunning. It feels like software from the future. Our team loves using it, and our attendees appreciate the smooth checkout.", author: "Emily Chen", role: "Founder of CreativeMornings", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];
