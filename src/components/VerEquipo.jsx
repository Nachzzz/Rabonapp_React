import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../contexts/AuthContext'

export default function VerEquipo({ equipo }) {

    const [verJug, setVerJug] = useState(false)
    const [jugadores, setJugadores] = useState([])
    const [loadingJug, setLoadingJug] = useState(false)
    const [errorJug, setErrorJug] = useState(null)
    const [isCapitan, setIsCapitan] = useState(false)

    const authState = useAuth('state')
    const token = authState?.token
    const user__id = authState?.user__id

    const formatedEquipo = {
        id: equipo?.id ?? null,
        nombre: equipo?.nombre ?? 'Equipo sin nombre',
        imagen: equipo?.imagen ?? null
    }

    const handleVerJugadores = async (evento) => {
        evento && evento.preventDefault && evento.preventDefault();

        // toggle: si ya está abierto, cerramos
        if (verJug) {
            setVerJug(false)
            return
        }

        const equipoId = formatedEquipo.id;
        if (!equipoId && equipoId !== 0) {
            setErrorJug('ID de equipo no disponible')
            return
        }

        setLoadingJug(true)
        setErrorJug(null)
        try {
            const response = await fetch(`http://localhost:5000/equipos/${equipoId}/jugadores`)
            if (!response.ok) {
                const body = await response.json().catch(() => ({}))
                throw new Error(body.msg || body.error || `Error ${response.status}`)
            }
            const data = await response.json()

            // Normalizar jugadores
            const jugadoresNorm = (Array.isArray(data) ? data : []).map((j) => {
                if (Array.isArray(j)) {
                    return { id: j[0] ?? null, nombre: j[1] ?? j[0] ?? '', apellido: j[2] ?? '', apodo: j[3] ?? '' }
                }
                if (j && typeof j === 'object') {
                    return { id: j.ID ?? j.id ?? null, nombre: j.nombre ?? j.Nombre ?? '', apellido: j.apellido ?? '', apodo: j.apodo ?? '' }
                }
                return { id: null, nombre: String(j), apellido: '', apodo: '' }
            })

            setJugadores(jugadoresNorm)
            setVerJug(true)
        } catch (err) {
            console.error('Error al obtener jugadores:', err)
            setErrorJug(err.message)
        } finally {
            setLoadingJug(false)
        }
    }

    // comprobar si el usuario logeado es el creador/capitán de este equipo
    useEffect(() => {
        const checkCapitan = async () => {
            try {
                if (!user__id) return
                const url = `http://127.0.0.1:5000/equipos-locales/${user__id}`
                const response = await fetch(url, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
                if (!response.ok) {
                    // no critically fail; simplemente no mostrar el botón
                    return
                }
                const data = await response.json()
                // data expected to be array of [id, nombre] or objects; normalize
                const ids = (Array.isArray(data) ? data : []).map(d => Array.isArray(d) ? d[0] : (d.ID ?? d.id))
                if (ids.includes(formatedEquipo.id)) setIsCapitan(true)
            } catch (err) {
                console.warn('Error checking capitan', err)
            }
        }
        checkCapitan()
    }, [user__id, formatedEquipo.id, token])

    const handleEliminarEquipo = async () => {
        if (!formatedEquipo.id && formatedEquipo.id !== 0) {
            Swal.fire('Error', 'ID de equipo no disponible', 'error')
            return
        }

        const result = await Swal.fire({
            title: `Eliminar ${formatedEquipo.nombre}?`,
            text: 'Esta acción es irreversible. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        })

        if (!result.isConfirmed) return

        try {
            const response = await fetch(`http://127.0.0.1:5000/equipos/${formatedEquipo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            })

            const body = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(body.msg || body.Mensaje || `Error ${response.status}`)
            }

            Swal.fire('Eliminado', body.msg || 'Equipo eliminado correctamente', 'success')
            setTimeout(() => window.location.reload(), 1200)
        } catch (err) {
            Swal.fire('Error', err.message || 'No se pudo eliminar el equipo', 'error')
        }
    }

    return (
        <div className='orden2'>
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formatedEquipo.nombre)}&background=random`}
                alt="Foto de perfil"
                className="profile-picture"
            />
            <div>
                <h3>{formatedEquipo.nombre}</h3>
            </div>
            <div>
                <button onClick={handleVerJugadores}>{verJug ? 'Ocultar jugadores' : 'Ver jugadores'}</button>
                
                {/* Seccion provisoria del boton para eliminar un equipo */}
                <button className="btn-danger" onClick={handleEliminarEquipo}>Eliminar equipo</button>
                {/* {isCapitan && (
                    
                )} */}
            </div>

            {verJug && (
                <div className="jugadores-container">
                    <h4>Jugadores</h4>
                    {loadingJug ? (
                        <p>Cargando jugadores...</p>
                    ) : errorJug ? (
                        <p className="error-msg">{errorJug}</p>
                    ) : jugadores.length > 0 ? (
                        <ul className="jugadores-list">
                            {jugadores.map((jugador, idx) => (
                                <li key={jugador.id ?? `${jugador.nombre}-${idx}`} className="jugador-item">
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent((jugador.nombre || '') + ' ' + (jugador.apellido || ''))}&background=random`} alt="avatar" className="profile-picture" />
                                    <div className="jugador-info">
                                        <div className="jugador-nombre">{jugador.nombre} {jugador.apellido}</div>
                                        {jugador.apodo && <div className="jugador-apodo">{jugador.apodo}</div>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay jugadores en este equipo.</p>
                    )}
                </div>
            )}
        </div>
    )
}
