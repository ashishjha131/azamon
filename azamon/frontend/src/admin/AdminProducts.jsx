import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminProducts.css";

const AdminProducts = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-products-page">

            <div className="admin-products-header">
                <h1>Products</h1>

                <button
                    className="product-button"
                    onClick={() => navigate("/admin/products/form")}>
                    + Create Product
                </button>
            </div>

            <div className="admin-products">
                
            </div>

        </div>
    );
};

export default AdminProducts;