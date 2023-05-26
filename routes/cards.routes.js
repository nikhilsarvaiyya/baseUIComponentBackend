const express = require('express');
const cardRoute = express.Router();
const { ObjectId } = require('mongodb');

let CardDetail = require('../model/cards');

// Add CardDetail
cardRoute.post("/add-card", async (req, res) => {
  const post = new CardDetail(req.body)
  await post.save()
  res.send(post)
})

// Get all CardDetail
cardRoute.get('/', async (req, res) => { 
  const allCard = await CardDetail.find();
  res.status(200).send({response: {data : allCard}})
})

// Get CardDetail
cardRoute.get('/read-card/:id', async (req, res) => {
  const objId = new ObjectId(req.params.id);
  const sendObject = await CardDetail.findOne({ _id: objId })
  res.send(sendObject)
})

// Delete CardDetail
cardRoute.delete('/delete-card/:id', async (req, res, next) => {
  try {
    await CardDetail.deleteOne({ _id: req.params.id })
    res.status(200).send({
      _id: req.params.id,
      msg: "Data Deleted Successfully!"
    })
  } catch {
    res.status(404)
    res.send({ error: "Id doesn't exist!" })
  }
})

// Update CardDetail


cardRoute.put('/update-card/:id', async (req, res, next) => {

  try {
    await CardDetail.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).send(req.body)
  } catch {
    res.status(404)
    res.send({ error: "Id doesn't exist!" })
  }
})

module.exports = cardRoute;