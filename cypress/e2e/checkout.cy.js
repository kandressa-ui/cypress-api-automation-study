describe('Fluxo de Compra: E2E Checkout', () => {

  // Antes de cada teste, ele faz o login usando nosso "atalho"
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('Deve realizar uma compra com sucesso (Código Limpo)', () => {
    // 1. Adicionar ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()

    // 2. Checkout (Início)
    cy.get('[data-test="checkout"]').click()

    // 3. Preencher Dados
    cy.get('[data-test="firstName"]').type('QA')
    cy.get('[data-test="lastName"]').type('Analyst')
    cy.get('[data-test="postalCode"]').type('88000')
    cy.get('[data-test="continue"]').click()

    // 4. Finalizar e Validar
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })

})
