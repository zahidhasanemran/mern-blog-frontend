import Cookies from 'js-cookie'
import { StateCreator } from 'zustand'

export interface ThemeSlice {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  theme: (Cookies.get('theme') as 'light' | 'dark') || 'dark',

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      Cookies.set('theme', newTheme, { expires: 365 })
      return { theme: newTheme }
    })
  },
})
