import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/login.css'; // Importar archivo CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar error previo
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
  
        // Guardar el token en localStorage
        localStorage.setItem("auth_token", token);
        console.log("Token: ", token);
  
        console.log("Inicio de sesión exitoso.");
        navigate("/partidos"); // Redirigir a la página principal
      } else {
        const errorData = await response.json();
        const message = errorData.msg || "Error al iniciar sesión";
        setError(message);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };
  

  return (
    <div className="login-background">
      <div className="container">
        <div className="form-container">
          <div className="logo2">
            <img src="/logo2.png" alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">¡Bienvenido!</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              ¿No estás registrado aún?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React from "react";
// import { Link } from "react-router-dom";
// import '../assets/styles/login.css'; // importar archivo CSS

// const Login = () => {
//   return (
//     <div className="login-background">
//       <div className="container">
//         <div className="form-container">
//         <div className="logo2"><img src="/logo2.png" alt="" /></div>
//           <h1 className="text-3xl font-bold text-center mb-6">¡Bienvenido!</h1>
//           <form>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ingrese su email"
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium mb-1">
//                 Contraseña
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ingrese su contraseña"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//           </form>
//           <div className="text-center mt-4">
//             <p className="text-sm">
//               ¿No estás registrado aún?{" "}
//               <Link to="/register" className="text-blue-500 hover:underline">
//                 Regístrate aquí
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
