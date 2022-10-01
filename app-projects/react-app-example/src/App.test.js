import React from 'react'
import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

test('calculator UI', () => {
  render(<App />)

  expect(screen.getByLabelText('Height (M)')).toBeInTheDocument()
  expect(screen.getByLabelText('Weight (KG)')).toBeInTheDocument()
  expect(screen.getByRole('button', {name: 'Send'})).toBeInTheDocument()
})

test('calculator Thinness result', () => {
  render(<App />)

  const heightInput = screen.getByLabelText('Height (M)')
  const weightInput = screen.getByLabelText('Weight (KG)')
  const submitBtn = screen.getByRole('button', {name: 'Send'})

  userEvent.type(heightInput, '1.7')
  userEvent.type(weightInput, '50')
  userEvent.click(submitBtn)

  expect(screen.getByText('Result: 17.301')).toBeInTheDocument()
  expect(screen.getByText('Estimation: Thinness')).toBeInTheDocument()
})
