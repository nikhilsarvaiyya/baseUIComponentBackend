const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CardDetailSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: 'Card' },
  menu: {
    type: String
  },
  html: {
    type: String
  },
  css: {
    type: String
  },
  js: {
    type: String
  }
}, {
  timestamps: true
},
{
  collection: 'cardsdetail',
})
module.exports = mongoose.model('CardDetail', CardDetailSchema)