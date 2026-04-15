'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ParallaxGraphics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only register and run GSAP logic on the client
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Slow parallax elements - minimal movement
      gsap.utils.toArray('.parallax-slow').forEach((el: any) => {
        gsap.to(el, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      });

      // Medium parallax elements - significant movement and slight rotation
      gsap.utils.toArray('.parallax-med').forEach((el: any) => {
        gsap.to(el, {
          y: -350,
          rotation: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      });

      // Fast parallax elements - large sweeping movement and rotation
      gsap.utils.toArray('.parallax-fast').forEach((el: any) => {
        gsap.to(el, {
          y: -600,
          rotation: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      
      {/* ── Crosses ── */}
      <svg className="parallax-med" style={{ position: 'absolute', top: '15%', left: '8%' }} width="24" height="24" viewBox="0 0 24 24" fill="none" opacity="0.3">
        <path d="M12 0v24M0 12h24" stroke="#C9A84C" strokeWidth="1"/>
      </svg>
      <svg className="parallax-slow" style={{ position: 'absolute', top: '65%', right: '12%' }} width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.2">
        <path d="M16 0v32M0 16h32" stroke="#fff" strokeWidth="1"/>
      </svg>
      <svg className="parallax-fast" style={{ position: 'absolute', top: '110%', left: '20%' }} width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.4">
        <path d="M8 0v16M0 8h16" stroke="#C9A84C" strokeWidth="1"/>
      </svg>

      {/* ── Hollow Rings ── */}
      <svg className="parallax-fast" style={{ position: 'absolute', top: '40%', right: '20%' }} width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.15">
        <circle cx="20" cy="20" r="19" stroke="#C9A84C" strokeWidth="1"/>
        <circle cx="20" cy="20" r="4" fill="#C9A84C"/>
      </svg>
      <svg className="parallax-slow" style={{ position: 'absolute', top: '85%', left: '15%' }} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.08">
        <circle cx="30" cy="30" r="29" stroke="#fff" strokeWidth="1"/>
      </svg>

      {/* ── Dot Clusters Removed per request ── */}

      {/* ── Geometric Diamonds ── */}
      <svg className="parallax-fast" style={{ position: 'absolute', top: '75%', right: '40%' }} width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.3">
        <rect x="0.5" y="0.5" width="15" height="15" stroke="#C9A84C" strokeWidth="1" transform="rotate(45 8 8)"/>
      </svg>
      <svg className="parallax-med" style={{ position: 'absolute', top: '130%', left: '80%' }} width="12" height="12" viewBox="0 0 12 12" fill="none" opacity="0.2">
        <rect x="0.5" y="0.5" width="11" height="11" fill="#fff" transform="rotate(45 6 6)"/>
      </svg>
    </div>
  );
}
