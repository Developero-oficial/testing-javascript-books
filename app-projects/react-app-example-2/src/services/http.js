import axios from 'axios'

import {getItem} from '../utils/storage-utils'

axios.interceptors.request.use(
  config => {
    const token = getItem({key: '@token'})
    config.headers.authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error),
)

export const http = axios
