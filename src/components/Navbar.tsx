'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/clients', label: 'CLIENTS' },
    { href: '/careers', label: 'CAREER' },
    { href: '/services', label: 'SERVICES' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        // On non-homepage routes, show navbar immediately
        if (!isHomePage) {
            setVisible(true);
            return;
        }
        // On homepage, start hidden
        setVisible(false);
    }, [isHomePage]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // On homepage: show navbar only after the SP zoom completes (~2.4x viewport)
            if (isHomePage) {
                setVisible(currentY > viewportHeight * 2.4);
            }

            setScrolled(currentY > 30);
            setHidden(currentY > lastScrollY && currentY > 300 && visible);
            setLastScrollY(currentY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isHomePage, visible]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* === Floating White Island Navbar === */}
            <motion.header
                className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''} ${!visible ? styles.invisible : ''}`}
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: hidden ? -120 : 0, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
                <div className={styles.inner}>
                    {/* Left Links */}
                    <div className={styles.leftLinks}>
                        {navLinks.slice(0, 3).map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Center Logo */}
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/assets/GOLD N ORANGE.png"
                            alt="SP Events"
                            width={160}
                            height={55}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>

                    {/* Right Links */}
                    <div className={styles.rightLinks}>
                        {navLinks.slice(3).map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* CTA Button */}
                        <Link href="/contact" className={styles.ctaBtn}>
                            Let&apos;s Talk
                            <span className={styles.ctaArrow}>&rarr;</span>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
                    </button>
                </div>
            </motion.header>

            {/* === Mobile Fullscreen Menu === */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.mobileInner}>
                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.05 + i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href="/contact"
                                    className={styles.mobileCta}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Let&apos;s Talk &rarr;
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
