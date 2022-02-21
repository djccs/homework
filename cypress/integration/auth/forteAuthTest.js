/// <reference types="Cypress" />

describe('authorization examples using test api', ()=>{
    let access_token = '';
    let userId = ''
    
        // POST /token: Get a valid token
        beforeEach('generate token', ()=>{
            cy.request({
                method: 'POST',
                url: '/token',
                form: true, 
                body:{
                    "client_id" : "forteAuthTest",
                    "client_secret" : "ea7109fb7bc5ac1e5b7d18507c6d05a8",
                    "grant_type" : "client_credentials"
                }
        }).then(response=>{
               cy.log(JSON.stringify(response));
               cy.log(response.body.access_token);
               access_token = response.body.access_token;

               //GET /authorize & get user id 
                cy.request({
                    method: 'GET',
                    url: '/api/me',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    userId = response.body.id;
                    cy.log("user id " + userId);
                })
            })
        })

            //Authorized test
            it('Unlock Barn Test - Authorized', ()=>{
                            cy.request({
                                method: 'POST',
                                url: '/api/'+userId+'/barn-unlock',
                                headers: {
                                    'Authorization' : 'Bearer ' + access_token
                                }
                            }).then(response=>{
                                cy.log(JSON.stringify(response));
                                expect(response.status).to.equal(200);
                            })
            })
            
            
            //Not Authorized Test
            it(' Toilet Seat Down Test - NOT authorized', ()=>{
                cy.request({
                    failOnStatusCode: false,
                    method: 'POST',
                    url: '/api/'+userId+'/toiletseat-down',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(401);
                })
            })


//Unfortunately this api does not implement LOGOUT , but should look simmilar to this:
//afterEach(() => {
//    
// cy.request({
//    method: 'POST',
//    url: '/api/'+userId+'/logout',
//    headers: {
//        'Authorization' : 'Bearer ' + access_token
//    }
//  }).then(response=>{
//    cy.log(JSON.stringify(response));
//    expect(response.status).to.equal(200);
//  })
//this method should revoke the token for further use.

//})
        
    
})