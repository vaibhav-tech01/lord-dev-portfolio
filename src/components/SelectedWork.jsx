import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

const featured = projects.filter((p) => p.highlight).slice(0, 3);

const SelectedWork = () => {
    return (
        <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 border-t border-line">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-12 sm:mb-16">
                    <div>
                        <p className="eyebrow mb-3">● Selected Work</p>
                        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink text-balance max-w-xl">
                            A few things I've shipped
                        </h2>
                    </div>
                    <Link
                        to="/work"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
                    >
                        View full portfolio
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {featured.map((project) => (
                        <a
                            key={project.id}
                            href={project.liveUrl || undefined}
                            target={project.liveUrl ? '_blank' : undefined}
                            rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                            className="group block rounded-xl border border-line overflow-hidden hover:border-accent/40 transition-colors duration-300"
                        >
                            <div className="relative h-44 sm:h-48 overflow-hidden bg-surface2">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-display font-semibold text-ink text-[15px] leading-snug">
                                        {project.title}
                                    </h3>
                                    {project.liveUrl && (
                                        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-200 flex-shrink-0 mt-0.5" />
                                    )}
                                </div>
                                <p className="font-mono text-xs text-muted">
                                    {project.tech.slice(0, 3).join(' · ')}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="sm:hidden mt-8 text-center">
                    <Link
                        to="/work"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent transition-colors duration-200"
                    >
                        View full portfolio
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SelectedWork;
