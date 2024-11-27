// axios.config.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import useStore from '../store'

const apiUrl = import.meta.env.VITE_API_BASE_URL || ''

// Common Axios configuration
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Create a public Axios instance for unauthenticated requests
const publicRequest = axios.create({
  baseURL: apiUrl,
})

// Create a private Axios instance for authenticated requests
const privateRequest = axios.create({
  baseURL: apiUrl,
})

//

const privateReqWithFile = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

privateReqWithFile.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useStore.getState().token

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// Add a request interceptor to the private instance
privateRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve the token from the Zustand store
    const token = useStore.getState().token
    // console.log('🚀 ~ token from Zustand:', token);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors and responses
privateRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('🚀 ~ response:', response);
    return response
  },
  (error) => {
    console.error('Response error:', error?.response)

    if (error?.response?.status === 401) {
      // Handle unauthorized access
      useStore.getState().clearUserInfo() // Clear user info from Zustand store
    }

    return Promise.reject(error)
  },
)

export { privateRequest, publicRequest, privateReqWithFile }
