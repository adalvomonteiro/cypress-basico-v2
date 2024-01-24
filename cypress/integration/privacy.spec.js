it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.visit('./src/privacy.html')

    cy.contains("Talking About Testing").should("be.visible")

}
)