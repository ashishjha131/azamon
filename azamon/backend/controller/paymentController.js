const crypto = require("crypto");
const Order = require("../model/order");

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpayOrderid,
            razorpayPaymentid,
            razorpay_signature
        } = req.body;

        // Check whether all payment details were received
        if (!razorpayOrderid || !razorpayPaymentid || !razorpay_signature) {
            return res.status(400).json({
                message: "Payment details are missing"
            });
        }

        // Create the signature ourselves
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                (razorpayOrderid + "|" + razorpayPaymentid).toString()
            )
            .digest("hex");

        // Compare Razorpay's signature with our signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Signature not verified"
            });
        }

        // Find our MongoDB order
        const order = await Order.findOne({
            razorpayOrderId: razorpayOrderid
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Payment is verified
        order.paymentStatus = "paid";
        order.razorpayPaymentId = razorpayPaymentid;

        await order.save();

        return res.status(200).json({
            message: "Payment verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
};


const webhook = async (req, res) => {
    try {

        const signature = req.headers["x-razorpay-signature"];

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_WEBHOOK_SECRET
            )
            .update(req.body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({
                message: "Invalid webhook signature"
            });
        }

        const event = JSON.parse(req.body.toString());

        console.log("Webhook event:", event.event);

        if (event.event === "payment.captured") {

            const payment = event.payload.payment.entity;

            const razorpayOrderId = payment.order_id;
            const razorpayPaymentId = payment.id;

            const order = await Order.findOne({
                razorpayOrderId: razorpayOrderId
            });

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            order.paymentStatus = "paid";
            order.razorpayPaymentId = razorpayPaymentId;

            await order.save();
        }

        return res.status(200).json({
            message: "Webhook received"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Webhook error",
            error: error.message
        });
    }
};

module.exports = { verifyPayment, webhook };