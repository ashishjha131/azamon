import React from "react";
import ProductCard from "./ProductCard";
import "../styles/product.css";


const Product = () => {
    return (
        <div className="products">

            <ProductCard
                image="../src/iphne.jpg"
                name="iPhone 17"
                description="Latest Apple iPhone with powerful performance and an amazing camera."
                price={50000}
            />

            <ProductCard
                image="../src/laptop.jpg"
                name="Gaming Laptop"
                description="High-performance gaming laptop with powerful processor and dedicated graphics."
                price={80000}
            />

            <ProductCard
                image="../src/sony.jpg"
                name="Sony Headphones"
                description="Premium wireless headphones with noise cancellation and excellent sound quality."
                price={12000}
            />

            <ProductCard
                image="../src/samsung.jpg"
                name="Samsung Galaxy S24"
                description="Flagship smartphone with a beautiful display, powerful processor and great camera."
                price={65000}
            />

        </div>
    );
};

export default Product;