import React, { useState } from 'react';
import { ExternalLink, Github, Lock, Globe, Smartphone, Bot, Cpu, Layers } from 'lucide-react';
import { projects, projectFilters } from '../data/projects';

const categoryIcons = {
    websites: Globe,
    apps: Smartphone,
    scraping: Cpu,
    automation: Bot,
    cloud: Layers,
};

const ProjectCard = ({ project }) => {
    const hasLive = Boolean(project.liveUrl);
    const hasGithub = Boolean(project.githubUrl);

    return (
        <div className="group rounded-xl border border-line bg-surface overflow-hidden hover:border-accent/40 transition-colors duration-300 flex flex-col">
            <div className="relative h-40 sm:h-48 overflow-hidden bg-surface2">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.highlight && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-base/90 backdrop-blur-sm border border-line font-mono text-[10px] uppercase tracking-wide text-accent2 flex items-center gap-1.5">
                        <span className="dot" /> Featured
                    </span>
                )}
                {!hasLive && !hasGithub && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-base/90 backdrop-blur-sm border border-line font-mono text-[10px] uppercase tracking-wide text-muted flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Client NDA
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-ink text-base mb-1.5 leading-snug">
                    {project.title}
                </h3>
                <p className="font-mono text-xs text-muted mb-3">
                    {project.year} · {project.team}
                </p>
                <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.description}
                </p>

                <div className="space-y-1 mb-4">
                    {Object.values(project.stats).slice(0, 2).map((val, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted">
                            <span className="w-1 h-1 rounded-full bg-accent2 flex-shrink-0" />
                            {val}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded-md bg-surface2 border border-line text-[11px] text-muted">
                            {tech}
                        </span>
                    ))}
                </div>

                {(hasLive || hasGithub) && (
                    <div className="flex items-center gap-2 pt-4 border-t border-line">
                        {hasLive && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-accent transition-colors duration-200"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> Live
                            </a>
                        )}
                        {hasGithub && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors duration-200"
                            >
                                <Github className="w-3.5 h-3.5" /> Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const visibleProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-10">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                        activeFilter === 'all'
                            ? 'bg-accent text-white border-accent'
                            : 'border-line text-muted hover:text-ink hover:border-accent/40'
                    }`}
                >
                    All ({projects.length})
                </button>
                {projectFilters.map((cat) => {
                    const Icon = categoryIcons[cat.id];
                    const count = projects.filter((p) => p.category === cat.id).length;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                                activeFilter === cat.id
                                    ? 'bg-accent text-white border-accent'
                                    : 'border-line text-muted hover:text-ink hover:border-accent/40'
                            }`}
                        >
                            {Icon && <Icon className="w-3.5 h-3.5" />}
                            {cat.label} ({count})
                        </button>
                    );
                })}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {visibleProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
