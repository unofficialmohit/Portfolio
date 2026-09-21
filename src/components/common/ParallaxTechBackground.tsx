import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

// Crisp, high-fidelity SVG icons for core programming languages and frameworks
export const TechIcons = {
  typescript: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M7 8h6M10 8v8" />
      <path d="M14 15c.5.7 1.2 1 2.2 1 1.2 0 1.8-.6 1.8-1.3 0-1-.8-1.3-1.8-1.6-1.4-.4-2.2-.9-2.2-2.1 0-1.2 1-2 2.2-2 1 0 1.7.4 2.2 1.1" />
    </svg>
  ),
  javascript: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M8 11v4.5c0 .8-.5 1.5-1.5 1.5-.7 0-1.2-.4-1.5-1" />
      <path d="M13 15.5c.6.6 1.3.9 2.2.9 1.2 0 1.8-.6 1.8-1.3 0-.9-.7-1.3-1.7-1.6-1.3-.4-2.3-.8-2.3-2 0-1.2 1-2 2.2-2 1 0 1.6.4 2.1 1" />
    </svg>
  ),
  python: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2c-3.3 0-5.5 1.5-5.5 3.5v2h5.5v1H5C3.2 8.5 2 10 2 12.2c0 2.3 1.3 3.8 3.5 3.8h1.5v-1.8c0-1.8 1.5-3.2 3.5-3.2h5V9.5C15.5 4.5 14 2 12 2z" />
      <circle cx="8.5" cy="5.2" r=".8" fill="currentColor" />
      <path d="M12 22c3.3 0 5.5-1.5 5.5-3.5v-2h-5.5v-1H19c1.8 0 3-1.5 3-3.7 0-2.3-1.3-3.8-3.5-3.8h-1.5v1.8c0 1.8-1.5 3.2-3.5 3.2h-5v1.5C8.5 19.5 10 22 12 22z" />
      <circle cx="15.5" cy="18.8" r=".8" fill="currentColor" />
    </svg>
  ),
  react: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  nextjs: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8v8M8 8l8.5 10.5" />
      <path d="M16 8v4" />
    </svg>
  ),
  nodejs: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z" />
      <path d="M12 6.5l5 2.9v5.8l-5 2.9-5-2.9V9.4l5-2.9z" />
      <path d="M12 6.5v11.6" />
    </svg>
  ),
  nestjs: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z" />
      <path d="M9 10l3-3 3 3M12 7v10" />
    </svg>
  ),
  postgresql: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3c-4.5 0-8 2.2-8 6 0 2.2 1.2 4.2 3.2 5.2-.2 1.2-.7 2.3-1.7 3.3 1.8 0 3.5-.8 4.5-2.1 1 .4 2.2.6 3.5.6 5 0 8.5-2.8 8.5-6.5S17 3 12 3z" />
      <path d="M9 11a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
      <path d="M15 11a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
      <path d="M10 14c1 1 3 1 4 0" />
    </svg>
  ),
  mongodb: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s-6 5.5-6 11.5c0 4 2.5 7.5 6 8.5 3.5-1 6-4.5 6-8.5C18 7.5 12 2 12 2z" />
      <path d="M12 2v20" />
    </svg>
  ),
  django: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M10 6v10c0 2-1 3-3 3H6" />
      <circle cx="10" cy="9" r="3" />
      <path d="M16 9v9" />
    </svg>
  ),
  git: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="9" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M6 9v6" />
      <path d="M9 6h3a3 3 0 013 3v0" />
    </svg>
  ),
  redux: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17.5c-2.5-1.5-3.5-4-2.5-6.5 1-2.5 3.5-3.5 6-3 1.5.3 2.8 1.2 3.5 2.5" />
      <path d="M17 6.5c2.5 1.5 3.5 4 2.5 6.5-1 2.5-3.5 3.5-6 3-1.5-.3-2.8-1.2-3.5-2.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  tailwind: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6.5 12c1.2-2.4 2.8-3.6 4.8-3.6 3 0 3.8 2.2 5.5 2.2 1.2 0 2.2-.8 3.2-2.4-1.2 2.4-2.8 3.6-4.8 3.6-3 0-3.8-2.2-5.5-2.2-1.2 0-2.2.8-3.2 2.4z" />
      <path d="M2.5 17c1.2-2.4 2.8-3.6 4.8-3.6 3 0 3.8 2.2 5.5 2.2 1.2 0 2.2-.8 3.2-2.4-1.2 2.4-2.8 3.6-4.8 3.6-3 0-3.8-2.2-5.5-2.2-1.2 0-2.2.8-3.2 2.4z" />
    </svg>
  ),
  graphql: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12,2 21,7.5 21,17.5 12,23 3,17.5 3,7.5" />
      <polygon points="12,6 18,9.5 18,15.5 12,19 6,15.5 6,9.5" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      <circle cx="21" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="21" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="23" r="1.5" fill="currentColor" />
      <circle cx="3" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="3" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  docker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 13.5c1-1 3-1.5 5-1.5 3 0 5 2 8 2 2.5 0 4.5-.8 5.5-2 1 2 .5 5-1.5 6.5-2.5 1.5-6 1.5-9.5 1-3-.5-5.5-2-7.5-6z" />
      <rect x="5" y="8" width="2.5" height="2.5" rx=".3" />
      <rect x="8.5" y="8" width="2.5" height="2.5" rx=".3" />
      <rect x="12" y="8" width="2.5" height="2.5" rx=".3" />
      <rect x="8.5" y="4.5" width="2.5" height="2.5" rx=".3" />
    </svg>
  ),
};

type TechKey = keyof typeof TechIcons;

interface ParallaxItem {
  id: string;
  name: string;
  icon: TechKey;
  xPercent: number; // 0 to 100
  topPx: number; // absolute Y position down the entire document
  size: number; // px
  rotation: number; // deg
  opacity: number;
  layer: 1 | 2 | 3; // depth layer for distinct parallax speeds
}

// Staggered throughout the entire length of the page (~0px to ~6500px+)
const PARALLAX_ITEMS: ParallaxItem[] = [
  // ================= LAYER 1 (Gentle Slow Parallax) =================
  { id: 'l1-ts-1', name: 'TypeScript', icon: 'typescript', xPercent: 7, topPx: 140, size: 42, rotation: -8, opacity: 0.16, layer: 1 },
  { id: 'l1-node-1', name: 'Node.js', icon: 'nodejs', xPercent: 82, topPx: 420, size: 42, rotation: 8, opacity: 0.15, layer: 1 },
  { id: 'l1-py-1', name: 'Python', icon: 'python', xPercent: 10, topPx: 820, size: 40, rotation: 12, opacity: 0.15, layer: 1 },
  { id: 'l1-js-1', name: 'JavaScript', icon: 'javascript', xPercent: 92, topPx: 1180, size: 44, rotation: -10, opacity: 0.17, layer: 1 },
  { id: 'l1-tw-1', name: 'Tailwind CSS', icon: 'tailwind', xPercent: 6, topPx: 1540, size: 46, rotation: 6, opacity: 0.16, layer: 1 },
  { id: 'l1-mongo-1', name: 'MongoDB', icon: 'mongodb', xPercent: 93, topPx: 1980, size: 42, rotation: 14, opacity: 0.16, layer: 1 },
  { id: 'l1-git-1', name: 'Git', icon: 'git', xPercent: 8, topPx: 2380, size: 40, rotation: -12, opacity: 0.15, layer: 1 },
  { id: 'l1-docker-1', name: 'Docker', icon: 'docker', xPercent: 90, topPx: 2780, size: 44, rotation: 8, opacity: 0.16, layer: 1 },
  { id: 'l1-node-2', name: 'Node.js', icon: 'nodejs', xPercent: 11, topPx: 3180, size: 42, rotation: -8, opacity: 0.15, layer: 1 },
  { id: 'l1-django-1', name: 'Django', icon: 'django', xPercent: 88, topPx: 3580, size: 40, rotation: 10, opacity: 0.16, layer: 1 },
  { id: 'l1-redux-1', name: 'Redux', icon: 'redux', xPercent: 7, topPx: 3980, size: 44, rotation: -14, opacity: 0.16, layer: 1 },
  { id: 'l1-ts-2', name: 'TypeScript', icon: 'typescript', xPercent: 92, topPx: 4380, size: 46, rotation: 12, opacity: 0.17, layer: 1 },
  { id: 'l1-py-2', name: 'Python', icon: 'python', xPercent: 9, topPx: 4780, size: 42, rotation: -8, opacity: 0.15, layer: 1 },
  { id: 'l1-git-2', name: 'Git', icon: 'git', xPercent: 91, topPx: 5180, size: 40, rotation: 14, opacity: 0.16, layer: 1 },
  { id: 'l1-gql-1', name: 'GraphQL', icon: 'graphql', xPercent: 8, topPx: 5580, size: 42, rotation: -10, opacity: 0.15, layer: 1 },
  { id: 'l1-nest-1', name: 'NestJS', icon: 'nestjs', xPercent: 89, topPx: 5980, size: 44, rotation: 8, opacity: 0.16, layer: 1 },
  { id: 'l1-react-1', name: 'React', icon: 'react', xPercent: 12, topPx: 6380, size: 46, rotation: -12, opacity: 0.16, layer: 1 },

  // ================= LAYER 2 (Mid-Depth Moderate Parallax) =================
  { id: 'l2-py-1', name: 'Python', icon: 'python', xPercent: 15, topPx: 290, size: 48, rotation: 10, opacity: 0.18, layer: 2 },
  { id: 'l2-nest-1', name: 'NestJS', icon: 'nestjs', xPercent: 86, topPx: 680, size: 48, rotation: -12, opacity: 0.17, layer: 2 },
  { id: 'l2-redux-1', name: 'Redux', icon: 'redux', xPercent: 8, topPx: 1080, size: 46, rotation: 14, opacity: 0.17, layer: 2 },
  { id: 'l2-gql-1', name: 'GraphQL', icon: 'graphql', xPercent: 90, topPx: 1440, size: 48, rotation: -10, opacity: 0.18, layer: 2 },
  { id: 'l2-django-1', name: 'Django', icon: 'django', xPercent: 14, topPx: 1840, size: 46, rotation: 8, opacity: 0.17, layer: 2 },
  { id: 'l2-ts-1', name: 'TypeScript', icon: 'typescript', xPercent: 85, topPx: 2240, size: 50, rotation: -14, opacity: 0.19, layer: 2 },
  { id: 'l2-pg-1', name: 'PostgreSQL', icon: 'postgresql', xPercent: 9, topPx: 2640, size: 48, rotation: 12, opacity: 0.18, layer: 2 },
  { id: 'l2-react-1', name: 'React', icon: 'react', xPercent: 92, topPx: 3040, size: 52, rotation: -16, opacity: 0.19, layer: 2 },
  { id: 'l2-tw-1', name: 'Tailwind CSS', icon: 'tailwind', xPercent: 13, topPx: 3440, size: 48, rotation: 10, opacity: 0.18, layer: 2 },
  { id: 'l2-next-1', name: 'Next.js', icon: 'nextjs', xPercent: 87, topPx: 3840, size: 46, rotation: -8, opacity: 0.17, layer: 2 },
  { id: 'l2-mongo-1', name: 'MongoDB', icon: 'mongodb', xPercent: 10, topPx: 4240, size: 48, rotation: 14, opacity: 0.18, layer: 2 },
  { id: 'l2-docker-1', name: 'Docker', icon: 'docker', xPercent: 88, topPx: 4640, size: 46, rotation: -10, opacity: 0.17, layer: 2 },
  { id: 'l2-js-1', name: 'JavaScript', icon: 'javascript', xPercent: 14, topPx: 5040, size: 48, rotation: 8, opacity: 0.18, layer: 2 },
  { id: 'l2-nest-2', name: 'NestJS', icon: 'nestjs', xPercent: 86, topPx: 5440, size: 50, rotation: -12, opacity: 0.18, layer: 2 },
  { id: 'l2-pg-2', name: 'PostgreSQL', icon: 'postgresql', xPercent: 11, topPx: 5840, size: 48, rotation: 14, opacity: 0.17, layer: 2 },
  { id: 'l2-node-1', name: 'Node.js', icon: 'nodejs', xPercent: 90, topPx: 6240, size: 46, rotation: -8, opacity: 0.18, layer: 2 },
  { id: 'l2-ts-2', name: 'TypeScript', icon: 'typescript', xPercent: 15, topPx: 6640, size: 48, rotation: 10, opacity: 0.18, layer: 2 },

  // ================= LAYER 3 (Foreground Dynamic Parallax) =================
  { id: 'l3-react-1', name: 'React', icon: 'react', xPercent: 92, topPx: 190, size: 56, rotation: 16, opacity: 0.22, layer: 3 },
  { id: 'l3-next-1', name: 'Next.js', icon: 'nextjs', xPercent: 6, topPx: 570, size: 50, rotation: -14, opacity: 0.20, layer: 3 },
  { id: 'l3-nest-1', name: 'NestJS', icon: 'nestjs', xPercent: 91, topPx: 970, size: 52, rotation: 12, opacity: 0.20, layer: 3 },
  { id: 'l3-pg-1', name: 'PostgreSQL', icon: 'postgresql', xPercent: 7, topPx: 1370, size: 54, rotation: -16, opacity: 0.21, layer: 3 },
  { id: 'l3-rn-1', name: 'React Native', icon: 'react', xPercent: 93, topPx: 1770, size: 58, rotation: 20, opacity: 0.22, layer: 3 },
  { id: 'l3-docker-1', name: 'Docker', icon: 'docker', xPercent: 6, topPx: 2170, size: 50, rotation: -12, opacity: 0.19, layer: 3 },
  { id: 'l3-redux-1', name: 'Redux', icon: 'redux', xPercent: 90, topPx: 2570, size: 52, rotation: 15, opacity: 0.20, layer: 3 },
  { id: 'l3-ts-1', name: 'TypeScript', icon: 'typescript', xPercent: 8, topPx: 2970, size: 54, rotation: -10, opacity: 0.21, layer: 3 },
  { id: 'l3-gql-1', name: 'GraphQL', icon: 'graphql', xPercent: 92, topPx: 3370, size: 52, rotation: 16, opacity: 0.20, layer: 3 },
  { id: 'l3-py-1', name: 'Python', icon: 'python', xPercent: 6, topPx: 3770, size: 54, rotation: -14, opacity: 0.21, layer: 3 },
  { id: 'l3-node-1', name: 'Node.js', icon: 'nodejs', xPercent: 91, topPx: 4170, size: 52, rotation: 12, opacity: 0.20, layer: 3 },
  { id: 'l3-react-2', name: 'React', icon: 'react', xPercent: 7, topPx: 4570, size: 56, rotation: -16, opacity: 0.22, layer: 3 },
  { id: 'l3-next-2', name: 'Next.js', icon: 'nextjs', xPercent: 93, topPx: 4970, size: 50, rotation: 14, opacity: 0.20, layer: 3 },
  { id: 'l3-mongo-1', name: 'MongoDB', icon: 'mongodb', xPercent: 8, topPx: 5370, size: 52, rotation: -12, opacity: 0.20, layer: 3 },
  { id: 'l3-django-1', name: 'Django', icon: 'django', xPercent: 92, topPx: 5770, size: 50, rotation: 14, opacity: 0.19, layer: 3 },
  { id: 'l3-tw-1', name: 'Tailwind CSS', icon: 'tailwind', xPercent: 6, topPx: 6170, size: 52, rotation: -10, opacity: 0.20, layer: 3 },
  { id: 'l3-react-3', name: 'React', icon: 'react', xPercent: 91, topPx: 6570, size: 54, rotation: 15, opacity: 0.21, layer: 3 },
];

export const ParallaxTechBackground: React.FC = () => {
  // Track page scroll progress exclusively (NO cursor/mouse interaction)
  const { scrollY } = useScroll();

  // Multi-tier parallax transforms based purely on scroll:
  // Layer 1 moves at gentle rate (+0.09 of scroll)
  const yLayer1Raw = useTransform(scrollY, (v) => v * 0.09);
  // Layer 2 moves at moderate rate (-0.14 of scroll)
  const yLayer2Raw = useTransform(scrollY, (v) => -v * 0.14);
  // Layer 3 moves at dynamic rate (-0.24 of scroll)
  const yLayer3Raw = useTransform(scrollY, (v) => -v * 0.24);

  // Springs for silky-smooth motion without micro-jitter
  const yLayer1 = useSpring(yLayer1Raw, { stiffness: 65, damping: 20 });
  const yLayer2 = useSpring(yLayer2Raw, { stiffness: 60, damping: 18 });
  const yLayer3 = useSpring(yLayer3Raw, { stiffness: 55, damping: 16 });

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* ================= LAYER 1: Deep Slow Parallax ================= */}
      <motion.div
        style={{ y: yLayer1 }}
        className="absolute inset-0 w-full h-full"
      >
        {PARALLAX_ITEMS.filter((item) => item.layer === 1).map((item) => {
          const IconComponent = TechIcons[item.icon];
          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-500 hover:scale-125"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.topPx}px`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              <div
                className="text-[#8C7658] dark:text-[#60A5FA]"
                style={{
                  opacity: item.opacity,
                  width: item.size,
                  height: item.size,
                }}
              >
                <IconComponent className="w-full h-full" />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ================= LAYER 2: Mid-Depth Moderate Parallax ================= */}
      <motion.div
        style={{ y: yLayer2 }}
        className="absolute inset-0 w-full h-full"
      >
        {PARALLAX_ITEMS.filter((item) => item.layer === 2).map((item) => {
          const IconComponent = TechIcons[item.icon];
          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-500 hover:scale-125"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.topPx}px`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              <div
                className="text-[#C7622B] dark:text-[#38BDF8]"
                style={{
                  opacity: item.opacity,
                  width: item.size,
                  height: item.size,
                }}
              >
                <IconComponent className="w-full h-full" />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ================= LAYER 3: Foreground Fast Parallax & Glowing Badges ================= */}
      <motion.div
        style={{ y: yLayer3 }}
        className="absolute inset-0 w-full h-full"
      >
        {PARALLAX_ITEMS.filter((item) => item.layer === 3).map((item) => {
          const IconComponent = TechIcons[item.icon];
          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-500 hover:scale-125"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.topPx}px`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              <div
                className="p-2 rounded-2xl bg-amber-900/5 dark:bg-sky-400/5 backdrop-blur-[0.5px] border border-stone-400/10 dark:border-sky-400/15 shadow-xs"
                style={{
                  opacity: item.opacity,
                  width: item.size + 12,
                  height: item.size + 12,
                }}
              >
                <IconComponent className="w-full h-full text-[#92400E] dark:text-[#7DD3FC]" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
