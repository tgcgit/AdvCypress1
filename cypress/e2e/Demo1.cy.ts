

describe('Demo1_TestSuite', () => {


it('Demo_TestCase1', () => {
  cy.visit('https://blazedemo.com')
  cy.title().should('contain', 'BlazeDemo')
  //----- added this line to trigger Jenkins job
})

})