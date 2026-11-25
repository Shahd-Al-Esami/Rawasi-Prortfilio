# Rawasi Real Estate

Rawasi is a bilingual real estate website for discovering premium homes, rental properties, Gulf investment opportunities, and private advisory services. The interface supports English and Arabic, including right-to-left (RTL) layouts, and is built to adapt to desktop and mobile screens.

## Features

- Cinematic splash screen and video-led hero section
- English/Arabic language switching with RTL layout support
- Company profile, animated statistics, and service highlights
- Property listings for purchase and rent, with search and filters
- Paginated property cards
- Gulf investment opportunities with interactive map and 3D views
- Featured locations and a private consultation form
- Responsive navigation and back-to-top control

## Technology

- React 19
- Vite 8
- Tailwind CSS 4
- Three.js with React Three Fiber and Drei
- Lucide React
- React Parallax Tilt
- Oxlint

## Getting Started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Build and preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
.
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── assets/
    │   ├── about1.jpg
    │   ├── contact.png
    │   ├── d.jpg
    │   └── new.mp4
    ├── components/
    │   ├── 3D.jsx
    │   ├── AboutStatsCards.jsx
    │   ├── FeaturedPropertyCard.jsx
    │   ├── Footer.jsx
    │   ├── Heading.jsx
    │   ├── InteractiveGulfMap.jsx
    │   ├── Interior3DPanView.jsx
    │   ├── Logo.jsx
    │   ├── Navbar.jsx
    │   ├── PropertyCard.jsx
    │   ├── PropertyFilterBar.jsx
    │   ├── PropertyGrid.jsx
    │   ├── SliderCards.jsx
    │   ├── SplashScreen.jsx
    │   ├── TopButton.jsx
    │   └── Button/
    │       ├── Button.jsx
    │       └── Button.css
    ├── data/
    │   ├── investmentOpportunitiesData.js
    │   └── propertiesData1.js
    └── sections/
        ├── About.jsx
        ├── Contact&Consultation.jsx
        ├── Featured Locations.jsx
        ├── Featured Properties.jsx
        ├── Hero.jsx
        ├── Investment.jsx
        └── Services.jsx
```

### Main folders

- `src/components/` contains reusable interface elements and property, map, and 3D components.
- `src/sections/` contains the page's main content sections.
- `src/data/` contains the property listings and investment opportunity content.
- `src/assets/` contains local images and video used by the interface.


## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
