import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import { StatItem } from '../../types';
import { PageMascotCharacter } from '../character/PageMascotCharacter';

interface HeroSectionProps {
  personal: {
    name: string;
    role: string;
    tagline: string;
    status: string;
    email: string;
    phone?: string;
  };
  stats: StatItem[];
  onExploreClick: () => void;
  onContactClick: () => void;
  onDownloadResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  personal,
  stats,
  onExploreClick,
  onContactClick,
  onDownloadResume,
}) => {
  return (
    <section
      id="hero"
      className="scroll-mt-24 sm:scroll-mt-28 relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 flex flex-col justify-start"
    >
      {/* Handcrafted paper grid background accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 paper-grain dark:opacity-20" />

      {/* Floating Accent Tech Glyphs for Hero Depth */}
      <div className="absolute top-20 right-6 md:right-20 pointer-events-none opacity-25 dark:opacity-20 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 sm:w-20 sm:h-20 text-[#8C7658] dark:text-sky-400">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      </div>
      <div className="absolute bottom-12 left-4 md:left-16 pointer-events-none opacity-20 dark:opacity-15">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14 sm:w-16 sm:h-16 text-[#C7622B] dark:text-sky-300">
          <rect x="2" y="2" width="20" height="20" rx="4" />
          <path d="M7 8h6M10 8v8" />
          <path d="M14 15c.5.7 1.2 1 2.2 1 1.2 0 1.8-.6 1.8-1.3 0-1-.8-1.3-1.8-1.6-1.4-.4-2.2-.9-2.2-2.1 0-1.2 1-2 2.2-2 1 0 1.7.4 2.2 1.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Centered Top Heading & Status - Safe margin below navbar */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1C232E] border border-stone-200/90 dark:border-stone-700/80 shadow-xs text-xs font-semibold text-stone-700 dark:text-stone-200 tracking-wide mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{personal.status}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-xl sm:text-2xl font-semibold text-amber-800 dark:text-amber-400 font-display"
          >
            {personal.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            {personal.tagline}
          </motion.p>
        </div>

        {/* Centerpiece: Koboyo Page Mascot Character */}
        <div className="flex justify-center my-4 sm:my-6 relative">
          <PageMascotCharacter
            name={personal.name}
            role={personal.role}
            onDownloadResume={onDownloadResume}
          />
        </div>

        {/* Call to Actions & Direct Contact */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              id="hero-explore-btn"
              className="group relative px-7 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
            >
              <span>Explore 12 Projects</span>
              <ArrowDown className="w-4 h-4 text-stone-300 dark:text-stone-900 group-hover:translate-y-1 transition-transform" />
              {/* Dog ear effect */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[10px] border-t-white/20 border-l-[10px] border-l-transparent pointer-events-none" />
            </button>

            <button
              onClick={onContactClick}
              id="hero-contact-btn"
              className="px-7 py-3.5 rounded-xl bg-white dark:bg-[#1E2530] hover:bg-stone-50 dark:hover:bg-[#26303D] text-stone-800 dark:text-stone-100 font-semibold text-sm sm:text-base border border-stone-200 dark:border-stone-700 shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Let's Connect</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-600 dark:text-stone-400 font-mono pt-1">
            <span className="washi-tape px-2.5 py-1 rounded text-stone-800 dark:text-[#FDE68A]">
              Direct Dispatch:
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="underline decoration-dotted underline-offset-4 hover:text-amber-700 dark:hover:text-amber-400 transition-colors font-semibold"
            >
              {personal.email}
            </a>
            {personal.phone && (
              <>
                <span>•</span>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors font-semibold"
                >
                  {personal.phone}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Stats Ribbon (Layered Bookmark Style) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1C232E] border border-stone-200 dark:border-stone-700/80 shadow-sm">
            {/* Washi tape on sides */}
            <div className="absolute -top-2.5 left-8 w-16 h-5 washi-tape rounded-xs" />
            <div className="absolute -top-2.5 right-8 w-16 h-5 washi-tape rounded-xs" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-700/60">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center ${
                    idx > 0 ? 'pt-4 md:pt-0' : ''
                  }`}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="font-mono text-xs font-semibold text-amber-700 dark:text-amber-400">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 font-sans mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
