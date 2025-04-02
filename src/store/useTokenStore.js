import { create } from "zustand";

const useTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: "" }),
}));

export default useTokenStore;
