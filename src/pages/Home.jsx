import React, { useState } from "react";
import PartidosDisponibles from '../components/PartidosDisponibles';
import VerSolicitud from "../components/VerSolicitud";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import '../assets/styles/stylePages.css';


const Home = () => {

    const { token } = useAuth('state')
    const [verSolicitudes, setVerSolicitudes] = useState(false)
    const [solicitudes, setSolicitudes] = useState([])
    const [mensajeConsulta, setMensajeConsulta] = useState('')
    const navigate = useNavigate()

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

    return (
        <>
            <div className="todoHome">
                <div className="bienve">
                    <h1 className="">Bienvenidos a<img src="/logo2.png" alt="" />
                    </h1>
                    <p className="">
                        <h3>Un sitio para organizar partidos de fútbol 5 con tus amigos o desconocidos de la zona.</h3>
                    </p>
                </div>

                
            </div>
        </>


    );
};

export default Home;
