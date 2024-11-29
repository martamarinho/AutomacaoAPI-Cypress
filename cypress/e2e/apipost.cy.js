describe.only('Testando o envio de um POST', () => {
    it('Deve retornar o status code do POST', () => {
        
        const animals = ["dog", "cat", "bird", "rabbit"];
        const names = ["Fluffy", "Rex", "Mittens", "Whiskers"];
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const uniqueName = `${randomName}-${randomAnimal}`;
        const uniqueId = Date.now(); 
       
        cy.log(`Generated uniqueId: ${uniqueId}`);
        cy.log(`Generated uniqueName: ${uniqueName}`);

     
        const requestBody = {
            id: uniqueId, 
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
        });
    });
});
