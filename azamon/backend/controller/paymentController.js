const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const createPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                message: "Amount is required"
            });
        }

        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR"
        });

        return res.status(200).json({
            key_id: process.env.RAZORPAY_KEY_ID,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });

    } catch (error) {
        console.log("RAZORPAY ERROR:", error);
        return res.status(500).json({
            message: "Error creating payment",
            error: error.message
        });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        } = req.body;

        if (
            !razorpayOrderId ||
            !razorpayPaymentId ||
            !razorpaySignature
        ) {
            return res.status(400).json({
                message: "Payment details are missing"
            });
        }

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpayOrderId + "|" + razorpayPaymentId
            )
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({
                message: "Signature not verified"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error verifying payment",
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


module.exports = {
    createPayment,
    verifyPayment,
    webhook
};