'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);
    const cursorX = useSpring(0, { stiffness: 300, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 300, damping: 28 });
    const dotX = useSpring(0, { stiffness: 800, damping: 35 });
    const dotY = useSpring(0, { stiffness: 800, damping: 35 });
    const isTouchDevice = useRef(false);

    useEffect(() => {
        isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice.current) return;

        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const down = () => setClicking(true);
        const up = () => setClicking(false);
        const enter = () => setVisible(true);
        const leave = () => setVisible(false);

        window.addEventListener('mousemove', move);
        window.addEventListener('mousedown', down);
        window.addEventListener('mouseup', up);
        document.addEventListener('mouseenter', enter);
        document.addEventListener('mouseleave', leave);

        // Detect hoverable elements
        const observer = new MutationObserver(() => attachHoverListeners());
        observer.observe(document.body, { childList: true, subtree: true });
        attachHoverListeners();

        function attachHoverListeners() {
            const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
            hoverables.forEach((el) => {
                el.addEventListener('mouseenter', () => setHovering(true));
                el.addEventListener('mouseleave', () => setHovering(false));
            });
        }

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', down);
            window.removeEventListener('mouseup', up);
            document.removeEventListener('mouseenter', enter);
            document.removeEventListener('mouseleave', leave);
            observer.disconnect();
        };
    }, [cursorX, cursorY, dotX, dotY, visible]);

    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className={`${styles.ring} ${hovering ? styles.ringHover : ''} ${clicking ? styles.ringClick : ''}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                    opacity: visible ? 1 : 0,
                }}
            />
            {/* Inner dot */}
            <motion.div
                className={`${styles.dot} ${hovering ? styles.dotHover : ''}`}
                style={{
                    x: dotX,
                    y: dotY,
                    opacity: visible ? 1 : 0,
                }}
            />
        </>
    );
}
