# Techfest CA Program // Task 2: Build in 3D & Flagship Portal

A high-performance, sci-fi cybernetic technology festival web application built for the **Techfest CA Program (Task 2: Build in 3D - 100 pts)**, inspired by the visual weight, fluid motion, and prestige of IIT Bombay's Techfest.

---

## 🚀 Live Demo & Deployment
- **Target URL:** [techfest-ca-3d-showcase.vercel.app](https://techfest-ca-3d-showcase.vercel.app)
- **Local Dev Server:** `http://localhost:5180` (Client) & `http://localhost:5001` (Express API)

---

## 🎨 Visual Identity & Palettes
- **Night (`#000F08` / `#08080C`):** Deep abyssal black base for canvas backdrops and obsidian glass surfaces.
- **Imperial Red (`#FB3640`):** Electric crimson accent for interactive hotspots, active state glows, and telemetry badges.
- **Electric Cyan (`#00F0FF`):** Quantum particle trails, futuristic HUD accents, and primary button rings.
- **Typography:**
  - **`Space Grotesk`:** High-impact editorial sci-fi display headers.
  - **`JetBrains Mono`:** Telemetry specs, coordinates, and diagnostic logs.
  - **`Plus Jakarta Sans`:** Ultra-clean readable body copy.

---

## ⚡ Core Features & Interactive Phases

### 1. Immersive Splash Screen / Custom Preloader
- Percentage-based counter (0% to 100%) tracking asset hydration.
- Kinetic sci-fi text-scrambling readout engine with animated glyph decryption.
- GSAP timeline-driven clip-path polygon curtain reveal to unveil the page.

### 2. Hero Section & 3D Interactive Canvas
- WebGL background canvas powered by Three.js & React Three Fiber.
- Procedural Quantum Core featuring an abstract wireframe icosahedron and glowing inner plasma shell.
- Dynamic mouse-following coordinate tilt, spatial distortion, and particle field.
- Split-character staggered headline entrance animation.

### 3. Task 2 Interactive 3D Cyborg Arm Showcase
- Full-viewport 3D biomechatronic cyber-arm product viewer.
- **Smooth Camera Rig:** Fly-to transitions lerping camera and target smoothly to active hotspots.
- **Pulsing 3D Hotspots:** Concentric beacon rings pinned to actuators (Harmonic Servo Joint, Neural BCI Interface, Micro-Fusion Core, Sub-Dermal Armor Plate, Kinetic Micro-Pneumatics).
- **Tactile Material Switcher:** Real-time PBR material changes between Imperial Crimson (`#FB3640`), Night Stealth (`#0B1512`), Polished Titanium (`#DCE5EE`), and Neon Cyberpunk (`#00F0FF`).
- **Telemetry Inspection Drawer:** Real-time readouts of torque, bandwidth, efficiency, latency, and temperature.
- **Auto-Orbit:** Automatic idle camera rotation resuming after 3.5s of inactivity.

### 4. Smooth-Scroll & Scroll-Triggered Pinning Layout
- Virtual smooth inertia scrolling using **Lenis**.
- GSAP ScrollTrigger horizontal pinning showcase for flagship highlights:
  - Robowars // Titan Combat Arena (60kg crushers)
  - Neon Drone Grand Prix (FPV pylon racing at 160 km/h)
  - Humanoid Conclave (Biomimetic AI & neural gait)
  - Quantum Hack 48H (Post-quantum cryptography)

### 5. Asymmetrical Bento Grid Portfolio
- Multi-column CSS Grid Bento Box arrangement for events, workshops, and exhibitions.
- Interactive cursor-following spotlight glow calculated via CSS variables (`--mouse-x`, `--mouse-y`) casting radial border illumination.

### 6. Festival Registration Pass Portal
- Terminal-style access registration modal issuing digital tokens with confetti celebrations.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19 (Vite) |
| **3D Engine** | Three.js · @react-three/fiber · @react-three/drei |
| **Animation & Motion** | GSAP 3 (ScrollTrigger, Timelines) · Lenis Smooth Scroll |
| **State Management** | Zustand (`useSceneStore`) |
| **Backend API** | Node.js · Express.js (`/api/models`, `/api/health`) |
| **Audio Synthesis** | Web Audio API (zero-latency synthesized cyber clicks) |
| **Deployment** | Vercel Serverless Functions & Static CDN |

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Clone the repository
git clone https://github.com/sagarkharbikar25/TECH-Task-2.git
cd TECH-Task-2

# Install dependencies (root & client)
npm install
cd client && npm install && cd ..

# Run concurrent full-stack dev server
npm run dev
```

The application will start:
- **Client Application:** `http://localhost:5180`
- **Express REST API:** `http://localhost:5001`
- **Health Check:** `http://localhost:5001/api/health`
- **Models Endpoint:** `http://localhost:5001/api/models`

### Production Build
```bash
npm run build
```

---

## 📐 60 FPS Mobile Optimization Rules
1. **DPR Clamping:** Capped at `dpr={[1, 1.75]}` to prevent high-DPI mobile GPU thermal throttling.
2. **Ticker Synchronization:** Lenis smooth scrolling updates synchronously inside GSAP's `requestAnimationFrame` ticker.
3. **Procedural Geometry Efficiency:** Instanced particle fields with AdditiveBlending and procedural geometries keep the bundle under 450 kB gzipped without heavy multi-megabyte 3D downloads.
4. **WebGL Fallback:** Automatic detection of WebGL context availability with diagnostic recovery prompts.

---

## 📜 License
MIT © Techfest CA Program Participant
