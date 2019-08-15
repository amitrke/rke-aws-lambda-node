'use strict'
const dotEnvRes = require('dotenv').config();

if (result.error) {
   throw result.error
}
  
console.log(result.parsed)

const connectToDatabase = require('./db');
const User = require('./models/user');
const Post = require('./models/post');

module.exports.mongoms = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    function httpResp(status, data){
        return {
            statusCode: status,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS, DELETE, HEAD',
                "Access-Control-Allow-Credentials" : true,
                'Version':'17.10.15.4'
            }
        }
    }
    
    async function dbOperation(entity, opr, ...params) {
        try{
            let resp = await entity[opr](...params);
            return httpResp(200, resp);
        }
        catch(err) {
            console.dir(err);
            return httpResp(500, err);
        }
    }

    await connectToDatabase();

    if (['GET','POST','DELETE','PUT'].indexOf(event.httpMethod) === -1 ) return httpResp(422, `HttpMethod ${event.httpMethod} is not implemented`);
    if (event.pathParameters === undefined || event.pathParameters.entity === undefined) return httpResp(422, 'Path parameter entity not found');
    var entity;
    try{
        entity = eval(event.pathParameters.entity);
        if (typeof entity !== 'function') return httpResp(422, `Mongoose entity ${event.pathParameters.entity} is not found`);
    }
    catch(err){
        return httpResp(422, `Mongoose entity ${event.pathParameters.entity} is not found`);
    }
    console.dir(event);
    switch (event.httpMethod) {
        case 'GET':
            if (event.pathParameters.id)
                return await dbOperation(entity, 'findById', event.pathParameters.id);
            else if (event.pathParameters.filter)
                return await dbOperation(entity, 'find', JSON.parse(decodeURI(event.pathParameters.filter)));
            else
                return httpResp(422, 'GET request should have id or filter');
        case 'POST':
            return await dbOperation(entity, 'findOneAndUpdate', {'_id': event.pathParameters.id}, {$set: JSON.parse(event.body)}, {new: true});
        case 'PUT':
            console.dir(event.body);
            return await dbOperation(entity, 'create', JSON.parse(event.body));
        case 'DELETE':
            return await dbOperation(entity, 'deleteOne', {'_id': event.pathParameters.id});
    }
    
    return httpResp(422, "Code needs improvement");
};