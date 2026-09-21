export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  iconName: string;
}

export interface MascotConfig {
  id: string;
  name: string;
  type: 'airplane' | 'fox' | 'quill' | 'nerd';
  title: string;
  catchphrase: string;
  dialogueBySection: {
    hero: string;
    about: string;
    projects: string;
    education: string;
    skills: string;
    contact: string;
  };
}

export interface QuickFact {
  id: string;
  title: string;
  detail: string;
  color: 'yellow' | 'green' | 'pink' | 'blue' | 'peach';
  rotation: number;
}

export interface StatItem {
  label: string;
  value: string;
  unit?: string;
  subtext: string;
}

export interface AppStoreLink {
  label: string;
  platform: 'playstore' | 'appstore' | 'web';
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  npmUrl?: string;
  appLinks?: AppStoreLink[];
  proprietaryNotice?: string;
  featured: boolean;
  paperNote?: string;
  aspectColor: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  gpa?: string;
  honors?: string[];
  keyCourses: string[];
  skillsAcquired: string[];
  paperColor: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  noteColor: 'yellow' | 'pink' | 'sage' | 'blue' | 'lavender';
  skills: {
    name: string;
    proficiency: number;
    level: string;
    rating?: string;
    icon?: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  washiColor: string;
  rotation: number;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    status: string;
    availability: string;
    email: string;
    phone?: string;
    location: string;
    resumeUrl: string;
    bioIntro: string;
    bioStory: string[];
  };
  stats: StatItem[];
  quickFacts: QuickFact[];
  socialLinks: SocialLink[];
  mascots: MascotConfig[];
  projects: ProjectItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  testimonials: TestimonialItem[];
  contact: {
    title: string;
    subtitle: string;
    responseTime: string;
    preferredTopics: string[];
    autoReplyTemplate: string;
  };
}
