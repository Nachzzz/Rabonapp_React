import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token del localStorage o sessionStorage
        localStorage.removeItem("token"); // Si estás usando localStorage
        // sessionStorage.removeItem("jwt"); // Si estás usando sessionStorage

        // Opcional: Limpia otros datos relacionados con el usuario
        localStorage.removeItem("userData"); // Si tienes otros datos del usuario

        // Redirige al usuario a la página de inicio de sesión
        navigate("/login");
    };

    return (
        <button onClick={handleLogout}>
            Cerrar Sesión
        </button>
    );
};

export default Logout;