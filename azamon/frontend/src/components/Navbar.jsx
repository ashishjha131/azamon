import React from "react";
import {Link} from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
  return (
    <nav className="navbar">

  <div className="navbar-left">

    <Link to="/">
      <img src="../src/logo.png" alt="Azamon" />
    </Link>

    <span>Hi! Ashish</span>

  </div>

  <div className="navbar-right">

    <Link to="/signup">Signup</Link>

    <Link to="/login">Login</Link>

    <Link to="/cart">Cart</Link>

    <Link to="/admin/login">Admin Login</Link>

  </div>

</nav>
  );
}

export default Navbar;