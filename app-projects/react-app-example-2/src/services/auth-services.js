import {http} from './http'

export const loginService = ({email, password}) => {
  return http.post('/login', {
    email,
    password,
  })
}
