import React, { useState, useEffect } from "react";
import '../assets/styles/stylePages.css'
import Swal from "sweetalert2";


const RegisterMatch = () => {
    const [formData, setFormData] = useState({
        lugar: "",
        fecha: "",
        equipo_local_nombre: ""
    });
    const [equipos, setEquipos] = useState([]); // Lista de equipos desde la API
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
                    // Normalizar distintos formatos de respuesta a {id, nombre}
                    const equiposNorm = (Array.isArray(data) ? data : []).map((equipo) => {
                        if (Array.isArray(equipo)) {
                            return { id: equipo[0] ?? null, nombre: equipo[1] ?? String(equipo[0] ?? '') };
                        }
                        if (equipo && typeof equipo === 'object') {
                            return { id: equipo.ID ?? equipo.id ?? equipo.id_equipo ?? null, nombre: equipo.nombre ?? equipo.Nombre ?? Object.values(equipo)[0] ?? '' };
                        }
                        return { id: null, nombre: String(equipo) };
                    });
                    setEquipos(equiposNorm);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Error al cargar los equipos.", 
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al conectar con el servidor.",
                });
            }
        };

        fetchEquipos();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.lugar || !formData.fecha || !formData.equipo_local_nombre) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos.",
            });
            return;
        }

        const confirm = await Swal.fire({
            title: "¿Confirmar registro?",
            text: `¿Deseas registrar este enfrentamiento en ${formData.lugar}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, registrar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;


        try {
            const response = await fetch("http://127.0.0.1:5000/crearPartidoAbierto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Enfrentamiento registrado",
                    text: "El partido se registró correctamente.",
                })
                setFormData({ lugar: "", fecha: "", equipo_local_nombre: "" });
            } else {
                const errorData = await response.json();
                Swal.fire({
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
        <div className="todo">
            <div className="register-open-match-container">
            <form onSubmit={handleSubmit}>
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
                        {equipos.map((item, index) => (
                            <option key={item.id ?? index} value={item.nombre}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Registrar Enfrentamiento</button>
            </form>
            {message && <p>{message}</p>}
            </div>
            
        </div>
    );
};

export default RegisterMatch;