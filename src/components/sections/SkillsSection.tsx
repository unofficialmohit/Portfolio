import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench } from 'lucide-react';
import { SkillCategory } from '../../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

  const noteColorMap = {
    yellow: 'bg-[#FFF9DE] dark:bg-[#1E231D] border-[#E8DCB0] dark:border-[#35402F] text-[#4A411B] dark:text-[#E2DCB6]',
    pink: 'bg-[#FDF0F4] dark:bg-[#281E24] border-[#E7C9D5] dark:border-[#46313D] text-[#542337] dark:text-[#E8BDCE]',
    sage: 'bg-[#EFF5EA] dark:bg-[#1C2520] border-[#D0DFC7] dark:border-[#2F4236] text-[#2C4820] dark:text-[#C1DAC0]',
    blue: 'bg-[#EEF4F8] dark:bg-[#1A232E] border-[#C9DEE9] dark:border-[#283B4F] text-[#1E3F54] dark:text-[#B5D5EA]',
    lavender: 'bg-[#F5F0FA] dark:bg-[#241E2D] border-[#DACCE8] dark:border-[#3E2F4D] text-[#3F2B56] dark:text-[#D5C2EA]',
  };

  return (
    <section
      id="skills"
      className="scroll-mt-24 sm:scroll-mt-28 relative py-20 md:py-28 bg-[#FBF8F3] dark:bg-[#13161C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E2D5BE] dark:border-[#2C384A] text-xs font-semibold uppercase tracking-widest text-[#8C6036] dark:text-[#E59560] mb-3">
              <Wrench className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
              <span>Chapter 04 • Technical Palette</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2419] dark:text-[#E8DFD1] tracking-tight">
              Craft & Competencies
            </h2>
            <p className="mt-2 text-base text-[#685744] dark:text-[#A79988] max-w-xl">
              Core programming languages and engineering skills refined across production mobile and web systems.
            </p>
          </div>

          {/* Paper drafting indicator */}
          <div className="hidden sm:flex items-center gap-3 bg-[#FFFDF9] dark:bg-[#1C232E] px-4 py-2.5 rounded-xl border border-[#E4D6BF] dark:border-[#2C384A] paper-shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] dark:bg-[#252E3C] border border-[#E0CFB6] dark:border-[#354356] flex items-center justify-center text-[#C7622B] dark:text-[#E59560]">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#2C2419] dark:text-[#E8DFD1] block font-sans">
                Production Tested
              </span>
              <span className="text-[#80705E] dark:text-[#8E9CAE] font-sans text-[11px]">
                Hover to examine proficiency ruler
              </span>
            </div>
          </div>
        </div>

        {/* Single Craft & Competencies Card Container */}
        <div className="max-w-5xl mx-auto">
          {categories.slice(0, 1).map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-6 sm:p-8 md:p-10 rounded-2xl border shadow-sm paper-fold-tr ${
                noteColorMap[cat.noteColor as keyof typeof noteColorMap] || noteColorMap.sage
              }`}
            >
              {/* Pinned push pin effect at top left */}
              <div className="absolute top-5 left-6 w-3.5 h-3.5 rounded-full bg-[#C7622B] dark:bg-[#E59560] shadow-xs border border-white dark:border-black flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white opacity-80" />
              </div>

              {/* Title & Description */}
              <div className="pl-6 mb-8">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {cat.category}
                </h3>
                <p className="text-xs sm:text-sm opacity-85 mt-1.5 leading-relaxed max-w-2xl">
                  {cat.description}
                </p>
              </div>

              {/* Skills List with Ruler / Measured Paper Bar in 2 balanced columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setActiveSkillHover(skill.name)}
                    onMouseLeave={() => setActiveSkillHover(null)}
                    className="p-3.5 rounded-xl bg-white/80 dark:bg-[#11141A]/50 hover:bg-white dark:hover:bg-[#11141A]/75 border border-stone-200/70 dark:border-stone-700/60 transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/70 dark:border-amber-700/60 text-xs font-mono font-medium text-amber-900 dark:text-amber-300">
                          {skill.level}
                        </span>
                      </div>
                    </div>

                    {/* Paper Drafting Ruler Bar */}
                    <div className="relative w-full h-2 rounded-full bg-stone-200/80 dark:bg-stone-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
