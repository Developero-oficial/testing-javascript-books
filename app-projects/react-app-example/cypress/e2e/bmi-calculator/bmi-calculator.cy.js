describe('bmi calculator', () => {
  it('calculate Thinness result', () => {
    cy.visit('/')

    // Busca el input con etiqueta "height (KG)" y escribe el valor "1.7".
    cy.findByLabelText('Height (M)').type('1.7')

    // Busca el input con etiqueta "Weight (M)" y escribe el valor "50".
    cy.findByLabelText('Weight (KG)').type('50')

    // Busca el botón con etiqueta "send" y haz click.
    cy.findByRole('button').click()

    // Valida que exista "Result: 17.301" en la página.
    cy.findByText('Result: 17.301')

    // Valida que exista "Estimation: Thinness" en la página.
    cy.findByText('Estimation: Thinness')
  })
})

describe('calculator Normal result', () => {})

describe('calculator Overweight result', () => {})

describe('calculator Obese result', () => {})
