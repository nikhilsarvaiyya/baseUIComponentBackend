const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CardSchema = new Schema({
  key: {
    type: String
  },
  title: {
    type: String
  },
  path: {
    type: String
  },
  icon: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
},
{
  collection: 'cards',
})
module.exports = mongoose.model('Card', CardSchema)