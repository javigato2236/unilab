import '../styles/paginaPrincipal.css';
import LabQuimica from './componenteQuimica';
import inventarioReactivos from '../assets/inventarioReactivos.png';
import registroEstudiantes from '../assets/registroEstudiantes.png';
import { useNavigate } from "react-router-dom";
import logout from '../hoosk/logoutReutilizable';


function PaginaPrincipalLabQuimica() {
    const navigate = useNavigate();
    const handleLogout = () => {
    logout(navigate)
    }



    return (
        
        <div>

            <div>
                <button onClick={handleLogout}>
                    <h2>cerrar sesion</h2>
                </button>
            </div>





            <h1 className='tituloPrincipal'>Laboratorio de quimica</h1>
            
            

            <div className='grid-container'>
                <LabQuimica
                ruta = "/inventarioReactivos"
                imagenLogo = {inventarioReactivos}
                titulo = {
                <>
                Inventario de <br/> 
                reactivos quimicos
                </>
                }
                
                />
                <LabQuimica
                imagenLogo = {registroEstudiantes}
                titulo = {
                <>
                Registro de <br/>
                estudiantes
                </>}
                />       
                
                 
            </div>

        </div>
    );
}

export default PaginaPrincipalLabQuimica;