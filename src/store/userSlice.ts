// userSlice.ts
import { StateCreator } from 'zustand'
import Cookies from 'js-cookie'

export type UserInfo = {
  _id?: string
  id: string
  userId: string
  name: string
  email: string
  profileImage: string
  rank: string
  telegramId: string | null
  level: number
  status: string
  emailVerified: boolean
  sponsor: string
  createdAt: string
  updatedAt: string
  organaization?: string
  address?: string
  zipCode?: string
  phoneNumber?: string
  state?: string
  country?: string
  pack?: { _id: string; packageAmount: number }
  packName?: string
}

export interface UserSlice {
  userInfo: UserInfo | null
  token: string | null
  setToken: (_token: string) => void
  setUserInfo: (_userInfo: UserInfo) => void
  clearUserInfo: () => void
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  // Initialize values from cookies
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo') as string)
    : null,
  token: Cookies.get('token') || null,

  // Set the token and store it in cookies
  setToken: (token) => {
    Cookies.set('token', token, { expires: 365 }) // Store token in cookies for 1 year
    set({ token })
  },

  // Set the userInfo and store it in cookies
  setUserInfo: (userInfo) => {
    Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 365 }) // Store userInfo as a string in cookies
    set({ userInfo })
  },

  // Clear the userInfo and token from both state and cookies
  clearUserInfo: () => {
    Cookies.remove('token') // Remove token from cookies
    Cookies.remove('userInfo') // Remove userInfo from cookies
    set({ userInfo: null, token: null })
  },
})
