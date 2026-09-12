import React, {useState, useEffect} from "react";
import "../styles/myorders.css";
function MyOrders(){
    const [orders, setOrders] = useState([]);

    async function fetchOrders(){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/myorders`,{
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const order = await response.json();
    console.log(order);
    return order;
    }
    catch(error){
        console.log(error);
    }
}
    useEffect(()=>{
        async function getOrders(){
        const orders = await fetchOrders();
        setOrders(orders);
        };
        getOrders();
    },[]);
    return(
        <>
        <h3>Your orders</h3>
            <div className="my-orders">
                {orders.length>0 ? (orders.map((obj)=>(
                    <div key={obj._id}className="order-item">
                         <div>
                                {obj.products.map((product) => (
                                    <div key={product.productId}>
                                        <p>
                                            Quantity: {product.quantity}
                                        </p>

                                        <p>
                                            Price: ₹{product.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        <h3>₹{obj.total}</h3>
                        <h3>order status: {obj.status}</h3>
                    </div>
                ))):(
                    <h1>You have no orders. </h1>
                )}
            </div>
        </>
    )
}
export default MyOrders;