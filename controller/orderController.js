const Order = require('../model/order');
const User = require('../model/User');
const {sendEmail} = require('../utils/sendEmail');

const addOrderItems = async(req, res) => {
  try{
    const {products, total, address, paymentId} = req.body;
  if(!products || !total || !address || !paymentId){
    return res.status(400).json({message: "enter all the details"});
  }
  const order = await Order.create({
    user: req.user._id,
    products,
    total,
    address,
    paymentId,
  });
  const user = await User.findById(req.user._id).select("email");
  await sendEmail(user.email, "Order Placed", "congratulations! your order has been placed" );
  res.status(200).json({message: "Order created successfully"});
  }
  catch(error){
    return res.status(500).json({message: `Error ${error}`});
  }
}

const getOrders = async(req, res)=> {
  try{
    const order = await Order.find({}).populate("user", "name email");
    console.log(order)
    res.status(200).json(order);
  }
  catch(error){
    return res.status(500).json({message: `Error ${error}`});
  }
}

const getMyOrders = async(req, res)=> {
  try{
      console.log(req.user);
      const currUser = req.user;
      const order = await Order.find({user: currUser._id});
      return res.status(200).json(order);
  }
  catch(error){
    return res.status(500).json({message: `Error ${error}`});
  }
}

module.exports = {addOrderItems, getOrders, getMyOrders};