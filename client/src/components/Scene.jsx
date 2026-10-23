import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { CyborgArm } from './CyborgArm';
import { Hotspot } from './Hotspot';
import { CameraRig } from './CameraRig';
import { useSceneStore } from '../store/useSceneStore';

export function Scene() {
  const controlsRef = useRef();
  const modelData = useSceneStore((state) => state.modelData);
  const isAutoRotating = useSceneStore((state) => state.isAutoRotating);
  const lightingPreset = useSceneStore((state) => state.lightingPreset);
  const activeMaterial = useSceneStore((state) => state.activeMaterial);

  const hotspots = modelData?.hotspots || [];

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.2, 1.8, 4.5], fov: 42 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#000F08',
      }}
    >
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.5} />
      
      {/* Key Main Studio Light */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-5, 3, -2]}
        intensity={0.6}
        color="#88AAFF"
      />

      {/* Imperial Red Cyber Rim Light */}
      <directionalLight
        position={[-3, -2, -4]}
        intensity={1.2}
        color={activeMaterial.accentColor || '#FB3640'}
      />

      {/* Studio Environment Reflections */}
      <Suspense fallback={null}>
        {lightingPreset !== 'night' && (
          <Environment preset={lightingPreset === 'warehouse' ? 'warehouse' : 'city'} />
        )}
      </Suspense>

      {/* 3D Model & Interactive Hotspots */}
      <Suspense fallback={null}>
        <group>
          <CyborgArm />

          {/* Interactive 3D Actuator Hotspots */}
          {hotspots.map((hs) => (
            <Hotspot key={hs.id} hotspot={hs} />
          ))}

          {/* Soft Ground Contact Shadows */}
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.65}
            scale={5}
            blur={2.2}
            far={1.6}
            color="#000000"
          />
        </group>
      </Suspense>

      {/* Smooth Camera Flight Controller */}
      <CameraRig controlsRef={controlsRef} />

      {/* Smooth Orbit & Touch Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        autoRotate={isAutoRotating}
        autoRotateSpeed={0.8}
        minDistance={1.6}
        maxDistance={7.5}
        maxPolarAngle={Math.PI / 2 + 0.08}
        minPolarAngle={0.2}
      />
    </Canvas>
  );
}
