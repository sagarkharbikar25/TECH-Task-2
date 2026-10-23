# Task 2: Build in 3D (100 pts)

**Repo name:** `techfest-ca-3d-showcase`
**Live URL (target):** `techfest-ca-3d-showcase.vercel.app`
**Stack:** React (Vite) · three.js · @react-three/fiber · @react-three/drei · Zustand · Node.js · Express · Vercel
**Estimated time:** ~2 days

> Confirm in the official brief: what "3D" is expected to mean, whether pre-made models are allowed, deliverable format, judging criteria, and deadline.

---

## 1. Concept

An interactive 3D product viewer: a **cyborg arm / gadget showcase** (matches the Techfest cyborg theme).

Core interactions:
- Orbit, zoom, and auto-rotate when idle
- Click a hotspot and the camera flies to that part with an info card
- Material / color switcher
- Loading screen with progress

---

## 2. Architecture

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/models` | Returns model metadata, hotspot positions, and descriptions |

Serving hotspot data from Express keeps the backend meaningful without adding a database. Static JSON in the API is fine.

### Folder structure
```
techfest-ca-3d-showcase/
├── client/
│   ├── public/
│   │   └── models/        compressed .glb files
│   ├── src/
│   │   ├── components/    Scene, Model, Hotspot, CameraRig, Loader, UIPanel
│   │   ├── store/         useSceneStore.js (Zustand)
│   │   ├── hooks/
│   │   ├── lib/           api.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── api/
│   └── index.js
├── vercel.json
├── package.json
├── .env.example
└── README.md
```

### `api/index.js`
```js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const models = [
  {
    id: "arm-01",
    name: "Cyborg Arm",
    file: "/models/arm.glb",
    hotspots: [
      { id: "h1", label: "Servo Joint", position: [0.2, 0.5, 0.1], cameraPos: [1.2, 0.8, 1.5], info: "..." },
      { id: "h2", label: "Neural Link", position: [-0.3, 0.1, 0.2], cameraPos: [-1.5, 0.4, 1.2], info: "..." },
    ],
    materials: [
      { id: "chrome", color: "#cfd8e3", metalness: 1, roughness: 0.15 },
      { id: "neon", color: "#00f0ff", metalness: 0.6, roughness: 0.3 },
      { id: "stealth", color: "#101318", metalness: 0.8, roughness: 0.45 },
    ],
  },
];

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/models", (_req, res) => res.json(models));

export default app;
```

### `vercel.json`
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Root `package.json`: `"type": "module"`, deps `express`, `cors`. Add a local `server.js` plus a Vite proxy for dev.

---

## 3. Model Strategy

| Option | Pros | Cons |
|---|---|---|
| Free glTF (Sketchfab CC-BY, Poly Pizza, Kenney CC0) | Fast, looks good | Must credit, check license |
| Procedural (primitives + materials) | Fully original, tiny | Takes longer to look polished |
| Own Blender model | Original | Biggest time cost |

**Recommendation:** use a CC0 or CC-BY model, credit it in the README and in the page footer, and spend your time on interaction and polish.

### Compress the model
```bash
npm i -g @gltf-transform/cli
gltf-transform optimize input.glb public/models/arm.glb --compress draco --texture-compress webp
```
Target: under 5 MB. If you use Draco in the app, load the decoder through drei's `useGLTF` (it handles Draco by default via CDN).

---

## 4. Core Implementation Notes

- `Canvas` with `dpr={[1, 2]}`, `shadows`, `camera={{ position: [3, 2, 5], fov: 45 }}`
- Lighting: `Environment` preset (e.g. `city` or `warehouse`), one directional light, soft contact shadows (`ContactShadows`)
- `OrbitControls` with damping, `minDistance`/`maxDistance`, limited polar angle
- `CameraRig`: lerp the camera position and controls target toward the selected hotspot on click (`useFrame`)
- `Hotspot`: drei `Html` with a pulsing dot, hides when occluded (`occlude`)
- Zustand store: `{ selectedHotspot, material, autoRotate }`
- Material switcher: traverse the model scene and update `material.color`, `metalness`, `roughness`
- Stop auto-rotate on user interaction, resume after idle (~3s)
- Loading screen: `useProgress` from drei, show percent
- Lazy-load the Canvas component (`React.lazy`) so the shell renders instantly

---

## 5. Build Checklist

- [ ] Create repo, scaffold Vite + R3F, commit `chore: scaffold`
- [ ] Canvas, lights, environment, orbit controls
- [ ] Load and compress the model, add `Suspense` and the loader UI
- [ ] Zustand store
- [ ] Hotspots with camera fly-to and info card
- [ ] Material switcher UI
- [ ] Idle auto-rotate logic
- [ ] Express `GET /api/models`, fetch it in the client
- [ ] Responsive UI panel (bottom sheet on mobile)
- [ ] Performance: cap DPR, dispose resources, check FPS on a phone
- [ ] Fallback message if WebGL is unavailable
- [ ] Credits section for the model license
- [ ] Deploy, test live (check the `/models/*.glb` asset loads in production)
- [ ] README with screenshots and a short screen recording
- [ ] Submit on ca.techfest.org

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| Heavy model, slow load | Draco + WebP compression, lazy canvas, loading screen |
| Mobile GPU limits | Cap DPR, fewer lights, no heavy post-processing |
| License problems | CC0/CC-BY only, credit visibly |
| Time sink on model creation | Use an existing model, put effort into interaction |
| Hotspot positions look wrong | Log click coordinates in dev to place them accurately |

---

## 7. Definition of Done

- Loads in a few seconds on a normal connection
- Smooth interaction on desktop and a mid-range phone
- Hotspots, camera transitions, and material switcher all work
- Credits included, README complete

---

## 8. README Skeleton

```md
# 3D Cyborg Showcase

Techfest CA Program, Web Development, Task 2.

**Live:** https://techfest-ca-3d-showcase.vercel.app

## Preview
<screenshot / GIF>

## Features
- Interactive 3D viewer (react-three-fiber)
- Hotspot camera transitions
- Live material switcher
- Model metadata served by Express

## Stack
React (Vite) · three.js · R3F · drei · Zustand · Express · Vercel

## Run locally
npm install && cd client && npm install
npm run dev

## Decisions
- Draco-compressed glTF under 5 MB
- Lazy-loaded canvas for fast first paint
- Capped pixel ratio for mobile performance

## Credits
Model: <name> by <author>, <license>, <link>
```
