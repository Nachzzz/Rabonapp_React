import React, { useState } from 'react'

export default function VerEquipo({ equipo }) {

    const [verJug, setverJug] = useState(false)
    const jugadores = [
        { id: 1, nombre: "Agustin", apellido: "Marchesin", apodo: "titan" },
        { id: 2, nombre: "Leandro", apellido: "Paredes", apodo: "heredero" },
        { id: 3, nombre: "Martin", apellido: "Palermo", apodo: "titan" }

    ]

    console.log(equipo);

    const formatedEquipo = {
        id: equipo.id,
        nombre: equipo.nombre,
        imagen: equipo.imagen
    }

    const handleVerJugadores = (evento) => {
        evento.preventDefault()
        setverJug(true)

    }

    return (
        <div className='orden2'>
            <img
                src={`https://ui-avatars.com/api/?name=${equipo.id}&background=random`}
                alt="Foto de perfil"
                className="profile-picture"
            />
            {formatedEquipo.imagen ? (
                <br />
            ) : (
                <br />
            )}
            <div>
                <h3>{formatedEquipo.id}</h3>
            </div>
            <div>
                <button onClick={handleVerJugadores}>Ver jugadores</button>
            </div>
            {verJug ? (
                <>
                    <ul>
                        {jugadores.map((jugador) => (
                            <p key={jugador.id}>{jugador.nombre}</p>
                        ))}
                    </ul>
                </>
            ) : (<br />)}
        </div>
    )
}