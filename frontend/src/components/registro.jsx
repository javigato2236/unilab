import { useState } from "react";
import api from "../api";

export default function Register() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { correo, clave });

      setCorreo("");
      setClave("");
      alert("Usuario creado correctamente");
    } catch (error) {
      if (error.response) {
        // Mensaje que viene desde FastAPI (detail)
        alert(error.response.data.detail);
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
      />
      <input
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        placeholder="Clave"
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
