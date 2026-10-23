import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../store/useSceneStore';

export function CameraRig({ controlsRef }) {
  const { camera } = useThree();
  const selectedHotspot = useSceneStore((state) => state.selectedHotspot);
  const isResettingCamera = useSceneStore((state) => state.isResettingCamera);
  const isAutoRotating = useSceneStore((state) => state.isAutoRotating);
  const setAutoRotate = useSceneStore((state) => state.setAutoRotate);

  const idleTimerRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(3.2, 1.8, 4.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));

  // Handle user interaction timeout to resume auto-rotate
  useEffect(() => {
    const handleUserInteraction = () => {
      // Pause auto-rotation when user moves camera manually
      if (isAutoRotating) {
        setAutoRotate(false);
      }
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        // Only resume if no hotspot is actively inspected
        if (!useSceneStore.getState().selectedHotspot) {
          setAutoRotate(true);
        }
      }, 3500);
    };

    window.addEventListener('pointerdown', handleUserInteraction);
    window.addEventListener('wheel', handleUserInteraction);

    return () => {
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('wheel', handleUserInteraction);
      clearTimeout(idleTimerRef.current);
    };
  }, [isAutoRotating, setAutoRotate]);

  // Update target positions based on selection or reset
  useEffect(() => {
    if (selectedHotspot) {
      targetCamPos.current.set(...selectedHotspot.cameraPos);
      targetLookAt.current.set(...(selectedHotspot.targetPos || selectedHotspot.position));
    } else {
      targetCamPos.current.set(3.2, 1.8, 4.5);
      targetLookAt.current.set(0, 0.4, 0);
    }
  }, [selectedHotspot, isResettingCamera]);

  useFrame((_state, delta) => {
    const lerpSpeed = Math.min(delta * 3.5, 0.15);

    if (selectedHotspot || isResettingCamera) {
      camera.position.lerp(targetCamPos.current, lerpSpeed);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
        controlsRef.current.update();
      }
    }
  });

  return null;
}
