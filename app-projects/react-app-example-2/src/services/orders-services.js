import {http} from './http'

export const getOrdersService = () => {
  return http.get('/orders')
}
