import React from "react";
import {useState, useContext, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function EditProducts(){
    const {fetchProducts} = useContext(ProductContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    async function fetchProduct(){
        try{
            const response = await fetch(`http://localhost:5000/api/products/${id}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        
        if(response.status === 200){
            console.log(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category);
            setStock(data.stock);
        }
    }
    catch(error){
        console.log("server error");
    }
        }
    useEffect(()=>{
        fetchProduct()
    },[id])
    

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("stock", stock);
        
        if (image) {
        formData.append("image", image);
    }

        try {

            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "PUT",

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },

                    body: formData
                }
            );

            const data = await response.json();
            if(response.status === 200){
                console.log(data);
                fetchProducts();
                navigate("/admin/products")
            }
            

        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
            <div className="product-form-page">

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <h1>Edit Product</h1>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
        </>
    )
}
export default EditProducts;