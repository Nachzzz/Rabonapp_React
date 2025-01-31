import React from "react";
import '../assets/styles/styleComponents.css'
// import Reportes from "../pages/Reportes";

const PartidosDisponibles = () => {
  const partidos = [
    { id: 1, equipo1: "Equipo A", equipo2: "Equipo B" },
    { id: 2, equipo1: "Equipo C", equipo2: "Equipo D" },
    { id: 3, equipo1: "Equipo E", equipo2: "Equipo F" }
  ];

  return (
    <div className="partido-todo">
      <div className="partidos-container">
        <h2 className="partidos-title">Partidos Disponibles</h2>
        {partidos.map(partido => (
          <div key={partido.id} className="partido">
            <span className="equipo">{partido.equipo1}</span> vs <span className="equipo">{partido.equipo2}</span>
            <button className="unirse-btn">Unirse</button>
          </div>
        ))}
      </div>
      <div className="reportes">
        <div className="partidos-container">
          {/* <Reportes /> */}
        </div>
      </div>
    </div>
  );
};



export default PartidosDisponibles;