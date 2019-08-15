const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  mongoose.set('debug', true);
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect('##MONGO##')
    .then(db => { 
      isConnected = db.connections[0].readyState;
      console.log('Should have connected by now');
    }).catch(err => {
      console.log(err);
    });
};