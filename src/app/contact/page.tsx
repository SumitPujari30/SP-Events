'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './contact.module.css';

const contactInfo = [
    {
        icon: HiOutlineLocationMarker,
        title: 'Visit Us',
        lines: ['The SP Events HQ', 'Marvel Artiza, Vidya Nagar, Hubli', 'Karnataka 580029, India'],
    },
    {
        icon: HiOutlinePhone,
        title: 'Call Us',
        lines: ['+91 74118 63227', 'Mon – Sat, 10 AM – 7 PM'],
    },
    {
        icon: HiOutlineMail,
        title: 'Email Us',
        lines: ['thespevents@gmail.com', 'careers@thespevents.com'],
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-content">
                    <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        Contact
                    </motion.span>
                    <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
                        Let&apos;s <span className="text-gold">Connect</span>
                    </motion.h1>
                    <motion.p className="page-hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                        Have a spectacle in mind? We'd love to hear about it. Reach out and let's craft something extraordinary together — from concept to curtain call.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Form */}
                        <AnimatedSection variant="fadeLeft">
                            <div className={styles.formCard}>
                                <h2 className={styles.formTitle}>Start a Conversation</h2>
                                <p className={styles.formSubtitle}>Drop us your details and we'll connect within 24 hours to discuss your vision.</p>

                                {submitted ? (
                                    <motion.div
                                        className={styles.successMsg}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <span className={styles.successIcon}>✓</span>
                                        <h3>Message Sent!</h3>
                                        <p>Thank you for reaching out. We&apos;ll be in touch shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className="form-group">
                                                <label className="form-label">Full Name *</label>
                                                <input
                                                    className="form-input"
                                                    type="text"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email Address *</label>
                                                <input
                                                    className="form-input"
                                                    type="email"
                                                    name="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className="form-group">
                                                <label className="form-label">Phone Number</label>
                                                <input
                                                    className="form-input"
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Portfolio / LinkedIn URL</label>
                                                <input
                                                    className="form-input"
                                                    type="url"
                                                    name="eventType"
                                                    placeholder="https://"
                                                    value={formData.eventType}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Why SP Events? *</label>
                                            <textarea
                                                className="form-textarea"
                                                name="message"
                                                placeholder="Tell us why you want to connect with us..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            Send Message <HiArrowRight />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimatedSection>

                        {/* Contact Info */}
                        <AnimatedSection variant="fadeRight" delay={0.2}>
                            <div className={styles.infoColumn}>
                                {contactInfo.map((info, i) => (
                                    <div key={i} className={styles.infoCard}>
                                        <div className={styles.infoIcon}>
                                            <info.icon size={22} />
                                        </div>
                                        <div>
                                            <h4>{info.title}</h4>
                                            {info.lines.map((line, j) => (
                                                <p key={j}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Map */}
                                <div className={styles.mapCard}>
                                    <div className={styles.mapPlaceholder}>
                                        <HiOutlineLocationMarker size={40} />
                                        <p>Hubli, Karnataka , India</p>
                                        <a
                                            href="https://maps.google.com/?q=Vidya+Nagar+Hubli+Karnataka"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-glass"
                                            style={{ marginTop: 12, fontSize: '0.85rem' }}
                                        >
                                            Open in Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}
