import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../store/useSceneStore';

export function CyborgArm() {
  const groupRef = useRef();
  const fingersRef = useRef([]);
  const coreRef = useRef();
  const cablesRef = useRef();
  
  const activeMaterial = useSceneStore((state) => state.activeMaterial);
  const wireframe = useSceneStore((state) => state.wireframe);

  // Material instances
  const armorMaterial = new THREE.MeshPhysicalMaterial({
    color: activeMaterial.color || '#FB3640',
    metalness: activeMaterial.metalness ?? 0.85,
    roughness: activeMaterial.roughness ?? 0.25,
    clearcoat: activeMaterial.clearcoat ?? 0.8,
    clearcoatRoughness: 0.1,
    wireframe: wireframe,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: '#D8E2EC',
    metalness: 0.98,
    roughness: 0.12,
    wireframe: wireframe,
  });

  const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
    color: '#15191E',
    metalness: 0.9,
    roughness: 0.45,
    wireframe: wireframe,
  });

  const copperMaterial = new THREE.MeshStandardMaterial({
    color: '#C87D55',
    metalness: 0.95,
    roughness: 0.3,
    wireframe: wireframe,
  });

  const glowAccentMaterial = new THREE.MeshBasicMaterial({
    color: activeMaterial.accentColor || '#FB3640',
    wireframe: wireframe,
  });

  // Micro-idle mechanical breathing animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 1.5;
    }
    // Subtle flex on fingers
    fingersRef.current.forEach((finger, i) => {
      if (finger) {
        finger.rotation.x = Math.sin(t * 1.2 + i * 0.4) * 0.05 + 0.1;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* ================= FOREARM CHASSIS ================= */}
      <group position={[0, 0, 0]}>
        {/* Main arm bone structural cylinder */}
        <mesh position={[0, 0.4, 0]} material={darkTitaniumMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.32, 1.4, 24]} />
        </mesh>

        {/* Central hydraulic piston rod */}
        <mesh position={[0.18, 0.4, 0.1]} material={chromeMaterial} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
        </mesh>
        <mesh position={[-0.18, 0.4, 0.1]} material={chromeMaterial} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
        </mesh>

        {/* Piston casing sleeve */}
        <mesh position={[0.18, 0.1, 0.1]} material={armorMaterial} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.6, 16]} />
        </mesh>
        <mesh position={[-0.18, 0.1, 0.1]} material={armorMaterial} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.6, 16]} />
        </mesh>

        {/* Copper heatsink cooling fins */}
        {[-0.15, -0.05, 0.05, 0.15, 0.25].map((y, idx) => (
          <mesh key={idx} position={[0, y, -0.18]} material={copperMaterial}>
            <boxGeometry args={[0.34, 0.02, 0.12]} />
          </mesh>
        ))}

        {/* Forearm Armor Plates (Outer Shell) */}
        <mesh position={[0, 0.5, 0.22]} rotation={[0.08, 0, 0]} material={armorMaterial} castShadow>
          <boxGeometry args={[0.52, 0.95, 0.1]} />
        </mesh>

        {/* Lateral side armor plates */}
        <mesh position={[0.28, 0.45, -0.02]} rotation={[0, 0.2, 0]} material={armorMaterial} castShadow>
          <boxGeometry args={[0.1, 0.85, 0.35]} />
        </mesh>
        <mesh position={[-0.28, 0.45, -0.02]} rotation={[0, -0.2, 0]} material={armorMaterial} castShadow>
          <boxGeometry args={[0.1, 0.85, 0.35]} />
        </mesh>

        {/* High-tech glow conduits / status light strips */}
        <mesh position={[0, 0.5, 0.28]} material={glowAccentMaterial}>
          <boxGeometry args={[0.04, 0.8, 0.02]} />
        </mesh>
        <mesh position={[0.16, 0.5, 0.28]} material={glowAccentMaterial}>
          <boxGeometry args={[0.02, 0.6, 0.015]} />
        </mesh>
        <mesh position={[-0.16, 0.5, 0.28]} material={glowAccentMaterial}>
          <boxGeometry args={[0.02, 0.6, 0.015]} />
        </mesh>
      </group>

      {/* ================= WRIST GIMBAL ================= */}
      <group position={[0, 1.25, 0]}>
        {/* Main wrist pivot ring */}
        <mesh material={darkTitaniumMaterial} castShadow>
          <torusGeometry args={[0.28, 0.08, 16, 32]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.15, 24]} />
        </mesh>
        {/* Wrist neon status bead ring */}
        <mesh material={glowAccentMaterial}>
          <torusGeometry args={[0.29, 0.015, 12, 32]} />
        </mesh>
      </group>

      {/* ================= PALM & CARPAL ASSEMBLY ================= */}
      <group position={[0, 1.6, 0]}>
        {/* Palm center block */}
        <mesh material={darkTitaniumMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.56, 0.5, 0.22]} />
        </mesh>

        {/* Dorsal Backplate Armor */}
        <mesh position={[0, 0, 0.13]} material={armorMaterial} castShadow>
          <boxGeometry args={[0.58, 0.52, 0.06]} />
        </mesh>

        {/* Glowing Fusion Reactor Core in center of palm */}
        <group position={[0, 0, 0.17]}>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh ref={coreRef} material={glowAccentMaterial}>
            <torusGeometry args={[0.07, 0.02, 12, 16]} />
          </mesh>
          {/* Point light emitting from reactor core */}
          <pointLight color={activeMaterial.accentColor || '#FB3640'} intensity={1.5} distance={2.5} />
        </group>
      </group>

      {/* ================= FINGERS & PHALANGES ================= */}
      <group position={[0, 1.88, 0]}>
        {/* Index Finger */}
        <group
          position={[-0.2, 0, 0]}
          ref={(el) => (fingersRef.current[0] = el)}
        >
          {/* Knuckle actuator */}
          <mesh material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.065, 16, 16]} />
          </mesh>
          {/* Phalanx 1 */}
          <mesh position={[0, 0.16, 0]} material={armorMaterial} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.24, 12]} />
          </mesh>
          {/* Mid joint */}
          <mesh position={[0, 0.3, 0]} material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
          {/* Phalanx 2 */}
          <mesh position={[0, 0.44, 0]} material={darkTitaniumMaterial} castShadow>
            <cylinderGeometry args={[0.035, 0.045, 0.22, 12]} />
          </mesh>
          {/* Fingertip sensor cap */}
          <mesh position={[0, 0.57, 0]} material={glowAccentMaterial}>
            <coneGeometry args={[0.032, 0.08, 12]} />
          </mesh>
        </group>

        {/* Middle Finger (Longest) */}
        <group
          position={[-0.07, 0.02, 0]}
          ref={(el) => (fingersRef.current[1] = el)}
        >
          <mesh material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.07, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.18, 0]} material={armorMaterial} castShadow>
            <cylinderGeometry args={[0.048, 0.058, 0.28, 12]} />
          </mesh>
          <mesh position={[0, 0.34, 0]} material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.048, 12, 12]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={darkTitaniumMaterial} castShadow>
            <cylinderGeometry args={[0.038, 0.048, 0.25, 12]} />
          </mesh>
          <mesh position={[0, 0.64, 0]} material={glowAccentMaterial}>
            <coneGeometry args={[0.034, 0.08, 12]} />
          </mesh>
        </group>

        {/* Ring Finger */}
        <group
          position={[0.07, 0, 0]}
          ref={(el) => (fingersRef.current[2] = el)}
        >
          <mesh material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.065, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={armorMaterial} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.24, 12]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
          <mesh position={[0, 0.44, 0]} material={darkTitaniumMaterial} castShadow>
            <cylinderGeometry args={[0.035, 0.045, 0.22, 12]} />
          </mesh>
          <mesh position={[0, 0.57, 0]} material={glowAccentMaterial}>
            <coneGeometry args={[0.032, 0.08, 12]} />
          </mesh>
        </group>

        {/* Pinky Finger */}
        <group
          position={[0.2, -0.04, 0]}
          ref={(el) => (fingersRef.current[3] = el)}
        >
          <mesh material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.13, 0]} material={armorMaterial} castShadow>
            <cylinderGeometry args={[0.038, 0.045, 0.2, 12]} />
          </mesh>
          <mesh position={[0, 0.25, 0]} material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.038, 12, 12]} />
          </mesh>
          <mesh position={[0, 0.37, 0]} material={darkTitaniumMaterial} castShadow>
            <cylinderGeometry args={[0.03, 0.038, 0.18, 12]} />
          </mesh>
          <mesh position={[0, 0.48, 0]} material={glowAccentMaterial}>
            <coneGeometry args={[0.028, 0.06, 12]} />
          </mesh>
        </group>

        {/* Thumb (Articulated at angle) */}
        <group
          position={[-0.34, -0.3, 0.08]}
          rotation={[0.2, 0.4, 0.5]}
          ref={(el) => (fingersRef.current[4] = el)}
        >
          <mesh material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.075, 16, 16]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={armorMaterial} castShadow>
            <cylinderGeometry args={[0.05, 0.065, 0.24, 12]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={chromeMaterial} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
          </mesh>
          <mesh position={[0, 0.44, 0]} material={darkTitaniumMaterial} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.22, 12]} />
          </mesh>
          <mesh position={[0, 0.56, 0]} material={glowAccentMaterial}>
            <coneGeometry args={[0.036, 0.08, 12]} />
          </mesh>
        </group>
      </group>

      {/* ================= PNEUMATIC CABLES ================= */}
      <group ref={cablesRef}>
        {/* Curving flexible conduit on dorsal side */}
        <mesh position={[0.22, 0.9, -0.1]} material={darkTitaniumMaterial}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0.15, -0.2, 0.05),
                new THREE.Vector3(0.3, 0.4, -0.1),
                new THREE.Vector3(0.18, 0.9, 0.05),
              ]),
              20,
              0.025,
              8,
              false
            ]}
          />
        </mesh>
        <mesh position={[-0.22, 0.9, -0.1]} material={darkTitaniumMaterial}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(-0.15, -0.2, 0.05),
                new THREE.Vector3(-0.3, 0.4, -0.1),
                new THREE.Vector3(-0.18, 0.9, 0.05),
              ]),
              20,
              0.025,
              8,
              false
            ]}
          />
        </mesh>
      </group>
    </group>
  );
}
