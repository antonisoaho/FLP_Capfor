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
  .put('/singleuser/:id', async (req, res) => {
    const userId = req.params.id;
    const { isAdmin } = req.user;

    if (isAdmin) {
      try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
          return res.status(404).json({ error: 'Användaren hittades inte.' });
        }
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const newRole = req.body.isAdmin;

        newName ? (existingUser.name = newName) : '';
        newEmail ? (existingUser.email = newEmail) : '';
        newPassword ? (existingUser.password = newPassword) : '';
        newRole ? (existingUser.isAdmin = newRole) : '';

        const updatedUser = await existingUser.save();
        console.log(updatedUser);
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({ error: 'Ett fel inträffade vid uppdatering av användaren.' });
      }
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
        res.status(409).json({ error: 'Email finns redan registrerad.' });
        return;
      }
      const user = new User({ ...req.body });
      const result = await user.save();

      res.status(201).json({ success: true, user: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
