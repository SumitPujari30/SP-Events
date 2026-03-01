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
        lines: ['The SP Events HQ', 'Andheri West, Mumbai', 'Maharashtra 400053, India'],
    },
    {
        icon: HiOutlinePhone,
        title: 'Call Us',
        lines: ['+91 98765 43210', '+91 22 4567 8900', 'Mon – Sat, 10 AM – 7 PM'],
    },
    {
        icon: HiOutlineMail,
        title: 'Email Us',
        lines: ['hello@thespevents.com', 'careers@thespevents.com', 'press@thespevents.com'],
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
                        Have an event in mind? We&apos;d love to hear about it. Reach out and let&apos;s create something extraordinary together.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Form */}
                        <AnimatedSection variant="fadeLeft">
                            <div className={styles.formCard}>
                                <h2 className={styles.formTitle}>Send Us a Message</h2>
                                <p className={styles.formSubtitle}>Fill in the details and we&apos;ll get back to you within 24 hours.</p>

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
                                                <label className="form-label">Event Type</label>
                                                <select
                                                    className="form-input"
                                                    name="eventType"
                                                    value={formData.eventType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select event type</option>
                                                    <option value="corporate">Corporate Event</option>
                                                    <option value="exhibition">Exhibition</option>
                                                    <option value="launch">Product Launch</option>
                                                    <option value="awards">Award Ceremony</option>
                                                    <option value="summit">Summit / Conference</option>
                                                    <option value="virtual">Virtual Event</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Your Message *</label>
                                            <textarea
                                                className="form-textarea"
                                                name="message"
                                                placeholder="Tell us about your event vision..."
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
                                        <p>Mumbai, Maharashtra, India</p>
                                        <a
                                            href="https://maps.google.com/?q=Andheri+West+Mumbai"
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
