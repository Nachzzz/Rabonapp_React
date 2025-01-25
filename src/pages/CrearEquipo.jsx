import React, { useState } from "react";
import axios from "axios";

const CrearEquipo = () => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("img", imagen);

    try {
      const response = await axios.post("http://localhost:5000/crearEquipo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMensaje(`Equipo creado exitosamente: ${response.data.nombre}`);
      setNombre("");
      setImagen(null);
    } catch (error) {
      setMensaje("Error al crear el equipo: " + error.response?.data?.msg || error.message);
    }
  };

  return (
    <div>
      <h2>Crear Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del equipo:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Escudo del equipo:</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Crear Equipo</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearEquipo;
