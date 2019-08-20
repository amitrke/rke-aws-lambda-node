'use strict';
const AWS = require('aws-sdk');
var s3 = new AWS.S3( { params: {Bucket: 'www-static.aws.roorkee.org'} });

module.exports.upload = async (event, context, callback) => {
    buf = new Buffer(req.body.fileData.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
        Key: req.body.fileName, 
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    s3Bucket.putObject(data, function(err, data){
        if (err) { 
            console.log(err);
            console.log('Error uploading data: ', data); 
        } else {
            console.log('succesfully uploaded the image!');
        }
    });
};
