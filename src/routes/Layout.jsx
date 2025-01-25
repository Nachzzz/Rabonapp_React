import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Layout() {
    return (
        <AuthProvider>
            <div>
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}