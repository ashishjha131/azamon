import React from "react";
import ProductCard from "./ProductCard";
import "../styles/product.css";
import {useContext, useState, useEffect} from "react";
import { ProductContext } from "../context/ProductContext";

const Product = (product) => {
    const {fetchProducts, products} = useContext(ProductContext);
    useEffect(()=>{
        fetchProducts();
    },[])
    return (
        <div className="products">

            {products && products.length> 0 ? (
                    products.map((e)=>(
                        <ProductCard key={e._id} product={e}/>
                    ))
                    ):
                    
            <div>No products to display</div>
            }

        </div>
    );
};

export default Product;