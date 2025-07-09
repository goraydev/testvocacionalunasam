import { create } from "zustand";
import zukeeper from "zukeeper";

const useApp = create(
  zukeeper((set) => ({
    maxSection: {},
    message: null,
    user: {},
    getSectionStore: (payload) => set((state) => ({ maxSection: payload })),
    setMessage: (payload) => set((state) => ({ message: payload })),
    setUser: (payload) => set((state) => ({ user: payload })),
    setMaxSections: (payload) => set((state) => ({ maxSection: payload })),
  }))
);

// Solo para desarrollo
if (process.env.NODE_ENV === "development") {
  window.store = useApp;
}

export default useApp;
