import { create } from "zustand";

export const useAlertStore = create((set) => ({
  refreshCount: 0,
  incrementRefresh: () =>
    set((state) => ({ refreshCount: state.refreshCount + 1 })),
}));
