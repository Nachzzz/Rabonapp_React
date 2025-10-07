import { useState, useEffect } from "react";

const useFetchEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/equipos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los equipos");
        }

        const data = await response.json(); // Ahora data es una lista de nombres ["Equipo1", "Equipo2", ...]
        setEquipos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  return { equipos, loading, error };
};

export default useFetchEquipos;