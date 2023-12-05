const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

router
  .get('/', (req, res) => {
    const { userId, isAdmin } = req.user;

    User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        const parsedResult = result.map((person) => ({
          _id: person._id,
          name: person.name,
          isAdmin: person.isAdmin,
        }));

        res.json({ userId, isAdmin, users: parsedResult });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .get('/singleuser/:id', (req, res) => {
    const { isAdmin } = req.user;

    if (isAdmin) {
      User.findById(req.params.id)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
  .post('/createuser', auth, async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(409).send('Email finns redan registrerad.');
      }
      const user = new User({ ...req.body });

      const result = await user.save();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
