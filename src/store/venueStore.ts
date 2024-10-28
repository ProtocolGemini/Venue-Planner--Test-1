import { create } from 'zustand';
import type { POI, VenueLayout } from '../types/venue';

interface VenueState {
  currentLayout: VenueLayout | null;
  pois: POI[];
  selectedPoi: string | null;
  blueprint: string | null;
  addPoi: (poi: POI) => void;
  updatePoi: (id: string, poi: Partial<POI>) => void;
  deletePoi: (id: string) => void;
  setSelectedPoi: (id: string | null) => void;
  setBlueprint: (blueprint: string | null) => void;
  saveLayout: (name: string) => void;
  loadLayout: (layout: VenueLayout) => void;
}

export const useVenueStore = create<VenueState>((set) => ({
  currentLayout: null,
  pois: [],
  selectedPoi: null,
  blueprint: null,
  addPoi: (poi) => set((state) => ({ pois: [...state.pois, poi] })),
  updatePoi: (id, updates) =>
    set((state) => ({
      pois: state.pois.map((poi) =>
        poi.id === id ? { ...poi, ...updates } : poi
      ),
    })),
  deletePoi: (id) =>
    set((state) => ({
      pois: state.pois.filter((poi) => poi.id !== id),
      selectedPoi: state.selectedPoi === id ? null : state.selectedPoi,
    })),
  setSelectedPoi: (id) => set({ selectedPoi: id }),
  setBlueprint: (blueprint) => set({ blueprint }),
  saveLayout: (name) =>
    set((state) => ({
      currentLayout: {
        id: crypto.randomUUID(),
        name,
        pois: state.pois,
        blueprint: state.blueprint,
        lastModified: Date.now(),
      },
    })),
  loadLayout: (layout) =>
    set({
      currentLayout: layout,
      pois: layout.pois,
      blueprint: layout.blueprint || null,
      selectedPoi: null,
    }),
}));