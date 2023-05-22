const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Icon = new Schema({
  name: {
    type: String
  },
  displayName: {
    type: String
  }
}, {
  collection: 'icons'
})
module.exports = mongoose.model('Icon', Icon)