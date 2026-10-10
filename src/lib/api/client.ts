import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('somarena_access_token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      // Token expiry handling should be implemented only when the actual backend contract is confirmed.
      localStorage.removeItem('somarena_access_token')
    }

    if (status === 403) {
      // Permission errors are surfaced to the UI, but the backend remains the final authority.
    }

    return Promise.reject(error)
  },
)

export const api = apiClient

export function isApiConfigured() {
  return Boolean(baseUrl)
}

export function isApiUnavailableMessage() {
  return 'The SomArena backend is not configured in this environment yet.'
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    switch (status) {
      case 400:
        return 'The request could not be processed.'
      case 401:
        return 'Authentication is required.'
      case 403:
        return 'You do not have permission to do that.'
      case 404:
        return 'The requested resource was not found.'
      case 409:
        return 'This action conflicts with the current state.'
      case 422:
        return 'Please check the supplied details and try again.'
      case 429:
        return 'Too many requests. Please wait a moment and retry.'
      case 500:
        return 'The server is currently unavailable.'
      case 503:
        return 'The service is temporarily unavailable.'
      default:
        return 'Something went wrong while contacting the backend.'
    }
  }

  return error instanceof Error ? error.message : 'Something went wrong.'
}
