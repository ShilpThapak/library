import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthorStore = create(
    persist(
        (set) => ({
            authors: [],
            setAuthors: (authors) => set({ authors }),
            addAuthorToCache: (newAuthor) =>
                set((state) => ({ authors: [...state.authors, newAuthor] })),
            updateAuthorInCache: (id, updatedAuthor) =>
                set((state) => ({
                    authors: state.authors.map((author) => (author.id === id ? updatedAuthor : author)),
                })),
            deleteAuthorFromCache: (id) =>
                set((state) => ({
                    authors: state.authors.filter((author) => author.id !== id),
                })),
        }),
        {
            name: "author-storage", // Key for localStorage
            getStorage: () => localStorage,
        }
    )
);

export default useAuthorStore;

