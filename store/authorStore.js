import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthorStore = create(
  persist(
    (set) => ({
      authors: [],
      setAuthors: (authors) => set({ authors }), // Function to update authors
      addAuthorToCache: (newAuthor) =>
        set((state) => ({ authors: [...state.authors, newAuthor] })),
      updateAuthorInCache: (id, updatedAuthor) =>
        set((state) => ({
          authors: state.authors.map((author) => (author.id === id ? updatedAuthor : author)),
        })),
    }),
    {
      name: "author-storage", // Key for localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useAuthorStore;

