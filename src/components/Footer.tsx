'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import styles from './Footer.module.css';
import AnimatedSection from './AnimatedSection';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/work', label: 'Our Work' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/esg', label: 'ESG' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Connect' },
];

const services = [
    'Corporate Events',
    'Exhibitions & Activations',
    'Award Ceremonies',
    'Product Launches',
    'Virtual Events',
    'Summits & Conclaves',
    'Brand Marketing',
];

const socials = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Background Video */}
            <div className={styles.videoContainer}>
                <video
                    autoPlay
                    muted
                    playsInline
                    className={styles.bgVideo}
                    onEnded={(e) => {
                        e.currentTarget.currentTime = 21.5;
                        e.currentTarget.play();
                    }}
                >
                    <source src="/assets/The SP Events office --footer.mp4#t=21.5" type="video/mp4" />
                </video>
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
                                <div>
                                    <h3 className={styles.logoTitle}>The SP Events</h3>
                                    <p className={styles.logoSub}>Creating WOW Experiences</p>
                                </div>
                            </div>
                            <p className={styles.brandDesc}>
                                We are a premier event management company specializing in creating
                                unforgettable brand experiences through creativity, innovation, and
                                flawless execution.
                            </p>
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
                                {services.map((s) => (
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
                                    <span>Mumbai, Maharashtra, India</span>
                                </li>
                                <li className={styles.contactItem}>
                                    <HiPhone className={styles.contactIcon} />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className={styles.contactItem}>
                                    <HiMail className={styles.contactIcon} />
                                    <span>hello@thespevents.com</span>
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
    );
}
