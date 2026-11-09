# Solar System 3D

An interactive 3D solar system visualization built with **Three.js**, **React Three Fiber**, and **Next.js**. Explore all 8 planets, Earth's moon, and the Sun with realistic textures, orbital mechanics, and educational data.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

🌐 **[https://theahmedansari1222-bit.github.io/solar-system-threejs/](https://theahmedansari1222-bit.github.io/solar-system-threejs/)**

## Features

- **Realistic 3D rendering** — Textured spheres for all planets with proper relative sizing
- **Orbital animation** — Planets orbit the Sun at scaled speeds with play/pause and speed control
- **Interactive selection** — Click any planet to view detailed information (diameter, distance, temperature, moons, fun facts)
- **Compare mode** — Select two planets side-by-side to compare their properties
- **Earth day/night view** — Zoom into Earth to see the day/night terminator line created by the Sun's lighting
- **Saturn's rings** — Textured ring system rendered with transparency
- **Earth's Moon** — Orbits Earth with independent orbital mechanics
- **Orbit trails** — Toggle orbital path visualization on/off
- **Responsive design** — Works on desktop and mobile with touch-friendly controls

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) | React renderer for Three.js |
| [Three.js](https://threejs.org/) | 3D graphics engine |
| [Drei](https://drei.docs.pmnd.rs/) | Useful helpers for R3F (OrbitControls, Stars, Line) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/theahmedansari1222-bit/solar-system-threejs.git
cd solar-system-threejs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build (Static Export)

This project is configured for **static export** to deploy to GitHub Pages.

```bash
# Build for local testing (no basePath)
npm run build

# Build for GitHub Pages (with basePath)
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/solar-system-threejs npm run build
```

The static output will be in the `out/` directory.

To test the exported build locally:

```bash
npx serve out
```

### Type Check

```bash
npm run typecheck
```

## GitHub Pages Deployment

This project automatically deploys to GitHub Pages via GitHub Actions on every push to `main`.

### How It Works

1. **Push to `main`** triggers the deployment workflow (`.github/workflows/deploy.yml`)
2. **GitHub Actions** runs:
   - `npm ci` — install dependencies
   - `npm run typecheck` — verify TypeScript
   - `npm run build` — build static export with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/solar-system-threejs`
   - Upload `out/` directory as Pages artifact
   - Deploy to GitHub Pages
3. **Live site** updates at: `https://theahmedansari1222-bit.github.io/solar-system-threejs/`

### Enable GitHub Pages (One-Time Setup)

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

The first push to `main` after enabling will trigger the deployment.

### Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab → **Deploy to GitHub Pages**
2. Click **Run workflow** → **Run workflow**

### Pull Requests

Pull requests targeting `main` run the build and typecheck but **do not deploy**. This verifies the PR won't break the site.

## Project Structure

```
solar-system-threejs/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, global styles)
│   ├── page.tsx                    # Main page — state management & UI composition
│   └── globals.css                 # Global styles (Tailwind)
├── components/
│   ├── solar-system/               # 3D scene components (React Three Fiber)
│   │   ├── SolarScene.tsx          # Canvas, camera controller, scene orchestration
│   │   ├── Sun.tsx                 # Sun mesh with emissive material & point light
│   │   ├── Planet.tsx              # Planet mesh with orbit, rotation & selection
│   │   ├── Moon.tsx                # Moon orbiting Earth
│   │   └── OrbitRing.tsx           # Circular orbit path visualization
│   └── ui/                         # 2D overlay components (HTML/Tailwind)
│       ├── InfoPanel.tsx           # Planet information card
│       ├── ComparePanel.tsx        # Side-by-side planet comparison
│       ├── ControlBar.tsx          # Playback controls & mode toggles
│       └── LoadingScreen.tsx       # Loading spinner
├── data/
│   └── planets.ts                  # Planet data & TypeScript types
├── lib/
│   └── asset-path.ts               # Asset path helper for GitHub Pages basePath
├── public/
│   └── textures/                   # 2K planet texture maps
├── .github/workflows/
│   └── deploy.yml                  # GitHub Actions deployment workflow
├── next.config.ts                  # Next.js config (static export, basePath)
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture

### How It Works

The app follows a clear separation between **3D scene** and **2D UI**:

```
┌─────────────────────────────────────────────┐
│  SolarSystemPage (app/page.tsx)             │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │   SolarScene     │  │   UI Overlays    │  │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │
│  │  │ Canvas     │  │  │  │ InfoPanel   │  │  │
│  │  │  Sun       │  │  │  │ ComparePanel│  │  │
│  │  │  Planet ×8 │  │  │  │ ControlBar  │  │  │
│  │  │  Moon      │  │  │  └────────────┘  │  │
│  │  │  Stars     │  │  │                  │  │
│  │  └────────────┘  │  │                  │  │
│  └─────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────┘
```

- **State lives in the page** — `useState` manages selected planet, speed, pause, compare mode, and focus
- **3D components** receive props and fire callbacks (e.g., `onSelect`)
- **UI components** read from the same state and dispatch updates
- **Camera animation** uses `useFrame` with `Vector3.lerp` for smooth transitions

### Key Concepts for Learners

| Concept | Where to Look |
|---|---|
| Setting up a React Three Fiber canvas | `SolarScene.tsx` |
| Loading textures | `Sun.tsx`, `Planet.tsx` |
| Animation with `useFrame` | `Planet.tsx` (orbit + rotation) |
| Camera control & animation | `SolarScene.tsx` → `CameraController` |
| Click interaction in 3D | `Planet.tsx` → `onClick` |
| Combining 3D + HTML UI | `page.tsx` (absolute-positioned overlays) |
| Conditional rendering based on 3D state | `InfoPanel.tsx`, `ComparePanel.tsx` |

## Planet Data

All planet data is centralized in [`data/planets.ts`](data/planets.ts). Each planet has:

```typescript
type PlanetData = {
  name: string          // Display name
  texture: string       // Texture filename (resolved via asset-path helper)
  radius: number        // Visual radius (not to scale)
  orbitRadius: number   // Distance from Sun
  orbitSpeed: number    // Orbital velocity multiplier
  rotationSpeed: number // Self-rotation speed
  color: string         // Accent color for orbit ring
  info: PlanetInfo      // Educational data
}
```

## Textures

Planet textures are 2K resolution maps from [Solar System Scope](https://www.solarsystemscope.com/textures/). They are included in `public/textures/` for convenience.

Texture paths are resolved at runtime using the [`lib/asset-path.ts`](lib/asset-path.ts) helper, which automatically handles the GitHub Pages `basePath` prefix.

## Contributing

Contributions are welcome! Some ideas for extensions:

- [ ] Add asteroid belt
- [ ] Add dwarf planets (Pluto, Ceres, Eris)
- [ ] Realistic orbital inclinations and eccentricity
- [ ] Planet labels / annotations in 3D space
- [ ] Sound effects and ambient music
- [ ] VR mode with WebXR
- [ ] Responsive planet info tooltips on hover
- [ ] Timeline slider to show planet positions at a specific date

## License

[MIT](LICENSE)
