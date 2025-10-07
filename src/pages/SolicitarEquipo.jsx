import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import SolicitudEquipo from '../components/SolicitudEquipo'
import '../assets/styles/stylePages.css'

export default function SolicitarEquipo() {

    const { token } = useAuth('state')
    const [solicitud, setSolicitud] = useState({})
    const [equipos, setEquipos] = useState([])
    const [teamSol, setTeamSol] = useState(0)



    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const urlEqui = 'http://127.0.0.1:5000/todoslosequipos';
                const response = await fetch(urlEqui)
                if (!response.ok) {
                    throw new Error('Network response was not ok ', error)
                }
                const dataEquipos = await response.json()
                // Normalizar distintos formatos que pueda devolver el backend
                const formatoEquipos = (Array.isArray(dataEquipos) ? dataEquipos : []).map((equipo) => {
                    if (Array.isArray(equipo)) {
                        // [id, nombre, escudo] o [nombre]
                        if (equipo.length >= 3) return { id: equipo[0], nombre: equipo[1], imagen: equipo[2] }
                        if (equipo.length === 2) return { id: equipo[0], nombre: equipo[1], imagen: null }
                        return { id: null, nombre: equipo[0], imagen: null }
                    }

                    if (equipo && typeof equipo === 'object') {
                        const id = equipo.ID ?? equipo.id ?? equipo.id_equipo ?? null
                        const nombre = equipo.nombre ?? equipo.Nombre ?? Object.values(equipo)[0] ?? null
                        const imagen = equipo.escudo ?? equipo.imagen ?? null
                        return { id, nombre, imagen }
                    }

                    return { id: null, nombre: String(equipo), imagen: null }
                })
                setEquipos(formatoEquipos)
            } catch (error) {
                console.error('Problema al hacer fetch')
            }
        }
        fetchEquipos()

    }, [])


    return (
        <>
            <div className='todoSolicitarEquipo'>
                <div className='solicitar-equipo-container'>
                    <h2>Solicita unirte a un equipo</h2>
                    <p>El capitan recibirá tu solicitud</p>
                    <p>El mismo <span>aceptará</span> o <span>rechazará</span> tu solicitud. ¡Buena suerte!</p>
                    <ul className='lista-solicitar-equipo'>
                        {equipos.length > 0 ? (
                            equipos.map((equipo, idx) => (
                                <li key={equipo.id ?? `${equipo.nombre}-${idx}`}>
                                    <SolicitudEquipo
                                        equipo={equipo}
                                    />
                                </li>
                            ))
                        ) : (
                            <li>No hay equipos registrados</li>
                        )}
                    </ul>
                </div>

            </div>

        </>
    )
}