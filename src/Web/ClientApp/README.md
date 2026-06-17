# Crypto Rates Monitoring Hub

A highly polished, production-ready cryptocurrency rates monitoring application. It features a modern, ultra-high-performance server-side-rendered frontend built with **Angular 21** (fully zoneless with reactive Signals) and **Tailwind CSS v4**, backed by an **Express.js** state proxy integrated with the **Gemini 3.5-Flash** model to query live rates using Google Search Grounding.

---

## 🚀 Key Feature Highlights

- **Zoneless Architecture**: Developed in accordance with modern Angular standards, utilizing lightweight Signals for change detection without `zone.js` overhead.
- **RTL & Dual-Language Support**: Complete, native support for English (LTR) and Persian (RTL) locales with instantaneous runtime language switching.
- **Adaptive Dark / Light Themes**: Premium dark theme featuring high-contrast gradients and ambient glow filters, alongside a clean, modern, ultra-minimal light theme.
- **On-Demand Search Grounding**: Leverages `@google/genai` on the Express.js backend to query live tickers and return structured JSON schemas of equivalent pricing.
- **High-Fidelity Failovers**: Fully equipped with stable, dynamic calculated fallbacks to ensure robust UI presentation even in rate-limited or offline environments.
- **Responsive Fluid Interface**: Optimized for all form factors (phones, tablets, and wide desktop screens) with custom touch targets and micro-interaction animations.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: Angular 21 (Zoneless, Standalone Components)
- **State & Reactivity**: Angular Signals with `computed()` derived selector signals
- **Styling**: Tailwind CSS v4 (incorporating `@tailwindcss/postcss` for peak build speed)
- **Icons**: Angular Material Iconography (`<mat-icon>`)

### Backend
- **Framework**: Express.js
- **Model / Core AI**: Google Gemini 3.5-Flash via `@google/genai` (utilizing Google Search tools for live grounding)
- **Deployment & Server**: Single-bundle hybrid build with Express serving pre-rendered SSR templates

---

## 📂 Project Directory Structure

```text
├── angular.json          # Angular CLI architectural configuration
├── package.json          # System dependency declarations and scripts
├── .env.example          # Environment variables template
├── src/
│   ├── main.ts           # Browser bootstrap entrypoint
│   ├── main.server.ts    # Server-side-rendering bootstrap logic
│   ├── server.ts         # Express server backend (Gemini integration & fallback mock API)
│   ├── styles.css        # Core global stylesheet featuring Tailwind CSS imports
│   └── app/
│       ├── app.ts        # Main client controller and Signals handling
│       ├── app.html      # Responsive grid HTML layout
│       └── translations.ts # Static key-value translations for EN/FA dictionaries
└── public/               # Asset distribution folder
```

---

## ⚙️ Setup & Installation

Follow these instructions to configure and run the application locally.

### Pre-requisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later

### 1. Set Up Environment Variables
Create a `.env` file at the root of your project:
```bash
cp .env.example .env
```
Inside your `.env` file, configure your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2. Install Project Dependencies
Run npm install to populate `node_modules`:
```bash
npm install
```

### 3. Start Development Server
The development script boots up on port `3000`:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 4. Build and Package for Production
To compile and output the static bundles along with the server engine side:
```bash
npm run build
```
Once the compilation succeeds, start the production Express server:
```bash
npm run serve:ssr:app
```

---

## 🛡️ License

This project is licensed under the MIT License. All rights reserved. © 2026.
