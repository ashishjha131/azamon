import React, { useState } from "react";
import "../styles/productForm.css";

function ProductForm() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

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
        formData.append("image", image);

        try {

            const response = await fetch(
                "http://localhost:5000/api/products/",
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },

                    body: formData
                }
            );

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="product-form-page">

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <h1>Create Product</h1>

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
                    Create Product
                </button>

            </form>

        </div>
    );
}

export default ProductForm;