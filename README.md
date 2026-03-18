# Solar System 3D

An interactive 3D solar system visualization built with **Three.js**, **React Three Fiber**, and **Next.js**. Explore all 8 planets, Earth's moon, and the Sun with realistic textures, orbital mechanics, and educational data.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

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
git clone https://github.com/themrboyd/solar-system-threejs.git
cd solar-system-threejs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Type Check

```bash
npm run typecheck
```

## Project Structure

```
solar-system-threejs/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, global styles)
│   ├── page.tsx                    # Redirects to /solar-system
│   ├── globals.css                 # Global styles (Tailwind)
│   └── solar-system/
│       └── page.tsx                # Main page — state management & UI composition
├── components/
│   ├── solar-system/               # 3D scene components (React Three Fiber)
│   │   ├── SolarScene.tsx          # Canvas, camera controller, scene orchestration
│   │   ├── Sun.tsx                 # Sun mesh with emissive material & point light
│   │   ├── Planet.tsx              # Planet mesh with orbit, rotation & selection
│   │   ├── Moon.tsx                # Moon orbiting Earth
│   │   └── OrbitRing.tsx           # Circular orbit path visualization
│   └── ui/                        # 2D overlay components (HTML/Tailwind)
│       ├── InfoPanel.tsx           # Planet information card
│       ├── ComparePanel.tsx        # Side-by-side planet comparison
│       ├── ControlBar.tsx          # Playback controls & mode toggles
│       └── LoadingScreen.tsx       # Loading spinner
├── data/
│   └── planets.ts                  # Planet data & TypeScript types
└── public/
    └── textures/                   # 2K planet texture maps
```

## Architecture

### How It Works

The app follows a clear separation between **3D scene** and **2D UI**:

```
┌─────────────────────────────────────────────┐
│  SolarSystemPage (app/solar-system/page.tsx) │
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
  texture: string       // Path to texture map
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
