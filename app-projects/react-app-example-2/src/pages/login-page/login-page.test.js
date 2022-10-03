import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {screen, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'

import {LoginPage} from './'
import {AuthGuard} from '../../components/auth-guard'
import {server} from '../../mocks/server'

const renderPage = () =>
  render(
    <Router>
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    </Router>,
  )

test('login title', () => {
  renderPage()
  expect(screen.getByText(/login/i)).toBeInTheDocument()
})

test('email is required', () => {
  renderPage()

  expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()

  const submitBtn = screen.getByRole('button', {name: /send/i})
  userEvent.click(submitBtn)

  expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
})

test('email is valid', () => {
  renderPage()

  expect(
    screen.queryByText(
      /the email is not valid. Use the format username@mail.com/i,
    ),
  ).not.toBeInTheDocument()

  screen.getByLabelText(/email/i).value = 'invalid.email'

  const submitBtn = screen.getByRole('button', {name: /send/i})
  userEvent.click(submitBtn)

  expect(
    screen.getByText(
      /the email is not valid. Use the format username@mail.com/i,
    ),
  ).toBeInTheDocument()
})

test('password is required', () => {
  renderPage()

  expect(
    screen.queryByText(/the password is required/i),
  ).not.toBeInTheDocument()

  const submitBtn = screen.getByRole('button', {name: /send/i})
  userEvent.click(submitBtn)

  expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
})

test('failed login: invalid credentials', async () => {
  renderPage()

  userEvent.type(screen.getByLabelText(/email/i), 'test@mail.com')
  userEvent.type(screen.getByLabelText(/password/i), 'pass')

  const submitBtn = screen.getByRole('button', {name: /send/i})

  expect(
    screen.queryByText(/email or password incorrect/i),
  ).not.toBeInTheDocument()

  userEvent.click(submitBtn)

  expect(
    await screen.findByText(/email or password incorrect/i),
  ).toBeInTheDocument()
})

test('success login', async () => {
  renderPage()

  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  server.use(
    rest.post('/login', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          user: {token: jwt},
        }),
      )
    }),
  )

  userEvent.type(screen.getByLabelText(/email/i), 'test@mail.com')
  userEvent.type(screen.getByLabelText(/password/i), 'pass')

  const submitBtn = screen.getByRole('button', {name: /send/i})
  userEvent.click(submitBtn)

  await waitFor(() =>
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument(),
  )
})
