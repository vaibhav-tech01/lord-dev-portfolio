import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
    { label: 'About', to: '/#about' },
    { label: 'Skills', to: '/#skills' },
    { label: 'Work', to: '/work' },
    { label: 'Reviews', to: '/#reviews' },
    { label: 'Contact', to: '/#contact' },
];

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setIsMenuOpen(false), [location]);

    const isActive = (to) => {
        if (to === '/work') return location.pathname === '/work';
        return location.pathname === '/' && location.hash === to.replace('/', '');
    };

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-base/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-[68px]">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="dot" />
                        <span className="font-mono text-sm sm:text-[15px] font-medium text-ink tracking-tight">
                            lord<span className="text-accent">dev</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive(item.to) ? 'text-ink' : 'text-muted hover:text-ink'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="relative w-9 h-9 rounded-md border border-line flex items-center justify-center text-muted hover:text-ink hover:border-accent/40 transition-colors duration-200"
                        >
                            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                        </button>

                        <Link
                            to="/#contact"
                            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-accent text-white hover:opacity-90 transition-opacity duration-200"
                        >
                            Hire Me
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen((v) => !v)}
                            className="md:hidden w-9 h-9 rounded-md border border-line flex items-center justify-center text-ink"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
                <div className="px-5 pb-4 pt-1 flex flex-col gap-1 bg-base border-b border-line">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="px-3 py-2.5 rounded-md text-sm font-medium text-muted hover:text-ink hover:bg-surface transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/#contact"
                        className="mt-1 px-3 py-2.5 rounded-md text-sm font-semibold bg-accent text-white text-center"
                    >
                        Hire Me
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
