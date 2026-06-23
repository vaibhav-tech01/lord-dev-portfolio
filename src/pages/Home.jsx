import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import SelectedWork from '../components/SelectedWork';
import TrustStrip from '../components/TrustStrip';
import ReviewsSection from '../components/ReviewsSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <SelectedWork />
                <TrustStrip />
                <ReviewsSection />
                <ContactUs />
            </main>
            <Footer />
        </>
    );
};

export default Home;
