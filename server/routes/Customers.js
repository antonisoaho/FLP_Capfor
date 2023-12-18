const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customers');

router
  .get('/', async (req, res) => {
    try {
      const { userId, isAdmin } = req.user;
      let query = {};

      if (!isAdmin) {
        query.advisor = userId;
      }

      const result = await Customer.find(query).sort({ createdAt: -1 });

      const parsedResult = result.map((cust) => ({
        advisorId: cust.advisor,
        custId: cust._id,
        customerNames: cust.customerDetails.name,
        lastUpdate: cust.updatedAt,
      }));
      res.json(parsedResult);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  })
  .post('/create', async (req, res) => {
    try {
      const customer = new Customer({ ...req.body });
      const result = await customer.save();

      res.status(201).json({ success: true, customer: result.customerDetails.name });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
