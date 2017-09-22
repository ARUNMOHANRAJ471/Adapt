const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  username : String,
  password : String
});

let userCredentials = mongoose.model('userCredentials', schema);

module.exports = {
  user : userCredentials
}
