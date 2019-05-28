const expect = require('chai').expect
const mongoose = require('mongoose')
const mongoUnit = require('mongo-unit')
const service = require('./mongomicrosrv')
const testMongoUrl = "mongodb://localhost/test"

describe('service', () => {
    const testData = require('./testData.js')
    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
    afterEach(() => mongoUnit.drop())
   
    it('should find one user', async () => {
       var event = {
           queryStringParameters: {id: "53cb6b9b4f4ddef1ad47f943"},
           httpMethod: "GET"
        }
       var context = {}
       var result = await service.mongoms(event, context);
       var respBody = JSON.parse(result.body);
       expect(result.statusCode).to.equal(200);
       expect(respBody.email, 'Should have an emailid').to.not.null;
    });

    it('should find all users', async () => {
        var event = {
            queryStringParameters: {},
            httpMethod: "GET"
         }
        var context = {}
        var result = await service.mongoms(event, context);
        var respBody = JSON.parse(result.body);
        expect(result.statusCode).to.equal(200);
        expect(respBody.length, 'Result size should be greatre than one').to.gte(1);
     });
})