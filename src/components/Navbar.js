import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Navbar specific styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Hotel Dashboard</h2>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
