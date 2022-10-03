describe('login', () => {
  it('should display the invalid credentials error message', () => {
    cy.visit('/')

    cy.findByLabelText(/email address/i).type('fake@mail.com')
    cy.findByLabelText(/password/i).type('fake')
    cy.findByRole('button').click()

    cy.findByText(/email or password incorrect/i)
  })

  it('should redirect the user to dashboard page after success login', () => {
    cy.visit('/')

    cy.findByLabelText(/email address/i).type('john.doe@mail.com')
    cy.findByLabelText(/password/i).type('123')
    cy.findByRole('button').click()

    cy.findByText(/dashboard/i)
  })
})

describe('logout', () => {
  it('should logout the user', () => {
    cy.visit('/')

    cy.login({email: 'john.doe@mail.com', password: '123'})

    cy.findByText(/dashboard/i)

    cy.findByRole('button', {name: /sign out/i}).click()

    cy.findByText(/login/i)
  })
})

describe('private access', () => {
  it('should redirect unauthenticated user to login page', () => {})
})
