const expect = require('chai').expect
const mongoUnit = require('mongo-unit')
const service = require('./mongomicrosrv')
const testMongoUrl = "mongodb://localhost/test"

describe('service', () => {
    const testData = require('./testData.js')
    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
    afterEach(() => mongoUnit.drop())
   
    it('should find one user', async () => {
       var event = {
           pathParameters: {
              id: "53cb6b9b4f4ddef1ad47f943",
              entity: "User"
            },
           httpMethod: "GET"
        }
       var context = {}
       var result = await service.mongoms(event, context);
       var respBody = JSON.parse(result.body);
       expect(result.statusCode).to.equal(200);
       expect(respBody.email, 'Should have an emailid').to.not.null;
    });

     it('find user by email', async () => {
      var event = {
          pathParameters: {
            filter: "{\"email\":\"john.doe@yahoo.com\"}",
            entity: "User"
          },
          httpMethod: "GET"
      }
      var context = {}
      var result = await service.mongoms(event, context);
      var respBody = JSON.parse(result.body);
      expect(result.statusCode).to.equal(200);
      expect(respBody.length, 'Result size should be greater than one').to.gte(1);
   });

   it('delete user by id', async () => {
      var event = {
         pathParameters: {
            id: "53cb6b9b4f4ddef1ad47f943",
            entity: "User"
          },
          httpMethod: "DELETE"
       }
      var context = {}
      var result = await service.mongoms(event, context);
      var respBody = JSON.parse(result.body);
      expect(result.statusCode).to.equal(200);
      
      event = {
         pathParameters: {
            id: "53cb6b9b4f4ddef1ad47f943",
            entity: "User"
          },
         httpMethod: "GET"
      }
      var result = await service.mongoms(event, context);
      var respBody = JSON.parse(result.body);
      expect(result.statusCode).to.equal(200);
      expect(respBody).to.be.null;
   });

   it('create user', async () => {
      var event = {
         pathParameters: {
            entity: "User"
         },
         httpMethod: "PUT",
         body: "{\"name\": \"Test Name\", \"email\": \"test.name@yahoo.com\"}"
       }
      var context = {}
      var result = await service.mongoms(event, context);
      var respBody = JSON.parse(result.body);
      expect(result.statusCode).to.equal(200);
      expect(respBody.id).is.not.null;
   });

   it('update user', async () => {
      var event = {
         pathParameters: {
            id: "53cb6b9b4f4ddef1ad47f943",
            entity: "User"
         },
         httpMethod: "POST",
         body: "{\"name\": \"Test Name\"}"
       }
      var context = {}
      var result = await service.mongoms(event, context);
      var respBody = JSON.parse(result.body);
      console.dir(respBody);
      expect(result.statusCode).to.equal(200);
      expect(respBody.id).is.not.null;
   });
})