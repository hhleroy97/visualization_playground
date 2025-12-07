import { create } from "zustand";
import { VizParams } from "@/data/visualizations";

type VizState = {
  params: VizParams;
  setParam: (name: string, value: VizParams[string]) => void;
  resetParams: (initial: VizParams) => void;
};

export const useVizStore = create<VizState>((set) => ({
  params: {},
  setParam: (name, value) =>
    set((state) => ({ params: { ...state.params, [name]: value } })),
  resetParams: (initial) => set({ params: initial }),
}));

