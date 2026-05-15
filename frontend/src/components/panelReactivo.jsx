import "../styles/tabla.css";
import { useState } from "react";
import Modal from "../hoosk/modalReutilizable";

function PanelReactivo({ reactivo, cerrar, recargar }) {
  const [isObservacionesConsumoModalOpen, setIsObservacionesConsumoModalOpen] =
    useState(false);
  const [cantidad, setCantidad] = useState("");
  const [usuario, setUsuario] = useState("");
  const [observacion, setObservacion] = useState("");

  // 🔹 ENVIAR DESCUENTO
  const descontarCantidad = async () => {
    const fechaActual = new Date().toISOString().split("T")[0]; //////////////////////////////7
    const valor = parseFloat(cantidad);

    // validar número
    if (isNaN(valor) || valor <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    if (!usuario) {
      alert("Seleccione un usuario");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/sustancias/${reactivo.id}/descontar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            cantidad: valor,
            usuario: usuario,
            fechaObservacion: fechaActual,
            observacion: observacion,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json();

        alert(error.detail);

        return;
      }

      const data = await res.json();

      await recargar();

      alert("Cantidad actualizada");

      console.log(data);

      cerrar();
    } catch (error) {
      console.error(error);
      alert("Error en servidor");
    }
  };

  return (
    <div className="panel-reactivo">
      <h2>{reactivo.nombre}</h2>

      <p>
        Cantidad actual:
        {Number(reactivo.general?.cantidad_real).toFixed(3)} ml
      </p>

      <div className="control-cantidad">
        <label>Consumo</label>

        <input
          step="0.001"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
          <option value="">Seleccione</option>

          <option value="hableidy">hableidy</option>
          <option value="javier">javier</option>
          <option value="dora">dora</option>
          <option value="luci">luci</option>
          <option value="santiago">santiago</option>
          <option value="lorena">lorena</option>
        </select>
      </div>
      <div>
        <label className="campo-observaciones">Observaciones</label>
        <textarea name="" id=""></textarea>
      </div>

      <button className="quitar" onClick={descontarCantidad}>
        Descontar
      </button>

      <button className="cerrar" onClick={cerrar}>
        Cerrar
      </button>
      <button
        onClick={() => {
          setIsObservacionesConsumoModalOpen(true);
        }}
      >
        Historial de consumo
      </button>

      <Modal isOpen={isObservacionesConsumoModalOpen}>
        <div>
          <h1>modal historial de consumo</h1>
          <button
            onClick={() => {
              setIsObservacionesConsumoModalOpen(false);
            }}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default PanelReactivo;
