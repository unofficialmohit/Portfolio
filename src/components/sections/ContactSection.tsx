import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, CheckCircle2, Copy, Check, ArrowUpRight, AlertCircle, X } from 'lucide-react';
import { SocialLink } from '../../types';
import { sendCorrespondence, EmailSendResult } from '../../services/emailService';

interface ContactSectionProps {
  personalEmail: string;
  socialLinks: SocialLink[];
  contactMeta: {
    title: string;
    subtitle: string;
    responseTime: string;
    preferredTopics: string[];
    autoReplyTemplate: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  personalEmail,
  socialLinks,
  contactMeta,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<EmailSendResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const maxChars = 800;
  const targetRecipient = 'mohitgujjar2121@gmail.com';

  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => {
        setSubmitError(null);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject line is required.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message.';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await sendCorrespondence({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setDispatchResult(result);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Failed to dispatch letter via EmailJS:', err);
      const rawMsg = err?.message || 'Delivery encountered an issue';
      let friendlyMsg = rawMsg;
      if (rawMsg.toLowerCase().includes('service id not found') || rawMsg.toLowerCase().includes('service_id')) {
        friendlyMsg = 'Email service ID not found. Please verify your VITE_EMAILJS_SERVICE_ID in the .env file or EmailJS dashboard.';
      } else if (rawMsg.toLowerCase().includes('template')) {
        friendlyMsg = 'Email template ID not found. Please verify your VITE_EMAILJS_TEMPLATE_ID in the .env file.';
      } else if (rawMsg.toLowerCase().includes('public key') || rawMsg.toLowerCase().includes('public_key')) {
        friendlyMsg = 'Email public key invalid. Please verify your VITE_EMAILJS_PUBLIC_KEY in the .env file.';
      }
      setSubmitError(friendlyMsg);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendAnother = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
    setDispatchResult(null);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 sm:scroll-mt-28 relative py-20 md:py-28 bg-[#FBF8F3] dark:bg-[#13161C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] dark:bg-[#1C232E] border border-[#E2D5BE] dark:border-[#2C384A] text-xs font-semibold uppercase tracking-widest text-[#8C6036] dark:text-[#E59560] mb-3">
              <Mail className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560]" />
              <span>Chapter 05 • Letterbox & Dispatch</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2419] dark:text-[#E8DFD1] tracking-tight">
              {contactMeta.title}
            </h2>
            <p className="mt-2 text-base text-[#685744] dark:text-[#A79988] max-w-xl">
              {contactMeta.subtitle}
            </p>
          </div>

          {/* Response time status */}
          <div className="flex items-center gap-3 bg-[#FFFDF9] dark:bg-[#1C232E] px-4 py-2.5 rounded-xl border border-[#E4D6BF] dark:border-[#2C384A] paper-shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] dark:bg-[#252E3C] border border-[#E0CFB6] dark:border-[#354356] flex items-center justify-center text-[#C7622B] dark:text-[#E59560]">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#2C2419] dark:text-[#E8DFD1] block font-sans">
                Direct Response
              </span>
              <span className="text-[#80705E] dark:text-[#8E9CAE] font-sans text-[11px]">
                {contactMeta.responseTime}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inscriptions, Socials & Preferred Topics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card (Airmail Stamp Design) */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D4BD] dark:border-[#2C384A] paper-shadow-md relative paper-fold-tr">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A06C3E] dark:text-[#E59560] bg-[#F7EFE1] dark:bg-[#252E3C] px-2.5 py-1 rounded">
                  Official Registry
                </span>
                {/* Vintage Airmail Stamp */}
                <div className="px-2 py-1 border-2 border-[#C7622B] dark:border-[#E59560] rounded text-[10px] font-mono font-bold uppercase tracking-wider text-[#C7622B] dark:text-[#E59560] rotate-3">
                  Air Mail • 2026
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-[#2C2419] dark:text-[#E8DFD1] mb-1">
                Direct Electronic Mail
              </h3>
              <p className="text-xs text-[#7A6753] dark:text-[#A89885] mb-4">
                For prompt replies, invitations, and architecture inquiries:
              </p>

              {/* Copyable Email Box */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F3EA] dark:bg-[#151A22] border border-[#DFCDB7] dark:border-[#2C384A] mb-4">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#2C2419] dark:text-[#E8DFD1] truncate mr-2">
                  {personalEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#FFFDF9] dark:bg-[#202734] hover:bg-[#F2E8D8] dark:hover:bg-[#283242] text-xs font-semibold text-[#8C582B] dark:text-[#E59560] border border-[#D5C2A7] dark:border-[#354356] transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-[#7E6E5B] dark:text-[#8E9CAE] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                <span>Inbox monitored daily • {contactMeta.responseTime}</span>
              </div>
            </div>

            {/* Preferred Topics Sticky Note */}
            <div className="p-6 rounded-2xl bg-[#FFF9DE] dark:bg-[#1E231D] border border-[#E9DEB2] dark:border-[#35402F] paper-shadow-sm transform -rotate-0.5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-handwriting text-2xl text-[#8E4416] dark:text-[#E59560]">
                  Ideal Topics for Collaboration
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A411B] dark:text-[#E2DCB6]">
                {contactMeta.preferredTopics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-[#C7622B] dark:text-[#E59560] mt-0.5">✦</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Channels Sheet */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#E3D5BE] dark:border-[#2C384A] paper-shadow-sm">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7A6753] dark:text-[#8E9CAE] block mb-3">
                Professional Profiles & Inscriptions
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#FAF5EB] dark:bg-[#151A22] hover:bg-[#F2E7D5] dark:hover:bg-[#202835] border border-[#E4D5BF] dark:border-[#2C384A] transition-all text-xs font-semibold text-[#4A3C2B] dark:text-[#E8DFD1] flex items-center justify-between group"
                  >
                    <span>{link.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C7622B] dark:text-[#E59560] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Paper Letterbox Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-2xl bg-[#FFFDF9] dark:bg-[#1B222C] border border-[#DFCDB2] dark:border-[#2C384A] paper-shadow-lift paper-fold-tr">
              {/* Top washi tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape rounded-xs" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Success Sealed Confirmation Letter */
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#F4EFE6] dark:bg-[#151A22] border border-[#DFCDB7] dark:border-[#2C384A] flex items-center justify-center text-[#16A34A] paper-shadow-md">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-handwriting text-3xl text-[#C7622B] dark:text-[#E59560] block">
                        Letter Dispatched & Sealed!
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#2C2419] dark:text-[#E8DFD1]">
                        Thank you, {formData.name}
                      </h3>
                      <p className="text-sm text-[#6E5A44] dark:text-[#A89885] max-w-md mx-auto leading-relaxed">
                        Your message has been stamped and delivered to <span className="font-mono font-semibold text-[#2C2419] dark:text-[#E8DFD1]">{targetRecipient}</span>.
                      </p>
                      {dispatchResult && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#FAF1E4] dark:bg-[#1E2530] border border-[#E0D0BB] dark:border-[#2C384A] text-[#8C582B] dark:text-[#E59560]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Delivered directly to {targetRecipient}
                        </div>
                      )}
                    </div>

                    {/* Formatted Letter Receipt Card */}
                    <div className="p-5 rounded-xl bg-[#FAF5EC] dark:bg-[#151A22] border border-[#E2D4BE] dark:border-[#2C384A] text-left max-w-md mx-auto space-y-2 font-mono text-xs text-[#524434] dark:text-[#C5B8A8]">
                      <div>
                        <span className="text-[#8C765C] dark:text-[#8E9CAE]">Sender:</span> {formData.name} &lt;{formData.email}&gt;
                      </div>
                      <div>
                        <span className="text-[#8C765C] dark:text-[#8E9CAE]">Destination:</span> {targetRecipient}
                      </div>
                      <div>
                        <span className="text-[#8C765C] dark:text-[#8E9CAE]">Subject:</span> {formData.subject}
                      </div>
                      <div className="pt-2 border-t border-[#E3D6C1] dark:border-[#252E3D] text-[#695844] dark:text-[#D5CAD6] italic">
                        "{formData.message}"
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handleSendAnother}
                        className="px-5 py-2.5 rounded-xl bg-[#2C2419] dark:bg-[#E59560] text-[#FFFDF9] dark:text-[#13161C] text-xs font-semibold paper-shadow-sm hover:paper-shadow-md transition-all cursor-pointer"
                      >
                        Pen Another Letter
                      </button>
                      <a
                        href={`mailto:${personalEmail}?subject=${encodeURIComponent(
                          formData.subject
                        )}&body=${encodeURIComponent(formData.message)}`}
                        className="px-5 py-2.5 rounded-xl bg-[#F5ECE0] dark:bg-[#202734] text-[#3E3121] dark:text-[#E8DFD1] text-xs font-semibold border border-[#DFCDB2] dark:border-[#354356] hover:bg-[#EDE1CE] dark:hover:bg-[#283242] transition-all"
                      >
                        Open in Native Mail Client
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Live Interactive Parchment Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between border-b border-[#EDE1CF] dark:border-[#252E3D] pb-4 mb-2 gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-[#2C2419] dark:text-[#E8DFD1]">
                          Draft Correspondence
                        </h3>
                        <p className="text-xs text-[#7A6753] dark:text-[#A89885] mt-0.5">
                          Directly dispatched to <span className="font-mono font-semibold text-[#C7622B] dark:text-[#E59560]">{targetRecipient}</span>
                        </p>
                      </div>
                    </div>

                    {/* Submission Error Banner */}
                    {submitError && (
                      <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs animate-in fade-in duration-200">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-semibold block font-sans">Dispatch Unsuccessful</span>
                            <p className="leading-relaxed">{submitError}</p>
                            <a
                              href={`mailto:${targetRecipient}?subject=${encodeURIComponent(
                                formData.subject || 'Portfolio Inquiry'
                              )}&body=${encodeURIComponent(formData.message)}`}
                              className="inline-flex items-center gap-1 font-semibold underline hover:text-red-950 dark:hover:text-red-200 transition-colors pt-0.5"
                            >
                              Send directly via email client instead
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 p-1 rounded-lg transition-colors cursor-pointer"
                          title="Dismiss error message"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#6B5742] dark:text-[#8E9CAE] mb-1.5">
                          Full Name <span className="text-[#C7622B] dark:text-[#E59560]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ada Lovelace"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF5EB] dark:bg-[#151A22] border text-sm text-[#2C2419] dark:text-[#E8DFD1] placeholder-[#9E8F7C] dark:placeholder-[#6C7A8E] focus:outline-none focus:ring-2 focus:ring-[#C7622B]/30 ${
                            errors.name ? 'border-red-400' : 'border-[#DFCDB7] dark:border-[#2C384A]'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#6B5742] dark:text-[#8E9CAE] mb-1.5">
                          Email Address <span className="text-[#C7622B] dark:text-[#E59560]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="ada@computing.org"
                          className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF5EB] dark:bg-[#151A22] border text-sm text-[#2C2419] dark:text-[#E8DFD1] placeholder-[#9E8F7C] dark:placeholder-[#6C7A8E] focus:outline-none focus:ring-2 focus:ring-[#C7622B]/30 ${
                            errors.email ? 'border-red-400' : 'border-[#DFCDB7] dark:border-[#2C384A]'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#6B5742] dark:text-[#8E9CAE] mb-1.5">
                        Subject Line <span className="text-[#C7622B] dark:text-[#E59560]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Mobile App Architecture Inquiry / Contract"
                        className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF5EB] dark:bg-[#151A22] border text-sm text-[#2C2419] dark:text-[#E8DFD1] placeholder-[#9E8F7C] dark:placeholder-[#6C7A8E] focus:outline-none focus:ring-2 focus:ring-[#C7622B]/30 ${
                          errors.subject ? 'border-red-400' : 'border-[#DFCDB7] dark:border-[#2C384A]'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#6B5742] dark:text-[#8E9CAE]">
                          Message Manuscript <span className="text-[#C7622B] dark:text-[#E59560]">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#998772] dark:text-[#7A8A9E]">
                          {formData.message.length}/{maxChars}
                        </span>
                      </div>
                      <textarea
                        required
                        rows={5}
                        maxLength={maxChars}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Share your goals, project timelines, ideas, or architectural challenges..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF5EB] dark:bg-[#151A22] border text-sm text-[#2C2419] dark:text-[#E8DFD1] placeholder-[#9E8F7C] dark:placeholder-[#6C7A8E] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C7622B]/30 resize-y ${
                          errors.message ? 'border-red-400' : 'border-[#DFCDB7] dark:border-[#2C384A]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs text-[#8A7865] dark:text-[#8E9CAE] font-mono">
                        Sealed with cryptographic precision
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="submit-contact-form"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2C2419] dark:bg-[#E59560] hover:bg-[#1E1810] dark:hover:bg-[#D4844E] text-[#FFFDF9] dark:text-[#13161C] font-semibold text-sm sm:text-base paper-shadow-md hover:paper-shadow-lift transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Sealing Parchment...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#E6D4BA] dark:text-[#13161C]" />
                            <span>Dispatch Letter</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
