import React, { useState, useRef } from 'react';
import {
    Mail, Phone, MapPin, Send, Clock, Linkedin, Github, Twitter,
    CheckCircle, Calendar, Briefcase, ArrowRight, User
} from 'lucide-react';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '',
        service: '', budget: '', timeline: '', message: ''
    });
    const [formStatus, setFormStatus] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 3000);
            return;
        }
        setFormStatus('loading');
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setFormStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
            setTimeout(() => setFormStatus(''), 4000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 3000);
        }
    };

    const contactInfo = [
        { icon: Mail, value: 'lord.dev0x@gmail.com', link: 'mailto:lord.dev0x@gmail.com' },
        { icon: SiFiverr, value: 'Fiverr', link: 'https://www.fiverr.com/s/ZmDLwVm' },
        { icon: Briefcase, value: 'Freelancer.com', link: 'https://www.freelancer.in/u/RajV12?sb=t' },
        { icon: MapPin, value: 'New Delhi, India (Remote)', link: 'https://maps.app.goo.gl/T9i9MxvcpemrZS9m6' },
        { icon: Clock, value: 'Mon – Fri, 9AM – 6PM IST', link: '#' },
    ];

    const socialLinks = [
        { icon: Github, link: 'https://github.com/vaibhav-tech01', label: 'GitHub' },
        { icon: Linkedin, link: 'https://www.linkedin.com/in/lord-dev-971863399', label: 'LinkedIn' },
        { icon: Twitter, link: 'https://x.com/LordD0x', label: 'Twitter' },
        { icon: FaTelegramPlane, link: 'https://t.me/Vaibhav0x', label: 'Telegram' },
        { icon: FaDiscord, link: 'https://discord.com/users/669880381649977354', label: 'Discord' },
    ];

    const services = [
        'Web Development', 'Mobile App Development', 'Automation / AI Agents',
        'Shopify / No-Code', 'API Development', 'UI/UX Design', 'Consulting', 'Other'
    ];
    const budgetRanges = ['Under $500', '$500 – $1,000', '$1,000 – $5,000', '$5,000 – $20,000', '$20,000+'];
    const timelines = ['1–3 days', 'Within a week', '1–3 weeks', '1–2 months', '2–3 months', '3+ months'];

    const fieldBase = "w-full bg-surface2 border border-line rounded-lg py-2.5 px-3.5 text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-accent/50 transition-colors duration-200";
    const labelBase = "block text-xs font-medium text-muted mb-1.5";

    return (
        <section id="contact" className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 border-t border-line">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 sm:mb-14">
                    <p className="eyebrow mb-3">● Contact</p>
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink text-balance max-w-xl">
                        Let's work together
                    </h2>
                    <p className="text-muted mt-3 max-w-md text-sm sm:text-base">
                        Tell me a bit about your project — the more detail, the faster I can scope it.
                        I reply within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
                    {/* Left: compact info column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-3">
                            {contactInfo.map(({ icon: Icon, value, link }, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target={link.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-muted hover:text-ink transition-colors duration-200"
                                >
                                    <span className="w-8 h-8 rounded-lg border border-line flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-accent" />
                                    </span>
                                    {value}
                                </a>
                            ))}
                        </div>

                        <a
                            href="https://calendly.com/rajjvaibhavv121/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-4 py-3.5 rounded-lg border border-line hover:border-accent/40 transition-colors duration-200 group"
                        >
                            <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                                <Calendar className="w-4 h-4 text-accent" />
                                Prefer to talk? Book a 15-min call
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-0.5 transition-transform duration-200" />
                        </a>

                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-3">Elsewhere</p>
                            <div className="flex items-center gap-2">
                                {socialLinks.map(({ icon: Icon, link, label }) => (
                                    <a
                                        key={label}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-muted hover:text-ink hover:border-accent/40 transition-colors duration-200"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: full intake form — every field kept */}
                    <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
                        {formStatus === 'success' && (
                            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-accent2/30 bg-accent2/10 text-accent2 text-sm font-medium">
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                Message sent — I'll get back to you within 24 hours.
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="px-3.5 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
                                {!formData.name || !formData.email || !formData.service || !formData.message
                                    ? 'Please fill name, email, service, and message — they\'re required.'
                                    : 'Something went wrong — please try again.'}
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" className={fieldBase} required />
                            </div>
                            <div>
                                <label className={labelBase}>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className={fieldBase} required />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Optional" className={fieldBase} />
                            </div>
                            <div>
                                <label className={labelBase}>Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Optional" className={fieldBase} />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Service *</label>
                                <select name="service" value={formData.service} onChange={handleChange} className={fieldBase} required>
                                    <option value="">Select a service</option>
                                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelBase}>Budget</label>
                                <select name="budget" value={formData.budget} onChange={handleChange} className={fieldBase}>
                                    <option value="">Select a range</option>
                                    {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelBase}>Timeline</label>
                            <select name="timeline" value={formData.timeline} onChange={handleChange} className={fieldBase}>
                                <option value="">When do you need this?</option>
                                {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className={labelBase}>Project details *</label>
                            <textarea
                                name="message" value={formData.message} onChange={handleChange}
                                rows="4" placeholder="What are you building? Any specific requirements or links to reference?"
                                className={`${fieldBase} resize-none`} required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'loading'}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                        >
                            {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                            {formStatus !== 'loading' && <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
