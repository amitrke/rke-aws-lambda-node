'use strict';
const AWS = require('aws-sdk');
const multipart = require('aws-lambda-multipart-parser');
var s3 = new AWS.S3();

module.exports.upload = async (event, context, callback) => {
    const result = multipart.parse(event, true)
    
    let decodedImage = result.file.content.data;
    var filePath = "uploads/"+result.file.filename;
    var params = {
      "Body": decodedImage,
      "Bucket": "www-static.aws.roorkee.org",
      "Key": filePath
   };
   s3.upload(params, function(err, data){
      if(err) {
          callback(err, null);
      } else {
            let response = {
            "statusCode": 200,
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS, DELETE, HEAD',
                "Access-Control-Allow-Credentials" : true,
                'Version':'17.10.15.4'
            },
            "body": JSON.stringify(data),
            "isBase64Encoded": false
        };
            callback(null, response);
        }
   });
};
