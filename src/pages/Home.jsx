import React, { useEffect } from "react";
import PartidosDisponibles from '../components/PartidosDisponibles';
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
        <p className="parrafo">
          Un sitio para organizar partidos de fútbol 5 con tus amigos o desconocidos de la zona.
        </p>
      </div>
      <PartidosDisponibles />
      <div className="jugadores-list">
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error: No se pudo obtener los datos.</p>}
        {jugadores && jugadores.map((jugador, index) => (
          <p key={`${jugador.id}-${index}`}>{jugador.nombre} {jugador.apellido}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
