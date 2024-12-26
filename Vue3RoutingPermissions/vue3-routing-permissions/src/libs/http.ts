import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response.data
  },
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default axios
