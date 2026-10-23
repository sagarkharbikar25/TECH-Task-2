import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function QuantumCore() {
  const meshRef = useRef();
  const ringRef = useRef();
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    // Smooth dampening of mouse coordinates
    mouseSmooth.current.x = THREE.MathUtils.lerp(mouseSmooth.current.x, pointer.x, 0.05);
    mouseSmooth.current.y = THREE.MathUtils.lerp(mouseSmooth.current.y, pointer.y, 0.05);

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15 + mouseSmooth.current.y * 0.6;
      meshRef.current.rotation.y = t * 0.25 + mouseSmooth.current.x * 0.6;
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.35;
      ringRef.current.rotation.y = t * 0.2;
      ringRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.0, 3]} />
        <meshStandardMaterial
          wireframe
          color="#00F0FF"
          emissive="#003544"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Plasma Core */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial
          color="#FB3640"
          emissive="#FB3640"
          emissiveIntensity={1.8}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Gyro Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3.2, 0.018, 16, 100]} />
          <meshBasicMaterial color="#FB3640" />
        </mesh>
      </group>

      <pointLight position={[0, 0, 0]} color="#FB3640" intensity={2.5} distance={7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#00F0FF" />
    </group>
  );
}

function ParticleNetwork() {
  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef();

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00F0FF"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <QuantumCore />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
