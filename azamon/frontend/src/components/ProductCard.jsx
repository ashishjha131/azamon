import React from "react";
import "../styles/product.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const {
        addToCart,
        cartItems,
        increaseQty,
        decreaseQty
    } = useContext(CartContext);

    const cartProduct = cartItems.find(
        (obj) => obj._id === product._id
    );

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />

            <h3>{product.name}</h3>
            <h4>{product.description}</h4>
            <h4>₹{product.price}</h4>
            <h4>Stock: {product.stock}</h4>

            <footer>{product.category}</footer>

            {cartProduct ? (
    <div className="quantity-controls">
        <button
            className="decrease-qty"
            onClick={() => decreaseQty(product._id)}
        >
            -
        </button>

        <p>{cartProduct.qty} in cart</p>

        <button
            className="increase-qty"
            onClick={() => increaseQty(product._id)}
        >
            +
        </button>
    </div>
) : (
    <button
        className="add-to-cart"
        onClick={() => addToCart(product)}
    >
        Add to Cart
    </button>
)}
        </div>
    );
};

export default ProductCard;