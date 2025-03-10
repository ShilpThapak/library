// import { create } from 'zustand';

// const useAuthorStore = create((set) => ({
//   authors: [],
//   setAuthors: (authors) => set({ authors }), // Function to update authors
//   addAuthorToCache: (newAuthor) => set((state) => ({ authors: [...state.authors, newAuthor] })),
// }));

// export default useAuthorStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthorStore = create(
  persist(
    (set) => ({
      authors: [],
      setAuthors: (authors) => set({ authors }), // Function to update authors
      addAuthorToCache: (newAuthor) =>
        set((state) => ({ authors: [...state.authors, newAuthor] })),
    }),
    {
      name: "author-storage", // Key for localStorage
      getStorage: () => localStorage, // Use sessionStorage if you prefer session-only persistence
    }
  )
);

export default useAuthorStore;

