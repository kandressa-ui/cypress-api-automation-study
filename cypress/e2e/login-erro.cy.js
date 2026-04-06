describe('Funcionalidade: Login', () => {

  it('Deve realizar login com sucesso no Sauce Demo', () => {
    // 1. Visita o site
    cy.visit('https://saucedemo.com')

    // 2. Digita o usuário (usamos o ID do campo)
    cy.get('#user-name').type('standard_user')

    // 3. Digita a senha
    cy.get('#password').type('senha_errada')

    // 4. Clica no botão de login
    cy.get('#login-button').click()

    // 5. Validação de Erro: Verifica se a mensagem de erro aparece
    // O seletor 'h3' com 'data-test="error"' é o padrão desse site
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match')
    
    // Tira um print do erro para o seu "bug report"
    cy.screenshot('login-erro-senha')

  })

})
