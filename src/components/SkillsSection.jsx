import React from 'react';

const skillGroups = [
    {
        label: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'Framer Motion'],
    },
    {
        label: 'Backend',
        skills: ['Node.js', 'Express', 'Python', 'Django', 'Flask', 'REST APIs'],
    },
    {
        label: 'Data & Cloud',
        skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'AWS', 'Docker', 'Firebase'],
    },
    {
        label: 'AI & Automation',
        skills: ['AI/ML', 'AI Agents', 'OpenAI API', 'n8n', 'Dify', 'Webhooks'],
    },
    {
        label: 'Mobile',
        skills: ['React Native', 'Expo', 'Flutter', 'Kotlin'],
    },
    {
        label: 'E-commerce & No-Code',
        skills: ['Shopify', 'WordPress', 'Webflow', 'Bubble', 'FlutterFlow'],
    },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 border-t border-line">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16">
                    <p className="eyebrow mb-3">● Skills</p>
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink text-balance max-w-2xl">
                        Tools I reach for
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 sm:gap-10">
                    {skillGroups.map((group) => (
                        <div key={group.label}>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                                {group.label}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {group.skills.map((skill) => (
                                    <span key={skill} className="text-[15px] text-ink">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
