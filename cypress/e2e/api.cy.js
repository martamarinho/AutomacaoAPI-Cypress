describe('Testando o Status Code da API', () => {
    it('Deve retornar status 200 ao acessar a API', () => {
        cy.request({
            method: 'GET', 
            url: 'https://petstore.swagger.io/', 
        }).then((response) => {
            
            expect(response.status).to.eq(200);

            
        })



     







   





    
  });
        

        

        });
        
                
                
                   
    
