import {loginService} from './'
import {http} from '../http'

jest.mock('../http')

beforeEach(() => http.post.mockClear())

test('execute to /login with email and password', () => {
  const email = 'test@mail.com'
  const password = 'pass'

  loginService({email, password})

  expect(http.post).toHaveBeenCalled()
  expect(http.post).toHaveBeenCalledWith('/login', {email, password})
})
