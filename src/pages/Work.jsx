import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

const Work = () => {
    return (
        <>
            <Navigation />
            <main className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors duration-200 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back home
                    </Link>

                    <p className="eyebrow mb-3">● Work</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink text-balance max-w-2xl mb-4">
                        Selected client work
                    </h1>
                    <p className="text-base text-muted max-w-xl mb-12 sm:mb-16">
                        {projects.length} projects I'm proud to put my name on — real builds, real clients,
                        no filler. Filter by category to see specific work.
                    </p>

                    <ProjectsSection />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Work;
