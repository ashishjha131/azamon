import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Cart from "./pages/Cart";

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
            
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;