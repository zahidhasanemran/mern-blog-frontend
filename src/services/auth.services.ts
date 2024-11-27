import { publicRequest } from '../api/axiosInstance'

export const loginFunc = async () => {
  const res = await publicRequest.post(`auth/login`)
  return res
}

export const registerFunc = async (data) => {
  const res = await publicRequest.post(`/auth/signup`, data)
  return res
}

export const forgotPassword = async () => {
  const res = await publicRequest.post(`auth/forgot-password`)
  return res
}

export const logout = async () => {
  const res = await publicRequest.post(`auth/logout`)
  return res
}

export const resetPassword = async () => {
  const res = await publicRequest.post(`auth/reset-password/:token`)
  return res
}

export const verifyEmail = async () => {
  const res = await publicRequest.post(`auth/verify-email`)
  return res
}
