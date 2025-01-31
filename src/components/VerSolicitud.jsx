import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import Swal from 'sweetalert2';

export default function VerSolicitud({solicitud}) {
    const { token } = useAuth("state");
    const [mj, setMj] = useState('');
    const soli = {
        id: solicitud.id,
        idJugador: solicitud.id_jugador_solicitud,
        mensaje: solicitud.mensaje
    };

    const handleVerSolicitud = () => {
        Swal.fire({
            title: 'Detalles de la Solicitud',
            html: `
                <p><strong>ID del jugador:</strong> ${soli.idJugador}</p>
                <p><strong>Mensaje:</strong> "${soli.mensaje}"</p>
            `,
            icon: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Cerrar',
        });
    };

    const handleAceptar = (ev) => {
        ev.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Quieres aceptar la solicitud de este jugador?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
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
                    setMj(data.Mensaje);
                    Swal.fire(
                        'Aceptado!',
                        'La solicitud ha sido aceptada.',
                        'success'
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Error',
                        error.message || 'Hubo un error al aceptar la solicitud.',
                        'error'
                    );
                });
            }
        });
    };

    const handleRechazar = (ev) => {
        ev.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Quieres rechazar esta solicitud?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, rechazar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
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
                    setMj(data.Mensaje);
                    Swal.fire(
                        'Rechazada!',
                        'La solicitud ha sido rechazada.',
                        'info'
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Error',
                        error.message || 'Hubo un error al rechazar la solicitud.',
                        'error'
                    );
                });
            }
        });
    };

    return (
        <div>
            <div>
                <button onClick={handleVerSolicitud}>Ver Solicitud</button>
                {/* <p>El jugador ID:<span>{soli.idJugador}</span> quiere unirse a tu equipo</p>
                <p>El mensaje que escribió solicitando unirse:</p>
                <p>"{soli.mensaje}"</p> */}
            </div>
            <div>
                <button onClick={handleAceptar}>Aceptar</button>
                <button onClick={handleRechazar}>Rechazar</button>
            </div>
            
            {mj !== '' ? <p>{mj}</p> : <br />}
        </div>
    );
}
