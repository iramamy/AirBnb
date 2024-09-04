import { create } from "zustand";


export type SearchQuery = {
    country: string ;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: Number;
    bedrooms: Number;
    category: string;
}

interface SearchModalStore {
  isOpen: boolean;
  open: (step: string) => void;
  close: () => void;
  step: string;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  open: (step) => set({isOpen : true, step: step}),
  close: () => set({isOpen : false}),
  step: '',
  setQuery: (query: SearchQuery) => set({query: query}),
  query: {
    country: "",
    checkIn: null,
    checkOut: null,
    guests: 0,
    bedrooms: 0,
    category: "",
  }
}))

export default useSearchModal;