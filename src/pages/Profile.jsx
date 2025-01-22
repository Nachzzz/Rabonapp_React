import React from "react";
import '../assets/styles/profile.css';

const Profile = () => {
  const userData = {
    nombre: "Juan",
    apellido: "Pérez",
    edad: 25,
    apodo: "La chispa",
    habilidad: 4, // Número entre 0 y 5
    imagenPerfil: "https://via.placeholder.com/150", // Imagen de perfil por defecto
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : "empty"}`}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Imagen de perfil */}
        <div className="profile-image-section">
          <img
            src={userData.imagenPerfil}
            alt="Perfil"
            className="profile-image"
          />
          <h1 className="profile-name">
            {userData.nombre} {userData.apellido}
          </h1>
          <p className="profile-nickname">"{userData.apodo}"</p>
        </div>

        {/* Información del usuario */}
        <div className="profile-info">
          <p>
            <span className="info-label">Edad: </span>
            {userData.edad} años
          </p>
          <p className="info-label">Habilidad:</p>
          <div className="profile-stars">{renderStars(userData.habilidad)}</div>
        </div>

        {/* Botón para editar perfil */}
        <div className="profile-button">
          <button className="edit-button">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
