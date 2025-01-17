import React from "react";
import PartidosDisponibles from '../components/PartidosDisponibles';
import '../assets/styles/home.css'; // importar archivo CSS

const Home = () => {
  return (
    <div className="home">
      <div className="container-text">
      <h1 className="title">Bienvenidos a Rabonapp</h1>
        <p className="parrafo">
        Un sitio para organizar partidos de fútbol 5 con tus amigos o desconocidos de la zona.
        </p>

      </div>
      <PartidosDisponibles />
    </div>

  );
};

export default Home;
