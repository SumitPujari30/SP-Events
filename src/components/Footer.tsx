'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import styles from './Footer.module.css';
import AnimatedSection from './AnimatedSection';

const quickLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/clients', label: 'CLIENT' },
    { href: '/contact', label: 'CONNECT' },
    { href: '/careers', label: 'CAREERS' },
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
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/the-sp-events/', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@TheSPEvents', label: 'YouTube' },
];

export default function Footer() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    // The curtain stays stuck to the viewport as user scrolls, revealing the footer
    const curtainY = useTransform(scrollYProgress, [0.15, 1], ['0%', '-100%']);

    return (
        <div ref={sectionRef} className={styles.footerCurtainWrap}>
            <div className={styles.revealedFooterContent}>
                <footer className={styles.footer}>
                    {/* Background Video */}
                    <div className={styles.videoContainer}>
                        <video
                            className={styles.bgVideo}
                            src="https://mnafgrlvsjuhbjenwwcg.supabase.co/storage/v1/object/public/services/VN20260405_180925.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className={styles.videoOverlay} />
                    </div>

                    <div className={styles.glowTop} />
            <div className="container">
                <AnimatedSection>
                    <div className={styles.grid}>
                        {/* Brand Column */}
                        <motion.div 
                            className={styles.brand}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className={styles.logoWrap}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Image 
                                        src="/assets/sp_logo.png" 
                                        alt="SP Events Logo" 
                                        width={250} 
                                        height={110} 
                                        className={styles.footerLogo}
                                        priority
                                    />
                                </motion.div>
                            </div>
                            <div className={styles.divider} />
                            <div className={styles.tagline}>
                                How we create experiences<br />
                                Is how we build trust<br />
                                With <span>precision, passion & perfection</span>
                            </div>
                            <div className={styles.socials}>
                                {socials.map((s, i) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        className={styles.socialIcon}
                                        aria-label={s.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <s.icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div 
                            className={styles.column}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                        >
                            <h4 className={styles.columnTitle}>Quick Links</h4>
                            <ul className={styles.linkList}>
                                {quickLinks.map((link, i) => (
                                    <motion.li 
                                        key={link.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                        <Link href={link.href} className={styles.footerLink}>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div 
                            className={styles.column}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                        >
                            <h4 className={styles.columnTitle}>Services</h4>
                            <ul className={styles.linkList}>
                                {servicesList.map((s, i) => (
                                    <motion.li 
                                        key={s.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                    >
                                        <Link href={s.href} className={styles.footerLink}>
                                            {s.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div 
                            className={styles.column}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                        >
                            <h4 className={styles.columnTitle}>
                                <Link href="/contact" className={styles.headerLink}>
                                    Get In Touch
                                </Link>
                            </h4>
                            <ul className={styles.contactList}>
                                <motion.li 
                                    className={styles.contactItem}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                >
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
                                <motion.li 
                                    className={styles.contactItem}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <HiPhone className={styles.contactIcon} />
                                    <a href="tel:+917411863227" className={styles.contactLink}>
                                        +91 74118 63227
                                    </a>
                                </motion.li>
                                <motion.li 
                                    className={styles.contactItem}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                >
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
                    <p className={styles.copyright}>
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
