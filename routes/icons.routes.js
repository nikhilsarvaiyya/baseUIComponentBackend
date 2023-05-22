const express = require('express');
// const app = express();
// const createError = require('http-errors');
const iconRoute = express.Router();

let Icon = require('../model/icons');

// Get all Icon
iconRoute.get('/icons', async (req, res) => {
  const allIcons = await Icon.find()
  res.status(200).send(allIcons)
})

module.exports = iconRoute;