describe('dashboard', () => {
  it('should display the recent orders data', () => {
    cy.setUserAuth()

    cy.visit('/dashboard')
  })

  it('should display the recent orders data', () => {
    cy.setUserAuth()

    cy.visit('/dashboard')

    cy.contains(/recent orders/i)
    cy.findByRole('cell', {name: /Elvis Presley/i})
  })
})
