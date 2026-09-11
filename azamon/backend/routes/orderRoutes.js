const express = require('express');
const { addOrderItems, getOrders, getMyOrders, updateOrderStatus } = require('../controller/orderController');
const { protect } = require('../middlewares/protect');
const  {admin}  = require('../middlewares/admin');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

console.log("LOADED ORDER ROUTES FILE");
console.log("ROUTER TYPE:", typeof router);

module.exports = router;
