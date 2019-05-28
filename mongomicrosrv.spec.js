const expect = require('chai').expect
const mongoose = require('mongoose')
const mongoUnit = require('mongo-unit')
const service = require('./mongomicrosrv')
const testMongoUrl = "mongodb://localhost/test"

describe('service', () => {
    const testData = require('./testData.json')
    beforeEach(() => mongoUnit.initDb(testMongoUrl, testData))
    afterEach(() => mongoUnit.drop())
   
    it('should find all users', async () => {
       var event = {}
       var context = {}
       var result = await service.mongoms(event, context);
       console.dir(result);
       expect(result.statusCode).to.equal(200);
    });
})