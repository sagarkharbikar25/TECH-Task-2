# ⚡ TECHFEST 2026 // FLAGSHIP 3D PLATFORM & CYBORG SHOWCASE

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/R3F-000000?style=for-the-badge&logo=three.js&logoColor=00F0FF)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-FB3640?style=for-the-badge)

**A high-performance, sci-fi cybernetic technology festival web application engineered for the Techfest CA Program (Task 2: Build in 3D). Inspired by the visual weight, fluid motion, and prestige of IIT Bombay's Techfest.**

[Explore Live Demo](#-live-deployment) • [Architecture](#-monorepo-architecture) • [Features](#-core-interactive-phases) • [API Docs](#-express-rest-api) • [Local Setup](#-local-setup--quickstart)

</div>

---

## 🚀 Live Deployment
- **Live Website:** [tech-task-2.vercel.app](https://tech-task-2.vercel.app)
- **GitHub Repository:** [github.com/sagarkharbikar25/TECH-Task-2](https://github.com/sagarkharbikar25/TECH-Task-2)
- **Local Dev Endpoints:**
  - Client Application: `http://localhost:5180`
  - Express REST API: `http://localhost:5001`
  - API Health Check: `http://localhost:5001/api/health`
  - Model Telemetry: `http://localhost:5001/api/models`

---

## 🎨 Visual Identity & Design System

The visual design is directly tailored around high-contrast cybernetic lighting and editorial high-tech typography:

* **Night (`#000F08` / `#08080C`):** Deep abyssal obsidian base for canvas backgrounds and dark glassmorphic cards.
* **Imperial Red (`#FB3640`):** Electric crimson accent for interactive 3D hotspots, active state glows, and telemetry badges.
* **Electric Cyan (`#00F0FF`):** Quantum particle trails, futuristic HUD accents, and primary button illumination.
* **Typography Pairing:**
  * **Display / Headlines:** `Space Grotesk` (punchy, futuristic editorial character)
  * **Telemetry / Metrics:** `JetBrains Mono` (engineering precision, coordinates, and diagnostic logs)
  * **Body / Readouts:** `Plus Jakarta Sans` (ultra-clean readability across high-DPI screens)

---

## ⚡ Core Interactive Phases

### 1. Immersive Splash Screen / Custom Preloader (`CustomPreloader.jsx`)
- Percentage-based hydration counter (0% to 100%) tracking asset hydration.
- Kinetic sci-fi text-scrambling readout engine with animated glyph decryption (`QUANTUM_CORE_LOADING` → `TECHFEST_READY`).
- Executed via GSAP timeline-driven inverted `clip-path: polygon(...)` curtain reveal to unveil the Hero page.

### 2. Hero Section & 3D Interactive Canvas (`HeroCanvas.jsx` & `HeroSection.jsx`)
- Full-viewport WebGL background canvas powered by Three.js and React Three Fiber.
- Procedural Quantum Core featuring an abstract wireframe icosahedron and glowing inner plasma shell.
- Dynamic mouse-following coordinate tilt, spatial distortion, and floating particle field.
- Split-character staggered headline entrance animation with instant navigation CTAs.

### 3. Biomechatronic 3D Cyborg Arm Product Viewer (`CyborgArm.jsx` & `Scene.jsx`)
- Interactive 3D product showcase with articulating finger phalanges, titanium truss chassis, and glowing power conduits.
- **Vector SVG Reticle Hotspots:** 5 pinned vector targets (*Harmonic Servo Joint*, *Neural BCI*, *Micro-Fusion Core*, *Sub-Dermal Armor Plate*, *Kinetic Micro-Pneumatics*).
- **Camera Fly-To Rig:** Camera position and orbit target smoothly lerp to inspected joints with real-time telemetry readout cards.
- **Tactile Material Switcher:** Live PBR shader mutation across 4 tactile finishes:
  - **Imperial Crimson** (`#FB3640` metallic gloss)
  - **Night Stealth** (`#0B1512` radar-absorbent matte obsidian)
  - **Polished Titanium** (`#DCE5EE` mirror-finish chrome)
  - **Neon Cyberpunk** (`#00F0FF` electroluminescent cyan)
- **Smart Idle Auto-Orbit:** Pauses immediately upon user touch/drag and resumes automatically after 3.5s of inactivity.

### 4. Smooth-Scroll & Scroll-Triggered Pinning Layout (`FlagshipPinning.jsx` & `lenis.js`)
- Virtual smooth inertia scrolling using **Lenis** synced with GSAP's `requestAnimationFrame` ticker.
- **Scroll-Lock Pinning:** Screen locks vertically and translates horizontally to reveal flagship highlights:
  - **Robowars Titan Arena:** 60kg pneumatic combat crushers
  - **Neon Drone Grand Prix:** FPV obstacle pylon racing at 160 km/h
  - **Humanoid Conclave:** Biomimetic AI and neural gait research
  - **Quantum Hack 48H:** Post-quantum cryptography sprint

### 5. Asymmetrical Bento Grid Portfolio (`BentoGrid.jsx` & `BentoCard.jsx`)
- Multi-column CSS Grid Bento Box arrangement for events, workshops, hackathons, and exhibitions.
- **Cursor Spotlight Glow:** Uses CSS variables (`--mouse-x`, `--mouse-y`) to project dynamic radial border illumination following user pointer movement.

### 6. Genesis & Global Impact About Section (`AboutSection.jsx`)
- Mission and legacy of Asia's largest science and technology festival.
- Key metrics: 175,000+ attendees, 2,500+ colleges, 60+ countries, and ₹50,00,000+ prize pool.

### 7. Festival Pass Registration Portal (`RegistrationPortal.jsx`)
- Terminal-style cyber registration modal generating unique pass tokens with celebratory confetti.

---

## 🏛️ Monorepo Architecture

```
TECH-Task-2/
├── client/                                 # Vite + React 19 Frontend Client
│   ├── public/                             # Static assets, favicon, models
│   ├── src/
│   │   ├── components/
│   │   │   ├── canvas/                     # WebGL 3D Canvas
│   │   │   │   └── HeroCanvas.jsx          # Mouse-reactive Quantum Core & Particles
│   │   │   ├── preloader/
│   │   │   │   └── CustomPreloader.jsx     # Scramble text & clip-path curtain reveal
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.jsx         # Split typography & CTAs
│   │   │   │   ├── FlagshipPinning.jsx     # GSAP horizontal scroll-lock pinning
│   │   │   │   ├── BentoGrid.jsx           # Asymmetrical event matrix
│   │   │   │   ├── AboutSection.jsx        # Genesis, vision & impact metrics
│   │   │   │   └── RegistrationPortal.jsx  # Cyber pass ticketing modal
│   │   │   ├── ui/
│   │   │   │   ├── BentoCard.jsx           # Mouse-following spotlight glow card
│   │   │   │   ├── CyberIcons.jsx          # Custom SVG vector icons for actuators
│   │   │   │   └── TechfestLogo.jsx        # Official geometric vector shield logo
│   │   │   ├── CameraRig.jsx               # Smooth lerp camera fly-to controller
│   │   │   ├── ControlDeck.jsx             # Floating bottom material switcher & shortcuts
│   │   │   ├── CyborgArm.jsx               # 3D procedural cyborg arm model
│   │   │   ├── HeaderHUD.jsx               # Top navigation bar with logo & audio toggle
│   │   │   ├── Hotspot.jsx                 # Vector SVG 3D beacon markers
│   │   │   ├── HotspotCard.jsx             # Actuator telemetry inspection card
│   │   │   ├── Loader.jsx                  # Drei progress loader fallback
│   │   │   ├── Scene.jsx                   # R3F Canvas, lighting & contact shadows
│   │   │   ├── SpecsModal.jsx              # System telemetry & hardware specs modal
│   │   │   └── WebGLFallback.jsx           # Hardware acceleration fallback screen
│   │   ├── lib/
│   │   │   ├── api.js                      # REST API client with fallback data
│   │   │   ├── audio.js                    # Web Audio API synthesized cyber clicks
│   │   │   └── lenis.js                    # Lenis smooth scroll ticker sync
│   │   ├── store/
│   │   │   └── useSceneStore.js            # Zustand state management
│   │   ├── styles/
│   │   │   └── theme.css                   # Design tokens, palette & glassmorphism
│   │   ├── App.jsx                         # Master orchestrator component
│   │   ├── index.css                       # Full-bleed scroll reset
│   │   └── main.jsx                        # React root entrypoint
│   ├── index.html                          # Fonts, meta tags & viewport
│   ├── vite.config.js                      # Vite proxy to Express API
│   └── package.json                        # Client dependencies
├── api/
│   └── index.js                            # Express REST API (health & models)
├── server.js                               # Local Express development runner
├── vercel.json                             # Serverless routing & build configuration
├── package.json                            # Monorepo root scripts & dev dependencies
└── README.md                               # Project documentation
```

---

## 📡 Express REST API

Serving model metadata and hotspot coordinates through Express keeps the backend meaningful, decoupled, and Vercel Serverless ready.

| Endpoint | Method | Response Description |
|---|---|---|
| `/api/health` | `GET` | System health check (`status`, `service`, `version`, `timestamp`) |
| `/api/models` | `GET` | Returns model catalog, specifications, materials, and 3D hotspot coordinates |
| `/api/models/:id` | `GET` | Fetches a specific model by ID (e.g. `cyborg-arm-x1`) |

#### Sample Response (`GET /api/models`):
```json
[
  {
    "id": "cyborg-arm-x1",
    "name": "CYBER-ARM MK-VIII // ARES",
    "specs": {
      "weight": "3.42 kg",
      "coreVoltage": "48V DC Supercapacitor",
      "neuralLatency": "0.84 ms",
      "maxGripForce": "12,400 N"
    },
    "hotspots": [
      {
        "id": "h1",
        "label": "Harmonic Servo Joint",
        "code": "ACTUATOR-01",
        "position": [0.35, 0.45, 0.2],
        "cameraPos": [1.3, 0.7, 1.2],
        "telemetry": { "torque": "840 Nm", "efficiency": "99.4%" }
      }
    ]
  }
]
```

---

## 💻 Local Setup & Quickstart

### Prerequisites
- Node.js >= 18
- npm >= 9

### Step 1: Clone Repository
```bash
git clone https://github.com/sagarkharbikar25/TECH-Task-2.git
cd TECH-Task-2
```

### Step 2: Install Dependencies
```bash
npm install
cd client && npm install && cd ..
```

### Step 3: Start Concurrent Full-Stack Environment
```bash
npm run dev
```

The application starts concurrently:
- **Client Application:** `http://localhost:5180`
- **Express Backend:** `http://localhost:5001`

### Step 4: Validate Production Build
```bash
npm run build
```
*(Build executes and minifies in < 1.0 second with 0 errors).*

---

## 📐 60 FPS Mobile & Performance Engineering Rules

1. **DPR Clamping:** Clamped to `dpr={[1, 1.75]}` to prevent high-DPI mobile screens from thermal throttling.
2. **Synchronous Animation Ticker:** Lenis virtual scroll updates directly inside GSAP's `requestAnimationFrame` loop, eliminating scroll-stutter.
3. **Procedural Geometry Efficiency:** Instanced particle fields with AdditiveBlending and procedural geometries keep the bundle under 420 kB gzipped with zero multi-megabyte GLTF network stalls.
4. **Hardware SVG Vector Reticles:** Custom vector SVG target icons replace blurry PNG bitmaps, ensuring infinite sharpness at any 3D zoom distance.
5. **WebGL Context Fallback:** Automatic detection of WebGL context availability with friendly recovery diagnostics.

---

## 📜 License
MIT License © 2026 Techfest CA Program Participant
