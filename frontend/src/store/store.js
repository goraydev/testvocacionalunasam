import { create } from 'zustand'
import zukeeper from 'zukeeper'

const useApp = create(zukeeper((set) => ({
    maxSection: {},
    getSectionStore: (payload) => set((state) => ({ maxSection: payload })),
})))

// Solo para desarrollo
if (process.env.NODE_ENV === "development") {
    window.store = useApp;
}

export default useApp;
