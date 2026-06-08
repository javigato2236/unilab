import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./components/paginaPrincipal";
import PaginaPrincipalLabQuimica from "./components/paginaPrincipalLabQuimica";
import InventarioReactivos from "./components/componenteInventarioReactivos";
import Register from "./components/registro";
import RecuperarPassword from "./components/recuperarContraseña";
import CambiarContraseña from "./components/cambiarContraseña";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route
          path="/paginaPrincipalLabQuimica"
          element={<PaginaPrincipalLabQuimica />}
        />
        <Route path="/registro" element={<Register />} />
        <Route path="/inventarioReactivos" element={<InventarioReactivos />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/cambiarPassword" element={<CambiarContraseña />} />
      </Routes>
    </>
  );
}

export default App;
