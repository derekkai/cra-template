import axios from 'axios'

export const createAxiosClient = (options) => {
  const config = {
    baseURL: process.env.REACT_APP_XHR_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const axiosClient = axios.create(config)

  axiosClient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error(error)
    },
  )

  return axiosClient
}
