const express = require('express');
const router = express.Router();
const { User } = require('../models/users');

router
  .get('/', (req, res) => {
    User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post('/', (req, res) => {
    //Create new user from userpanel
    const user = new User({ ...req.body });

    user
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

module.exports = router;
