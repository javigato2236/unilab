import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./components/paginaPrincipal";
import PaginaPrincipalLabQuimica from "./components/paginaPrincipalLabQuimica";
import InventarioReactivos from "./components/componenteInventarioReactivos";
import Register from "./components/registro";

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
      </Routes>
    </>
  );
}

export default App;
