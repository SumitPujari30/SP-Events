'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { HiMenuAlt3, HiX, HiArrowRight } from 'react-icons/hi';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home', index: '01' },
    { href: '/about', label: 'About', index: '02' },
    { href: '/gallery', label: 'Gallery', index: '03' },
    { href: '/clients', label: 'Clients', index: '04' },
    { href: '/careers', label: 'Career', index: '05' },
    { href: '/services', label: 'Services', index: '06' },
];

/* ——— Magnetic link button ——— */
function MagneticLink({
    href, label, index: idx, isActive,
}: {
    href: string; label: string; index: string; isActive: boolean;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    function onMove(e: React.MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        x.set(dx * 6);
        y.set(dy * 6);
    }

    function onLeave() { x.set(0); y.set(0); }

    return (
        <motion.a
            ref={ref}
            href={href}
            className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            style={{ x, y }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <span className={styles.navLinkIndex}>{idx}</span>
            <span className={styles.navLinkLabel}>{label}</span>
            {isActive && (
                <motion.div
                    className={styles.activeBar}
                    layoutId="navActiveBar"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
        </motion.a>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);
    const lastScrollY = useRef(0);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Scroll progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    useEffect(() => {
        if (!isHomePage) { setVisible(true); return; }
        setVisible(false);
    }, [isHomePage]);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            // The hero animation pins for 150% of the viewport height (window.innerHeight * 1.5).
            // We want the Navbar to appear exactly when the logo finishes its animation and settles.
            if (isHomePage) setVisible(y > window.innerHeight * 1.0);
            
            setScrolled(y > 30);
            
            // Hide the navbar when scrolling down, show when scrolling up
            if (y > lastScrollY.current && y > 300 && visible) {
                setHidden(true);
            } else if (y < lastScrollY.current) {
                setHidden(false);
            }
            lastScrollY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHomePage, visible]);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* ——— Floating Island Navbar ——— */}
            <motion.header
                className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!visible ? styles.invisible : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: hidden ? -100 : 0,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
                {/* Thin gold scroll progress bar */}
                {!isHomePage && (
                    <motion.div
                        className={styles.progressBar}
                        style={{ scaleX, transformOrigin: '0%' }}
                    />
                )}

                <div className={styles.inner}>
                    {/* Left nav */}
                    <nav className={styles.leftLinks} aria-label="Primary navigation left">
                        {navLinks.slice(0, 3).map((link) => (
                            <MagneticLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                index={link.index}
                                isActive={pathname === link.href}
                            />
                        ))}
                    </nav>

                    {/* Center logo */}
                    <Link href="/" className={styles.logoLink} aria-label="SP Events Home">
                        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                            <Image
                                src="/assets/GOLD N ORANGE.png"
                                alt="SP Events"
                                width={160}
                                height={55}
                                className={styles.logoImage}
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Right nav */}
                    <nav className={styles.rightLinks} aria-label="Primary navigation right">
                        {navLinks.slice(3).map((link) => (
                            <MagneticLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                index={link.index}
                                isActive={pathname === link.href}
                            />
                        ))}

                        {/* CTA */}
                        <motion.a
                            href="/contact"
                            className={styles.ctaBtn}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            Let&apos;s Talk
                            <motion.span
                                className={styles.ctaArrow}
                                animate={{ x: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </nav>

                    {/* Mobile hamburger */}
                    <motion.button
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle mobile menu"
                        whileTap={{ scale: 0.92 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.header>

            {/* ——— Mobile Fullscreen Menu ——— */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Background gradient blob */}
                        <motion.div
                            className={styles.mobileBlob}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        <div className={styles.mobileInner}>
                            {/* Logo at top */}
                            <motion.div
                                className={styles.mobileLogo}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.05 }}
                            >
                                <Image
                                    src="/assets/GOLD N ORANGE.png"
                                    alt="SP Events"
                                    width={140}
                                    height={48}
                                    className={styles.mobileLogoImg}
                                />
                            </motion.div>

                            {/* Nav links */}
                            <nav className={styles.mobileNav}>
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{
                                                delay: 0.08 + i * 0.06,
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 24,
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span className={styles.mobileLinkIndex}>{link.index}</span>
                                                <span className={styles.mobileLinkText}>{link.label}</span>
                                                <span className={styles.mobileLinkArrow}>→</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* CTA + tagline */}
                            <motion.div
                                className={styles.mobileFooter}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className={styles.mobileTagline}>
                                    Crafting experiences,<br />not just events.
                                </p>
                                <Link
                                    href="/contact"
                                    className={styles.mobileCta}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Let&apos;s Talk
                                    <HiArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
