// import "../styles/tabla.css";
// import { useState } from "react";

// function PanelReactivo({ reactivo, cerrar }) {
//   const [cantidad, setCantidad] = useState(0);

//   return (
//     <div className="panel-reactivo">
//       <h2>{reactivo.nombre}</h2>

//       <div className="control-cantidad">
//         <label htmlFor="">cantidad</label>
//         <input type="text" name="" id="" />
//         <select name="" id="">
//           <option value="">hableidy</option>
//           <option value="">javier</option>
//           <option value="">dora </option>
//           <option value="">luci</option>
//           <option value="">santiago</option>
//           <option value="">lorena</option>
//         </select>
//       </div>

//       <button className="cerrar" onClick={cerrar}>
//         Enviar
//       </button>

//       <button className="cerrar" onClick={cerrar}>
//         Cerrar
//       </button>
//     </div>
//   );
// }

// export default PanelReactivo;

// nuevo codigo
import "../styles/tabla.css";
import { useState } from "react";

function PanelReactivo({ reactivo, cerrar }) {
  const [cantidad, setCantidad] = useState("");
  const [usuario, setUsuario] = useState("");

  // 🔹 ENVIAR DESCUENTO
  const descontarCantidad = async () => {
    const valor = parseFloat(cantidad);

    // validar número
    if (isNaN(valor) || valor <= 0) {
      alert("Ingrese una cantidad válida");
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
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Error al descontar");
      }

      const data = await res.json();

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
        <label>Cantidad</label>

        <input
          type="number"
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

      <button className="quitar" onClick={descontarCantidad}>
        Descontar
      </button>

      <button className="cerrar" onClick={cerrar}>
        Cerrar
      </button>
    </div>
  );
}

export default PanelReactivo;
