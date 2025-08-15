# SuChef 🍳

![GitHub License](https://img.shields.io/github/license/kagemnikarimu/suchef)
![GitHub branch status](https://img.shields.io/github/checks-status/kagemnikarimu/suchef/main)
![GitHub Created At](https://img.shields.io/github/created-at/kagemnikarimu/suchef)
![GitHub package.json version](https://img.shields.io/github/package-json/v/kagemnikarimu/suchef)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)

## Overview

**SuChef** is an AI-powered culinary intelligence platform featuring Nyanya, your personal cooking companion. Designed to bring a rich, prosocial, tutor-like experience to digitally assisted cooking, SuChef transforms your kitchen experience with intelligent recipe suggestions, ingredient substitutions, and step-by-step guidance.

The name "SuChef" is a playful pun combining "sous-chef" (an assistant chef) with Linux's `sudo` command that elevates privileges - we bring superuser capabilities to your kitchen through AI insights.

## ✨ Features (Partially Implemented)

- **🥘 Nyanya Mode**: Get instant recipe suggestions based on ingredients you have  [Implemented]
- **💬 Learn Mode**: Interactive chat for cooking techniques and culinary knowledge [Implemented]
- **🎲 Recipe Randomizer**: Discover new dishes with customizable filters [Implemented]
- **👨‍🍳 Guided Cooking**: Step-by-step instructions with real-time assistance [Unimplemented]
- **⭐ Recipe Reviews**: Community-driven recipe ratings and feedback [Unimplemented]
- **🎤 Voice Assistant**: ElevenLabs Convai integration for voice interactions [Implemented]
- **🔊 Audio Feedback**: Immersive sound effects for all interactions [Implemented]
- **🎨 Interactive UI**: Animated mascot and responsive design [Implemented]

## 🏗️ Architecture

Built with modern web technologies:
- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **UI Components**: [Reachat](https://reachat.dev/) for chat interface, [Reablocks](https://reablocks.dev/) for theming
- **Authentication**: [Clerk](https://clerk.com)
- **Animations**: [Motion](https://motion.dev)
- **AI Integration**: OpenAI API with fallback mock responses
- **Voice AI**: [ElevenLabs](https://elevenlabs.io) Convai widget
- **Audio**: [Howler.js](https://howlerjs.com) for sound effects
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key (optional, falls back to mock responses)
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kagemnikarimu/suchef.git
cd suchef
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your API keys to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
OPENAI_API_KEY=your_openai_key (optional)
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🎮 Usage

1. **Homepage**: Click and hold the "Let's Cook" button to enter the dashboard
2. **Dashboard Navigation**: Use the circular navigation to switch between modes
3. **Nyanya Toggle**: Turn on Nyanya personality for a warmer, more personal experience
4. **Voice Mode**: Enable the ElevenLabs widget for voice interactions

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
