import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../store/useSceneStore';

export function CameraRig({ controlsRef }) {
  const { camera } = useThree();
  const selectedHotspot = useSceneStore((state) => state.selectedHotspot);
  const isResettingCamera = useSceneStore((state) => state.isResettingCamera);
  const setAutoRotate = useSceneStore((state) => state.setAutoRotate);

  const idleTimerRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(3.2, 1.8, 4.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));

  // Bind drag pause/resume exclusively to OrbitControls interactions (NOT global window clicks)
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleControlsStart = () => {
      // Pause while dragging the 3D model
      setAutoRotate(false);
      clearTimeout(idleTimerRef.current);
    };

    const handleControlsEnd = () => {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        const store = useSceneStore.getState();
        // Only resume if user wants auto-rotate AND no hotspot is actively inspected
        if (store.userAutoRotatePreference && !store.selectedHotspot) {
          setAutoRotate(true);
        }
      }, 3000);
    };

    controls.addEventListener('start', handleControlsStart);
    controls.addEventListener('end', handleControlsEnd);

    return () => {
      controls.removeEventListener('start', handleControlsStart);
      controls.removeEventListener('end', handleControlsEnd);
      clearTimeout(idleTimerRef.current);
    };
  }, [controlsRef, setAutoRotate]);

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
