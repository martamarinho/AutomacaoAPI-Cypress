describe.only('Testando o envio de um PUT e DELETE', () => {
    it('Deve retornar o status code do PUT, atualizar corretamente o recurso e então excluir o recurso', () => {
        
        const animals = ["dog", "cat", "shitshu", "pincher"];
        const names = ["Max", "Rex", "Lupy", "Lua"];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const uniqueName = `${randomName}-${randomAnimal}`;
        const uniqueId = Date.now(); 
        
        // Exibe os valores gerados no log para depuração
        cy.log(`Generated uniqueId: ${uniqueId}`);
        cy.log(`Generated uniqueName: ${uniqueName}`);
        
        const requestBody = {
            id: uniqueId, 
            category: {
                id: 1,
                name: "",
            },
            name: uniqueName,
            photoUrls: [""],
            tags: [
                {
                    id: 1,
                    name: "string",
                },
            ],
            status: "available",
        };

        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/pet', 
            body: requestBody,
            headers: {
                'Content-Type': 'application/json', 
            },
        }).then((response) => {
           
            expect(response.status).to.eq(200); 
            expect(response.body).to.have.property('id', uniqueId);
            expect(response.body).to.have.property('name', uniqueName);
            expect(response.body.category).to.deep.eq(requestBody.category);
            expect(response.body.photoUrls).to.deep.eq(requestBody.photoUrls);
            expect(response.body.tags).to.deep.eq(requestBody.tags);
            
            
            cy.request({
                method: 'DELETE',
                url: `https://petstore.swagger.io/v2/pet/${uniqueId}`, 
            }).then((deleteResponse) => {
                 expect(deleteResponse.status).to.eq(200); 
               
                cy.request({
                    method: 'GET',
                    url: `https://petstore.swagger.io/v2/pet/uniqueId`, 
                    failOnStatusCode: false, 
                }).then((getResponse) => {
                    expect(getResponse.status).to.eq(404);
                });
            });
        });
    });
});

