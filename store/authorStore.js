import { create } from 'zustand';

const useAuthorStore = create((set) => ({
  authors: [],
  setAuthors: (authors) => set({ authors }), // Function to update authors
  addAuthorToCache: (newAuthor) => set((state) => ({ authors: [...state.authors, newAuthor] })),
}));

export default useAuthorStore;
