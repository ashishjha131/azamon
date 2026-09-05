const express = require('express');
const { verifyPayment }  = require('../controller/paymentController');
const { protect } = require('../middlewares/protect');
const  admin  = require('../middlewares/admin');

const router = express.Router();

router.route('/verify').post(protect, verifyPayment);



module.exports = router;