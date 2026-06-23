import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
    'Modern web technologies (React, Next.js, Node.js)',
    'Performance optimization & clean architecture',
    'Cloud & automation (AWS, Docker, CI/CD)',
    'Clear communication, honest scoping',
];

const experiences = [
    {
        title: 'Software Engineer',
        company: 'XYZ Technologies Pvt Ltd',
        period: '2025 — Present',
        description: 'Building enterprise-level applications, architecting scalable services, and mentoring junior developers.',
        current: true,
    },
    {
        title: 'Solution Developer',
        company: 'XYZ Solutions Pvt Ltd',
        period: '2024 — 2025',
        description: 'Delivered multiple client projects across React frontends and Node.js backends. Built RESTful APIs and contributed to full-stack client projects.',
    },
];

const education = {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'GGSIPU University',
    period: '2022 — 2024',
};

const AboutSection = () => {
    return (
        <section id="about" className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 border-t border-line">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16">
                    <p className="eyebrow mb-3">● About</p>
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink text-balance max-w-2xl">
                        A bit about how I work
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: bio + highlights */}
                    <div>
                        <p className="text-base sm:text-lg text-ink leading-relaxed mb-4">
                            I'm a software engineer focused on building scalable, high-performance
                            applications using modern technologies.
                        </p>
                        <p className="text-base text-muted leading-relaxed mb-8">
                            I value clean architecture, maintainable code, and user-centric design.
                            Outside client work, I enjoy mentoring and contributing to open source.
                        </p>

                        <ul className="space-y-3">
                            {highlights.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-ink">
                                    <CheckCircle2 className="w-4 h-4 text-accent2 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: experience timeline */}
                    <div>
                        <p className="eyebrow mb-5">Experience</p>
                        <div className="space-y-0">
                            {experiences.map((exp, i) => (
                                <div key={i} className="relative pl-6 pb-8 border-l border-line last:pb-0">
                                    <span
                                        className={`absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full ${
                                            exp.current ? 'bg-accent2' : 'bg-line border border-muted'
                                        }`}
                                    />
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-display font-semibold text-ink text-base">{exp.title}</h3>
                                        {exp.current && (
                                            <span className="font-mono text-[10px] uppercase tracking-wide text-accent2 px-1.5 py-0.5 rounded border border-accent2/30">
                                                current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-accent font-medium mb-1">{exp.company}</p>
                                    <p className="font-mono text-xs text-muted mb-2">{exp.period}</p>
                                    <p className="text-sm text-muted leading-relaxed">{exp.description}</p>
                                </div>
                            ))}

                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-line border border-muted" />
                                <h3 className="font-display font-semibold text-ink text-base mb-1">{education.degree}</h3>
                                <p className="text-sm text-accent font-medium mb-1">{education.institution}</p>
                                <p className="font-mono text-xs text-muted">{education.period}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
