'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight, HiChatAlt2 } from 'react-icons/hi';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import AnimatedSection from '@/components/AnimatedSection';
import ParticleBackground from '@/components/ParticleBackground';
import styles from './contact.module.css';

const contactMethods = [
    {
        icon: HiOutlineMail,
        title: 'Email Us',
        value: 'thespevents@gmail.com',
        label: 'General Inquiries',
        href: 'mailto:thespevents@gmail.com'
    },
    {
        icon: HiOutlinePhone,
        title: 'Call Us',
        value: '+91 74118 63227',
        label: 'Mon – Sat, 10 AM – 7 PM',
        href: 'tel:+917411863227'
    },
    {
        icon: FaWhatsapp,
        title: 'WhatsApp Us',
        value: '+91 74118 63227',
        label: 'Message on WhatsApp',
        href: 'https://wa.me/917411863227'
    },
    {
        icon: HiOutlineLocationMarker,
        title: 'Visit Us',
        value: 'Hubli, Karnataka',
        label: 'HQ - Marvel Artiza',
        href: 'https://maps.google.com/?q=Vidya+Nagar+Hubli+Karnataka'
    }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        otherSubject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    
    // Parallax Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const titleRotateX = useTransform(y, [-300, 300], [10, -10]);
    const titleRotateY = useTransform(x, [-300, 300], [-10, 10]);
    const glowX = useTransform(x, [-300, 300], ['-20%', '20%']);
    const glowY = useTransform(y, [-300, 300], ['-20%', '20%']);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <main className={styles.mainWrapper}>
            {/* Ambient Background */}
            <div className={styles.ambientBg}>
                <ParticleBackground />
            </div>

            {/* Hero Section */}
            <section 
                className={styles.hero}
            >
                {/* Interactive Glow Aura */}
                <motion.div 
                    className={styles.magicalGlow}
                    style={{ x: glowX, y: glowY }}
                />

                <div className="container">
                    <motion.div 
                        className={styles.heroContent}
                    >
                        <motion.div 
                            className={styles.badge}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <HiChatAlt2 /> <span>Get in Touch</span>
                        </motion.div>
                        
                        <motion.h1 
                            className={styles.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            Let&apos;s Create <span className={`${styles.magicWord} text-gold`}>Magic</span> Together
                        </motion.h1>
                        
                        <motion.p 
                            className={styles.subtitle}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Whether you have a vision for a grand spectacle or a delicate celebration, 
                            we are here to turn your dreams into a breathtaking reality.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Centered Form Section */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.centeredContent}>
                        <AnimatedSection variant="fadeUp" delay={0.4}>
                            <div className={styles.glassContainer}>
                                <div className={styles.formHeader}>
                                    <h2>Start a Conversation</h2>
                                    <p>Tell us about your event and we&apos;ll get back to you within 24 hours.</p>
                                </div>

                                {submitted ? (
                                    <motion.div
                                        className={styles.successMsg}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className={styles.successRing}>
                                            <span className={styles.successIcon}>✓</span>
                                        </div>
                                        <h3>Message Sent!</h3>
                                        <p>Thank you for reaching out. Our team will contact you shortly to weave some magic.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.inputGrid}>
                                            <div className={styles.inputGroup}>
                                                <input
                                                    className={styles.elegantInput}
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span className={styles.inputFocusBlur}></span>
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <input
                                                    className={styles.elegantInput}
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span className={styles.inputFocusBlur}></span>
                                            </div>
                                        </div>

                                        <div className={styles.inputGrid}>
                                            <div className={styles.inputGroup}>
                                                <input
                                                    className={styles.elegantInput}
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                <span className={styles.inputFocusBlur}></span>
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <select
                                                    className={styles.elegantSelect}
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    required
                                                >
                                                    <option value="" disabled>Event Type</option>
                                                    <option value="Corporate Events">Corporate Events</option>
                                                    <option value="Musical Events">Musical Events</option>
                                                    <option value="Special Event">Special Event</option>
                                                    <option value="Sport's Events">Sport&apos;s Events</option>
                                                    <option value="Wedding Events">Wedding Events</option>
                                                    <option value="others">Others</option>
                                                </select>
                                                <span className={styles.inputFocusBlur}></span>
                                            </div>
                                        </div>

                                        {formData.subject === 'others' && (
                                            <motion.div 
                                                className={styles.inputGroup}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <input
                                                    className={styles.elegantInput}
                                                    type="text"
                                                    name="otherSubject"
                                                    placeholder="Please specify your event type"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span className={styles.inputFocusBlur}></span>
                                            </motion.div>
                                        )}

                                        <div className={styles.inputGroup}>
                                            <textarea
                                                className={styles.elegantTextarea}
                                                name="message"
                                                placeholder="Your Vision / Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onInput={(e) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    target.style.height = 'auto';
                                                    target.style.height = target.scrollHeight + 'px';
                                                }}
                                                required
                                            />
                                            <span className={styles.inputFocusBlur}></span>
                                        </div>

                                        <button type="submit" className={styles.submitBtn}>
                                            <span>Send Your Message</span>
                                            <HiArrowRight />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Contact Info Grid */}
            <section className={styles.infoSection}>
                <div className="container">
                    <div className={styles.infoGrid}>
                        {contactMethods.map((method, idx) => (
                            <AnimatedSection key={idx} variant="fadeUp" delay={0.1 + idx * 0.1}>
                                <motion.a 
                                    href={method.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={styles.contactCard}
                                    whileHover={{ 
                                        y: -10,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className={styles.cardGlow}></div>
                                    <div className={styles.methodIcon}>
                                        <method.icon size={24} />
                                    </div>
                                    <div className={styles.methodDetails}>
                                        <h4>{method.title}</h4>
                                        <p className={styles.methodValue}>{method.value}</p>
                                        <p className={styles.methodLabel}>{method.label}</p>
                                    </div>
                                </motion.a>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
