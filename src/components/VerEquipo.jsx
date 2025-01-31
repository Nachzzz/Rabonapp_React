import React, { useState, useEffect } from 'react'

export default function VerEquipo({ equipo }) {

    const [verJug, setVerJug] = useState(false)
    const [jugadores, setJugadores] = useState([])
    const [equipoId, setEquipoId] = useState(null);


    const formatedEquipo = {
        id: equipo.id,
        nombre: equipo.nombre,
        imagen: equipo.imagen
    }

const handleVerJugadores = async (evento) => {
    evento.preventDefault();

    const equipoId = equipo.id;  // Verifica que 'equipo.id' no sea null

    console.log("ID del equipo:", equipoId);  // Verifica el valor del ID en consola

    if (!equipoId) {
        console.error('ID de equipo no disponible');
        return;  // Salir si no hay ID
    }

    try {
        const response = await fetch(`http://localhost:5000/equipos/${equipoId}/jugadores`);
        const data = await response.json();
        console.log(formatedEquipo);
        console.log(data);  // Mostrar jugadores
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
    }
}
    

    return (
        <div className='orden2'>
            <img
                src={`https://ui-avatars.com/api/?name=${formatedEquipo.id}&background=random`}
                alt="Foto de perfil"
                className="profile-picture"
            />
            {formatedEquipo.imagen ? (
                <br />
            ) : (
                <br />
            )}
            <div>
                <h3>{formatedEquipo.nombre}</h3> {/* Muestra el nombre del equipo */}
            </div>
            <div>
                <button onClick={handleVerJugadores}>Ver jugadores</button>
            </div>
            {verJug ? (
                <ul>
                    {jugadores.map((jugador) => (
                        <li key={jugador.id}>
                            {jugador.nombre} {jugador.apellido} ({jugador.apodo})
                        </li>
                    ))}
                </ul>
            ) : (<br />)}
        </div>
    )
}
