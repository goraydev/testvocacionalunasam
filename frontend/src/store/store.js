import { create } from "zustand";
import zukeeper from "zukeeper";

const useApp = create(
  zukeeper((set) => ({
    maxSection: {},
    message: null,
    user: {},
    answers: {},
    sumSections: {},
    setMessage: (payload) => set((state) => ({ message: payload })),
    setUser: (payload) => set((state) => ({ user: payload })),
    setMaxSections: (payload) => set((state) => ({ maxSection: payload })),
    setAnswersStore: (payload) => set((state) => ({ answers: payload })),
    setSumSections: (payload) => set((state) => ({ sumSections: payload })),
  }))
);

// Solo para desarrollo
if (process.env.NODE_ENV === "development") {
  window.store = useApp;
}

export default useApp;
