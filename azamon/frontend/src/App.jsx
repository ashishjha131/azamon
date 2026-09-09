import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Cart from "./pages/Cart";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";
import ProductForm from "./admin/ProductForm";
import EditProucts from "./admin/EditProducts";

import "./app.css";



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
            {/* <Route path="/cart" element={<Cart/>} /> */}
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/products/form" element={<ProductForm/>} />
            <Route path="/admin/products/edit/:id" element={<EditProucts/>} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;