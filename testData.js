const mongodb = require('mongodb')
module.exports = {
  users:[
    {
      _id: mongodb.ObjectId('53cb6b9b4f4ddef1ad47f943'), 
      name: 'John Doe',
      type: 'pr-user',
      created: new Date(),
      lastLogin: new Date(),
      webId: 'ut',
      social: [
        {
          id: '123456', type: 'gl', email: 'john.doe@gmail.com', profilePic: 'https://imageurl'
        }
      ]
    },
    {
      _id: mongodb.ObjectId('53cb6b9b4f4ddef1ad47f944'), 
      name: 'Jane Doe',
      type: 'user',
      created: new Date(),
      lastLogin: new Date(),
      webId: 'ut',
      social: [
        {
          id: '3495933', type: 'gl', email: 'jane.doe@gmail.com', profilePic: 'https://imageurl'
        }
      ]
    }
  ]
}