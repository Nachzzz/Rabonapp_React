import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/navbar.css'; // importar archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="" className="logo-img"/>
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">
              Regístrate
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
