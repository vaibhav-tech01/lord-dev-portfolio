import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: 'https://github.com/vaibhav-tech01', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lord-dev-971863399', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:lord.dev0x@gmail.com', label: 'Email' },
];

const HeroSection = () => {
    return (
        <section id="home" className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

                    {/* Left: identity */}
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-line">
                            <span className="dot" />
                            <span className="font-mono text-xs text-muted tracking-wide">Available for freelance work</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-display font-semibold text-ink leading-[1.08] text-balance mb-5">
                            Software engineer who ships what clients actually need.
                        </h1>

                        <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-8">
                            I'm Lord Dev — I build scalable web apps, automation systems, and mobile apps
                            for clients worldwide. Clean architecture, honest timelines, no surprises.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
                            <Link
                                to="/work"
                                className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                            >
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </Link>
                            <Link
                                to="/#contact"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line text-ink text-sm font-semibold hover:border-accent/50 transition-colors duration-200"
                            >
                                Let's Talk
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-muted hover:text-ink hover:border-accent/40 transition-colors duration-200"
                                >
                                    <Icon className="w-[18px] h-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: signature terminal card */}
                    <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
                        <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                <span className="ml-3 font-mono text-xs text-muted">whoami.sh</span>
                            </div>
                            <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-7">
                                <p className="text-accent2">$ whoami</p>
                                <p className="text-ink">Lord Dev — Software Engineer</p>
                                <p className="text-accent2 mt-3">$ location</p>
                                <p className="text-ink">New Delhi, India (Remote)</p>
                                <p className="text-accent2 mt-3">$ stack --core</p>
                                <p className="text-ink">React · Node.js · Python · AWS</p>
                                <p className="text-accent2 mt-3">$ status</p>
                                <p className="text-ink flex items-center gap-2">
                                    <span className="dot" /> open to new projects
                                </p>
                                <p className="text-accent2 mt-3">$ experience</p>
                                <p className="text-ink">2+ years · 20+ clients worldwide</p>
                                <p className="text-muted mt-4">_</p>
                            </div>
                        </div>

                        <a
                            href="https://www.fiverr.com/s/ZmDLwVm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg border border-line text-sm text-muted hover:text-ink hover:border-accent/40 transition-colors duration-200"
                        >
                            <span>Also available on Fiverr & Freelancer.com</span>
                            <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
