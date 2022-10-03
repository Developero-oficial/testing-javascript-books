import {screen, render} from '@testing-library/react'

import {Orders} from './'

test('title', () => {
  // setup
  render(<Orders data={[]} />)

  // expect assertions
  expect(screen.getByText(/recent orders/i)).toBeInTheDocument()
})

test('render table headers', () => {
  // setup
  render(<Orders data={[]} />)

  // expect assertions
  const tableHeadersElements = screen.getAllByRole('columnheader')

  const [headerDate, headerName, headerShip, headerPayment, headerSale] =
    tableHeadersElements

  expect(tableHeadersElements).toHaveLength(5)

  expect(headerDate).toHaveTextContent(/date/i)
  expect(headerName).toHaveTextContent(/name/i)
  expect(headerShip).toHaveTextContent(/ship to/i)
  expect(headerPayment).toHaveTextContent(/payment method/i)
  expect(headerSale).toHaveTextContent(/sale amount/i)
})

test('render table rows', () => {
  // setup
  const row = {
    id: '1',
    date: new Date().toLocaleDateString(),
    name: 'test',
    shipTo: 'London, UK',
    paymentMethod: 'VISA ⠀•••• 2574',
    amount: '866.99',
  }

  render(<Orders data={[row]} />)

  // expect assertions
  expect(screen.getAllByRole('row')).toHaveLength(2)

  expect(screen.getByRole('cell', {name: row.date})).toBeInTheDocument()

  expect(screen.getByRole('cell', {name: row.name})).toBeInTheDocument()

  expect(screen.getByRole('cell', {name: row.shipTo})).toBeInTheDocument()

  expect(
    screen.getByRole('cell', {name: row.paymentMethod}),
  ).toBeInTheDocument()

  expect(screen.getByRole('cell', {name: row.amount})).toBeInTheDocument()
})
