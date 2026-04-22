'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import styles from './Footer.module.css';
import AnimatedSection from './AnimatedSection';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/clients', label: 'Clients' },
    { href: '/contact', label: 'Connect' },
    { href: '/careers', label: 'Careers' },
];

const servicesList = [
    { label: 'Corporate Events', href: '/services#v=events&c=0' },
    { label: 'Special Events', href: '/services#v=events&c=1' },
    { label: 'Launch Events', href: '/services#v=events&c=2' },
    { label: 'Music Events', href: '/services#v=events&c=3' },
    { label: 'Sports Events', href: '/services#v=events&c=4' },
    { label: 'Wedding Events', href: '/services#v=events&c=5' },
];

const socials = [
    { icon: FaInstagram, href: 'https://www.instagram.com/the_sp_events/', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://wa.me/917411863227', label: 'WhatsApp' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@TheSPEvents', label: 'YouTube' },
];

export default function Footer() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    // The curtain stays stuck to the viewport as user scrolls, revealing the footer
    const curtainY = useTransform(scrollYProgress, [0.15, 1], ['0%', '-100%']);

    // Ensure the background video autoplays on mount and after hard refresh
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => {
                console.warn('Footer video autoplay failed:', err);
            });
        }
    }, []);

    return (
        <div ref={sectionRef} className={styles.footerCurtainWrap}>
            <div className={styles.revealedFooterContent}>
                <footer className={styles.footer}>
                    {/* Background Video */}
                    <div className={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            className={styles.bgVideo}
                            src="https://mnafgrlvsjuhbjenwwcg.supabase.co/storage/v1/object/public/services/VN20260405_180925.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            crossOrigin="anonymous"
                            style={{ opacity: 0.9 }}
                        />
                        <div className={styles.videoOverlay} />
                    </div>

                    <div className={styles.glowTop} />
            <div className="container">
                <AnimatedSection>
                    <div className={styles.grid}>
                        {/* Brand Column */}
                        <motion.div className={styles.brand}>
                            <div className={styles.logoWrap}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Image 
                                        src="/assets/sp_logo.png" 
                                        alt="SP Events Logo" 
                                        width={300} 
                                        height={132} 
                                        className={styles.footerLogo}
                                        priority
                                    />
                                </motion.div>
                            </div>
                           

                            <div className={styles.socials}>
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        className={styles.socialIcon}
                                        aria-label={s.label}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <s.icon size={22} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div className={styles.column}>
                            <h4 className={styles.columnTitle}>Quick Links</h4>
                            <ul className={styles.linkList}>
                                {quickLinks.map((link, i) => (
                                    <motion.li key={link.href}>
                                        <Link href={link.href} className={styles.footerLink}>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div className={styles.column}>
                            <h4 className={styles.columnTitle}>Services</h4>
                            <ul className={styles.linkList}>
                                {servicesList.map((s, i) => (
                                    <motion.li key={s.href}>
                                        <Link href={s.href} className={styles.footerLink}>
                                            {s.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div className={styles.column}>
                            <h4 className={styles.columnTitle}>
                                <Link href="/contact" className={styles.headerLink}>
                                    Get In Touch
                                </Link>
                            </h4>
                            <ul className={styles.contactList}>
                                <motion.li className={styles.contactItem}>
                                    <HiLocationMarker className={styles.contactIcon} />
                                    <a 
                                        href="https://maps.app.goo.gl/hp1zdTG3crNiHLLD9" 
                                        target="_blank" 
                                rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        Marvel Artiza, Vidya Nagar<br/>Hubli &mdash; 580029, Karnataka
                                    </a>
                                </motion.li>
                                <motion.li className={styles.contactItem}>
                                    <HiPhone className={styles.contactIcon} />
                                    <a href="tel:+917411863227" className={styles.contactLink}>
                                        +91 74118 63227
                                    </a>
                                </motion.li>
                                <motion.li className={styles.contactItem}>
                                    <HiMail className={styles.contactIcon} />
                                    <a href="mailto:thespevents@gmail.com" className={styles.contactLink}>
                                        thespevents@gmail.com
                                    </a>
                                </motion.li>
                            </ul>
                        </motion.div>
                    </div>
                </AnimatedSection>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright} >
                        &copy; {new Date().getFullYear()} The SP Events. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
        </div>
        
        {/* The black curtain that slides up */}
        <motion.div className={styles.curtain} style={{ y: curtainY }}>
            <span className={styles.curtainLabel}>The SP Events</span>
        </motion.div>
    </div>
    );
}
