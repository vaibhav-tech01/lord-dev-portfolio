import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';

const socialLinks = [
    { icon: Github, href: 'https://github.com/vaibhav-tech01', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lord-dev-971863399', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/LordD0x', label: 'Twitter' },
    { icon: FaTelegramPlane, href: 'https://t.me/Vaibhav0x', label: 'Telegram' },
    { icon: FaDiscord, href: 'https://discord.com/users/669880381649977354', label: 'Discord' },
    { icon: Mail, href: 'mailto:lord.dev0x@gmail.com', label: 'Email' },
];

const navLinks = [
    { label: 'About', to: '/#about' },
    { label: 'Skills', to: '/#skills' },
    { label: 'Work', to: '/work' },
    { label: 'Reviews', to: '/#reviews' },
    { label: 'Contact', to: '/#contact' },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-line px-5 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-10">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-3">
                            <span className="dot" />
                            <span className="font-mono text-sm font-medium text-ink">
                                lord<span className="text-accent">dev</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted max-w-xs">
                            Software engineer building web, automation, and mobile solutions for clients worldwide.
                        </p>
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        {navLinks.map((item) => (
                            <Link key={item.label} to={item.to} className="text-sm text-muted hover:text-ink transition-colors duration-200">
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-8 border-t border-line">
                    <p className="font-mono text-xs text-muted">
                        © {year} Lord Dev. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
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
        </footer>
    );
};

export default Footer;
