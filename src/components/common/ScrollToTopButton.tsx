import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  hide?: boolean;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ hide = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    const checkBodyLock = () => {
      setIsLocked(document.body.style.overflow === 'hidden');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    checkBodyLock();

    const observer = new MutationObserver(checkBodyLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && !hide && !isLocked && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Scroll to top of page"
          title="Scroll to top"
          id="scroll-to-top-btn"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 p-3 sm:p-3.5 rounded-2xl bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] border border-[#DFCDB2] dark:border-[#354356] paper-shadow-md hover:paper-shadow-lift flex items-center justify-center cursor-pointer transition-[box-shadow,background-color] duration-200 group"
          style={{
            bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
          }}
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
