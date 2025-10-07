import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import '../assets/styles/stylePages.css';
import VerPartido from '../components/VerPartido'

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

                const partidosFormato = (Array.isArray(data) ? data : []).map((partido, idx) => {
                    if (Array.isArray(partido)) {
                        return {
                            ID: partido[0] ?? null,
                            lugar: partido[1] ?? null,
                            fecha: partido[2] ?? null,
                            equipos: partido[3] ?? null,
                        }
                    }

                    if (partido && typeof partido === 'object') {
                        return {
                            ID: partido.ID ?? partido.id ?? partido.ID_partido ?? partido.id_partido ?? null,
                            lugar: partido.lugar ?? partido.Lugar ?? partido.ubicacion ?? partido.location ?? null,
                            fecha: partido.fecha ?? partido.date ?? partido.fecha_partido ?? null,
                            equipos: partido.equipos ?? partido.equipo ?? partido.equipos_concat ?? JSON.stringify(partido.equipos) ?? null,
                        }
                    }

                    console.warn('Partidos: unexpected item shape at index', idx, partido)
                    return { ID: null, lugar: null, fecha: null, equipos: null }
                })

                setPartidos(partidosFormato)
                console.log('Partidos normalizados:', partidosFormato)

            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };
        fetchPartidos();
    }, []);

    const toggleReporte = async () => {
        // Obtener la lista de partidos para seleccionar un equipo a reportar
        const { value: formValues } = await Swal.fire({
            title: 'Crear Reporte',
            html: `
                <label>Partido:</label>
                <select id="partido" class="swal2-select">
                    <option value="">Seleccione un partido</option>
                    ${partidos.map((p) => `<option value="${p.ID}">${p.equipos} - ${p.fecha}</option>`).join('')}
                </select>
                <label>Comentario:</label>
                <textarea id="comentario" class="swal2-textarea" placeholder="Escribe tu comentario aquí..."></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            preConfirm: () => {
                const idPartido = document.getElementById('partido').value;
                const comentario = document.getElementById('comentario').value;
    
                if (!idPartido || !comentario.trim()) {
                    Swal.showValidationMessage('Por favor, selecciona un partido y escribe un comentario.');
                }
                return { idPartido, comentario };
            }
        });
    
        if (formValues) {
            enviarReporte(formValues.idPartido, formValues.comentario);
        }
    };
    
    const enviarReporte = async (idPartido, comentario) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/enviar-reporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ID_partido: idPartido,  // Asegurar que se envía el ID del partido
                    // equipo_reportado: equipo,
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
                    {partidos.map((partido, idx) => (
                            <VerPartido
                                key={partido.ID ?? `${partido.lugar || 'lugar'}-${partido.fecha || 'fecha'}-${idx}`}
                                partido={partido}
                            />
                    ))}
                    </ul>
                </div>
                <div className=''>
                    <button onClick={toCrearPartido}>Crear Partido</button>
                    <button onClick={toCrearPartidoAbierto}>Crear Partido Abierto</button>
                    <button onClick={toUnirsePartidoAbierto}>Unirse a un Partido Abierto</button>
                </div>
            </div>
        </div>
    );
}
