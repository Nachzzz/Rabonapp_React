import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Layout from "./Layout";
import Perfil from "../pages/Perfil";
import CrearEquipo from "../pages/CrearEquipo"
import Equipos from "../pages/Equipos";
import SolicitarEquipo from "../pages/SolicitarEquipo"
import RegisterMatch from "../pages/RegisterMatch";
import Partidos from "../pages/Partidos";
import RegisterOpenMatch from "../pages/RegisterOpenMatch"
import JoinMatch from "../pages/JoinMatch";

//commit

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element:

                    <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "perfil",
                element: (
                    <ProtectedRoute>
                        <Perfil />
                    </ProtectedRoute>
                ),
            },
            {
                path: "partidos",
                element: (
                    <ProtectedRoute>
                        <Partidos />
                    </ProtectedRoute>
                ),
            },
            {
                path: "crear-equipo",
                element: (
                    <ProtectedRoute>
                        <CrearEquipo />
                    </ProtectedRoute>
                ),
            },
            {
                path: "equipos",
                element: (
                    <ProtectedRoute>
                        <Equipos />
                    </ProtectedRoute>
                ),
            },
            {
                path: "solicitar-equipo",
                element: (
                    <ProtectedRoute>
                        <SolicitarEquipo />
                    </ProtectedRoute>

                    
                ),
            },
            {
                path: "match",
                element: (
                    <ProtectedRoute>
                        <RegisterMatch />
                    </ProtectedRoute>
                ),
            },
            {
                path: "match",
                element: (
                    <ProtectedRoute>
                        <RegisterMatch />
                    </ProtectedRoute>
                ),
            },
            {
                path: "RegisterOpenMatch",
                element: (
                    <ProtectedRoute>
                        <RegisterOpenMatch />
                    </ProtectedRoute>
                )
            },
            {
                path: "JoinMatch",
                element: (
                    <ProtectedRoute>
                        <JoinMatch />
                    </ProtectedRoute>
                )
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };