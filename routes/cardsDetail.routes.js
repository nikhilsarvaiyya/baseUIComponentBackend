const express = require('express');
const cardDetailRoute = express.Router();
const { ObjectId } = require('mongodb');

let CardDetail = require('../model/cardsDetail');

// Add CardDetail
cardDetailRoute.post("/add-card-detail", async (req, res) => {
  console.log("asdasd")
  const post = new CardDetail(req.body)
  await post.save()
  res.send(post)
})

// Get all CardDetail
cardDetailRoute.get('/menu', async (req, res) => { 
  try {
    const allCardDetail = await CardDetail.find().populate("uid");
    res.status(200).send({response: {data : allCardDetail}})
  } catch (err) {
    console.log("Something is Wrong, " + err);
    res.status(444).send("No risk found with the given criteria!");
  }
  
})


// Get CardDetail
cardDetailRoute.get('/read-card-detail/:id', async (req, res) => {
  const objId = new ObjectId(req.params.id);
  const sendObject = await CardDetail.findOne({ _id: objId })
  res.send(sendObject)
})

// Delete CardDetail
cardDetailRoute.delete('/delete-card-detail/:id', async (req, res, next) => {
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


cardDetailRoute.put('/update-card-detail/:id', async (req, res, next) => {

  try {
    await CardDetail.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).send(req.body)
  } catch {
    res.status(404)
    res.send({ error: "Id doesn't exist!" })
  }
})

module.exports = cardDetailRoute;