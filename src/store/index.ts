// store.ts
import { create, StoreApi } from 'zustand'
import { createUserSlice, UserSlice } from './userSlice'
import { createThemeSlice, ThemeSlice } from './themeSlice'
import { createModalSlice, ModalSlice } from './modalSlice'

// Define the type for the complete store
type MyStore = UserSlice & ThemeSlice & ModalSlice

// Create the Zustand store with all slices
const useStore = create<MyStore>((set, get, store: StoreApi<MyStore>) => ({
  ...createUserSlice(set, get, store),
  ...createThemeSlice(set, get, store),
  ...createModalSlice(set, get, store),
}))

export default useStore
