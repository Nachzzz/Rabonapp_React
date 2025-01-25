import React, { useEffect } from "react";
import useFetch from '../hooks/useFetch';  // Asegúrate de que la ruta sea correcta
import '../assets/styles/home.css'; // importar archivo CSS

//commit

const Home = () => {
  const { data: jugadores, isLoading, isError } = useFetch('http://localhost:5000/partidos');

  useEffect(() => {
    if (jugadores) {
      console.log(jugadores);
    }
  }, [jugadores]);

  return (
    <div className="home">
      <div className="container-text">
        <h1 className="title">Partidos Disponibles</h1>
      </div>
      
    </div>
  );
};

export default Home;
