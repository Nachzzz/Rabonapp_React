import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../assets/styles/register.css'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    edad: "",
    email: "",
    paswor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación Básica
    if (!formData.nombre || !formData.apellido || !formData.apodo || !formData.edad || !formData.email || !formData.paswor) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        navigate('/login')
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  return (
    <div className="register-container" action="/register" method="POST">
      <form onSubmit={handleSubmit} className="form">
        <h1>Regístrate</h1>
        <div className="input-container">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
        </div>
        <div className="input-container">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
        </div>
        <div className="input-container">
          <label>Apodo</label>
          <input
            type="text"
            name="apodo"
            value={formData.apodo}
            onChange={handleChange}
            placeholder="Apodo"
          />
        </div>
        <div className="input-container">
          <label>Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Edad"
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="paswor"
            value={formData.paswor}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import '../assets/styles/register.css';
// import { Navigate } from "react-router";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     surname: "",
//     nickname: "",
//     age: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validación Básica
//     if (!formData.name || !formData.surname || !formData.nickname || !formData.age || !formData.email || !formData.password) {
//       alert("Por favor, completa todos los campos.");
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:5000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('Jugador registrado exitosamente');
//       } else {
//         console.error('Error en el registro');
//       }
//     } catch (error) {
//       console.error('Error en la solicitud: ', error);
//     }
//   };

//   return (
//     <div className="register-container" action="/register" method="POST">
//       <form onSubmit={handleSubmit} className="form">
//         <h1>Regístrate</h1>
//         <div className="input-container">
//           <label>Nombre</label>
//           <input
//             type="text"
//             name="nombre"
//             value={formData.nombre}
//             onChange={handleChange}
//             placeholder="Nombre completo"
//           />
//         </div>
//         <div className="input-container">
//           <label>Apellido</label>
//           <input
//             type="text"
//             name="apellido"
//             value={formData.apellido}
//             onChange={handleChange}
//             placeholder="Apellido completo"
//           />
//         </div>
//         <div className="input-container">
//           <label>Apodo</label>
//           <input
//             type="text"
//             name="apodo"
//             value={formData.apodo}
//             onChange={handleChange}
//             placeholder="Apodo"
//           />
//         </div>
//         <div className="input-container">
//           <label>Edad</label>
//           <input
//             type="text"
//             name="edad"
//             value={formData.edad}
//             onChange={handleChange}
//             placeholder="Edad"
//           />
//         </div>
//         <div className="input-container">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="example@gmail.com"
//           />
//         </div>
//         <div className="input-container">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//           />
//         </div>
//         <button type="submit">Registrarme</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
