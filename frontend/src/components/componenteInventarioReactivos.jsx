import { useState } from "react";
import TablaReactivos from "./tablaInventario";
import PanelReactivo from "./PanelReactivo";

function Inventario() {

  const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);

  const reactivos = [
    { id: 1, nombre: "Ácido Clorhídrico", cantidad: 500, recipientes: 2 },
    { id: 2, nombre: "Etanol", cantidad: 200, recipientes: 1 },
    { id: 3, nombre: "Metanol", cantidad: 150, recipientes: 3 },
  ];

  return (
    <div className="inventario-container">

      <TablaReactivos
        reactivos={reactivos}
        seleccionarReactivo={setReactivoSeleccionado}
      />

      {reactivoSeleccionado && (
        <PanelReactivo
          reactivo={reactivoSeleccionado}
          cerrar={() => setReactivoSeleccionado(null)}
        />
      )}

    </div>
  );
}

export default Inventario;