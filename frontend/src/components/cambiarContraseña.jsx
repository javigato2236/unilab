import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/recuperarYreiniciarPassword.css";

function CambiarContraseña() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [nueva, setNueva] = useState("");
  const [tokenValido, setTokenValido] = useState(null); // null = cargando

  useEffect(() => {
    const validarToken = async () => {
      try {
        await api.post("/validate-reset-token", { token });

        // Delay de 1.5 segundos para mostrar "Validando enlace..."
        setTimeout(() => setTokenValido(true), 1500);
      } catch (error) {
        //Delay de 1.5 segundos para mostrar "Validando enlace..." antes del mensaje de expirado
        setTimeout(() => setTokenValido(false), 1500);
      }
    };

    if (token) {
      validarToken();
    } else {
      setTimeout(() => setTokenValido(false), 1500);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reset-password", { token, nueva_clave: nueva });
      alert("Contraseña actualizada");
      navigate("/");
    } catch (error) {
      alert("Error al actualizar contraseña");
    }
  };

  // Mientras valida
  if (tokenValido === null) {
    return <h3>Validando enlace...</h3>;
  }

  //Token vencido
  if (tokenValido === false) {
    return <h3>El enlace ha expirado o es inválido</h3>;
  }

  //Token válido
  return (
    <div className="contenedor-cambiar-password">
      <form onSubmit={handleSubmit}>
        <h2>Restablecer contraseña</h2>
        <input
          type="password"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="Nueva contraseña"
        />
        <button type="submit" className="boton-enviar-cambiar-password">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default CambiarContraseña;
