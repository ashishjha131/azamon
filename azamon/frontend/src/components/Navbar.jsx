import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../styles/navbar.css";
function Navbar() {
  const {isLoggedIn, logout} = useContext(AuthContext);
  let user;
  if(isLoggedIn){
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <nav className="navbar">

  <div className="navbar-left">

    <Link to="/">
      <img src="../src/logo.png" alt="Azamon" />
    </Link>

    <span>Hi! {user?.name || "Guest"}</span>

  </div>

{!isLoggedIn ? (
  <div className="navbar-right">

    <Link to="/signup">Signup</Link>

    <Link to="/login">Login</Link>

    <Link to="/cart">Cart</Link>

    <Link to="/admin/login">Admin Login</Link>

  </div> ):  (
  <div className="navbar-right-2">
    <Link to="/myorders">My Orders</Link>
    <Link to="/cart">Cart:(0)</Link>
    <button onClick={logout}>
    Logout 
    </button>
    </div>)}

</nav>
  );
}

export default Navbar;