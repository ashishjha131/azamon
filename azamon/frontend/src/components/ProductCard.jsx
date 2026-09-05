import React from "react";
import "../styles/product.css"

const ProductCard = (props) => {
    return (
        <div className="product-card">

            <img
                className="image"
                src={props.image}
                alt={props.name}
            />

            <h3 className="product-name">
                {props.name}
            </h3>

            <p className="product-description">
                {props.description}
            </p>

            <h3 className="product-price">
                Rs. {props.price}
            </h3>

            <button className="add-to-cart">
                Add to Cart
            </button>

        </div>
    );
};

export default ProductCard;