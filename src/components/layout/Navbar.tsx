import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  name: string;
  role: string;
  activeSection: string;
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  resumeUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  role,
  activeSection,
  currentTheme,
  onToggleTheme,
  resumeUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const isDark = currentTheme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF8F1]/95 dark:bg-[#13171F]/95 backdrop-blur-md paper-shadow-md border-b border-[#E8DFC8] dark:border-[#242E3D]'
          : 'bg-[#F8F5EE]/80 dark:bg-[#13171F]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* Top washi tape deco on nav */}
      <div className="w-full h-1 bg-gradient-to-r from-[#D97706]/50 via-[#8B7355]/40 to-[#9CA98D]/50 dark:from-[#D97706]/30 dark:via-[#4B5563]/40 dark:to-[#3B82F6]/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Nerd / Code Monogram */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E4D7C2] dark:border-[#2C384A] flex items-center justify-center paper-shadow-sm group-hover:scale-105 transition-transform text-[#C7622B] dark:text-[#E59560]">
              <span className="font-mono font-bold text-xs sm:text-sm bg-[#F5ECE0] dark:bg-[#252E3C] px-1.5 py-0.5 rounded border border-[#DFCEB3] dark:border-[#354356]">
                &lt;M/&gt;
              </span>
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#2D2A26] dark:text-[#E8DFD1] block leading-tight">
                {name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#857155] dark:text-[#8E9CAE] uppercase block">
                {role}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#8E4416] dark:text-[#E59560] font-semibold bg-[#EFE6D5]/80 dark:bg-[#252E3B] paper-shadow-sm'
                      : 'text-[#5C5243] dark:text-[#A79988] hover:text-[#2D2A26] dark:hover:text-[#E8DFD1] hover:bg-[#F3EADC]/50 dark:hover:bg-[#1E2532]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavFold"
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#C7622B] dark:bg-[#E59560] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Single Theme Toggle: Light vs Dark Mode */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to Light Paper Theme' : 'Switch to Dark Ink Theme'}
              title={isDark ? 'Switch to Light Paper' : 'Switch to Dark Ink'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EDE3D0]/70 dark:bg-[#1F2734] border border-[#DACDB8] dark:border-[#2C384A] text-xs font-semibold text-[#4A3B2B] dark:text-[#E8DFD1] hover:bg-[#E4D7C2] dark:hover:bg-[#283344] transition-all cursor-pointer shadow-xs"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#F59E0B]" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#5B4A34]" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Connect CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-xl bg-[#2C2419] dark:bg-[#E59560] hover:bg-[#1E1810] dark:hover:bg-[#D4844E] text-[#FFFDF9] dark:text-[#13161C] text-xs font-semibold paper-shadow-sm hover:paper-shadow-md transition-all cursor-pointer"
            >
              Let's Connect
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Light Dark Theme"
              className="p-2 rounded-lg bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E4D7C2] dark:border-[#2C384A] text-[#5A4B3A] dark:text-[#E8DFD1]"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#5A4B3A]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E4D7C2] dark:border-[#2C384A] text-[#5A4B3A] dark:text-[#E8DFD1] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Folded Paper Style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#E3D7C0] dark:border-[#242E3D] bg-[#FFFDF9] dark:bg-[#181F29] px-4 pt-3 pb-6 paper-shadow-lg"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#F2E7D5] dark:bg-[#252E3C] text-[#8E4416] dark:text-[#E59560] font-semibold'
                      : 'text-[#4A3F33] dark:text-[#C5B9A8] hover:bg-[#F8F2E6] dark:hover:bg-[#1E2633]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="text-xs text-[#C7622B] dark:text-[#E59560]">✦</span>}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E8DCC4] dark:border-[#242E3D] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#7A6A55] dark:text-[#A79988]">
                <span>Canvas Theme:</span>
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-[#EFE6D5] dark:bg-[#252E3C] text-xs font-semibold text-[#2C2419] dark:text-[#E8DFD1]"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Dark Ink Active' : 'Light Paper Active'}</span>
                </button>
              </div>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
