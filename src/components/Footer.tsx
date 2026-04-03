'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import styles from './Footer.module.css';
import AnimatedSection from './AnimatedSection';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/our-work', label: 'Our Work' },
    { href: '/clients', label: 'Clients' },
    { href: '/contact', label: 'Connect' },
];

const servicesList = [
    'Corporate Events',
    'Music Festivals',
    'Cultural Programs',
    'Product Launches',
    'Award Ceremonies',
    'Sports Events',
];

const socials = [
    { icon: FaInstagram, href: 'https://www.instagram.com/thespevents/', label: 'Instagram' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
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
                        <iframe
                            className={styles.bgVideo}
                            src="https://www.youtube.com/embed/cKyYZZRQG0Q?autoplay=1&mute=1&loop=1&playlist=cKyYZZRQG0Q&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
                            title="YouTube background video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <div className={styles.videoOverlay} />
                    </div>

                    <div className={styles.glowTop} />
            <div className="container">
                <AnimatedSection>
                    <div className={styles.grid}>
                        {/* Brand Column */}
                        <div className={styles.brand}>
                            <div className={styles.logoWrap}>
                                <span className={styles.logoIcon}>SP</span>
                               
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
                                        <s.icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Quick Links</h4>
                            <ul className={styles.linkList}>
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.footerLink}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Services</h4>
                            <ul className={styles.linkList}>
                                {servicesList.map((s) => (
                                    <li key={s}>
                                        <span className={styles.footerLink}>{s}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Get In Touch</h4>
                            <ul className={styles.contactList}>
                                <li className={styles.contactItem}>
                                    <HiLocationMarker className={styles.contactIcon} />
                                    <span>Marvel Artiza, Vidya Nagar<br/>Hubli &mdash; 580029, Karnataka</span>
                                </li>
                                <li className={styles.contactItem}>
                                    <HiPhone className={styles.contactIcon} />
                                    <span>+91 74118 63227</span>
                                </li>
                                <li className={styles.contactItem}>
                                    <HiMail className={styles.contactIcon} />
                                    <span>thespevents@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} The SP Events. All rights reserved.
                    </p>
                    <div className={styles.bottomLinks}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
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
