import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';
import { EducationItem, ExperienceItem } from '../../types';

interface EducationSectionProps {
  education: EducationItem[];
  experience: ExperienceItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  experience,
}) => {
  return (
    <section
      id="education"
      className="scroll-mt-24 sm:scroll-mt-28 relative py-20 md:py-28 bg-[#F4EFE6]/60 dark:bg-[#151A22] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E2D5BE] dark:border-[#2C384A] text-xs font-semibold uppercase tracking-widest text-[#8C6036] dark:text-[#E59560] mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
              <span>Chapter 03 • Foundations & Milestones</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2419] dark:text-[#E8DFD1] tracking-tight">
              Education & Academia
            </h2>
            <p className="mt-2 text-base text-[#685744] dark:text-[#A79988] max-w-xl">
              Chronological milestones from theoretical computer science to industry engineering.
            </p>
          </div>

          {/* Academic distinction badge */}
          <div className="flex items-center gap-3 bg-[#FFFDF9] dark:bg-[#1C232E] px-4 py-2.5 rounded-xl border border-[#E3D6C1] dark:border-[#2C384A] paper-shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] dark:bg-[#252E3C] border border-[#E0CFB6] dark:border-[#354356] flex items-center justify-center text-[#C7622B] dark:text-[#E59560]">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#2C2419] dark:text-[#E8DFD1] block font-sans">
                80% Honors Score
              </span>
              <span className="text-[#80705E] dark:text-[#8E9CAE] font-sans text-[11px]">
                Panjab University & DAV College
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Academic Degrees Timeline */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-handwriting text-2xl text-[#8E4416] dark:text-[#E59560]">
                Academic Pedigree & Degrees
              </span>
            </div>

            {/* Vertical Paper Timeline with Connected Nodes */}
            <div className="relative ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-10">
              {/* Continuous Timeline Spine Line */}
              <div className="absolute left-0 top-3 bottom-3 w-0.5 border-l-2 border-dashed border-[#D5C4AC] dark:border-[#2E3B4E] -translate-x-1/2 pointer-events-none" />

              {education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(idx * 0.08, 0.25) }}
                  className="relative will-change-transform"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  {/* Bookmark marker on timeline line - exactly centered on spine */}
                  <div className="absolute -left-8 sm:-left-10 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FFFDF9] dark:bg-[#1C232E] border-2 border-[#C7622B] dark:border-[#E59560] flex items-center justify-center shadow-xs z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C7622B] dark:bg-[#E59560]" />
                  </div>

                  {/* Paper Card */}
                  <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D4BD] dark:border-[#2C384A] paper-shadow-md paper-fold-tr">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A06A3A] dark:text-[#E59560] bg-[#F7EFE1] dark:bg-[#252E3C] px-2.5 py-1 rounded">
                        {edu.period}
                      </span>
                      {edu.gpa && (
                        <span className="text-xs font-semibold text-[#16A34A] dark:text-[#4ADE80] bg-[#E8F5E9] dark:bg-[#1A3324] px-2.5 py-0.5 rounded-full">
                          Score: {edu.gpa}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#2C2419] dark:text-[#E8DFD1]">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#6C5944] dark:text-[#A89885] mb-1">
                      {edu.institution} • <span className="font-normal text-[#8A7761] dark:text-[#8E9CAE]">{edu.location}</span>
                    </p>
                    <p className="text-xs text-[#998772] dark:text-[#8E9CAE] font-mono mb-4">
                      {edu.field}
                    </p>

                    {/* Honors ribbon */}
                    {edu.honors && edu.honors.length > 0 && (
                      <div className="mb-4 p-3 rounded-lg bg-[#FAF5EB] dark:bg-[#161B23] border border-[#EADBCA] dark:border-[#252E3D]">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#96501E] dark:text-[#E59560] mb-1.5 uppercase font-mono">
                          <Award className="w-3.5 h-3.5 text-[#D97706] dark:text-[#F59E0B]" />
                          <span>Academic Honors & Distinction:</span>
                        </div>
                        <ul className="space-y-1 text-xs text-[#524434] dark:text-[#C5B8A8]">
                          {edu.honors.map((honor, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-1.5">
                              <span className="text-[#C7622B] dark:text-[#E59560] mt-0.5">✦</span>
                              <span>{honor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key Coursework */}
                    <div className="mb-4">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#7A6A55] dark:text-[#8E9CAE] block mb-2">
                        Core Curricula:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.keyCourses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[11px] font-sans px-2.5 py-1 rounded bg-[#F2E8D8] dark:bg-[#202734] text-[#4A3C2B] dark:text-[#D5CAD6]"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Acquired Skills */}
                    <div className="pt-3 border-t border-[#EDE1CF] dark:border-[#252E3D]">
                      <span className="text-[11px] font-mono text-[#8C765C] dark:text-[#8E9CAE] block mb-1">
                        Applied Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {edu.skillsAcquired.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#FFFDF9] dark:bg-[#1A222D] border border-[#DFCDB5] dark:border-[#2E3A4B] text-[#695742] dark:text-[#BDB0A0]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-handwriting text-2xl text-[#8E4416] dark:text-[#E59560]">
                Industry Engineering Experience
              </span>
            </div>

            <div className="space-y-6">
              {experience.map((exp, eIdx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(eIdx * 0.08, 0.25) }}
                  className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D4BD] dark:border-[#2C384A] paper-shadow-md relative paper-fold-tr will-change-transform"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#A86632] dark:text-[#E59560] bg-[#F7EFE1] dark:bg-[#252E3C] px-2.5 py-0.5 rounded">
                      {exp.period}
                    </span>
                    <span className="text-xs text-[#8A7761] dark:text-[#8E9CAE] font-mono">
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#2C2419] dark:text-[#E8DFD1]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#735D45] dark:text-[#E59560] mb-3">
                    {exp.company}
                  </p>

                  <p className="text-xs sm:text-sm text-[#504130] dark:text-[#C5B8A8] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 mb-4 text-xs text-[#4A3B2A] dark:text-[#A79988]">
                    {exp.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-[#C7622B] dark:text-[#E59560] mt-0.5">▪</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-[#EDE1CF] dark:border-[#252E3D]">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#F2EADB] dark:bg-[#202734] text-[#554532] dark:text-[#D5CAD6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Engineering Axiom Card */}
              <div className="p-5 rounded-xl bg-[#FFF9ED] dark:bg-[#1E2532] border border-[#E8DCB8] dark:border-[#2E3A4B] paper-shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EAD8B7] dark:bg-[#2B3545] flex items-center justify-center shrink-0 text-sm">
                  📜
                </div>
                <div className="text-xs text-[#63513B] dark:text-[#BDB0A0] leading-relaxed">
                  <span className="font-bold font-display block text-sm text-[#2C2419] dark:text-[#E8DFD1] mb-0.5">
                    Engineering Axiom
                  </span>
                  "Great software is not simply assembled from components; it is folded with mathematical symmetry, patient refinement, and deep human empathy."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
