import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
const Cart = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        increaseQty,
        decreaseQty,
        clearCart
    } = useContext(CartContext);

    const totalAmt = cartItems.reduce(
        (prevSum, obj) => prevSum + (obj.price * obj.qty),
        0
    );

    return (
        <div className="cart">

            {cartItems && cartItems.length > 0 ? (

                <>
                    <ol>
                        {cartItems.map((e) => (
                            <li key={e._id}>

                                <h6 className="name">
                                    {e.name}
                                </h6>

                                <h6 className="price">
                                    ₹{e.price}
                                </h6>

                                <button
                                    className="decrease-qty"
                                    onClick={() => decreaseQty(e._id)}
                                >
                                    -
                                </button>

                                <h6 className="qty">
                                    {e.qty}
                                </h6>

                                <button
                                    className="increase-qty"
                                    onClick={() => increaseQty(e._id)}
                                >
                                    +
                                </button>

                                <h6 className="total-amt">
                                    ₹{e.price * e.qty}
                                </h6>

                                <button
                                    className="clear-cart"
                                    onClick={() => clearCart(e._id)}
                                >
                                    Clear item
                                </button>

                            </li>
                        ))}
                    </ol>

                   <div className="cart-bottom">
    <h3 className="final-total">
        Final Total: ₹{totalAmt}
    </h3>

    <button className="pay-btn" onClick={()=>{navigate("/cart/order");
        console.log("hahah");
    }}>
        Order
    </button>
</div>
                </>

            ) : (

                <div>Nothing in cart</div>

            )}

        </div>
    );
};

export default Cart;