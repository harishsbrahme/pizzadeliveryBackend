const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderDetails.controller');

// Post Endpoints
router.post('/saveorderdetails', orderController.saveorderdetails);
router.post('/updateorderstatus', orderController.updateorderstatus);
router.post('/resendotp', orderController.resendotp);
router.post('/verifyotp', orderController.verifyotp);
router.post('/assignridermethod', orderController.assignridermethod);

// Get Endpoints
router.get('/getallorder', orderController.getallorder);
router.get('/getordersbyid/:id', orderController.getordersbyid);
router.post('/getorderbycustomermobilenumber', orderController.getorderbycustomermobilenumber);
router.get('/getbystatus/:status', orderController.getorderbyorderstatus);

module.exports = router;