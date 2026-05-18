import "../styles/tabla.css";
import { useState } from "react";
import Modal from "../hoosk/modalReutilizable";

function PanelReactivo({ reactivo, cerrar, recargar }) {
  const [isObservacionesConsumoModalOpen, setIsObservacionesConsumoModalOpen] =
    useState(false);
  const [isObservacionesModalOpen, setIsObservacionesModalOpen] =
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

      // console.log(data);

      cerrar();
    } catch (error) {
      console.error(error);
      alert("Error en servidor");
    }
  };
  console.log(reactivo);

  return (
    <div className="panel-reactivo">
      <div className="contenedor-pictogramas-panel">
        {reactivo.pictogramas?.map((p) => (
          <img
            key={p.pictograma.id}
            src={`http://localhost:8000${p.pictograma.url}`}
            width="30"
          />
        ))}
      </div>
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
        <textarea
          value={observacion}
          onChange={(e) => setObservacion(e.target.value)}
        ></textarea>
      </div>
      <button onClick={descontarCantidad}>Descontar</button>

      <button
        onClick={() => {
          setIsObservacionesConsumoModalOpen(true);
        }}
      >
        Historial de consumo
      </button>
      <div className="contenedor-datos-reactivo">
        <span>
          <span className="titulo-contenedor-info-reactivos">Sinonimo:</span>{" "}
          {reactivo.basica?.sinonimo}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">Marca:</span>{" "}
          {reactivo.basica?.marca}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">Referencia:</span>{" "}
          {reactivo.basica?.referencia}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">Cas:</span>{" "}
          {reactivo.basica?.cas}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            FDS completa:
          </span>{" "}
          {reactivo.basica?.fdsCompleta}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Fecha actualizacion/creacion de fds:
          </span>{" "}
          {reactivo.basica?.fechaActualizacion}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Estado fisico:
          </span>{" "}
          {reactivo.basica?.estadoFisico}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Sustancia cancerigena:
          </span>{" "}
          {reactivo.general?.sustanciaCancerigena}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Codigo frase H:
          </span>{" "}
          {reactivo.general?.codigoFraseH}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Toxicidad aguda CAT 1 CAT 2:
          </span>{" "}
          {reactivo.general?.toxicidadAgudaCat1Cat2}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Sitio de almacenamiento:
          </span>{" "}
          {reactivo.general?.sitioAlmacenamiento}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Es controlado:
          </span>{" "}
          {reactivo.especifica?.esControlado}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Componente 1:
          </span>{" "}
          {reactivo.especifica?.componente1}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Clasificacion almacenamiento:
          </span>{" "}
          {reactivo.especifica?.clasificacionAlmacenamiento}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Fecha de ingreso:
          </span>{" "}
          {reactivo.especifica?.fechaIngreso}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Fecha de vencimiento proyectado:
          </span>{" "}
          {reactivo.especifica?.fechaVencimiento}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Palabra de advertencia:
          </span>{" "}
          {reactivo.especifica?.palabraAdvertencia}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">
            Razon social:
          </span>{" "}
          {reactivo.especifica?.razonSocial}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">Direccion:</span>{" "}
          {reactivo.especifica?.direccion}
        </span>
        <span>
          <span className="titulo-contenedor-info-reactivos">Contacto:</span>{" "}
          {reactivo.especifica?.contacto}
        </span>
      </div>

      <button
        onClick={() => {
          setIsObservacionesModalOpen(true);
        }}
      >
        Observaciones
      </button>

      <button className="cerrar" onClick={cerrar}>
        Cerrar
      </button>

      <Modal
        className="modalObservacionesConsumo"
        isOpen={isObservacionesConsumoModalOpen}
      >
        <div>
          <table className="tablaPanelReactivos">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cantidad</th>
                <th>Usuario</th>
                <th>Observacion</th>
              </tr>
            </thead>

            <tbody>
              {reactivo.ob_consumo?.map((o, index) => (
                <tr key={index}>
                  <td>{o.fechaObservacion}</td>
                  <td>{Number(o.cantidadConsumo).toFixed(3)}</td>
                  <td>{o.responsable}</td>
                  <td>{o.observacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="butoon">
            <button
              onClick={() => {
                setIsObservacionesConsumoModalOpen(false);
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isObservacionesModalOpen}>
        <div className="contenedor-modal-observaciones">
          {reactivo.especifica?.observaciones}
          <button
            onClick={() => {
              setIsObservacionesModalOpen(false);
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
