import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../assets/styles/styleComponents.css';

const Navbar = () => {

  const logout = useAuth('actions').logout;
  const { token } = useAuth('state')

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="" className="logo-img"/>
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-container">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          {token ? (
            <>
              <li className="navbar-item">
                <Link to="/partidos" className="navbar-link">
                  Partidos
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/equipos" className="navbar-link">
                  Equipos
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/perfil" className="navbar-link">
                  Mi Perfil
                </Link>
              </li>
              <button onClick={logout} className='' id='salir'>Cerrar sesión</button>
            </>

          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Iniciar sesión
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Regístrate
                </Link>
              </li>
            </>

          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;