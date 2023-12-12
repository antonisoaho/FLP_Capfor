const express = require('express');
const router = express.Router();
const { getUserByEmail, login } = require('../models/users');
const jwt = require('jsonwebtoken');

router
  .get('/', (req, res) => {
    res.status(200);
  })
  .post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      const passwordMatch = await login(email, password);

      if (passwordMatch) {
        const user = await getUserByEmail(email);

        if (user) {
          loggedIn = true;

          // Setting the session to store the user's ID, name and email
          const loggedInUser = {
            userId: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            lastLoggedIn: user.lastLoggedIn,
          };

          const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_TOKENKEY,
            {
              expiresIn: '2h',
            }
          );

          // save user token
          loggedInUser.token = token;
          res.status(200).json(loggedInUser);
        } else {
          res.status(404).send('User not found');
        }
      } else {
        res.status(400).send('Wrong password');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      res.status(500).send('Internal Server error');
    }
  });

module.exports = router;
