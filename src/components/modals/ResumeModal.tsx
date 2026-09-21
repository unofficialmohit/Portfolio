import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, ExternalLink } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Lock background scroll when modal is open
  useBodyScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-full sm:max-w-4xl h-[94vh] sm:h-auto sm:max-h-[92vh] flex flex-col bg-[#FAF7EE] dark:bg-[#151921] border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden z-10 box-border"
        >
          {/* Header Bar */}
          <div className="w-full max-w-full flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#1A202C]/95 backdrop-blur-md shrink-0 gap-2 box-border">
            {/* Left Title & Info */}
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <div className="p-1.5 sm:p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3 className="font-display font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 truncate">
                    Mohit — Resume
                  </h3>
                  <span className="hidden sm:inline text-xs text-stone-500 dark:text-stone-400 shrink-0">
                    • Official
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 shrink-0">
                    2 Pages
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* External Raw PDF (Desktop) */}
              <a
                href="/Mohit_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex p-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer items-center justify-center"
                title="Open PDF in new tab"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Download PDF Button */}
              <a
                href="/Mohit_Resume.pdf"
                download="Mohit_Resume.pdf"
                id="resume-modal-download-btn"
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>
                  Download<span className="hidden sm:inline"> PDF</span>
                </span>
              </a>

              {/* Close Button - Prominently visible and styled */}
              <button
                onClick={onClose}
                id="resume-modal-close-btn"
                className="p-1.5 sm:p-2 rounded-xl bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
                title="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Sub-bar with Page Indicators & Quick Jump */}
          <div className="w-full max-w-full flex items-center justify-between px-3 sm:px-5 py-1.5 bg-stone-100/90 dark:bg-[#161a22]/90 border-b border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400 shrink-0 box-border">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500 shrink-0">
                Jump:
              </span>
              <button
                onClick={() =>
                  document
                    .getElementById("resume-page-1")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="px-2 py-0.5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 font-medium transition-colors cursor-pointer shrink-0"
              >
                Page 1
              </button>
              <span className="text-stone-300 dark:text-stone-700 shrink-0">•</span>
              <button
                onClick={() =>
                  document
                    .getElementById("resume-page-2")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="px-2 py-0.5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 font-medium transition-colors cursor-pointer shrink-0"
              >
                Page 2
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono text-stone-500 dark:text-stone-400 shrink-0">
              <a
                href="/Mohit_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline"
                title="Open Raw PDF in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Raw PDF</span>
              </a>
            </div>
          </div>

          {/* Printable & Scrollable 2-Page Resume Sheet View */}
          <div className="w-full max-w-full flex-1 overflow-y-auto overscroll-contain p-2 sm:p-6 md:p-8 bg-stone-200/70 dark:bg-stone-950/60 space-y-4 sm:space-y-6 box-border">
            {/* ================= PAGE 1 ================= */}
            <div
              id="resume-page-1"
              className="w-full max-w-full sm:max-w-3xl mx-auto p-3.5 sm:p-8 md:p-9 bg-white text-stone-900 rounded-xl shadow-md border border-stone-200 font-sans text-xs leading-relaxed relative print:shadow-none print:border-none print:p-0 print:m-0 overflow-hidden box-border"
            >
              {/* Page Number Flag */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-6 text-[10px] font-mono text-stone-400 select-none">
                Page 1 of 2
              </div>

              {/* Header */}
              <div className="border-b-2 border-stone-900 pb-3 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 uppercase font-sans">
                  MOHIT
                </h1>
                <p className="text-sm sm:text-base font-bold text-stone-800 tracking-wide mt-0.5">
                  Full-Stack Developer
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[11px] text-stone-600 mt-2 font-mono">
                  <span className="whitespace-nowrap">Chandigarh, India</span>
                  <span className="text-stone-400">•</span>
                  <a
                    href="tel:+917850980009"
                    className="text-stone-700 hover:text-stone-950 hover:underline whitespace-nowrap"
                  >
                    +91 7850980009
                  </a>
                  <span className="text-stone-400">•</span>
                  <a
                    href="mailto:mohitgujjar2121@gmail.com"
                    className="text-blue-700 hover:underline font-semibold break-all"
                  >
                    mohitgujjar2121@gmail.com
                  </a>
                  <span className="text-stone-400">•</span>
                  <div className="inline-flex items-center gap-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      GitHub
                    </a>
                    <span className="text-stone-400">•</span>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* PROFESSIONAL SUMMARY */}
              <div className="mt-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-[11px] sm:text-[11.5px] text-stone-700 leading-normal text-left sm:text-justify">
                  Full-Stack Developer with approximately 3 years of
                  professional experience building production-grade mobile, web,
                  and backend applications. Proficient in delivering scalable
                  solutions using React Native, React.js, Next.js, Node.js, and
                  Express.js. Experienced in developing multi-tenant SaaS
                  platforms, microservices architectures, and REST APIs,
                  alongside implementing Server-Side Rendering (SSR), technical
                  SEO, and mobile deployment pipelines. Adept at
                  cross-functional collaboration, third-party integrations, and
                  resolving complex production issues to deliver robust
                  applications.
                </p>
              </div>

              {/* TECHNICAL SKILLS */}
              <div className="mt-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  TECHNICAL SKILLS
                </h2>
                <div className="text-[11px] sm:text-[11.5px] space-y-1 text-stone-800 leading-snug break-words">
                  <p>
                    <span className="font-bold text-stone-950">Languages:</span>{" "}
                    JavaScript (ES6+), TypeScript, Python
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">
                      Frontend / Web:
                    </span>{" "}
                    React.js, Next.js, Server-Side Rendering (SSR), Dynamic SEO,
                    Metadata, JSON-LD, Structured Data, MUI, MUI DataGrid,
                    Recharts, Framer Motion
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">
                      Mobile Development:
                    </span>{" "}
                    React Native, React Native Reanimated, Android Flavors, iOS
                    Schemes, OTA Updates
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">Backend:</span>{" "}
                    Node.js, Express.js, NestJS, REST APIs, Microservices
                    Architecture
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">
                      State Management & Forms:
                    </span>{" "}
                    Redux Toolkit, RTK Query, Zustand, TanStack Query, React
                    Hook Form, Zod
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">Databases:</span>{" "}
                    MongoDB, PostgreSQL, MySQL
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">
                      Architecture & Tools:
                    </span>{" "}
                    Turborepo, Monorepo Architecture, Multi-Tenant SaaS,
                    Microservices, Git, PM2, pgAdmin 4
                  </p>
                  <p>
                    <span className="font-bold text-stone-950">
                      Cloud & Integrations:
                    </span>{" "}
                    AWS, Firebase, Stripe, Google Maps APIs, Google OAuth,
                    LinkedIn OAuth, Google reCAPTCHA, Google Analytics, Facebook
                    Pixel, LinkedIn Insight Tag
                  </p>
                </div>
              </div>

              {/* WORK EXPERIENCE */}
              <div className="mt-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  WORK EXPERIENCE
                </h2>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2 text-xs">
                    <span className="font-bold text-stone-950 text-[11.5px] sm:text-[12px]">
                      Apptunix — Full-Stack Developer
                    </span>
                    <span className="font-mono text-stone-600 text-[10px] sm:text-[11px] shrink-0">
                      Jan 2024 – Present
                    </span>
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed production-grade React Native mobile
                      applications and responsive web applications utilizing
                      React.js and Next.js.
                    </li>
                    <li>
                      Engineered and integrated robust REST APIs using Node.js
                      and Express.js, seamlessly working across frontend and
                      backend codebases based on project requirements.
                    </li>
                    <li>
                      Contributed to the development of SaaS and multi-tenant
                      application architectures, as well as microservices-based
                      Node.js backends within Turborepo and monorepo
                      environments.
                    </li>
                    <li>
                      Configured mobile deployment workflows, implementing
                      Android Flavors, iOS Schemes, and Over-The-Air (OTA)
                      updates for React Native applications.
                    </li>
                    <li>
                      Implemented Server-Side Rendering (SSR), technical SEO,
                      metadata, and JSON-LD structured data in Next.js
                      applications to enhance discoverability.
                    </li>
                    <li>
                      Integrated diverse third-party services, including
                      authentication providers (Google, LinkedIn), payment
                      gateways (Stripe), mapping services, and tracking
                      platforms.
                    </li>
                    <li>
                      Maintained existing production applications utilizing
                      PostgreSQL and MongoDB, utilizing pgAdmin 4 to debug and
                      resolve complex production issues.
                    </li>
                    <li>
                      Collaborated directly with UI/UX designers, QA engineers,
                      and cross-functional teams; participated in technical
                      architecture discussions and mentored junior developers.
                    </li>
                    <li>
                      Communicated requirements and technical implementations
                      effectively with clients.
                    </li>
                  </ul>
                </div>
              </div>

              {/* OPEN SOURCE PROJECTS */}
              <div className="mt-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  OPEN SOURCE PROJECTS
                </h2>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2 text-xs">
                    <span className="font-bold text-stone-950 text-[11px] sm:text-[11.5px]">
                      rn-snappy-toast — Creator & Maintainer | React Native •
                      npm Package
                    </span>
                    <span className="text-[10px] font-mono text-stone-600 shrink-0">
                      GitHub Repository • npm Package
                    </span>
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed and published a lightweight, customizable,
                      zero-dependency toast notification library for React
                      Native.
                    </li>
                    <li>
                      Implemented dynamic queue handling, swipe-to-dismiss
                      gestures, custom positioning, and smooth animations
                      optimized for modern React Native architecture.
                    </li>
                    <li>
                      Maintained TypeScript typings, comprehensive
                      documentation, and npm package releases for developer
                      usability.
                    </li>
                  </ul>
                </div>
              </div>

              {/* PROJECTS (Page 1 Start) */}
              <div className="mt-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  PROJECTS
                </h2>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2 text-xs">
                    <span className="font-bold text-stone-950 text-[11px] sm:text-[11.5px]">
                      MindBase Apps (Student & Tutor) — Live | React Native •
                      SaaS
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-600 font-mono mt-0.5 break-words">
                    Student: Google Play | App Store • Tutor: Google Play | App
                    Store
                  </p>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed a multi-tenant SaaS scheduling platform
                      comprising separate Student and Tutor applications to
                      schedule sessions between students and teachers.
                    </li>
                    <li>
                      Implemented parent onboarding within the student app,
                      enabling parents to manage children accounts within
                      defined account limits.
                    </li>
                    <li>
                      Configured advanced mobile build workflows using Android
                      Flavors and iOS Schemes to generate separate
                      tenant-specific binaries from a single codebase.
                    </li>
                    <li>
                      Resolved lack of browser origins in mobile runtimes by
                      defining custom origin handling managed via environment
                      configurations for dynamic tenant data synchronization.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ================= PAGE 2 ================= */}
            <div
              id="resume-page-2"
              className="w-full max-w-full sm:max-w-3xl mx-auto p-3.5 sm:p-8 md:p-9 bg-white text-stone-900 rounded-xl shadow-md border border-stone-200 font-sans text-xs leading-relaxed relative print:shadow-none print:border-none print:p-0 print:m-0 overflow-hidden box-border"
            >
              {/* Page Number Flag */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-6 text-[10px] font-mono text-stone-400 select-none">
                Page 2 of 2
              </div>

              {/* Header Mini / Continuation */}
              <div className="border-b border-stone-300 pb-2 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-stone-900 uppercase text-[10.5px] sm:text-[11px]">
                  MOHIT — Full-Stack Developer
                </span>
                <span className="text-[10px] font-mono text-stone-500 break-all sm:break-normal">
                  mohitgujjar2121@gmail.com • +91 7850980009
                </span>
              </div>

              {/* PROJECTS CONTINUED */}
              <div className="space-y-3 sm:space-y-3.5">
                {/* Women First Jobs */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Women First Jobs — Live | React Native • Next.js • React.js
                    • Dynamic SEO
                  </div>
                  <p className="text-[10px] text-stone-600 font-mono break-words">
                    Google Play • App Store • Live Website
                  </p>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Delivered a comprehensive job platform featuring an
                      employee-focused mobile app, dual employer/employee
                      website workflows, and an administrative panel.
                    </li>
                    <li>
                      Implemented dynamic Server-Side Rendering (SSR) across
                      public job listings and dynamic Open Graph metadata on
                      detail pages for rich sharing previews.
                    </li>
                    <li>
                      Managed URL-based SEO controls through the admin dashboard
                      and implemented JSON-LD structured schemas for enhanced
                      search indexing.
                    </li>
                    <li>
                      Integrated Google Analytics, Facebook Pixel, LinkedIn
                      Insight Tag, Google reCAPTCHA, Google OAuth (including
                      floated login handling), and LinkedIn login workflows.
                    </li>
                  </ul>
                </div>

                {/* NutraCoin */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    NutraCoin — Live | React Native • Digital Asset
                  </div>
                  <p className="text-[10px] text-stone-600 font-mono break-words">
                    Google Play • App Store
                  </p>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed a digital asset mobile application providing a
                      non-custodial wallet experience tailored for a specific
                      user group.
                    </li>
                  </ul>
                </div>

                {/* Sanad Roadside Assistance */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Sanad Roadside Assistance (Sanad Link & Sanad Link Ops) — In
                    Progress | React Native • Location Tracking • Stripe
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed customer and driver operations React Native
                      applications enabling users to request real-time roadside
                      assistance with in-app payments.
                    </li>
                    <li>
                      Integrated live location tracking, native splash screen
                      handling, and an Over-The-Air (OTA) update workflow using
                      GitHub with silent push notifications and modal
                      confirmations.
                    </li>
                  </ul>
                </div>

                {/* Bouteek */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Bouteek — In Progress | Node.js • Express.js • Turborepo •
                    PostgreSQL • Microservices
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Contributed exclusively to the backend development of an
                      ongoing multi-service platform encompassing an admin
                      panel, vendor panel, user app, and website.
                    </li>
                    <li>
                      Developed and debugged REST APIs within an established
                      Turborepo-based monorepo architecture utilizing multiple
                      microservices running under separate PM2 processes.
                    </li>
                    <li>
                      Maintained PostgreSQL-backed services, utilizing pgAdmin 4
                      to inspect database structures, investigate issues, and
                      resolve backend bugs.
                    </li>
                  </ul>
                </div>

                {/* Yotman */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Yotman — In Progress | React.js • Python • Django
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Worked on the specialist website for this project and
                      provided support for the Python backend, including
                      development, maintenance, and issue resolution.
                    </li>
                  </ul>
                </div>

                {/* Anemomylos Travel */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Anemomylos Travel — Deployment Stage | Next.js • React.js •
                    SSR
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed a tour guide booking platform with a React-based
                      admin panel and a public Next.js website.
                    </li>
                    <li>
                      Implemented dynamic date-range pricing along with
                      fixed-date pricing options, Server-Side Rendering (SSR)
                      for public listings, Open Graph metadata, and JSON-LD
                      schemas.
                    </li>
                  </ul>
                </div>

                {/* GoGreek Website */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    GoGreek Website — In Progress | Next.js • SSR • Framer
                    Motion
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Built an interactive yogurt ordering website featuring a
                      custom yogurt creation flow where users select custom
                      flavors and toppings.
                    </li>
                    <li>
                      Utilized Framer Motion to visualize live customization
                      updates on the interactive cup UI while maintaining full
                      Server-Side Rendering across public listings.
                    </li>
                  </ul>
                </div>

                {/* Whizzo AI */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Whizzo AI — Completed (Client Deployment on Hold) | React.js
                    • AI Workflows • Fabric.js
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed a React.js web application and admin panel with
                      AI features for generating presentations from prompts and
                      editing content prior to download.
                    </li>
                    <li>
                      Implemented document tools for removing pages from PDFs
                      and converting file formats, alongside a canvas-based
                      note-taking section using Fabric.js for text and image
                      placement.
                    </li>
                  </ul>
                </div>

                {/* Gina Ex */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Gina Ex — Live | React.js • MUI DataGrid
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Developed an administrative panel for Gina Ex, a platform
                      enabling traveling users to transport parcels for other
                      users for a fee.
                    </li>
                    <li>
                      Implemented Material UI and MUI DataGrid for
                      high-performance handling, sorting, and filtering of
                      structured platform tables.
                    </li>
                  </ul>
                </div>

                {/* Life Fit */}
                <div>
                  <div className="font-bold text-stone-950 text-[11px] sm:text-[11.5px] break-words">
                    Life Fit — Live | React.js • API Integration
                  </div>
                  <ul className="mt-1 list-disc list-outside pl-4 space-y-0.75 text-[10.5px] sm:text-[11px] text-stone-700 leading-normal break-words">
                    <li>
                      Built an administrative dashboard for Life Fit, a platform
                      providing users with fitness resources such as calorie
                      counters and diet plans.
                    </li>
                    <li>
                      Engineered reusable UI components and integrated
                      administrative REST APIs to manage nutrition programs and
                      user tracking features.
                    </li>
                  </ul>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="mt-4 pt-3 border-t border-stone-300">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1.5">
                  EDUCATION
                </h2>
                <div className="space-y-2 sm:space-y-1 text-[11px] text-stone-800">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2">
                    <span className="leading-snug">
                      <strong className="font-bold text-stone-950">
                        Master of Computer Applications (MCA)
                      </strong>{" "}
                      — Panjab University, Sector 14, Chandigarh (80%)
                    </span>
                    <span className="font-mono text-stone-600 text-[10px] sm:text-[11px] shrink-0">
                      2022 - 2024
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2">
                    <span className="leading-snug">
                      <strong className="font-bold text-stone-950">
                        Bachelor of Computer Applications (BCA)
                      </strong>{" "}
                      — DAV College, Sector 10, Chandigarh (80%)
                    </span>
                    <span className="font-mono text-stone-600 text-[10px] sm:text-[11px] shrink-0">
                      2019 - 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* INTERESTS */}
              <div className="mt-3 pt-2 border-t border-stone-300">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1 mb-1">
                  INTERESTS
                </h2>
                <p className="text-[11px] text-stone-700">
                  Open-source development, Exploring new technologies,
                  Photography
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
