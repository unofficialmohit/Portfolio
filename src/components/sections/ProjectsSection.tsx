import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  FolderGit2,
  Search,
  X,
  CheckCircle2,
  Package,
  Smartphone,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Lock background scroll when project modal is open
  useBodyScrollLock(activeProjectModal !== null);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="scroll-mt-24 sm:scroll-mt-28 relative py-20 md:py-28 bg-[#FBF8F3] dark:bg-[#13161C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E2D5BE] dark:border-[#2C384A] text-xs font-semibold uppercase tracking-widest text-[#8C6036] dark:text-[#E59560] mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
              <span>Chapter 02 • Works & Deployments</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2419] dark:text-[#E8DFD1] tracking-tight">
              Production Projects
            </h2>
            <p className="mt-2 text-base text-[#685744] dark:text-[#A79988] max-w-xl">
              Production-grade mobile apps, multi-tenant SaaS platforms, and full-stack web architectures.
            </p>
          </div>

          {/* Project Count Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-[#FFFDF9] dark:bg-[#1B222C] px-4 py-2 rounded-xl border border-[#E4D6BF] dark:border-[#2C384A] paper-shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] dark:bg-[#252E3C] border border-[#E0CFB6] dark:border-[#334255] flex items-center justify-center text-[#C7622B] dark:text-[#E59560]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#2C2419] dark:text-[#E8DFD1] block font-sans">
                {projects.length} Applications
              </span>
              <span className="text-[#80705E] dark:text-[#8E9CAE] font-sans text-[11px]">
                Filter by architecture or stack
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8DCC8] dark:border-[#252E3D]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] paper-shadow-sm font-semibold'
                    : 'bg-[#F2EADB] dark:bg-[#1F2633] text-[#5C4F3F] dark:text-[#B3A492] hover:bg-[#EADBCA] dark:hover:bg-[#273244]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7658] dark:text-[#7D8F9F]" />
            <input
              type="text"
              placeholder="Search tools, stacks, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F8F3EA] dark:bg-[#1A222D] border border-[#DFCDB7] dark:border-[#2C3848] text-xs sm:text-sm text-[#2C2419] dark:text-[#E8DFD1] placeholder-[#9E8E7A] dark:placeholder-[#6C7A8E] focus:outline-none focus:ring-2 focus:ring-[#C7622B]/30 focus:border-[#C7622B] dark:focus:border-[#E59560]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7658] hover:text-[#2C2419] dark:hover:text-[#E8DFD1]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-[#FFFDF9] dark:bg-[#1B222C] rounded-2xl border border-dashed border-[#DFCDB2] dark:border-[#2C384A]">
            <p className="font-handwriting text-2xl text-[#8C755D] dark:text-[#A79988]">
              No manuscripts found matching this criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#C7622B] dark:text-[#E59560] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D5BE] dark:border-[#2C384A] paper-shadow-md hover:paper-shadow-lift transition-all duration-300 paper-fold-tr"
              >
                {/* Washi tape accent on featured projects (positioned with safe margin to prevent clipping) */}
                {project.featured && (
                  <div className="absolute -top-3.5 left-6 px-3 py-0.5 washi-tape rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A5322] dark:text-[#FDE68A] flex items-center gap-1 shadow-xs z-10">
                    <Sparkles className="w-2.5 h-2.5 text-[#C7622B] dark:text-[#F59E0B]" />
                    <span>Featured</span>
                  </div>
                )}

                <div>
                  {/* Category & Paper Badge */}
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A06C3E] dark:text-[#E59560] bg-[#F5ECDC] dark:bg-[#252E3B] px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    {project.paperNote && (
                      <span className="text-[10px] font-handwriting text-[#B8581E] dark:text-[#F59E0B] font-bold">
                        {project.paperNote}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C2419] dark:text-[#E8DFD1] group-hover:text-[#A84A16] dark:group-hover:text-[#E59560] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#7C664F] dark:text-[#A89885] mb-3 leading-snug">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#504334] dark:text-[#BDB0A0] leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-1.5 mb-5 p-3 rounded-lg bg-[#FAF5EB] dark:bg-[#161B23] border border-[#EADBCA] dark:border-[#252E3D] text-xs text-[#5C4C3A] dark:text-[#AFA190]">
                    {project.highlights.slice(0, 2).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-[#C7622B] dark:text-[#E59560] mt-0.5 font-bold">✦</span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-[#F1E9DA] dark:bg-[#202835] border border-[#E3D7C2] dark:border-[#2E3A4B] text-[#5A4936] dark:text-[#C5B9A8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links: ONLY rn-snappy-toast has source code */}
                <div className="pt-4 border-t border-[#EDE1CF] dark:border-[#252E3D] flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* GitHub repository link (Only for rn-snappy-toast as requested) */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] text-xs font-semibold hover:opacity-90 transition-opacity"
                          title="View Open Source Code on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}

                      {/* npm package link */}
                      {project.npmUrl && (
                        <a
                          href={project.npmUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF3E8] dark:bg-[#252E3B] text-[#C7622B] dark:text-[#E59560] border border-[#DFCBB0] dark:border-[#354356] text-xs font-semibold hover:border-[#C7622B] transition-colors"
                          title="Inspect npm Package"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>npm</span>
                        </a>
                      )}

                      {/* App Store & Google Play links if available */}
                      {project.appLinks && project.appLinks.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.appLinks.map((link, lIdx) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF3E8] dark:bg-[#252E3B] text-[#4A3C2C] dark:text-[#D5CAD6] border border-[#DFCBB0] dark:border-[#354356] text-xs font-medium hover:border-[#C7622B] dark:hover:border-[#E59560] transition-colors"
                            >
                              {link.platform === 'web' ? (
                                <Globe className="w-3 h-3 text-[#C7622B] dark:text-[#E59560]" />
                              ) : (
                                <Smartphone className="w-3 h-3 text-[#C7622B] dark:text-[#E59560]" />
                              )}
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Detail inspect trigger */}
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="text-xs font-bold text-[#8C6036] dark:text-[#E59560] hover:text-[#2C2419] dark:hover:text-[#F3EFE6] underline decoration-dotted underline-offset-4 cursor-pointer ml-auto"
                    >
                      Examine →
                    </button>
                  </div>

                  {/* Proprietary client notice if not public */}
                  {project.proprietaryNotice && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8C765E] dark:text-[#8E9CAE]">
                      <Lock className="w-3 h-3 text-[#C7622B] dark:text-[#E59560] shrink-0" />
                      <span className="truncate">{project.proprietaryNotice}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Project Modal (Blueprint Inspector) */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2C2419]/60 dark:bg-black/75 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                className="relative max-w-2xl w-full p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#1A212B] border border-[#DFCDB5] dark:border-[#2C384A] paper-shadow-lift max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-[#F5ECE0] dark:bg-[#252E3C] text-[#5C4A35] dark:text-[#A89885] hover:text-[#2C2419] dark:hover:text-[#E8DFD1] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top washi tape */}
                <div className="w-32 h-5 washi-tape rounded-xs mx-auto -mt-3 mb-4" />

                <span className="text-xs font-mono uppercase tracking-widest text-[#A86632] dark:text-[#E59560] bg-[#F5ECDC] dark:bg-[#252E3B] px-2.5 py-1 rounded">
                  {activeProjectModal.category}
                </span>

                <h3 className="font-display text-3xl font-bold text-[#2C2419] dark:text-[#E8DFD1] mt-3 mb-1">
                  {activeProjectModal.title}
                </h3>
                <p className="text-base text-[#7A644D] dark:text-[#A89885] font-medium mb-4">
                  {activeProjectModal.tagline}
                </p>

                <p className="text-sm text-[#4E4132] dark:text-[#C4B7A6] leading-relaxed mb-6">
                  {activeProjectModal.description}
                </p>

                {/* All Highlights */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B5A46] dark:text-[#8E9CAE] mb-2.5">
                    Architectural Specifications & Deliverables:
                  </h4>
                  <div className="space-y-2">
                    {activeProjectModal.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#3E3326] dark:text-[#D5CAD6]">
                        <CheckCircle2 className="w-4 h-4 text-[#C7622B] dark:text-[#E59560] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B5A46] dark:text-[#8E9CAE] mb-2">
                    Technologies & Dependencies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[#F1E8D9] dark:bg-[#252E3C] border border-[#DFD1BE] dark:border-[#354356] text-xs font-mono text-[#4A3B2B] dark:text-[#D5CAD6]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notice if proprietary */}
                {activeProjectModal.proprietaryNotice && (
                  <div className="mb-6 p-3 rounded-xl bg-[#FAF3E8] dark:bg-[#202734] border border-[#E3D4BC] dark:border-[#2C384A] text-xs font-mono text-[#6A5741] dark:text-[#BDB0A0] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C7622B] dark:text-[#E59560] shrink-0" />
                    <span>{activeProjectModal.proprietaryNotice}</span>
                  </div>
                )}

                {/* Store Links & Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EDE1CF] dark:border-[#252E3D]">
                  {/* GitHub for rn-snappy-toast */}
                  {activeProjectModal.githubUrl && (
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] text-xs sm:text-sm font-semibold paper-shadow-sm hover:paper-shadow-md transition-all flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Inspect Repository</span>
                    </a>
                  )}

                  {/* npm link */}
                  {activeProjectModal.npmUrl && (
                    <a
                      href={activeProjectModal.npmUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#FAF3E8] dark:bg-[#252E3C] text-[#C7622B] dark:text-[#E59560] text-xs sm:text-sm font-semibold border border-[#DFCDB2] dark:border-[#354356] hover:bg-[#EDE1CE] dark:hover:bg-[#2C3848] transition-all flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>View on npm</span>
                    </a>
                  )}

                  {/* App Links (Google Play / App Store) */}
                  {activeProjectModal.appLinks?.map((link, aIdx) => (
                    <a
                      key={aIdx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#FFFDF9] dark:bg-[#202734] text-[#3E3121] dark:text-[#E8DFD1] text-xs sm:text-sm font-medium border border-[#DFCDB2] dark:border-[#354356] hover:border-[#C7622B] dark:hover:border-[#E59560] transition-all flex items-center gap-2"
                    >
                      {link.platform === 'web' ? (
                        <Globe className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
                      ) : (
                        <Smartphone className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
                      )}
                      <span>{link.label}</span>
                    </a>
                  ))}

                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="ml-auto text-xs font-medium text-[#7C664F] dark:text-[#A79988] hover:text-[#2C2419] dark:hover:text-[#FFFDF9] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
