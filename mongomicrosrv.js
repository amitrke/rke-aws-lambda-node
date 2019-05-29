'use strict'

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const User = require('./models/user');

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

    await connectToDatabase();

    if (['GET','POST','DELETE','PUT'].indexOf(event.httpMethod) === -1 ) return httpResp(422, `HttpMethod ${event.httpMethod} is not implemented`);
    if (event.pathParameters === undefined || event.pathParameters.entity === undefined) return httpResp(422, 'Path parameter entity not found');
    try{
        if (typeof eval(event.pathParameters.entity) !== 'function') return httpResp(422, `Mongoose entity ${event.pathParameters.entity} is not found`);
    }
    catch(err){
        return httpResp(422, `Mongoose entity ${event.pathParameters.entity} is not found`);
    }
    

    console.log("Validation complete");
    switch (event.httpMethod) {
        case 'GET':
            if (event.queryStringParameters.id){
                try{
                    let userResp = await User.findById(event.queryStringParameters.id);
                    return httpResp(200, userResp);
                }
                catch(err) {
                    return httpResp(500, err);
                }
            }
            else if (event.queryStringParameters.find && event.queryStringParameters.value){
                try{
                    let query = {};
                    query[event.queryStringParameters.find] = event.queryStringParameters.value;
                    let userResp = await User.find(query);
                    return httpResp(200, userResp);
                }
                catch(err) {
                    return httpResp(500, err);
                }
            }
            else{
                let userResp = await User.find({});
                return httpResp(200, userResp);
            }
            break;
    }
    
    return httpResp(422, "Code needs improvement");
};