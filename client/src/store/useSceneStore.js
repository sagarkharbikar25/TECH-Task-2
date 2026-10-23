import { create } from 'zustand';

export const useSceneStore = create((set, get) => ({
  modelData: null,
  selectedHotspot: null,
  activeMaterial: {
    id: "imperial",
    name: "Imperial Crimson",
    color: "#FB3640",
    metalness: 0.88,
    roughness: 0.22,
    clearcoat: 0.8,
  },
  isAutoRotating: true,
  userAutoRotatePreference: true, // Tracks explicit user intent
  cameraTarget: [0, 0, 0],
  cameraPosition: [3.2, 1.8, 4.5],
  overviewPosition: [3.2, 1.8, 4.5],
  overviewTarget: [0, 0, 0],
  isResettingCamera: false,
  soundEnabled: true,
  wireframe: false,
  lightingPreset: 'city',
  isMobileDrawerOpen: false,

  setModelData: (data) => {
    set({
      modelData: data,
      activeMaterial: data?.materials?.[0] || get().activeMaterial
    });
  },

  setSelectedHotspot: (hotspot) => {
    if (!hotspot) {
      set((state) => ({
        selectedHotspot: null,
        isMobileDrawerOpen: false,
        isAutoRotating: state.userAutoRotatePreference,
      }));
      return;
    }

    set({
      selectedHotspot: hotspot,
      isAutoRotating: false,
      isMobileDrawerOpen: true,
    });
  },

  setActiveMaterial: (material) => {
    set({ activeMaterial: material });
  },

  setAutoRotate: (val) => {
    set({ isAutoRotating: val });
  },

  toggleAutoRotate: () => {
    set((state) => {
      const nextVal = !state.isAutoRotating;
      return {
        isAutoRotating: nextVal,
        userAutoRotatePreference: nextVal,
      };
    });
  },

  toggleWireframe: () => {
    set((state) => ({ wireframe: !state.wireframe }));
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  setLightingPreset: (preset) => {
    set({ lightingPreset: preset });
  },

  setMobileDrawerOpen: (isOpen) => {
    set({ isMobileDrawerOpen: isOpen });
  },

  resetView: () => {
    set({
      selectedHotspot: null,
      isMobileDrawerOpen: false,
      isResettingCamera: true,
      isAutoRotating: true,
      userAutoRotatePreference: true,
    });
    setTimeout(() => {
      set({ isResettingCamera: false });
    }, 1200);
  }
}));
