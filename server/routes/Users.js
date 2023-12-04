const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');

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
  .get('/getme', (req, res) => {
    const token = req.headers['authorization'];
    const decryptedToken = jwt.decode(token);
    User.findById(decryptedToken.userId)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .get('/logout', (req, res) => {
    const token = req.headers['authorization'];

    invalidateToken(token);

    res.status(200).send();
  })
  .post('/createuser', (req, res) => {
    //users/createuser for new users

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
