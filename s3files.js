'use strict';
const AWS = require('aws-sdk');
var s3 = new AWS.S3( { params: {Bucket: 'www-static.aws.roorkee.org', region: 'us-east-1'}});

createResponse = (respObject, httpCode) => {
    return {
        statusCode: httpCode,
        body: JSON.stringify(respObject),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
            "Access-Control-Allow-Credentials" : true,
            'Version':'17.10.15.4'
        }
    }
}

uploadFile = async(event) => {
    let parsedBody = JSON.parse(event.body);
    let buf = new Buffer(parsedBody.data.replace(/^data:image\/\w+;base64,/, ""),'base64');

    var params = {
        Key: parsedBody.name, 
        Body: buf,
        ContentEncoding: parsedBody.type
    };
    
    try{
        var resp = await s3.putObject(params).promise();
        console.log(JSON.stringify(resp));
        return createResponse(resp, 200);
    }
    catch(err){
        console.log(JSON.stringify(err));
        return createResponse(err, 415)
    }
}

getFilesList = async(event) => {
    var params = { 
        Delimiter: '',
        Prefix: 's/5469b2f5b4292d22522e84e0/ms.files' 
    }
    
    try{
        var listResp = await s3.listObjects(params).promise();
        console.log(JSON.stringify(listResp));
        return createResponse(listResp, 200);
    }
    catch(err){
        console.log(JSON.stringify(err));
        return createResponse(err, 415)
    }
}

module.exports.upload = async (event) => {
    if (event.httpMethod == 'POST'){
        return await uploadFile(event);
    }
    else if (event.httpMethod == 'GET'){
        return await getFilesList(event);
    }
    else{
        return createResponse({'message':'Unsupported HTTP method'}, 405)
    }
};