'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Roorkee.org moving to lambdas soon :)',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.microservice = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Version':'17.10.15.4'
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            if (event.queryStringParameters.id){
                dynamo.getItem({ TableName: event.queryStringParameters.TableName, Key: {id: event.queryStringParameters.id}}, done);
            }
            else{
                dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            }
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

const signinHandler = require('./lib/handlers/signinHandler')
const callbackHandler = require('./lib/handlers/callbackHandler')
const refreshHandler = require('./lib/handlers/refreshHandler')
const authorizeHandler = require('./lib/handlers/authorizeHandler')
const { setupSchemaHandler } = require('./lib/storage/fauna/faunaUser')

module.exports.signin = async (event) => signinHandler(event)

module.exports.callback = async (event) => callbackHandler(event)

module.exports.refresh = async (event) => refreshHandler(event)

module.exports.authorize = async (event) => authorizeHandler(event)

module.exports.schema = (event, context, cb) => setupSchemaHandler(event, cb)