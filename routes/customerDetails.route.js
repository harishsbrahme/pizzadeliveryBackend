const express = require('express');
const router = express.Router();
const customerDetailsController = require('../controllers/customerDetails.controller');

// When a GET request hits the root of this router, run getAllUsers
router.post('/saveCustomerdetails', customerDetailsController.saveCustomerdetails);

router.post('/updateCustomerdetails', customerDetailsController.updateCustomerdetails);

router.post('/deleteCustomerdetails', customerDetailsController.deleteCustomerdetails);

router.get('/getAllCustomerdetails', customerDetailsController.getAllCustomerdetails);

router.post('/getCustomerdetailsbyId', customerDetailsController.getCustomerdetailsbyId);

router.post('/loginCustomer', customerDetailsController.loginCustomer);

module.exports = router;