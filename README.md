# Rawasi Real Estate

Rawasi is a luxury real estate website for exploring residential properties, rental listings, investment opportunities, Gulf market locations, and private advisory services.

The interface supports English and Arabic, including right-to-left (RTL) layouts, and combines cinematic media, responsive property browsing, interactive filtering, investment maps, and a consultation form.

## Features

- Cinematic splash screen and video hero
- English and Arabic language switching with RTL support
- Bilingual company story and animated portfolio statistics
- Interactive services presentation
- Property listings for purchase and rental
- Search and filtering by location, property type, budget, and bedroom count
- Paginated property grid
- Gulf investment opportunities with interactive 3D and map views
- Strategic Gulf hub information
- Private consultation request form
- Responsive navigation and back-to-top control

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Three Fiber and Drei
- Three.js
- Lucide React
- React Parallax Tilt
- Oxlint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, typically `http://localhost:5173`.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run the configured Oxlint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
├── App.jsx                  # Main page composition and language state
├── main.jsx                 # React entry point
├── index.css                # Global styles and animations
├── assets/                  # Images, videos, and other media
├── components/              # Reusable UI and layout components
├── data/
│   └── propertiesData1.js   # Property listing data
└── sections/
    ├── Hero.jsx
    ├── About.jsx
    ├── Services.jsx
    ├── Featured Properties.jsx
    ├── Investment.jsx
    ├── Featured Locations.jsx
    └── Contact&Consultation.jsx
```

## Content and Customization

- Update property records in `src/data/propertiesData1.js`.
- Edit English and Arabic copy in the individual section components.
- Replace local media files in `src/assets/` and update the corresponding imports.
- External Unsplash and Google Maps links are used in some investment and service content.
- The consultation form currently performs client-side validation and displays a success state; connect `handleSubmit` in `src/sections/Contact&Consultation.jsx` to an API or form service for real submissions.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |
