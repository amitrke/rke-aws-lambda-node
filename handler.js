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
};

module.exports.microservice = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*.roorkee.org',
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
