// import { createContext, useState } from "react";

// export const CartContext = createContext();

// const CartProvider = ({children})=>{

//     const [items, setItems] = useState([]);

//     function addToCart(product){
//         setItems([...items, product]);
//     }
//     function increaseQty(productId){

//         setQty();
//     }
//     function decreaseQty(productId){
//         setQty(qty-1)
//     }
//     function removeFromCart(productId){
//         setItems();
//     }
//     function clearCart(){

//     }
//     return(
//         <CartContext.Provider value={{items, addToCart, increaseQty,
//          decreaseQty, removeFromCart, clearCart}}>
//             {children}
//         </CartContext.Provider>
//     )
// }
// export default CartProvider;