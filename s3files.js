'use strict';
const AWS = require('aws-sdk');
var s3 = new AWS.S3( { params: {Bucket: 'www-static.aws.roorkee.org', region: 'us-east-1'}});

module.exports.upload = async (event) => {
    let parsedBody = JSON.parse(event.body);
    let buf = new Buffer(parsedBody.fileData.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
        Key: parsedBody.fileName, 
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    
    try{
        var resp = await s3.putObject(data).promise();
        console.log(JSON.stringify(resp));
        return {
            statusCode: 200,
            body: JSON.stringify(resp)
        }
    }
    catch(err){
        console.log(JSON.stringify(err));
        return {
            statusCode: 200,
            body: JSON.stringify(err)
        }
    }
    
};