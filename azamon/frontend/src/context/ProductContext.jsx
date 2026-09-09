import {createContext, useState, useEffect} from "react";

export const ProductContext = createContext();

function ProductProvider({children}){
    const [products, setProducts] = useState([]);

     async function fetchProducts() {
        try {
            const response = await fetch(
                "http://localhost:5000/api/products/"
            );
            const data = await response.json();
            if (response.ok) {
                setProducts(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    function addProduct(product){
        console.log("PRODUCT RECEIVED:", product);
        setProducts((currProducts)=>[...currProducts, product]);
        console.log(products);
    }
    function deleteProduct(productId){
        const newProducts = products.filter((obj)=> obj._id !== productId)
        setProducts(newProducts);
    }
    
    return(
        <ProductContext.Provider value={{addProduct, deleteProduct, fetchProducts, products}}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;
