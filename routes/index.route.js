const express = require('express');
const router = express.Router();

const pizzaDetailsRoutes = require('./pizzaDetails.route');

const customerDetailsRoutes = require('./customerDetails.route');

const orderDetailsRoutes = require('./orders.route');

router.use('/pizzaDetails', pizzaDetailsRoutes);

router.use('/customerDetails', customerDetailsRoutes);

router.use('/orderDetails', orderDetailsRoutes);


module.exports = router;