import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import '../assets/styles/styleComponents.css'

export default function Layout() {
    return (
        <AuthProvider>
            <div className="layout">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}