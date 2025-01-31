import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const RegisterTeam = () => {
    const { token } = useAuth("state");

    const [formData, setFormData] = useState({
        nombre: "",
        img: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.img) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos.",
            });
            return;
        }

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "No autenticado",
                text: "No estás autenticado. Por favor, inicia sesión.",
            });
            return;
        }

        const confirm = await Swal.fire({
            title: "¿Confirmar registro?",
            text: `¿Deseas registrar el equipo "${formData.nombre}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, registrar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;

        try {
            const response = await fetch("http://127.0.0.1:5000/crearEquipo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: "success",
                    title: "Equipo registrado",
                    text: `¡Bienvenidos ${data.nombre} a Rabonapp!`,
                });
                setFormData({ nombre: "", img: "" }); // Resetear formulario
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorData.msg || "Error al registrar el equipo.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: `No se pudo conectar con el servidor: ${error.message}`,
            });
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="equipo-form">
                <h1>Registrar Equipo</h1>
                <div className="">
                    <label>Nombre del Equipo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del equipo"
                    />
                </div>
                <div className="">
                    <label>Enlace del Escudo</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        placeholder="URL del escudo"
                    />
                </div>
                <div>
                    <button type="submit">Registrar Equipo</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterTeam;
