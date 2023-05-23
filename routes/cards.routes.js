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
  const allCard = await Card.find();
  res.status(200).send({response: {data : allCard}})
})

//  paginate = async function(req,res) {
//   const pageNumber = parseInt(req.query.pageNumber) || 0;
//   const limit = parseInt(req.query.limit) || 5;
//   const result = {};
//   const totalPosts = await Card.countDocuments().exec();
//   let startIndex = pageNumber * limit;
//   const endIndex = (pageNumber + 1) * limit;
//   result.totalPosts = totalPosts;
//   if (startIndex > 0) {
//     result.previous = {
//       pageNumber: pageNumber - 1,
//       limit: limit,
//     };
//   }
//   if (endIndex < (await Card.countDocuments().exec())) {
//     result.next = {
//       pageNumber: pageNumber + 1,
//       limit: limit,
//     };
//   }
//   result.data = await Card.find()
//     .sort("-_id")
//     .skip(startIndex)
//     .limit(limit)
//     .exec();
//   result.rowsPerPage = limit;
//   return res.json({ msg: "Get Data Successfully!", response: result });
// }

// // Get all With Pagination
// cardRoute.get('/', async (req, res) => {
//   paginate(req,res)
// })

// Get Card
cardRoute.get('/read-card/:id', async (req, res) => {
  const objId = new ObjectId(req.params.id);
  const sendObject = await Card.findOne({ _id: objId })
  res.send(sendObject)
})

// Delete Card
cardRoute.delete('/delete-card/:id', async (req, res, next) => {
  try {
    await Card.deleteOne({ _id: req.params.id })
    res.status(200).send({
      _id: req.params.id,
      msg: "Data Deleted Successfully!"
    })
  } catch {
    res.status(404)
    res.send({ error: "Id doesn't exist!" })
  }
})

// Update Card


cardRoute.put('/update-card/:id', async (req, res, next) => {

  try {
    await Card.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).send(req.body)
  } catch {
    res.status(404)
    res.send({ error: "Id doesn't exist!" })
  }
})

module.exports = cardRoute;