'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
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

const menuImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";

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
                    {/* Logo */}
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

                    {/* Hamburger Button */}
                    <motion.button
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                        suppressHydrationWarning
                    >
                        <HiMenuAlt3 size={32} />
                    </motion.button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.menuOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Interactive Background */}
                        <div className={styles.menuBackground}>
                            <MenuVisual />
                        </div>

                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsOpen(false)}
                        >
                            <HiX size={40} />
                        </button>

                        <div className={styles.overlayContent}>
                            {/* Left Side: Empty container to keep the layout balanced if needed */}
                            <div className={styles.overlayLeft}>
                            </div>

                            {/* Right Side: Links */}
                            <div className={styles.overlayRight}>
                                <nav className={styles.navLinks}>
                                    {navLinks.map((link, i) => (
                                        <div key={link.href} className={styles.linkContainer}>
                                            <motion.div
                                                initial={{ y: "100%" }}
                                                animate={{ y: 0 }}
                                                transition={{ 
                                                    delay: 0.4 + i * 0.08,
                                                    duration: 0.8,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={styles.link}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <motion.span
                                                        whileHover={{ x: -4, color: '#d4af37' }}
                                                        transition={{ 
                                                            type: "spring", 
                                                            stiffness: 400, 
                                                            damping: 30 
                                                        }}
                                                        style={{ display: 'inline-block' }}
                                                    >
                                                        {link.label}
                                                    </motion.span>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    ))}
                                </nav>

                                {/* Social Icons */}
                                <div className={styles.socialIcons}>
                                    <a href="#" className={styles.socialIcon}><FaInstagram /></a>
                                    <a href="#" className={styles.socialIcon}><FaYoutube /></a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
