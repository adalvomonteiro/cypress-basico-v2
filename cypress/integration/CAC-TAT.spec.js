/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_MS=3000
    beforeEach(function()    
    {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

        //cy.contains('tiCentral de Atendimento ao Cliente TAT').should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtest = "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste"
        cy.clock()
        cy.get('input[name="firstName"]').type('Almir')
        cy.get('#lastName').type('Sater')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#open-text-area').type(longtest,{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.clock()
        cy.get('input[name="firstName"]').type('Almir')
        cy.get('#lastName').type('Sater')
        cy.get('#email').type('teste.teste.com.br')
        cy.get('#open-text-area').type('teste cypress')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')

    })

    Cypress._.times(3,function(){
        it('verificar Valor não numério',function(){
            cy.get('input[name="firstName"]').type('Almir')
            cy.get('#lastName').type('Sater')
            cy.get('#email').type('teste@teste.com.br')
            cy.get('#phone').type('feljlfjale').should('have.value', '')
            cy.get('#open-text-area').type('teste cypress')
            cy.contains('button','Enviar').click()
    
        })
    })



    it('Verificar  mensagem de erro quando o telefone se torna obrigatório',function(){
        cy.clock()
        cy.get('input[name="firstName"]').type('Almir')
        cy.get('#lastName').type('Sater')
        cy.get('#email').type('teste@teste.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('cypres teste ')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('Preencha e limpa campos',function(){
        cy.get('#firstName')
        .type('Almir')
        .should('have.value','Almir')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .type('Sater')
        .should('have.value','Sater')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('teste@teste.com.br')
        .should('have.value','teste@teste.com.br')
        .clear()
        .should('have.value','')

        cy.get('#phone')
        .type('62984748545')
        .should('have.value','62984748545')
        .clear()
        .should('have.value','')

    })

    it('Verificar  mensagem de erro de campos obrigatórios',function(){
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.error').should('not.be.visible')


    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_MS)
        cy.get('.success').should('not.be.visible')


    })

    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube')
        cy.get('#product').should('have.value','youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria')
        cy.get('#product').should('have.value','mentoria')

    })

    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1)
        cy.get('#product').should('have.value','blog')

    })

    it('marca o tipo de atendimento "FeedBack"',function(){
        cy.get('input[type="radio"]').check('feedback')

    })

    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })

    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]').check()
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]').selectFile('@samplefile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      
      it('preenche a area de texto usando o comando invoke', function(){
        const longtext = Cypress._.repeat('teste123 ',50)
        cy.get('#open-text-area')
        .invoke('val',longtext)
        .should('have.value',longtext)

      })

      it('faz uma requisição HTTP', function(){
       cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
       .should(function(response){
        const{status, statusText,body}= response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')        

       })

      })

      it.only('Desafio (encontre o gato)', function() {
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
        cy.get("#title")
        .invoke('text','CAT TAT')

      })
  }) 











