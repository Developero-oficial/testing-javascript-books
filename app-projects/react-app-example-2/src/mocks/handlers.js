import {rest} from 'msw'

import {encodeJwt, verifyJwt} from '../utils/jwt-utils'
import {orders, USERS_WHITE_LIST} from './mock-data'

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const {email} = await req.json()

    if (USERS_WHITE_LIST[email]) {
      const token = encodeJwt({username: USERS_WHITE_LIST[email]})
      sessionStorage.setItem('is-authenticated', true)
      return res(ctx.status(200), ctx.json({user: {token}}))
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Email or password incorrect',
      }),
    )
  }),

  rest.get('/orders', (req, res, ctx) => {
    const bearer = req.headers.get('authorization')
    let token = null

    if (bearer && bearer.startsWith('Bearer ')) {
      token = bearer.substring(7, bearer.length)
    }

    if (!verifyJwt(token)) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        orders,
      }),
    )
  }),
]
