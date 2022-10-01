describe('bmi calculator', () => {
  it('calculate Thinness result', () => {
    cy.visit('http://localhost:3000/')

    // Busca el input con etiqueta "height (KG)" y escribe el valor "1.7".
    cy.get('#height').type('1.7')

    // Busca el input con etiqueta "Weight (M)" y escribe el valor "50".
    cy.get('#weight').type('50')

    // Busca el botón con etiqueta "send" y haz click.
    cy.get('button').click()

    // Valida que exista "Result: 17.301" en la página.
    cy.get('h2').contains('Result: 17.301')

    // Valida que exista "Estimation: Thinness" en la página.
    cy.get('p').contains('Estimation: Thinness')
  })
})

describe('calculator Normal result', () => {})

describe('calculator Overweight result', () => {})

describe('calculator Obese result', () => {})
