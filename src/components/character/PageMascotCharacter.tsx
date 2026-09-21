import React, { useState, useRef } from 'react';
import { Mascot } from 'page-mascot';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download } from 'lucide-react';

interface PageMascotCharacterProps {
  className?: string;
  name?: string;
  role?: string;
  onDownloadResume?: () => void;
}

export const PageMascotCharacter: React.FC<PageMascotCharacterProps> = ({
  className = '',
  name = 'Mohit',
  role = 'Full-Stack Developer',
  onDownloadResume,
}) => {
  const [boopCount, setBoopCount] = useState(23);
  const [speechQuote, setSpeechQuote] = useState<string | null>(null);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Exclusively Cap Hacker
  const directionsPath = '/mascots/cap-directions.webp';
  const reactionsPath = '/mascots/cap-reactions.webp';

  const showQuote = (text: string) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechQuote(text);
    speechTimerRef.current = setTimeout(() => {
      setSpeechQuote(null);
    }, 3200);
  };

  const handleContainerClick = () => {
    const newCount = boopCount + 1;
    setBoopCount(newCount);

    const funnyQuotes = [
      `Hey! I'm ${name} — watching your cursor! 👀`,
      'Boop! 🧢 Cap Hacker mode activated.',
      'Click me 4 times quickly to make me dizzy! 🌀',
      'Shipping scalable React Native & Web apps.',
      'Poked! Watching where you navigate next.',
      'Full-Stack Developer • Ready for high-impact work.',
    ];

    if (newCount % 4 === 0) {
      showQuote('Woah, so dizzy! 😵💫 ⭐');
    } else {
      showQuote(funnyQuotes[(newCount - 1) % funnyQuotes.length]);
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble on interaction */}
      <AnimatePresence>
        {speechQuote && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            className="absolute -top-12 sm:-top-14 z-40 px-3.5 py-1.5 bg-[#FFFDF9] dark:bg-[#1A212B] border border-[#DFCDB2] dark:border-[#2C384A] rounded-xl paper-shadow-md text-xs font-semibold text-[#2C2419] dark:text-[#E8DFD1] font-sans flex items-center gap-2 whitespace-nowrap shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560] shrink-0" />
            <span>{speechQuote}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFFDF9] dark:bg-[#1A212B] border-r border-b border-[#DFCDB2] dark:border-[#2C384A] transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mascot Stage */}
      <div
        onClick={handleContainerClick}
        className="relative group cursor-pointer flex flex-col items-center justify-center p-2"
        title="Poke Cap Hacker or move your cursor around to watch his eyes follow!"
      >
        {/* Soft Ambient Shadow */}
        <div className="absolute bottom-3 w-36 h-6 bg-black/10 dark:bg-black/35 rounded-full blur-md" />

        {/* Subtle drop shadow under mascot */}
        <div className="absolute bottom-2 w-32 h-4 bg-black/10 dark:bg-black/35 rounded-full blur-md" />

        {/* The Cap Hacker Koboyo Mascot Component */}
        <div className="relative z-10 filter drop-shadow-md transition-transform duration-200 group-hover:scale-105">
          <Mascot
            directions={directionsPath}
            reactions={reactionsPath}
            size={185}
            label="Cap Hacker"
            className="focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Full Stack Developer Status Pill & Resume Option */}
      <div className="mt-2 flex flex-col items-center gap-2.5 z-30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1E2530] border border-stone-200/90 dark:border-stone-700/80 shadow-xs text-xs font-sans">
          <span className="text-base">🧢</span>
          <span className="font-semibold text-stone-800 dark:text-stone-100">
            Full Stack Developer
          </span>
          <span className="text-stone-400 dark:text-stone-500">•</span>
          <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">
            {boopCount} boops
          </span>
        </div>

        {/* Option to download resume right below */}
        {onDownloadResume && (
          <button
            onClick={onDownloadResume}
            id="mascot-download-resume-btn"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 text-xs font-semibold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-300 dark:text-stone-900 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </button>
        )}
      </div>
    </div>
  );
};
