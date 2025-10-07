import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import VerEquipo from '../components/VerEquipo'
import { useNavigate } from 'react-router'
import '../assets/styles/stylePages.css'
import VerSolicitud from "../components/VerSolicitud";

export default function Equipos() {

    const { token } = useAuth("state")
    const [equipos, setEquipos] = useState([])
    const navigate = useNavigate()
    const [jugador, setJugador] = useState({})
    const [loading, setLoading] = useState(false);
    const [verSolicitudes, setVerSolicitudes] = useState(false)
    const [solicitudes, setSolicitudes] = useState([])
    const [mensajeConsulta, setMensajeConsulta] = useState('')

    const toCrearEquipo = () => {
        navigate('/crear-equipo')
    }
    
    const toSolicitarEquipo = () => {
        navigate('/solicitar-equipo')
    }

    const handleCargarSolicitudes = (e) => {
        e.preventDefault()
        setVerSolicitudes(true)
        const url = 'http://127.0.0.1:5000/solicitudes';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        })
            .then(response => response.json())
            .then(data => {
                if (data.Datos) {
                    if (data.Datos.length === 0) {
                        setSolicitudes([])
                        setMensajeConsulta("No hay nuevas solicitudes")
                    }
                    setSolicitudes(data.Datos)

                } else {
                    setSolicitudes([])
                    setMensajeConsulta(data.Mensaje)
                }


            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleEquiposJug = async () => {
        setLoading(true); // Inicia el estado de carga
        const idConsulta = jugador.ID;
        const urlEquiposJugador = `http://127.0.0.1:5000/equipos/jugador/${idConsulta}`
        

        if (!idConsulta) {
            console.log("No hay ID de jugador");
            setLoading(false); // Detiene el estado de carga si no hay ID
            return;
        }

        try {
            const response = await fetch(urlEquiposJugador, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${response.statusText} - ${errorData.msg || errorData.error}`);
            }

            const data = await response.json();
            setEquipos(data);
        } catch (error) {
            console.error("Error fetching EquiposJugador", error.message);
        } finally {
            setLoading(false); // Detiene el estado de carga después de obtener los datos
        }
    }

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const urlEqui = 'http://127.0.0.1:5000/equipos';
                const response = await fetch(urlEqui, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const dataEquipos = await response.json()
                // Manejar respuestas no-ok (ej: 404 cuando no hay equipos)
                if (!response.ok) {
                    console.warn('Fetch /equipos returned non-OK', response.status, dataEquipos)
                    // si el backend envía un mensaje explicativo, lo mostramos
                    const msg = dataEquipos && (dataEquipos.msg || dataEquipos.Mensaje) ? (dataEquipos.msg || dataEquipos.Mensaje) : 'No se pudieron obtener los equipos'
                    setEquipos([])
                    setMensajeConsulta(msg)
                    return
                }

                // console.log("Datos de equipos recibidos:", dataEquipos);
                if (!Array.isArray(dataEquipos)) {
                    // estructura inesperada
                    console.warn('Unexpected /equipos response shape', dataEquipos)
                    setEquipos([])
                    setMensajeConsulta('Respuesta inesperada del servidor')
                    return
                }

                const formatoEquipos = dataEquipos.map((equipo, idx) => {
                    // Casos comunes del backend:
                    // - [[id, nombre, escudo], ...]
                    // - [[nombre], [nombre2], ...]
                    // - [{id:..., nombre:...}, ...]
                    if (Array.isArray(equipo)) {
                        if (equipo.length >= 3) {
                            return { id: equipo[0], nombre: equipo[1], imagen: equipo[2] }
                        }
                        if (equipo.length === 2) {
                            return { id: equipo[0], nombre: equipo[1], imagen: null }
                        }
                        // length === 1 (solo nombre)
                        return { id: null, nombre: equipo[0], imagen: null }
                    }

                    if (equipo && typeof equipo === 'object') {
                        // manejar objetos con diferentes keys
                        const id = equipo.ID ?? equipo.id ?? equipo.id_equipo ?? equipo.id_equipo_insertado ?? null
                        const nombre = equipo.nombre ?? equipo.Nombre ?? Object.values(equipo)[0] ?? null
                        const imagen = equipo.escudo ?? equipo.imagen ?? equipo.escudo_url ?? null
                        return { id, nombre, imagen }
                    }

                    // fallback: convertir a string
                    return { id: null, nombre: String(equipo), imagen: null }
                })

                setEquipos(formatoEquipos)
            } catch (error) {
                console.error('Problema al hacer fetch', error)
            }
        }
        fetchEquipos()
    }, [token])


    return (
        <>
            <div className='todoEquip'>
                <div className='equipMios'>
                    <div>
                    <h1>Equipos</h1>
                        <p>Aquí se muestran tus equipos creados</p>
                    </div>
                    <section className='sectEquip'>
                        <div className='divEquip'>
                            <div className='orden'>
                            {equipos.length > 0 ? (
                                equipos.map((equipo, idx) => (
                                    <VerEquipo
                                        key={equipo.id ?? `${equipo.nombre}-${idx}`}
                                        equipo={equipo}
                                    />
                                ))
                            ) : (
                                <p>No hay equipos registrados</p>
                            )}
                            </div>
                        </div>
                    </section>
                </div>
                {/* <div className='crearEquip'>
                    <h4>Puedes crear tu propio equipo</h4>
                    <button onClick={toCrearEquipo}>Crear equipo</button>
                </div> */}
                <div className=''>
                <div className='equip'>
                    {/* <div>
                        <button onClick={handleEquiposJug}>Ver mis equipos</button>
                        {loading ? (
                            <>
                                <p>cargando...</p>
                            </>
                        ) : (
                            <>
                                {equipos.length === 0 ? (
                                    <>
                                        <p>No hay equipos cargados</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Perteneces a estos equipos</p>
                                        {equipos.map((equipo) => (
                                            <VerEquipo
                                                key={equipo.id}
                                                equipo={equipo}
                                            />
                                        ))}
                                    </>

                                )}
                            </>
                        )}

                    </div> */}
                    <h3 className=''>Crea tu propio equipo o solicita unirte a uno</h3>
                    <button onClick={toCrearEquipo}>Crear equipo</button>
                    <button onClick={toSolicitarEquipo}>Solicitar unirme a un equipo</button>
                </div>
                <div className="equip">
                    <div className="container-text">
                        <p>Aqui podrás ver las solicitudes de otros jugadores a tu equipo</p>
                        <button onClick={handleCargarSolicitudes}>Desplegar Solicitudes</button>
                        {verSolicitudes ? (
                            <>
                                {solicitudes.length > 0 ? (
                                    <>
                                        {solicitudes.map((solicitud) => (
                                            <VerSolicitud
                                                key={solicitud.id}
                                                solicitud={solicitud}
                                            />
                                        ))}
                                    </>

                                ) : (
                                    <p>{mensajeConsulta}</p>
                                )}

                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
                </div>
                
            </div>

        </>
    )
}

// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import VerEquipo from '../components/VerEquipo'
// import { useNavigate } from 'react-router'

// export default function Equipos() {

//     const { token } = useAuth("state")
//     const [equipos, setEquipos] = useState([])
//     const navigate = useNavigate()

//     const toCrearEquipo = () => {
//         navigate('/crear-equipo')
//     }

//     useEffect(() => {
//         const fetchEquipos = async () => {
//             try {
//                 const urlEqui = 'http://127.0.0.1:5000/todoslosequipos';
//                 const response = await fetch(urlEqui, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 })
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok')
//                 }
//                 const dataEquipos = await response.json()
//                 const formatoEquipos = dataEquipos.map(equipo => ({
//                     id: equipo[0],
//                     nombre: equipo[1],
//                     imagen: equipo[2]
//                 }))
//                 setEquipos(formatoEquipos)
//             } catch (error) {
//                 console.error('Problema al hacer fetch', error)
//             }
//         }
//         fetchEquipos()
//     }, [token])


//     return (
//         <>
//         <div className='todo'>
//             <div className='sectEquip'>
//             <h1>Equipos</h1>
//             <div>
//                 <h3>Equipos registrados</h3>
//                 <p>Aqui se muestran todos los equipos registrados al momento en Rabonapp</p>
//             </div>
//             <section>
//                 <div>
//                     {equipos.length > 0 ? (
//                         equipos.map(equipo => (
//                             <VerEquipo
//                                 key={equipo.id}
//                                 equipo={equipo}
//                             />
//                         ))
//                     ) : (
//                         <p>No hay equipos registrados</p>
//                     )}
//                 </div>
//             </section>
//             <div>
//                 <h4>Puedes crear tu propio equipo</h4>
//                 <button onClick={toCrearEquipo}>Crear equipo</button>

//             </div>

//             </div>

        
//         </div>
//         </>
//     )
// }
