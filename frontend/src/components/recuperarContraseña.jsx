import { useState } from "react";
import api from "../api";
import "../styles/recuperarYreiniciarPassword.css";

function RecuperarPassword() {
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/forgot-password", { correo });
    setCorreo("");
    alert("Correo enviado");
  };

  return (
    <div className="contenedor-recuperar-password">
      <form onSubmit={handleSubmit}>
        <h1>Ingrese el correo registrado</h1>
        <input
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
        />
        <button type="submit" className="boton-enviar-recuperar-password">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default RecuperarPassword;
