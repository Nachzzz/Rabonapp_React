import { useEffect, useState } from "react";
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
            const response = await fetch("http://localhost:5000/partidosSinVisitante", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setPartidos(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchEquipos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/equipos", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener equipos.");
            }

            const data = await response.json();
            const equiposProcesados = data.map((equipo) => equipo[0]);
            setEquipos(equiposProcesados); // Suponiendo que `data` es una lista de equipos
        } catch (error) {
            console.error("Error al obtener los equipos:", error);
        }
    };

    const unirseAPartido = async (partidoId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/registrarVisitante/${partidoId}`, {
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
                    {equipos.map((nombre, index) => (
                        <option key={index} value={nombre}>
                            {nombre}
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


// import { useEffect, useState } from "react";

// const JoinMatch = () => {
//     const [partidos, setPartidos] = useState([]);
//     const [error, setError] = useState(null);
//     const [mensaje, setMensaje] = useState("");
//     const [equipoVisitante, setEquipoVisitante] = useState("")

//     useEffect(() => {
//         fetchPartidos();
//     }, []);

//     const fetchPartidos = async () => {
//         try {
//             const token = localStorage.getItem("token"); // Asegúrate de que el token es válido
//             const response = await fetch("http://localhost:5000/partidosSinVisitante", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Error ${response.status}: ${response.statusText}`);
//             }

//             const data = await response.json();
//             setPartidos(data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const unirseAPartido = async (partidoId) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`http://localhost:5000/registrarVisitante/${partidoId}`, {
//                 method: "POST",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ equipo_visitante_nombre: equipoVisitante }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.msg);
//             }

//             setMensaje("¡Te has unido al partido!");
//             setEquipoVisitante("");
//             fetchPartidos(); // Actualiza la lista de partidos
//         } catch (error) {
//             setMensaje(error.message);
//         }
//     };


//     return (
//         <div>
//             <h2>Partidos Sin Visitante</h2>
//             {error && <p style={{ color: "red" }}>Error: {error}</p>}
//             {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

//             <input
//                 type="text"
//                 placeholder="Nombre de tu equipo"
//                 value={equipoVisitante}
//                 onChange={(e) => setEquipoVisitante(e.target.value)}
//             />

//             {partidos.length === 0 ? (
//                 <p>No hay partidos disponibles.</p>
//             ) : (
//                 <ul>
//                     {partidos.map((partido) => (
//                         <li key={partido.ID}>
//                             {partido.lugar} - {new Date(partido.fecha).toLocaleString()}{" "}
//                             <button onClick={() => unirseAPartido(partido.ID)}>Unirse</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default JoinMatch;