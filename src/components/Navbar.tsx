'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import MenuVisual from './MenuVisual';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/clients', label: 'CLIENT' },
    { href: '/contact', label: 'CONNECT' },
    { href: '/careers', label: 'CAREERS' },
];

//const menuImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lastScrollY.current = window.scrollY;
        }

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Set scrolled style threshold
            setScrolled(currentScrollY > 30);

            // Auto-hide logic based on direction
            if (currentScrollY <= 50) {
                // Always show at the very top
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                // Scrolling down
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                setIsVisible(true);
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <motion.header
                className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className={styles.inner}>
                    {/* Logo — always top left */}
                    <Link href="/" className={styles.logoLink} aria-label="SP Events Home">
                        <Image
                            src="/assets/sp_logo.png"
                            alt="SP Events"
                            width={500}
                            height={68}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>

                    {/* Hamburger Button — always right */}
                    <motion.button
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                        suppressHydrationWarning
                    >
                        <HiMenuAlt3 size={28} />
                    </motion.button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.menuOverlay}
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* ── DEDICATED BLUR LAYER ── */}
                        <div className={styles.blurLayer} />

                        {/* Interactive Background */}
                        <div className={styles.menuBackground}>
                            <MenuVisual />
                        </div>

                        {/* ── Top Bar ── */}
                        <div className={styles.overlayTopBar}>
                            {/* Logo top-left */}
                            <Link href="/" onClick={() => setIsOpen(false)} className={styles.overlayLogoLink}>
                                <Image
                                    src="/assets/sp_logo.png"
                                    alt="SP Events"
                                    width={400}
                                    height={80}
                                    className={styles.overlayLogo}
                                    priority
                                />
                            </Link>

                            {/* Close button top-right */}
                            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                                <HiX size={30} />
                            </button>
                        </div>

                        {/* ── CENTER: Nav Links ── */}
                        <nav className={styles.centeredNav}>
                            {navLinks.map((link, i) => (
                                <div key={link.href} className={styles.linkContainer}>
                                    <motion.div
                                        initial={{ y: '110%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: '110%', opacity: 0 }}
                                        transition={{
                                            delay: 0.3 + i * 0.07,
                                            duration: 0.75,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`${styles.link} ${pathname === link.href ? styles.activeLink : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <motion.span
                                                whileHover={{ x: 8, color: '#d4af37' }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                style={{ display: 'inline-block' }}
                                            >
                                                {link.label}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </nav>

                        {/* ── Bottom Bar ── */}
                        <div className={styles.overlayBottomBar}>
                            <div className={styles.socialIcons}>
                                <a href="https://wa.me/917411863227" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaWhatsapp /></a>
                                <a href="https://www.instagram.com/the_sp_events" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaInstagram /></a>
                                <a href="https://www.facebook.com/profile.php?id=61579506142509" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaFacebookF /></a>
                                <a href="https://www.youtube.com/@TheSPEvents" target="_blank" rel="noreferrer" className={styles.socialIcon}><FaYoutube /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
