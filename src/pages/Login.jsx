import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/login.css'; // importar archivo CSS

const Login = () => {
  return (
    <div className="login-background">
      <div className="container">
        <div className="form-container">
        <div className="logo2"><img src="/logo2.png" alt="" /></div>
          <h1 className="text-3xl font-bold text-center mb-6">¡Bienvenido!</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              ¿No estás registrado aún?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
