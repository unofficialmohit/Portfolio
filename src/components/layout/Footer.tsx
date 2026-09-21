import React from 'react';
import { ArrowUp, Mail, Github, Linkedin, Phone } from 'lucide-react';

interface FooterProps {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  role,
  email,
  phone = '+91 7850980009',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F4EFE6] dark:bg-[#11141A] border-t border-[#E3D6C1] dark:border-[#252E3D] pt-12 pb-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#E6D9C5] dark:border-[#252E3D]">
          {/* Brand & Colophon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D5C0] dark:border-[#2C384A] flex items-center justify-center paper-shadow-sm font-mono font-bold text-[#C7622B] dark:text-[#E59560]">
              &lt;M/&gt;
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#2C2419] dark:text-[#E8DFD1]">
                {name}
              </h3>
              <p className="text-xs text-[#7A6753] dark:text-[#8E9CAE]">
                {role} • Chandigarh, India
              </p>
            </div>
          </div>

          {/* Center / Right Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#6A5844] dark:text-[#8E9CAE]">
            <a
              href={`mailto:${email}`}
              className="hover:text-[#C7622B] dark:hover:text-[#E59560] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{email}</span>
            </a>

            <span>•</span>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="hover:text-[#C7622B] dark:hover:text-[#E59560] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>

            <span>•</span>

            <button
              onClick={scrollToTop}
              className="hover:text-[#C7622B] dark:hover:text-[#E59560] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7761] dark:text-[#7A8A9E] font-sans">
          <p className="font-handwriting text-lg text-[#995726] dark:text-[#E59560]">
            "Building scalable, production-grade applications with clean code & precision."
          </p>
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
