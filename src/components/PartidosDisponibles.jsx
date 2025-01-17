// src/components/PartidosDisponibles.js
import React from "react";
import '../assets/styles/partidosDisponibles.css';

const PartidosDisponibles = () => {
  const partidos = [
    { id: 1, equipo1: "Equipo A", equipo2: "Equipo B" },
    { id: 2, equipo1: "Equipo C", equipo2: "Equipo D" },
    { id: 3, equipo1: "Equipo E", equipo2: "Equipo F" }
  ];

  return (
    <div className="partidos-container">
      <h2 className="partidos-title">Partidos Disponibles</h2>
      {partidos.map(partido => (
        <div key={partido.id} className="partido">
          <span className="equipo">{partido.equipo1}</span> vs <span className="equipo">{partido.equipo2}</span>
          <button className="unirse-btn">Unirse</button>
        </div>
      ))}
    </div>
  );
};



export default PartidosDisponibles;
