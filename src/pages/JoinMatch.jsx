import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import '../assets/styles/stylePages.css'

const JoinMatch = () => {
    const [partidos, setPartidos] = useState([]);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [equipoVisitante, setEquipoVisitante] = useState("");
    const [equipos, setEquipos] = useState([]); //Lista con los equipos

    useEffect(() => {
        fetchPartidos();
        fetchEquipos(); // Carcargar los equipos
    }, []);

    const fetchPartidos = async () => {
        try {
            const token = localStorage.getItem("token"); // Asegúrate de que el token es válido
            const response = await fetch(`${import.meta.env.VITE_API_URL}/partidosSinVisitante`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                // try to read body for more info (json or text)
                const raw = await response.text().catch(() => null);
                let bodyMsg = raw;
                try {
                    const parsed = JSON.parse(raw);
                    bodyMsg = parsed.msg || parsed.error || JSON.stringify(parsed);
                } catch (e) {
                    // not json, keep raw
                }
                console.error('GET /partidosSinVisitante failed', response.status, bodyMsg);
                const uiMsg = `Error ${response.status}: ${bodyMsg || response.statusText}`;
                setError(uiMsg);
                Swal.fire('Error', `No se pudieron cargar los partidos: ${bodyMsg || response.statusText}`, 'error');
                return;
            }

            let data = null;
            try {
                data = await response.json();
            } catch (e) {
                console.error('Failed to parse /partidosSinVisitante JSON', e);
                setError('Respuesta inválida del servidor');
                Swal.fire('Error', 'Respuesta inválida del servidor al cargar partidos', 'error');
                return;
            }

            setPartidos(data || []);
        } catch (error) {
            console.error('fetchPartidos error', error);
            setError(error.message || 'Error al obtener partidos');
            Swal.fire('Error', error.message || 'Error al obtener partidos', 'error');
        }
    };

    const fetchEquipos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/equipos`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const raw = await response.text().catch(() => null);
                let bodyMsg = raw;
                try { bodyMsg = JSON.parse(raw).msg || JSON.parse(raw).error || bodyMsg } catch (e) {}
                console.error('GET /equipos failed', response.status, bodyMsg);
                Swal.fire('Error', `No se pudieron cargar los equipos: ${bodyMsg || response.statusText}`, 'error');
                return;
            }

            let data = null;
            try { data = await response.json() } catch(e) { data = [] }
            const equiposProcesados = (Array.isArray(data) ? data : []).map((equipo) => {
                if (Array.isArray(equipo)) {
                    return { id: equipo[0] ?? null, nombre: equipo[1] ?? String(equipo[0] ?? '') };
                }
                if (equipo && typeof equipo === 'object') {
                    return { id: equipo.ID ?? equipo.id ?? equipo.id_equipo ?? null, nombre: equipo.nombre ?? equipo.Nombre ?? Object.values(equipo)[0] ?? '' };
                }
                return { id: null, nombre: String(equipo) };
            });
            setEquipos(equiposProcesados);
        } catch (error) {
            console.error("Error al obtener los equipos:", error);
            Swal.fire('Error', error.message || 'Error al obtener equipos', 'error');
        }
    };

    const unirseAPartido = async (partidoId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/registrarVisitante/${partidoId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ equipo_visitante_nombre: equipoVisitante }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg);
            }

            setMensaje("¡Te has unido al partido!");
            setEquipoVisitante("");
            fetchPartidos(); // Actualiza la lista de partidos
        } catch (error) {
            setMensaje(error.message);
        }
    };


    return (
        <div className="perfil-container">
            <h2>Partidos Sin Visitante</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

            <div>
                <label>Selecciona tu equipo:</label>
                <select
                    value={equipoVisitante}
                    onChange={(e) => setEquipoVisitante(e.target.value)}
                >
                    <option value="">Selecciona un equipo</option>
                    {equipos.map((item, index) => (
                        <option key={item.id ?? index} value={item.nombre}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
            </div>



            {partidos.length === 0 ? (
                <p>No hay partidos disponibles.</p>
            ) : (
                <ul>
                    {partidos.map((partido) => (
                        <li key={partido.ID}>
                            {partido.lugar} - {new Date(partido.fecha).toLocaleString()}{" "}
                            <button onClick={() => unirseAPartido(partido.ID)}>Unirse</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JoinMatch;