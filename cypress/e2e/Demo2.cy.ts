

describe('Demo2_TestSuite', () => {


it('Demo_TestCase2', () => {
  cy.visit('https://bing.com')
  cy.title().should('contain', 'Bing')

})

})