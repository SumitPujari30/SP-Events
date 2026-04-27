'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './CustomCursor.module.css';

interface Particle {
    x: number;
    y: number;
    size: number;
    alpha: number;
    decay: number;
    vx: number;
    vy: number;
    color: string;
}

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const particles = useRef<Particle[]>([]);
    const rafId = useRef<number>(0);
    const isHovering = useRef(false);
    const lastSpawn = useRef({ x: 0, y: 0 });

    const spawnParticles = useCallback((x: number, y: number) => {
        const dx = x - lastSpawn.current.x;
        const dy = y - lastSpawn.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 6) return; // throttle: only spawn if moved enough

        lastSpawn.current = { x, y };

        const count = Math.min(Math.floor(dist / 8), 3);
        const colors = ['#c9a84c', '#dfc06e', '#a88a32', '#f0ece4'];

        for (let i = 0; i < count; i++) {
            particles.current.push({
                x: x + (Math.random() - 0.5) * 12,
                y: y + (Math.random() - 0.5) * 12,
                size: Math.random() * 3 + 1.5,
                alpha: Math.random() * 0.6 + 0.4,
                decay: Math.random() * 0.015 + 0.012,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!canvas || !ring || !dot) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Mouse move
        const onMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            spawnParticles(e.clientX, e.clientY);
        };

        // Global Hover Delegation (Safe for Next.js routing)
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovered element or any of its parents is a clickable element
            const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
            
            if (isClickable) {
                isHovering.current = true;
                ring.classList.add(styles.ringHover);
                dot.classList.add(styles.dotHover);
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
            
            if (isClickable) {
                isHovering.current = false;
                ring.classList.remove(styles.ringHover);
                dot.classList.remove(styles.dotHover);
            }
        };

        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        // Click
        const onDown = () => ring.classList.add(styles.ringClick);
        const onUp = () => ring.classList.remove(styles.ringClick);
        const onLeave = () => { ring.style.opacity = '0'; dot.style.opacity = '0'; };
        const onEnter = () => { ring.style.opacity = '1'; dot.style.opacity = '1'; };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ring follow (lerp)
            ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.15;
            ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

            // Draw & update particles
            const alive: Particle[] = [];
            for (const p of particles.current) {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;
                p.size *= 0.985;

                if (p.alpha > 0.01 && p.size > 0.3) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                    alive.push(p);
                }
            }
            ctx.globalAlpha = 1;
            particles.current = alive;

            rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [spawnParticles]);

    // Don't render on touch devices (SSR-safe check)
    return (
        <>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div ref={ringRef} className={styles.ring} />
            <div ref={dotRef} className={styles.dot} />
        </>
    );
}
