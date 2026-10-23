// Fallback data if server API is unavailable or static hosting
const FALLBACK_MODEL = {
  id: "cyborg-arm-x1",
  name: "CYBER-ARM MK-VIII // ARES",
  category: "Prosthetic Exosuit / Cybernetic Combat Rig",
  version: "v8.4.2-PRO",
  file: "/models/arm.glb",
  description: "Next-generation biomechatronic cyber-arm engineered for the Techfest Cybernetic Division. Features titanium-graphene alloy framework, sub-millisecond neural impulse telemetry, and adaptive pneumatic force dampening.",
  specs: {
    weight: "3.42 kg",
    coreVoltage: "48V DC Supercapacitor",
    neuralLatency: "0.84 ms",
    maxGripForce: "12,400 N",
    materialClass: "Grade 5 Titanium / Graphene"
  },
  hotspots: [
    {
      id: "h1",
      label: "Harmonic Servo Joint",
      code: "ACTUATOR-01",
      position: [0.35, 0.45, 0.2],
      cameraPos: [1.3, 0.7, 1.2],
      targetPos: [0.35, 0.45, 0.2],
      telemetry: {
        torque: "840 Nm",
        temp: "38.2 °C",
        efficiency: "99.4%"
      },
      info: "High-torque harmonic drive actuator with integrated optical encoder. Provides micro-radian angular resolution for precision surgical manipulation and combat load resistance."
    },
    {
      id: "h2",
      label: "Neural BCI Interface",
      code: "SYNAPSE-02",
      position: [-0.4, 0.25, -0.15],
      cameraPos: [-1.4, 0.5, 0.9],
      targetPos: [-0.4, 0.25, -0.15],
      telemetry: {
        bandwidth: "128 Gbps",
        latency: "0.42 ms",
        neuralSync: "99.8%"
      },
      info: "Direct neuro-synaptic bridge with invasive optogenetic transceiver array. Translates cortical motor intent into direct actuator motion with near-zero latency."
    },
    {
      id: "h3",
      label: "Micro-Fusion Core",
      code: "REACTOR-03",
      position: [0.0, 0.1, 0.45],
      cameraPos: [0.2, 0.3, 1.6],
      targetPos: [0.0, 0.1, 0.45],
      telemetry: {
        output: "1.21 GW Peak",
        containment: "Magnetic 99.9%",
        fuelLevel: "94.2%"
      },
      info: "Cold-plasma micro-fusion cell powering servo overclocks and active defensive shield projectors. Features emergency magnetic scram release."
    },
    {
      id: "h4",
      label: "Sub-Dermal Armor Plate",
      code: "CARAPACE-04",
      position: [-0.25, 0.85, 0.1],
      cameraPos: [-0.9, 1.2, 1.1],
      targetPos: [-0.25, 0.85, 0.1],
      telemetry: {
        hardness: "9.8 Mohs",
        dispersion: "84.5 kJ",
        integrity: "100%"
      },
      info: "Interlocking hex-mesh ballistic carbon-graphene plating with non-Newtonian shear-thickening fluid backing for kinetic energy dissipation."
    },
    {
      id: "h5",
      label: "Kinetic Micro-Pneumatic",
      code: "STABILIZER-05",
      position: [0.45, -0.3, 0.1],
      cameraPos: [1.2, -0.2, 1.0],
      targetPos: [0.45, -0.3, 0.1],
      telemetry: {
        pressure: "350 Bar",
        response: "1.1 ms",
        cycleCount: "420k"
      },
      info: "High-velocity nitrogen pneumatic recoil compensator. Counteracts sudden heavy impacts and stabilizes aim during rapid ballistic discharges."
    }
  ],
  materials: [
    {
      id: "imperial",
      name: "Imperial Crimson",
      subtitle: "Techfest Official Edition",
      color: "#FB3640",
      accentColor: "#FF6B6B",
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.8,
      description: "Signature Techfest high-energy crimson finish with red anodized titanium brackets and reflective topcoat."
    },
    {
      id: "obsidian",
      name: "Night Stealth",
      subtitle: "Covert Operations Spec",
      color: "#0B1512",
      accentColor: "#000F08",
      metalness: 0.95,
      roughness: 0.38,
      clearcoat: 0.2,
      description: "Matte radar-absorbent radar-scattering obsidian composite designed for deep darkness and night missions."
    },
    {
      id: "chrome",
      name: "Polished Titanium",
      subtitle: "Exhibition Mirror Finish",
      color: "#DCE5EE",
      accentColor: "#FFFFFF",
      metalness: 1.0,
      roughness: 0.12,
      clearcoat: 1.0,
      description: "Mirror-grade aerospace titanium alloy with diamond-lapping polish and ultra-high specular reflectivity."
    },
    {
      id: "cyber_cyan",
      name: "Neon Cyberpunk",
      subtitle: "High-Voltage Overdrive",
      color: "#00F0FF",
      accentColor: "#7000FF",
      metalness: 0.72,
      roughness: 0.25,
      clearcoat: 0.6,
      description: "Electroluminescent polymer infusion with reactive neon cyan phosphorescence and quantum dot coating."
    }
  ]
};

export async function fetchModels() {
  try {
    const res = await fetch("/api/models");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : FALLBACK_MODEL;
  } catch (err) {
    console.warn("[API] Using fallback model data:", err.message);
    return FALLBACK_MODEL;
  }
}
