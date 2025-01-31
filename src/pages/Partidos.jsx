import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import '../assets/styles/stylePages.css';

export default function Partidos() {
    const { token } = useAuth('state');
    const navigate = useNavigate();
    const [partidos, setPartidos] = useState([]);

    const toCrearPartido = () => {
        navigate('/match');
    };
    const toCrearPartidoAbierto = () => {
        navigate('/registerOpenMatch');
    };
    const toUnirsePartidoAbierto = () => {
        navigate('/joinMatch');
    };

    useEffect(() => {
        const fetchPartidos = async () => {
            try {
                const url = 'http://127.0.0.1:5000/partidos';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();

                const partidosFormato = data.map((partido) => ({
                    ID: partido[0],
                    lugar: partido[1],
                    fecha: partido[2],
                    equipos: partido[3]
                }));
                setPartidos(partidosFormato);
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };
        fetchPartidos();
    }, []);

    const toggleReporte = async () => {
        // Obtener la lista de equipos únicos
        const equiposUnicos = [];
        partidos.forEach((partido) => {
            partido.equipos.split(' vs ').forEach((equipo) => {
                if (!equiposUnicos.includes(equipo)) {
                    equiposUnicos.push(equipo);
                }
            });
        });

        // Mostrar el cuadro de diálogo de SweetAlert2
        const { value: formValues } = await Swal.fire({
            title: 'Crear Reporte',
            html:
                `<label>Equipo a reportar:</label>` +
                `<select id="equipo" class="swal2-select">` +
                `<option value="">Seleccione un equipo</option>` +
                equiposUnicos.map((equipo) => `<option value="${equipo}">${equipo}</option>`).join('') +
                `</select>` +
                `<label>Comentario:</label>` +
                `<textarea id="comentario" class="swal2-textarea" placeholder="Escribe tu comentario aquí..."></textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const equipo = document.getElementById('equipo').value;
                const comentario = document.getElementById('comentario').value;

                if (!equipo || !comentario.trim()) {
                    Swal.showValidationMessage('Por favor, selecciona un equipo y escribe un comentario.');
                }
                return { equipo, comentario };
            }
        });

        // Si el usuario confirma, enviar el reporte
        if (formValues) {
            enviarReporte(formValues.equipo, formValues.comentario);
        }
    };

    const enviarReporte = async (equipo, comentario) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/enviar-reporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    equipo_reportado: equipo,
                    comentario: comentario,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el reporte');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            Swal.fire('Enviado', 'El reporte ha sido enviado correctamente.', 'success');
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'No se pudo enviar el reporte.', 'error');
        }
    };

    return (
        <div className='todoPartido'>
            <div className='reportes-container'>
                <h2>Reportes</h2>
                <button onClick={toggleReporte}>Crear Reporte</button>
            </div>

            <div className='bienveEquip'>
                <h2>Partidos registrados</h2>
                <div>
                    <ul>
                        {partidos.map((partido) => (
                            <li key={partido.ID}>
                                {partido.equipos} - {partido.lugar} - {partido.fecha}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button onClick={toCrearPartido}>Crear Partido</button>
                    <button onClick={toCrearPartidoAbierto}>Crear Partido Abierto</button>
                    <button onClick={toUnirsePartidoAbierto}>Unirse a un Partido Abierto</button>
                </div>
            </div>
        </div>
    );
}