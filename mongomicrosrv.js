'use strict'

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const User = require('./models/User');

module.exports.mongoms = async (event, context, callback) => {
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
    
    switch (event.httpMethod) {
        case 'GET':
            if (event.pathParameters.id && event.pathParameters.model){
                try{
                    let userResp = await User.findById(event.pathParameters.id);
                    return httpResp(200, userResp);
                }
                catch(err) {
                    return httpResp(500, err);
                }
            }
            else{
                return httpResp(422, "Incorrect input");
            }
            break;
    }
    
    return httpResp(200, "Code needs improvement");
};