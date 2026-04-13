import "../styles/paginaPrincipal.css";
import ModulosInicioSessionLabs from "./modulosInicioSesionLabs";
function PaginaPrincipal() {
  return (
    <div className="contenedorPrincipal">
      <h1 className="tituloPrincipal">Unilab</h1>

      <div className="grid-container">
        <ModulosInicioSessionLabs />
      </div>
    </div>
  );
}

export default PaginaPrincipal;

// style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, auto)', // 4 columnas fijas
//                 gap: '20px',
//                 justifyContent: 'center', // centra los módulos si son menos de 4
//             }}
