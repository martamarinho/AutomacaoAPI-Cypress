describe.only('Testando o envio de um POST', () => {
    it('Deve retornar o status code do POST', () => {
        
        const animals = ["dog", "cat", "bird", "rabbit"];
        const names = ["Fluffy", "Rex", "Mittens", "Whiskers"];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
       // const uniqueName = `${randomName}-${randomAnimal}-${Math.floor(Math.random() * 100)}`;
        //const uniqueName = `${randomName}-${randomAnimal}-${Math.floor}`;
        const uniqueName = `${randomName}-${randomAnimal}`;
        const uniqueId = Date.now(); 
       // Exibe os valores gerados no log para depuração
        cy.log(`Generated uniqueId: ${uniqueId}`);
        cy.log(`Generated uniqueName: ${uniqueName}`);

     
        const requestBody = {
            id: uniqueId, // ID único para o recurso
            category: {
                id: 1,
                name:"",
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

        // Realiza o POST
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet', // Substitua pelo endpoint correto
            body: requestBody,
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo
            },
        }).then((response) => {
            // Valida o status da resposta
            expect(response.status).to.eq(200); // Status esperado para criação
            // Valida se o body retornado corresponde ao enviado
            expect(response.body).to.have.property('id', uniqueId);
            expect(response.body).to.have.property('name', uniqueName);
            expect(response.body.category).to.deep.eq(requestBody.category);
            expect(response.body.photoUrls).to.deep.eq(requestBody.photoUrls);
            expect(response.body.tags).to.deep.eq(requestBody.tags);
        });
    });
});
