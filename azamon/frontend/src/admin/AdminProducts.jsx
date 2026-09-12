import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminProducts.css";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const AdminProducts = () => {
    const navigate = useNavigate();
    const {products, deleteProduct, fetchProducts} = useContext(ProductContext);
    console.log("PRODUCTS:", products);

    async function handleDelete(productId){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await response.json();
        if(response.status === 200){
            console.log(data);
            deleteProduct(productId);
            fetchProducts();
        }
    }
    
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
                {products.map((e)=> (e &&
                    <div key={e._id} className="admin-product">
                        <img src={e.imageUrl} alt={e.name}/>            

                        <h3>{e.name}</h3>

                        <p>₹{e.price}</p>

                        <p>Stock: {e.stock}</p>
                        <button className="edit" onClick={()=>navigate(`/admin/products/edit/${e._id}`)}>Edit</button>
                        <button className="delete" onClick={()=>handleDelete(e._id)}>Delete</button>
                    </div>)
                )}
            </div>

        </div>
    );
};

export default AdminProducts;