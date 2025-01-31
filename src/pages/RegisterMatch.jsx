import React, { useState, useEffect } from "react";
import '../assets/styles/stylePages.css'
import Swal from "sweetalert2";


const RegisterMatch = () => {
    const [formData, setFormData] = useState({
        lugar: "",
        fecha: "",
        equipo_local_nombre: "",
        equipo_visitante_nombre: "",
    });
    const [equipos, setEquipos] = useState([]); // Lista de equipos desde la API
    const [equiposVisitante, setEquiposVisitantes] = useState([]);
    const [message, setMessage] = useState("");

    // Cargar los equipos desde el backend cuando se monta el componente
    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/equipos", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setEquipos(data); // Suponiendo que la API retorna una lista de nombres
                } else {
                    setMessage("Error al cargar los equipos.");
                }
            } catch (error) {
                setMessage("Error al conectar con el servidor.");
            }
        };

        const fetchEquiposVisitantes = async () => {
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
                setEquiposVisitantes(formatoEquipos)
            } catch (error) {
                console.error('Problema al hacer fetch')
            }
        }
        fetchEquipos();
        fetchEquiposVisitantes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/crearEnfrentamiento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                                    icon: "success",
                                    title: "Enfrentamiento registrado",
                                    text: "El partido se registró correctamente.",
                                })
            } else {
                const errorData = await response.json();Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: errorData.msg || "Error al registrar el enfrentamiento.",
                                });
            }
        } catch (error) {
            Swal.fire({
                            icon: "error",
                            title: "Error de conexión",
                            text: "No se pudo conectar con el servidor.",
                        });
        }
    };

    return (
        <div className="todoRegEnfren">
            <form onSubmit={handleSubmit} className="reg-enfren-container">
                <h1>Registrar Enfrentamiento</h1>
                <div>
                    <label>Lugar</label>
                    <input
                        type="text"
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha</label>
                    <input
                        type="datetime-local"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Equipo Local</label>
                    <select name="equipo_local_nombre" value={formData.equipo_local_nombre} onChange={handleChange}>
                        <option value="">Selecciona un equipo</option>
                        {equipos.map((equipo, index) => (
                            <option key={index} value={equipo.nombre}>
                                {equipo[0]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Equipo Visitante</label>
                    <select name="equipo_visitante_nombre" value={formData.equipo_visitante_nombre} onChange={handleChange}>
                        <option value="">Selecciona un equipo</option>
                        {equiposVisitante.map((equipo, index) => (
                            <option key={equipo.id} value={equipo.nombre}>
                                {equipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Registrar Enfrentamiento</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterMatch;