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
                const formatoEquipos = dataEquipos.map(equipo => ({
                    id: equipo[0],
                    nombre: equipo[1],
                    imagen: equipo[2]
                }))
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
                        equipos.map((equipo) => (
                            <SolicitudEquipo
                                key={equipo.id}
                                equipo={equipo}
                            />
                        ))

                    ) : (
                        <p>No hay equipos registrados</p>
                    )}
                </ul>
                </div>
                
            </div>

        </>
    )
}