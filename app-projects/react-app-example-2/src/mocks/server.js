import {rest} from 'msw'
import {setupServer} from 'msw/node'

export const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Email or password incorrect',
      }),
    )
  }),
)
