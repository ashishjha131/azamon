const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    },
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, min: 1},
            price: {type: Number, required: true}
        }
    ],
    total: {type: Number, required: true, default: 0},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        pincode: {type: Number, required: true}
    },
    razorpayOrderid: {type: String},
    razorpayPaymentid: {type: String},
    paymentStatus: {type: String, enum: ["pending", "paid", "failed"]},
    status: {type: String, enum: ["pending", "shipped", "delivered"], default: 'pending'}
}, {timestamps: true})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;