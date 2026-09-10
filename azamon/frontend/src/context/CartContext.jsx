import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {

        setCartItems((currItems) => {

            const existingProduct = currItems.find(
                (obj) => obj._id === product._id
            );

            if (existingProduct) {
                return currItems.map((obj) =>
                    obj._id === product._id
                        ? { ...obj, qty: obj.qty + 1 }
                        : obj
                );
            }

            return [...currItems, { ...product, qty: 1 }];
        });
    }

    function increaseQty(productId) {

        setCartItems((currItems) =>
            currItems.map((obj) =>
                obj._id === productId
                    ? { ...obj, qty: obj.qty + 1 }
                    : obj
            )
        );
    }

    

        function decreaseQty(productId) {
    setCartItems((currItems) =>
        currItems
            .map((obj) =>
                obj._id === productId
                    ? { ...obj, qty: obj.qty - 1 }
                    : obj
            )
            .filter((obj) => obj.qty > 0)
    );
}
    

    function clearCart(productId) {

        setCartItems((currItems) =>
            currItems.filter((obj) => obj._id !== productId)
        );
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQty,
                decreaseQty,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;