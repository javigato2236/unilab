// import "../styles/tabla.css";

// import { useState } from "react";

// function PanelReactivo({ reactivo, cerrar }) {
//   const [cantidad, setCantidad] = useState(0);

//   return (
//     <div className="panel-reactivo">
//       <h2>{reactivo.nombre}</h2>

//       <p>Cantidad actual: {reactivo.cantidad} ml</p>
//       <p>Recipientes: {reactivo.recipientes}</p>

//       <h3>Ajustar cantidad</h3>

//       <div className="control-cantidad">
//         <button onClick={() => setCantidad(cantidad - 10)}>-</button>

//         <span>{cantidad} ml</span>

//         <button onClick={() => setCantidad(cantidad + 10)}>+</button>
//       </div>

//       <div className="acciones">
//         <button className="agregar">Agregar</button>
//         <button className="quitar">Quitar</button>
//       </div>

//       <button className="cerrar" onClick={cerrar}>
//         Cerrar
//       </button>
//     </div>
//   );
// }

// export default PanelReactivo;
/////////////////////////////////////////////////////

import "../styles/tabla.css";
import { useState } from "react";

function PanelReactivo({ reactivo, cerrar }) {
  const [cantidad, setCantidad] = useState(0);

  return (
    <div className="panel-reactivo">
      <h2>{reactivo.nombre}</h2>

      <p>Cantidad actual: {reactivo.general?.cantidad_real || 0} ml</p>
      <p>Cantidad total: {reactivo.general?.cantidad_total || 0} ml</p>

      <h3>Ajustar cantidad</h3>

      <div className="control-cantidad">
        <button onClick={() => setCantidad(Math.max(0, cantidad - 10))}>
          -
        </button>

        <span>{cantidad} ml</span>

        <button onClick={() => setCantidad(cantidad + 10)}>+</button>
      </div>

      <div className="acciones">
        <button className="agregar">Agregar</button>
        <button className="quitar">Quitar</button>
      </div>

      <button className="cerrar" onClick={cerrar}>
        Cerrar
      </button>
    </div>
  );
}

export default PanelReactivo;
