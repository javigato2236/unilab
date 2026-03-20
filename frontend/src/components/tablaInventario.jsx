import iconoAgregarRegistro from '../assets/iconoAgregarRegistro.png';
import '../styles/paginaPrincipal.css';
import Modal from '../hoosk/modalReutilizable';
import { useState } from 'react';

function TablaReactivos({ reactivos, seleccionarReactivo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // 🔹 primer  modal
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const openFirstModal = () => setIsFirstModalOpen(true);
  const closeFirstModal = () => setIsFirstModalOpen(false);

   // 🔹 segundo  modal
  const [isSecondModalOpen, setIsSecondOpen] = useState(false);
  const openSecondModal = () => setIsSecondOpen(true);
  const closeSecondModal = () => setIsSecondOpen(false);

   // 🔹 tercer modal
  const [isThirdModalOpen, setIsThirdOpen] = useState(false);
  const openThirdModal = () => setIsThirdOpen(true);
  const closeThirdModal = () => setIsThirdOpen(false);

   

  
    
    

  return (

    <div>

      <div className='contenedor-cierreSesion' onClick={openModal}>
        <img src={iconoAgregarRegistro} alt="" />
        <h3>Nuevo registro</h3>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h1>Informacion basica</h1>
            <button onClick={openFirstModal}>Agregar</button>
       

          </div>

          
          <div>
            <h1>Informacion general</h1>
            <button onClick={openSecondModal}>Agregar</button>
            
          </div>

          
          <div>
            <h1>Informacion especifica</h1>
            <button onClick={openThirdModal}>Agregar</button>
            
          </div>

      </Modal>

      <Modal isOpen={isFirstModalOpen} onClose={closeFirstModal}>
        <form >

          <label htmlFor="">Nombre</label>
          <input type="text" />

          <label htmlFor="">Sinonimo</label>
          <input type="text" />

          <label htmlFor="">Cas</label>
          <input type="text" />

          <label htmlFor="">Marca</label>
          <input type="text" />

          <label htmlFor="">Referencia</label>
          <input type="text" />

          <label htmlFor="">Estado</label>
          <input type="text" />

        </form>
        <button>Enviar</button>
      </Modal>

      <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
        <h1>modal 2</h1>
        <button>Enviar</button>
      </Modal>

      <Modal isOpen={isThirdModalOpen} onClose={closeThirdModal}>
        <h1>modal 3</h1>
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

