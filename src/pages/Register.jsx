// src/pages/Register.js
import React, { useState } from "react";
import '../assets/styles/register.css';  // importar archivo CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data: ", formData);
    // Aquí realizarías la llamada a la API de registro
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Regístrate</h1>
        <div className="input-container">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
        </div>
        <div className="input-container">
          <label>Apellido</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Apellido completo"
          />
        </div>
        <div className="input-container">
          <label>Apodo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Apodo"
          />
        </div>
        <div className="input-container">
          <label>Edad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Edad"
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default Register;
