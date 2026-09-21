import React, { useState, useEffect } from 'react';
import { usePortfolioData } from './data/usePortfolioData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { JsonEditorModal } from './components/modals/JsonEditorModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { DynamicCursor } from './components/common/DynamicCursor';
import { ParallaxTechBackground } from './components/common/ParallaxTechBackground';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';

export default function App() {
  const {
    data,
    saveCustomData,
    resetToDefault,
    downloadJsonFile,
    hasCustomEdits,
  } = usePortfolioData();

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Synchronize HTML root dark class and localStorage with currentTheme
  useEffect(() => {
    const root = document.documentElement;
    const meta = document.getElementById('theme-color-meta');
    if (currentTheme === 'dark') {
      root.classList.add('dark');
      if (meta) meta.setAttribute('content', '#11141A');
    } else {
      root.classList.remove('dark');
      if (meta) meta.setAttribute('content', '#F8F5EE');
    }
    localStorage.setItem('portfolio_theme', currentTheme);
  }, [currentTheme]);

  // Listen for system theme changes if user hasn't manually overridden yet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasManualPreference = localStorage.getItem('portfolio_theme');
      if (!hasManualPreference) {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track active section during scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'education', 'skills', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hidden developer hotkey (Ctrl/Cmd + Shift + E) to access JSON data editor without any UI button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsJsonModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-300 bg-[#F8F5EE] dark:bg-[#11141A] text-stone-900 dark:text-stone-100">
      {/* Interactive Theme-Aware Dynamic Stylus Cursor */}
      <DynamicCursor theme={currentTheme} />

      {/* Multi-tier Parallax Programming Language Background Pattern */}
      <ParallaxTechBackground />

      {/* Blueprint Grid Pattern for both Light and Dark themes */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            currentTheme === 'dark'
              ? 'linear-gradient(to right, #60A5FA 1px, transparent 1px), linear-gradient(to bottom, #60A5FA 1px, transparent 1px)'
              : 'linear-gradient(to right, #C8B9A0 1px, transparent 1px), linear-gradient(to bottom, #C8B9A0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: currentTheme === 'dark' ? 0.10 : 0.45,
        }}
      />

      {/* Global Navbar with Light / Dark toggle */}
      <Navbar
        name={data.personal.name}
        role={data.personal.role}
        activeSection={activeSection}
        currentTheme={currentTheme}
        onToggleTheme={() => setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        resumeUrl={data.personal.resumeUrl}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          personal={data.personal}
          stats={data.stats}
          onExploreClick={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
          onDownloadResume={() => setIsResumeModalOpen(true)}
        />

        <AboutSection
          personal={data.personal}
          quickFacts={data.quickFacts}
        />

        <ProjectsSection projects={data.projects} />

        <EducationSection
          education={data.education}
          experience={data.experience}
        />

        <SkillsSection categories={data.skillCategories} />

        <ContactSection
          personalEmail={data.personal.email}
          socialLinks={data.socialLinks}
          contactMeta={data.contact}
        />
      </main>

      {/* Footer */}
      <Footer
        name={data.personal.name}
        role={data.personal.role}
        email={data.personal.email}
        phone={data.personal.phone}
      />

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Global JSON Data Live Editor Modal (opened via Ctrl+Shift+E shortcut) */}
      <JsonEditorModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        currentData={data}
        onSave={saveCustomData}
        onReset={resetToDefault}
        onDownload={downloadJsonFile}
        hasCustomEdits={hasCustomEdits}
      />

      {/* Official Resume Modal & Direct PDF View/Print */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
