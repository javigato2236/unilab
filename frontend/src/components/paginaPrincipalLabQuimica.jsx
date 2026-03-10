import '../styles/paginaPrincipal.css';
import LabQuimica from './componenteQuimica';
import inventarioReactivos from '../assets/inventarioReactivos.png';
import registroEstudiantes from '../assets/registroEstudiantes.png';


function PaginaPrincipalLabQuimica() {
    return (
        
        <div className='contenedorPrincipal'>
            <h1 className='tituloPrincipal'>Laboratorio de quimica</h1>
            
            

            <div className='grid-container'>
                <LabQuimica
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