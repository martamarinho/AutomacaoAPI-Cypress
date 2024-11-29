describe.only('Testando o envio de um PUT e DELETE', () => {
    it('Deve retornar o status code do PUT, atualizar corretamente o recurso e então excluir o recurso', () => {
        
        const animals = ["dog", "cat", "bird", "rabbit"];
        const names = ["Fluffy", "Rex", "Mittens", "Whiskers"];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const uniqueName = `${randomName}-${randomAnimal}`;
        const uniqueId = Date.now(); 
        
        // Exibe os valores gerados no log para depuração
        cy.log(`Generated uniqueId: ${uniqueId}`);
        cy.log(`Generated uniqueName: ${uniqueName}`);
        
        const requestBody = {
            id: uniqueId, // ID único para o recurso
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

        // Envia o PUT
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/pet', // Substitua pelo seu endpoint
            body: requestBody,
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
        }).then((response) => {
            // Valida o status da resposta do PUT
            expect(response.status).to.eq(200); // Status esperado para atualização bem-sucedida
            // Valida se o corpo da resposta corresponde ao enviado
            expect(response.body).to.have.property('id', uniqueId);
            expect(response.body).to.have.property('name', uniqueName);
            expect(response.body.category).to.deep.eq(requestBody.category);
            expect(response.body.photoUrls).to.deep.eq(requestBody.photoUrls);
            expect(response.body.tags).to.deep.eq(requestBody.tags);
            
            // Agora, realiza o DELETE utilizando o uniqueId do recurso
            cy.request({
                method: 'DELETE',
                url: `https://petstore.swagger.io/v2/pet/${uniqueId}`, // Substitua pelo seu endpoint
            }).then((deleteResponse) => {
                // Valida o status da resposta do DELETE
                expect(deleteResponse.status).to.eq(200); // Status esperado para exclusão bem-sucedida

                // Opcional: Valida se o recurso foi realmente excluído
                cy.request({
                    method: 'GET',
                    url: `https://petstore.swagger.io/v2/pet/uniqueId`, // Verifica se o recurso foi excluído
                    failOnStatusCode: false, // Não falha automaticamente se o status não for 200
                }).then((getResponse) => {
                    expect(getResponse.status).to.eq(404); // Espera-se que o recurso não seja encontrado
                });
            });
        });
    });
});

