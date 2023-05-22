const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Card = new Schema({
  title: {
    type: String
  },
  icon: {
    type: String
  },
  description: {
    type: String
  }
}, {
  collection: 'cards'
})
module.exports = mongoose.model('Card', Card)