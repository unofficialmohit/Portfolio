# 📜 Mohit Gujjar — Full-Stack & Mobile Developer Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.2-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![EmailJS](https://img.shields.io/badge/EmailJS-Integrated-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](https://www.emailjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

**A bespoke editorial manuscript & vintage paper-craft interactive portfolio showcasing ~3 years of production engineering across Mobile, Web, and Cloud Architectures.**

[Explore Projects](#-shipped-platforms--projects) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contact](#-connect--contact)

</div>

---

## 🖋️ About the Project

This portfolio is an interactive digital archive designed with a **vintage paper-crafted editorial aesthetic**. Built with modern frontend engineering (React 19, Vite, Tailwind CSS v4, Motion), it balances tactile visual charm—deckled paper edges, airmail stamps, washi tape, and wax seals—with clean architecture, responsive performance, and rich interactive features.

### ✨ Key Highlights & Features

- **Interactive Mascot Companion**: Powered by `page-mascot`, an animated cursor-tracking nerd avatar that follows your cursor and offers contextual dialogue for each chapter.
- **Dynamic Vintage / Editorial Aesthetic**: Handcrafted paper textures, fold shadows, postal markings, and smooth transitions in both warm parchment **Light Mode** (`#F8F5EE`) and deep ink **Dark Mode** (`#11141A`).
- **Chaptered Blueprint Architecture**:
  - **Chapter 01 • The Architect's Desk**: Hero introduction, status badges, availability, and quick statistics.
  - **Chapter 02 • Biography & Background**: Professional journey, engineering philosophy, and sticky-note insights.
  - **Chapter 03 • Shipped Blueprints & Systems**: Showcase of 12+ production mobile, web, and backend applications with verified badges and store links.
  - **Chapter 04 • Academic Inscriptions**: Formal degree certifications (MCA & BCA Honors with 80% distinction).
  - **Chapter 05 • Letterbox & Dispatch**: Real-time correspondence form with EmailJS delivery, instant validation, and error management.
- **Live In-Browser JSON Data Editor**: Press <kbd>Cmd</kbd> + <kbd>K</kbd> or click the editor button to customize portfolio content in real-time, test layouts, and export/import the JSON configuration.
- **Digital Inscription & Resume Reader**: Built-in modal viewer for previewing and downloading formal credentials.
- **Zero-Flicker Theme Persistence**: Synchronizes theme with system preference and persists manual choices in `localStorage`.

---

## 🛠️ Tech Stack

### Core Frontend & Tooling
- **Framework**: [React 19](https://react.dev/) with Functional Components & Hooks
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Build Tool**: [Vite 8](https://vite.dev/) for lightning-fast HMR and bundle optimization
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS design tokens & utilities
- **Animations**: [Motion](https://motion.dev/) (`motion/react`) for smooth physics-based micro-interactions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [@emailjs/browser](https://www.emailjs.com/) for direct client-side email dispatch

### Mohit's Engineering Toolkit
- **Mobile Development**: React Native, Expo, Android Flavors, iOS Schemes, Over-The-Air (OTA) Updates, Mobile Deep Linking
- **Web Frontend**: Next.js (SSR / SSG), React.js, TypeScript, JavaScript (ESNext), Tailwind CSS, Technical SEO & Structured Data (JSON-LD)
- **Backend & APIs**: Node.js, Express.js, NestJS, Python (Django), REST APIs, Microservices, Monorepo (Turborepo), PM2
- **Databases & State**: PostgreSQL (pgAdmin 4), MongoDB, Redis, Redux Toolkit, Context API, Zustand
- **DevOps & Third-Party Services**: Stripe, OAuth (Google, LinkedIn), Google Analytics, Facebook Pixel, reCAPTCHA, Git/GitHub, Docker

---

## 🚀 Shipped Platforms & Projects

A selection of platforms featured in the portfolio:

| Platform / Package | Domain | Technologies | Details |
| :--- | :--- | :--- | :--- |
| [**rn-snappy-toast**](https://www.npmjs.com/package/rn-snappy-toast) | Open Source / npm | React Native, TypeScript, Gestures | Lightweight, zero-dependency toast notification library with gesture dismissals and animations. |
| **MindBase Apps** | EdTech / SaaS | React Native, Android Flavors, iOS Schemes | Multi-tenant student and tutor scheduling platform generating separate binaries from one codebase. Live on [Play Store](https://play.google.com/store/apps/details?id=com.mindbase) & [App Store](https://apps.apple.com/us/app/mind-base/id6743792355). |
| [**Women First Jobs**](https://womenfirstjobs.com/) | Recruitment / Job Board | Next.js, React Native, SSR, SEO, OAuth | High-traffic job portal with dynamic SSR, JSON-LD schemas, analytics, and companion mobile apps. |
| **NutraCoin** | Fintech / Web3 | React Native, Non-Custodial Wallet, Biometrics | Secure digital asset management mobile application live on [Google Play](https://play.google.com/store/apps/details?id=com.nutracoin) & [App Store](https://apps.apple.com/us/app/nutracoin/id6782789686). |
| **Sanad Roadside Assistance** | Logistics / On-Demand | React Native, Maps, Stripe, OTA Updates | Real-time GPS roadside assistance and driver dispatch platform with in-app payments. |
| **Bouteek Platform** | E-Commerce / Multi-Service | Node.js, Express, Turborepo, PostgreSQL, PM2 | Scalable backend microservices handling admin, vendor, user, and web workloads. |
| **Yotman** | Specialist Web & Services | React.js, Python, Django, REST APIs | Specialist portal development with Python/Django backend support and maintenance. |

---

## 📦 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### 1. Clone the Repository
```bash
git clone https://github.com/unofficialmohit/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Add your EmailJS credentials:
```env
# Target Recipient Email
NOTIFICATION_EMAIL="mohitgujjar2121@gmail.com"

# EmailJS Service Credentials (from https://dashboard.emailjs.com/)
VITE_EMAILJS_SERVICE_ID="your_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `dist/` |
| `npm run preview` | Locally serves the built production bundle for testing |
| `npm run lint` | Runs TypeScript typechecks (`tsc --noEmit`) to verify types |
| `npm run clean` | Deletes the `dist/` build directory |

---

## 📂 Project Structure

```
portfolio/
├── public/                  # Static assets, mascots, favicons
│   └── mascots/             # Interactive mascot spritesheets & directions
├── src/
│   ├── components/
│   │   ├── common/          # DynamicCursor, ParallaxTechBackground, etc.
│   │   ├── layout/          # Navbar, Footer
│   │   ├── modals/          # JsonEditorModal, ResumeModal
│   │   └── sections/        # Hero, About, Projects, Skills, Education, Contact
│   ├── data/
│   │   ├── portfolioData.json  # Core portfolio content database
│   │   └── usePortfolioData.ts # Hook for reading/writing/resetting data
│   ├── hooks/               # Custom React hooks
│   ├── services/
│   │   └── emailService.ts  # EmailJS dispatch logic & payload builder
│   ├── types.ts             # TypeScript interfaces for portfolio data
│   ├── App.tsx              # Root component & state management
│   ├── index.css            # Tailwind CSS v4 & custom paper texture styles
│   └── main.tsx             # Application entry point
├── .env                     # Local environment credentials (ignored by git)
├── index.html               # Main HTML template
├── package.json             # Project scripts and dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite bundler configuration
```

---

## ⚙️ Customizing Content

All portfolio content (bio, stats, quick facts, projects, education, skills, and contact metadata) is centrally stored in [`src/data/portfolioData.json`](src/data/portfolioData.json).

You can customize content in two ways:
1. **Directly in Code**: Edit `src/data/portfolioData.json` and rebuild.
2. **In-Browser JSON Editor**: Click the **Edit Data** button in the navigation bar to preview live modifications, test custom project entries, and download the resulting JSON file.

---

## 📬 Connect & Contact

- **Name**: Mohit Gujjar
- **Role**: Full-Stack & Mobile Developer
- **Email**: [mohitgujjar2121@gmail.com](mailto:mohitgujjar2121@gmail.com)
- **Phone**: [+91 7850980009](tel:+917850980009)
- **Location**: Chandigarh, India
- **GitHub**: [@unofficialmohit](https://github.com/unofficialmohit)
- **LinkedIn**: [in/unofficialmohit](https://in.linkedin.com/in/unofficialmohit)
- **npm**: [rn-snappy-toast](https://www.npmjs.com/package/rn-snappy-toast)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to fork, adapt, and build your own creative portfolio!
