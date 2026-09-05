// const Order = require('../model/order');
// const User = require('../model/User');
// const {sendEmail} = require('../utils/sendEmail');
// const razorpay = require("../config/razorpay");

// const addOrderItems = async(req, res) => {
//   try{
//     const {products, total, address} = req.body;
//   if(!products || !total || !address ){
//     return res.status(400).json({message: "enter all the details"});
//   }
//   const order = await Order.create({
//     user: req.user._id,
//     products,
//     total,
//     address,
//     paymentStatus: "pending",
//   });

//   const razorpayOrder = await razorpay.orders.create({
//     amount: order.total * 100,
//     currency: "INR"
//   });
//   order.razorpayOrderid = razorpayOrder.id;
//   await order.save();
//   res.status(200).json({key_id: razorpay.key_id,
//      razorpayOrderid: razorpayOrder.id,
//      amount: razorpayOrder.amount,
//      currency: razorpayOrder.currency
//   });
//   }
//   catch(error){
//     return res.status(500).json({message: `Error ${error}`});
//   }
// }

// const getOrders = async(req, res)=> {
//   try{
//     const order = await Order.find({}).populate("user", "name email");
//     console.log(order)
//     res.status(200).json(order);
//   }
//   catch(error){
//     return res.status(500).json({message: `Error ${error}`});
//   }
// }

// const getMyOrders = async(req, res)=> {
//   try{
//       console.log(req.user);
//       const currUser = req.user;
//       const order = await Order.find({user: currUser._id});
//       return res.status(200).json(order);
//   }
//   catch(error){
//     return res.status(500).json({message: `Error ${error}`});
//   }
// }

// const updateOrderStatus = async(req, res)=>{
//   try{
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//   }
//     if(!req.body.status) return res.status(400).json({message: "provide order status"});
//     order.status = req.body.status;
//     await order.save();
//     res.status(200).json({message: "order is shipped"});

//   }
//   catch(error){
//     return res.status(500).json({message: `Error ${error}`});
//   }

// }

// module.exports = {addOrderItems, getOrders, getMyOrders, updateOrderStatus};