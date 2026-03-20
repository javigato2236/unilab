import iconoAgregarRegistro from '../assets/iconoAgregarRegistro.png';
import '../styles/paginaPrincipal.css';
import Modal from '../hoosk/modalReutilizable';
import { useState } from 'react';

function TablaReactivos({ reactivos, seleccionarReactivo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 🔹 segundo modal
  const openSecondModal = () => setIsSecondModalOpen(true);
  const closeSecondModal = () => setIsSecondModalOpen(false);

   

  
    
    

  return (

    <div>

      <div className='contenedor-cierreSesion' onClick={openModal}>
        <img src={iconoAgregarRegistro} alt="" />
        <h3>Nuevo registro</h3>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h1>Informacion basica</h1>
            <button onClick={openSecondModal}>Agregar</button>
       

          </div>

          
          <div>
            <h1>Informacion general</h1>
            <button onClick={openSecondModal}>Agregar</button>
            
          </div>

          
          <div>
            <h1>Informacion especifica</h1>
            <button onClick={openSecondModal}>Agregar</button>
            
          </div>

      </Modal>

      <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
        <h1>modal 1</h1>
        <button>Enviar</button>
      </Modal>

     

      





      



        {/* <div className='modal-buttons'>
            <button type='submit'>Enviar</button>
            <button type='button' onClick={closeModal}>Cancelar</button>
          </div> */}


      <table className="tabla-reactivos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Recipientes</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {reactivos.map((r) => (
            <tr key={r.id}>
              <td>{r.nombre}</td>
              <td>{r.cantidad} ml</td>
              <td>{r.recipientes}</td>

              <td>
                <button onClick={() => seleccionarReactivo(r)}>
                  Ver
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      




      
     </div> 
      
  );
}

export default TablaReactivos;

