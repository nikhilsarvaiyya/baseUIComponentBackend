const express = require('express');
const cardRoute = express.Router();
const { ObjectId } = require('mongodb');

let Card = require('../model/cards');

// Add Card
cardRoute.post("/add-card", async (req, res) => {
 const post = new Card(req.body)
	await post.save()
	res.send(post)
})

// Get all Card
cardRoute.get('/', async (req, res) => {
  const allCard = await Card.find()
  res.status(200).send(allCard)
})

// Get Card
cardRoute.get('/read-card/:id',async (req, res) => {
  const objId = new ObjectId(req.params.id);
  const sendObject = await Card.findOne({ _id: objId })
  res.send(sendObject)
})

// Delete Card
cardRoute.delete('/delete-card/:id',async(req, res, next) => {
  try {
    await Card.deleteOne({ _id: req.params.id })
		res.status(200).send({
      _id : req.params.id,
      msg : "Data Deleted Successfully!"
    })
	} catch {
		res.status(404)
		res.send({ error: "Card doesn't exist!" })
	}
})

// // Update Card
// cardRoute.route('/update-book/:id').put((req, res, next) => {
//     Card.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//     
//     } else {
//       res.json(data)
//     
//     }
//   })
// })




module.exports = cardRoute;