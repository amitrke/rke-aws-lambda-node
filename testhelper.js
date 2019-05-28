const prepare = require('mocha-prepare')
const mongoUnit = require('mongo-unit')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

prepare(done => mongoUnit.start()
  .then(testMongoUrl => {
    process.env.DB = testMongoUrl
    done()
  }))