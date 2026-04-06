describe('Funcionalidade: Login', () => {

  it('Deve realizar login com sucesso no Sauce Demo', () => {
    // 1. Visita o site
    cy.visit('https://saucedemo.com')

    // 2. Digita o usuário (usamos o ID do campo)
    cy.get('#user-name').type('standard_user')

    // 3. Digita a senha
    cy.get('#password').type('secret_sauce')

    // 4. Clica no botão de login
    cy.get('#login-button').click()

    // 5. Validação: Verifica se o título "Products" aparece na tela
    cy.get('.title').should('have.text', 'Products')
    
    // Tira um print automático para o seu relatório
    cy.screenshot('login-sucesso')
  })

})
