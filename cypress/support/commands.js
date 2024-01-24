Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    const longtest = "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste"
        cy.get('input[name="firstName"]').type('Almir')
        cy.get('#lastName').type('Sater')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type(longtest,{delay:0})
        cy.contains('button','Enviar').click()
})