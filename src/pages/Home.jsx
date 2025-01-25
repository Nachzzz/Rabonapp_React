import React, { useEffect } from "react";
import useFetch from '../hooks/useFetch';  // Asegúrate de que la ruta sea correcta
import '../assets/styles/home.css'; // importar archivo CSS

const Home = () => {
  const { data: jugadores, isLoading, isError } = useFetch('http://localhost:5000/');

  useEffect(() => {
    if (jugadores) {
      console.log(jugadores);
    }
  }, [jugadores]);

  return (
    <div className="home">
      <div className="container-text">
        <h1 className="title">Bienvenido a Rabonapp</h1>
        <br />
        <br />
        <p className="parrafo">
          Un sitio para organizar partidos de fútbol 5 con tus amigos o desconocidos de la zona.
        </p>
        <br />
        <br />
        <p className="parrafo">
          Inicia sesión o Regístrate para ver partidos y equipos disponibles
        </p>
      </div>
      
    </div>
  );
};

export default Home;
