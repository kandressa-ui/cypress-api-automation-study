describe('Teste de API - Restful Booker', () => {

  it('Deve criar uma reserva com sucesso', () => {

    cy.request({

      method: 'POST',

      url: 'https://restful-booker.herokuapp.com/booking',

      body: {

        firstname: "Seu Nome",

        lastname: "Softplan Analyst",

        totalprice: 150,

        depositpaid: true,

        bookingdates: {

          checkin: "2024-01-01",

          checkout: "2024-01-02"

        },

        additionalneeds: "Breakfast"

      }

    }).then((response) => {

      expect(response.status).to.eq(200)

      expect(response.body.booking).to.have.property('firstname', 'Seu Nome')   

      cy.log('Reserva criada com ID: ' + response.body.bookingid)

    })

  })

  it('Deve retornar erro ao tentar criar reserva sem o sobrenome', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false, // impede o Cypress de encerrar o teste automaticamente
      body: {
        firstname: "Seu Nome",
        // Repare que o 'lastname' foi removido propositalmente
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-01-01",
          checkout: "2024-01-02"
        }
      }
    }).then((response) => {
      // Aqui esperamos que a API NÃO aceite a requisição
      expect(response.status).to.not.eq(200)
      cy.log('A API recusou a reserva corretamente conforme esperado!')
    })
  })

  it('Deve retornar erro ao tentar criar reserva com data de check-out anterior ao check-in', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false,
      body: {
        firstname: "Seu Nome",
        lastname: "Softplan Analyst",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-01-02", // Data de check-in
          checkout: "2024-01-01" // Data de check-out anterior ao check-in
        }
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200)
      cy.log('A API recusou a reserva com datas inválidas conforme esperado!')
    })
  })

  it('Deve retornar erro ao tentar criar reserva com preço total negativo', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false,
      body: {
        firstname: "Seu Nome",
        lastname: "Softplan Analyst",
        totalprice: -100, // Preço total negativo
        depositpaid: true,
        bookingdates: {
          checkin: "2024-01-01",
          checkout: "2024-01-02"
        }
      }
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422, 500, 412]) // A API pode retornar 400 ou 422 para dados inválidos
      expect(response.status).to.not.eq(200)
      cy.log('A API recusou a reserva com preço total negativo conforme esperado!')
    })
  })

  it('Deve retornar erro ao tentar criar reserva sem bookingdates', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false,
      body: {
        firstname: "Seu Nome",
        lastname: "Softplan Analyst",
        totalprice: 150,
        depositpaid: true
        // bookingdates está ausente intencionalmente
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200)
      cy.log('A API recusou a reserva sem bookingdates conforme esperado!')
    })
  })

  it('Deve retornar erro ao tentar criar reserva com datas inválidas', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false,
      body: {
        firstname: "Seu Nome",
        lastname: "Softplan Analyst",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: "invalid-date",
          checkout: "invalid-date"
        }
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200)
      cy.log('A API recusou a reserva com datas inválidas conforme esperado!')
    })
  })    

})
