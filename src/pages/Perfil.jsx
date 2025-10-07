import React, { useEffect, useState } from 'react'
import VerEquipo from '../components/VerEquipo'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import '../assets/styles/stylePages.css';


export default function Perfil() {

    const { token } = useAuth('state')

    const navigate = useNavigate();
    const [jugador, setJugador] = useState({})
    const [loading, setLoading] = useState(false);
    const [equipos, setEquipos] = useState([])

    useEffect(() => {
        const fetchJugador = async () => {
            const url = `${import.meta.env.VITE_API_URL}/perfil`; // Asegúrate de obtener el token JWT correctamente

            if (!token) {
                console.log("No hay token");
                navigate('/login')
                // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
                return;
            }

            try {
                const response = await fetch(url, {
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
                setJugador(data);
            } catch (error) {
                console.error('Error:', error.message);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje en la interfaz de usuario
            }
        };

        fetchJugador();
        //fetchEquipoAdmin();

    }, [token]);

    const toCrearEquipo = () => {
        navigate('/crear-equipo')
    }
    const toSolicitarEquipo = () => {
        navigate('/solicitar-equipo')
    }

    const handleEquiposJug = async () => {
        setLoading(true); // Inicia el estado de carga
        const idConsulta = jugador.ID;
        const urlEquiposJugador = `${import.meta.env.VITE_API_URL}/equipos/jugador/${idConsulta}`


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

    return (
        <>
            <div className='todo2'>
                <div className='perfil-container'>
                    <h2 className=''> Bienvenido {jugador.nombre}</h2>
                    <img
                        src={`https://ui-avatars.com/api/?name=${jugador.nombre}+${jugador.apellido}&background=random`}
                        alt="Foto de perfil"
                        className="profile-picture"
                    />

                    <form className='jugador-carta'>
                        <div>
                            <label>Nombre: <span>{jugador.nombre}</span></label>
                        </div>
                        <div>
                            <label>Apellido: <span>{jugador.apellido}</span></label>
                        </div>
                        <div>
                            <label>Edad: <span>{jugador.edad}</span></label>
                        </div>
                        <div>
                            <label>Apodo: <span>{jugador.apodo}</span></label>
                        </div>
                        <div>
                            <label>Email: <span>{jugador.email}</span></label>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}
