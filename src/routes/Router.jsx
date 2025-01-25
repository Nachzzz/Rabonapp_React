import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../routes/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Layout from "./Layout";
import PartidosDisponibles from "../pages/PartidosDisponibles";

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
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "partidos",
                element: (
                    <ProtectedRoute>
                        <PartidosDisponibles />
                    </ProtectedRoute>
                ),
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };