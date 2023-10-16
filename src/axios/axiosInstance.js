import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL
const VITE_TOKEN_URL = import.meta.env.VITE_TOKEN_URL
const VITE_REFRESH_TOKEN_URL = import.meta.env.VITE_REFRESH_TOKEN_URL
const VITE_VALIDATE_TOKEN_URL = import.meta.env.VITE_VALIDATE_TOKEN_URL

const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
      // Adicione o token de acesso ao cabeçalho de autorização.
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh')
      if (refreshToken) {
        // Use o refresh token para obter um novo access token.
        try {
          const response = await axios.post(VITE_REFRESH_TOKEN_URL, { refresh: refreshToken })
          const newAccessToken = response.data.access
          localStorage.setItem('access', newAccessToken)

          // Atualize o cabeçalho de autorização com o novo access token.
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`

          // Reenvie a solicitação original com o novo access token.
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          // Em caso de erro ao renovar o token, você pode fazer o tratamento apropriado aqui.
          console.error('Erro ao renovar o token de acesso.', refreshError)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
