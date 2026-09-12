import React from "react";
import {useContext, useState} from "react";
import {CartContext} from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import "../styles/order.css";
const Order = ()=>{
    const navigate = useNavigate();
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState();
    const {cartItems} = useContext(CartContext);
     const totalAmt = cartItems.reduce(
        (prevSum, obj) => prevSum + (obj.price * obj.qty),
        0
    );
    
    async function confirmOrder(){
    try{
        const reqBody = {
            amount: totalAmt
        };

        const response = await fetch("${import.meta.env.VITE_API_URL}/api/payment/create-order", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(reqBody)
        });

        const data = await response.json();

        console.log("Razorpay order:", data);

        const options = {
            key: data.key_id,

            amount: data.amount,

            currency: data.currency,

            name: "Azamon",

            description: "Azamon Order",

            order_id: data.razorpayOrderId,

            handler: async function(response){

                console.log("Payment response:", response);

                const verifyResponse = await fetch(
                    "${import.meta.env.VITE_API_URL}/api/payment/verify",
                    {
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        })
                    }
                );

                const verifyData = await verifyResponse.json();

                console.log("Verification:", verifyData);

                if(verifyResponse.ok){

                    const orderBody = {
                        products: cartItems.map((obj) => ({
                            productId: obj._id,
                            quantity: obj.qty,
                            price: obj.price
                        })),
                        total: totalAmt,
                        address: {
                            street,
                            state,
                            city,
                            pincode
                        }
                    };

                    const orderResponse = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/orders`,
                        {
                            method: "POST",
                            headers:{
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify(orderBody)
                        }
                    );

                    const orderData = await orderResponse.json();

                    console.log("Azamon order:", orderData);

                    if(orderResponse.ok){
                        navigate("/my-orders");
                    }
                }
            }
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();

    }catch(error){
        console.log(error);
    }
}

    return(
        <>
        <h1 className="order-title">Order Summary</h1>
        <div className="order">
            <div className="order-product-details">
                <ol>
                {cartItems.map((obj)=> (
                <li key={obj._id}>
                    <h4>{obj.name} </h4>
                    <h4>Qty : {obj.qty}</h4>
                    <h4>₹{obj.price}</h4>
                </li>))}
                </ol>
                <h6>Total payable amount : ₹{totalAmt}</h6>
                <label>Address : </label>
                <input placeholder="Street" onChange={(e)=>setStreet(e.target.value)}/>
                <input placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
                <input placeholder="State" onChange={(e)=>setState(e.target.value)}/>
                <input placeholder="Pincode" onChange={(e)=>setPincode(e.target.value)}/>
                <button className="confirm-order" onClick={confirmOrder}>Proceed to pay</button>
            </div>
            
        </div>
        </>
    )
}
export default Order;