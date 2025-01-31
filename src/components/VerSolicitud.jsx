import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router';

export default function VerSolicitud({solicitud}) {

    const { token } = useAuth("state")
    const navigate = useNavigate()
    const [mj, setMj] = useState('')
    const soli = {
        id: solicitud.id,
        idJugador: solicitud.id_jugador_solicitud,
        mensaje: solicitud.mensaje
    }


    const handleAceptar = (ev) => {
        ev.preventDefault()
        const url = 'http://127.0.0.1:5000/solicitudes';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_jugador_solicitud: soli.idJugador,
            })
        })
        .then(response => response.json())
        .then(data => {
            setMj(data.Mensaje)
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
            setError(error.message || 'Error en la solicitud');
        });
    }

    const handleRechazar = (ev) => {
        ev.preventDefault();
        const url = 'http://127.0.0.1:5000/solicitudes';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_solicitud: soli.id // Pasamos el id de la solicitud para eliminar
            })
        })
        .then(response => response.json())
        .then(data => {
            setMj(data.Mensaje)
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error)
            setError(error.message || 'Error en la solicitud')
        })
    }

    return (
        <div>
            <div>
                <p>El jugador ID:<span>{soli.idJugador}</span> quiere unirse a tu equipo</p>
                <p>El mensaje que escribio solicitando unirse:</p>
                <p>"{soli.mensaje}"</p>
            </div>
            <div>
                <button onClick={handleAceptar}>Aceptar</button>
                <button onClick={handleRechazar}>Rechazar</button>
            </div>
            
            {mj != '' ? <p>{mj}</p> : <br />}
        </div>
    )
}