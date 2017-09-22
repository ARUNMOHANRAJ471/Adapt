const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let schema = new mongoose.Schema({
  _id: String,
  imageurl: String,
  resName: {
    type: String,
    unique: true
  },
  resCuisines: String,
  resAddress: {type: String},
  resRating: String,
  resVotes: String,
  comments: {type: String, default: ''}
});

let Restaurant = mongoose.model('restaurant', schema);

module.exports = {
    Restaurant
};
