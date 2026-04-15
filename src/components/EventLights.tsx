'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function EventLights() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const minimalGlowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Very slow, minimal horizontal sweep tied to downscroll
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                animation: gsap.timeline()
                    .fromTo(minimalGlowRef.current, 
                        { x: '-20vw', opacity: 0 }, 
                        { x: '100vw', opacity: 0.15, ease: "sine.inOut" }, 
                        0
                    )
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={sectionRef} 
            style={{ 
                position: 'fixed', // Fixed to ensure it glides naturally underneath all sections as you scroll
                top: 0, left: 0, 
                width: '100vw', height: '100vh',
                overflow: 'hidden', 
                pointerEvents: 'none', 
                zIndex: 0 
            }}
        >
            {/* Elegant, minimalist ambient glow */}
            <div 
                ref={minimalGlowRef}
                style={{
                    position: 'absolute',
                    top: '20%', 
                    width: '600px', height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,168,76, 0.4) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    mixBlendMode: 'screen',
                    transform: 'translateY(-50%)',
                    willChange: 'transform, opacity'
                }}
            />
        </div>
    );
}
