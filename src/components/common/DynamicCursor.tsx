import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface DynamicCursorProps {
  theme: 'light' | 'dark';
}

export const DynamicCursor: React.FC<DynamicCursorProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'input' | 'card' | 'default'>('default');

  // Motion values for instant pointer
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing follower
  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate for devices with a fine pointer (desktop / mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      if (interactive) {
        setIsHovering(true);
        if (target.closest('input, textarea')) {
          setHoverType('input');
        } else if (target.closest('button, a, [role="button"]')) {
          setHoverType('button');
        } else {
          setHoverType('card');
        }
      } else {
        setIsHovering(false);
        setHoverType('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trailing Smooth Follower Ring */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className={`fixed top-0 left-0 rounded-full transition-colors duration-200 pointer-events-none ${
          isDark
            ? isHovering
              ? 'w-10 h-10 border-2 border-[#F59E0B] bg-[#F59E0B]/15 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
              : 'w-8 h-8 border border-[#60A5FA]/60 bg-[#60A5FA]/10 shadow-[0_0_12px_rgba(96,165,250,0.25)]'
            : isHovering
            ? 'w-10 h-10 border-2 border-[#C7622B] bg-[#C7622B]/15 shadow-[0_2px_10px_rgba(199,98,43,0.2)]'
            : 'w-7 h-7 border border-[#8C6D4C]/50 bg-[#8C6D4C]/5 shadow-xs'
        }`}
      >
        {/* Subtle crosshairs or tick indicators on hover */}
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-1 h-1 rounded-full ${
                isDark ? 'bg-[#F59E0B]' : 'bg-[#C7622B]'
              }`}
            />
          </div>
        )}
      </motion.div>

      {/* Primary Precision Stylus / Nib Cursor */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: 0,
          translateY: 0,
        }}
        animate={{
          scale: isClicking ? 0.85 : 1,
          rotate: isHovering ? -12 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 pointer-events-none"
      >
        {isDark ? (
          /* Dark Mode: Luminous Ink Stylus / Pen Tip */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transform -translate-x-1 -translate-y-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          >
            {/* Ink Nib Outline */}
            <path
              d="M3 3L10.5 20.5L13.5 13.5L20.5 10.5L3 3Z"
              fill="#182230"
              stroke="#F59E0B"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Luminous Inner Core */}
            <path
              d="M7 7L11 15L12.5 11.5L16 10L7 7Z"
              fill="#FDE68A"
              opacity="0.9"
            />
            {/* Precision Tip Point */}
            <circle cx="3.5" cy="3.5" r="1.5" fill="#60A5FA" />
          </svg>
        ) : (
          /* Light Mode: Elegant Craft Ink Fountain Pen Nib */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transform -translate-x-1 -translate-y-1 drop-shadow-[0_1px_3px_rgba(44,36,25,0.25)]"
          >
            {/* Handcrafted Ink Nib */}
            <path
              d="M3 3L10.5 20.5L13.5 13.5L20.5 10.5L3 3Z"
              fill="#FFFDF9"
              stroke="#2C2419"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            {/* Terracotta Ink Accent */}
            <path
              d="M7 7L11 15L12.5 11.5L16 10L7 7Z"
              fill="#C7622B"
              opacity="0.85"
            />
            {/* Precision Drafting Tip Point */}
            <circle cx="3.5" cy="3.5" r="1.5" fill="#2C2419" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
