const mongodb = require('mongodb')
module.exports = {
  users:[
    {
      _id: mongodb.ObjectId('53cb6b9b4f4ddef1ad47f943'), 
      name: 'John Doe', 
      email: 'john.doe@yahoo.com'
    },
    {
      _id: mongodb.ObjectId('53cb6b9b4f4ddef1ad47f944'), 
      name: 'Jane Doe', 
      email: 'jane.doe@yahoo.com'
    }
  ]
}