import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import "../assets/styles/stylePages.css";

export default function SolicitudEquipo({ equipo }) {
    const { token } = useAuth("state");
    const [solicitar, setSolicitar] = useState(false);

    const handleSolicitar = async () => {
        const { value: mensaje } = await Swal.fire({
            title: `Solicitar unirte a ${equipo.nombre}`,
            input: "textarea",
            inputLabel: "Mensaje",
            inputPlaceholder: "Escribe tu mensaje aquí...",
            inputAttributes: {
                "aria-label": "Escribe tu mensaje aquí"
            },
            showCancelButton: true,
            confirmButtonText: "Enviar solicitud",
            cancelButtonText: "Cancelar",
            preConfirm: (mensaje) => {
                if (!mensaje.trim()) {
                    Swal.showValidationMessage("Por favor, ingresa un mensaje para la solicitud.");
                }
                return mensaje;
            }
        });

        if (!mensaje) return;

        // Validar que el equipo exista y tenga id
        if (!equipo || (!equipo.id && equipo.id !== 0)) {
            Swal.fire({
                icon: 'error',
                title: 'Equipo no disponible',
                text: 'No se pudo identificar el equipo seleccionado. Intenta recargar la página.',
            });
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/solicitar-equipo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id_equipo: equipo.id, mensaje: mensaje }),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.Mensaje || `Error de red: ${response.status}`);
            }

            await response.json();

            Swal.fire({
                icon: "success",
                title: "Solicitud enviada",
                text: "La página se recargará en breve.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Error al enviar la solicitud: ${error.message}`,
            });
        }
    };

    return (
        <div className="equipos-solicitud">
            <img
                src={`https://ui-avatars.com/api/?name=${equipo.nombre}&background=random`}
                alt="Foto de perfil"
                className="profile-picture"
            />
            <div>
                <h3>{equipo.nombre}</h3>
                <button onClick={handleSolicitar}>Solicitar unirme a {equipo.nombre}</button>
            </div>
        </div>
    );
}