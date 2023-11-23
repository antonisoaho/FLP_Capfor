const express = require('express');
const router = express.Router();
const Customers = require('../models/customers');
const loggedIn = require('../index');

router.get('/customers', (req, res) => {
  // Boiler customers to see how the site looks
  const customers = [
    { Name: 'Anton Isoaho', Age: 29, Status: 'Married' },
    { Name: 'Carin Isoaho', Age: 27, Status: 'Married' },
    { Name: 'Simon Isoaho', Age: 31, Status: 'Partner' },
    { Name: 'Ida Andersson', Age: 29, Status: 'Partner' },
  ];

  res.json(customers);
});

module.exports = router;
