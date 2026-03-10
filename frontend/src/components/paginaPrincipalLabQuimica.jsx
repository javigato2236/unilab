import '../styles/paginaPrincipal.css'
import LabQuimica from './componenteQuimica';

function PaginaPrincipalLabQuimica() {
    return (
        
        <div className='contenedorPrincipal'>
            <h1 className='tituloPrincipal'>Laboratorio de quimica</h1>
            
            

            <div className='grid-container'>
                <LabQuimica/>
                <LabQuimica/>       
                
                 
            </div>

        </div>
    );
}

export default PaginaPrincipalLabQuimica;