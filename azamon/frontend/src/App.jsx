import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";
import ProductForm from "./admin/ProductForm";
import EditProucts from "./admin/EditProducts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";

import "./App.css";



function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/products/form" element={<ProductForm/>} />
            <Route path="/admin/products/edit/:id" element={<EditProucts/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/cart/order" element={<Order/>} />
            <Route path="/cart/order/payment" element={<Payment/>} />
            <Route path="/my-orders" element={<MyOrders/>} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;