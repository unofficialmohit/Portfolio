import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, BookOpen, Terminal } from 'lucide-react';
import { QuickFact } from '../../types';

interface AboutSectionProps {
  personal: {
    name: string;
    role: string;
    location: string;
    status: string;
    bioIntro: string;
    bioStory: string[];
    email: string;
    phone?: string;
  };
  quickFacts: QuickFact[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  personal,
  quickFacts,
}) => {
  const stickyColors = {
    yellow: 'bg-[#FFF9DE] dark:bg-[#252820] border-[#E8DEB2] dark:border-[#3E4232] text-[#4F4620] dark:text-[#E2DCB6]',
    peach: 'bg-[#FDF0E9] dark:bg-[#2D231E] border-[#EAD0C0] dark:border-[#4A372E] text-[#5C3B27] dark:text-[#E8C5B0]',
    green: 'bg-[#EFF5EA] dark:bg-[#1E2922] border-[#D1E0C7] dark:border-[#314537] text-[#334D25] dark:text-[#C1DAC0]',
    blue: 'bg-[#EEF4F8] dark:bg-[#1D2735] border-[#CADEEA] dark:border-[#2D3F54] text-[#244256] dark:text-[#B5D5EA]',
    pink: 'bg-[#FDF0F4] dark:bg-[#2D1F25] border-[#E8CAD5] dark:border-[#4B2F3B] text-[#59263A] dark:text-[#E8BDCE]',
  };

  return (
    <section id="about" className="scroll-mt-24 sm:scroll-mt-28 relative py-20 md:py-28 bg-[#F4EFE6]/50 dark:bg-[#151A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E2D5BE] dark:border-[#2C384A] text-xs font-semibold uppercase tracking-widest text-[#8C6036] dark:text-[#E59560] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
            <span>Chapter 01 • Biography & Focus</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2419] dark:text-[#E8DFD1] tracking-tight">
            Professional Summary
          </h2>
          <p className="mt-3 text-base sm:text-lg max-w-xl font-handwriting text-xl sm:text-2xl text-[#A05C28] dark:text-[#E59560]">
            "Delivering scalable, production-grade solutions across mobile, web & backend."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Polaroid Paper Frame & Developer Inscriptions */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Polaroid Frame */}
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: -1.5 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative p-5 pb-7 bg-[#FFFDF9] dark:bg-[#1C222C] rounded-sm border border-[#DFCEB5] dark:border-[#2C384A] paper-shadow-lift max-w-sm w-full will-change-transform"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              {/* Top washi tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape rounded-sm" />

              {/* Photo Area with Paper Texture & Monogram */}
              <div className="relative aspect-[4/3] bg-[#EFE6D6] dark:bg-[#151B24] rounded-xs overflow-hidden border border-[#D5C6AF] dark:border-[#293444] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FFFDF9] dark:bg-[#1F2734] border border-[#DFCEB3] dark:border-[#354356] flex items-center justify-center text-[#C7622B] dark:text-[#E59560] paper-shadow-sm mb-3">
                  <Terminal className="w-8 h-8" />
                </div>
                <span className="font-display text-xl font-bold text-[#3B2F21] dark:text-[#E8DFD1]">
                  {personal.name}
                </span>
                <span className="text-xs text-[#7A6953] dark:text-[#9A8B79] flex items-center gap-1 mt-1 font-mono">
                  <MapPin className="w-3 h-3 text-[#C7622B] dark:text-[#E59560]" /> {personal.location}
                </span>
                <span className="text-[11px] text-[#A06C3E] dark:text-[#E59560] font-mono mt-0.5 font-semibold">
                  {personal.role}
                </span>
              </div>

              {/* Handwritten caption on polaroid bottom margin */}
              <div className="mt-4 text-center">
                <span className="font-handwriting text-2xl text-[#2F2519] dark:text-[#E8DFD1]">
                  at the engineering desk
                </span>
              </div>
            </motion.div>

            {/* Quick Contact Ribbon */}
            <div className="mt-6 w-full max-w-sm p-4 rounded-xl bg-[#FFFDF9] dark:bg-[#1C222C] border border-[#E3D6C1] dark:border-[#2C384A] paper-shadow-sm text-xs font-mono text-[#6A5742] dark:text-[#9A8B79] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#8C765E] dark:text-[#7A8A9E]">Email:</span>
                <a href={`mailto:${personal.email}`} className="text-[#C7622B] dark:text-[#E59560] font-semibold hover:underline truncate max-w-[200px]">
                  {personal.email}
                </a>
              </div>
              {personal.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-[#8C765E] dark:text-[#7A8A9E]">Phone:</span>
                  <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="text-[#2C2419] dark:text-[#E8DFD1] font-semibold hover:underline">
                    {personal.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#8C765E] dark:text-[#7A8A9E]">Location:</span>
                <span className="text-[#2C2419] dark:text-[#E8DFD1] font-semibold">{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Sticky Notes */}
          <div className="lg:col-span-7 space-y-8">
            {/* Story Manuscript Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#1C222C] border border-[#E3D6C0] dark:border-[#2C384A] paper-shadow-md paper-fold-tr">
              <h3 className="font-display text-2xl font-bold text-[#2C2419] dark:text-[#E8DFD1] mb-4">
                Architecture, Scalability & Engineering
              </h3>
              <p className="text-lg font-medium text-[#7C5A37] dark:text-[#E59560] leading-relaxed mb-4">
                {personal.bioIntro}
              </p>
              <div className="space-y-4 text-base text-[#524536] dark:text-[#C5B8A8] leading-relaxed">
                {personal.bioStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#EDE1CF] dark:border-[#293444] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8C7A65] dark:text-[#8E9CAE]">
                <span>Status: {personal.status}</span>
                <span>Dispatch: {personal.email}</span>
              </div>
            </div>

            {/* Quick Facts Sticky Notes Grid */}
            <div>
              <h4 className="font-display text-lg font-bold text-[#2C2419] dark:text-[#E8DFD1] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B]" />
                <span>Architectural Highlights & Focus</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickFacts.map((fact) => (
                  <motion.div
                    key={fact.id}
                    initial={{ rotate: fact.rotation }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-xl border paper-shadow-sm hover:paper-shadow-md transition-[box-shadow,border-color,background-color] duration-200 relative will-change-transform ${
                      stickyColors[fact.color as keyof typeof stickyColors] || stickyColors.yellow
                    }`}
                  >
                    {/* Tiny push-pin graphic */}
                    <div className="absolute top-2 right-3 w-2.5 h-2.5 rounded-full bg-[#C7622B]/70 shadow-xs border border-white dark:border-black" />

                    <h5 className="font-display font-bold text-sm tracking-tight mb-1">
                      {fact.title}
                    </h5>
                    <p className="text-xs opacity-90 leading-relaxed font-sans">
                      {fact.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
