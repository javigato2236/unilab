import iconoAgregarRegistro from '../assets/iconoAgregarRegistro.png';
import '../styles/paginaPrincipal.css';
import '../styles/pictogramas.css';
import Modal from '../hoosk/modalReutilizable';
import { useState } from 'react';
import advertencia from '../assets/advertencia.png';
import carcinogenico from '../assets/carcinogenico.png';
import corrosivo from '../assets/corrosivo.png';
import explosivo from '../assets/explosivo.png';
import gases from '../assets/gases.png';
import inflamable from '../assets/inflamable.png';
import medioAmbiente from '../assets/medioAmbiente.png';
import oxidante from '../assets/oxidante.png';
import toxico from '../assets/toxico.png';



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

   const [isPictogramasdModalOpen, setIsPictogramasOpen] = useState(false);
  const openPictogramasModal = () => setIsPictogramasOpen(true);
  const closePictogramasModal = () => setIsPictogramasOpen(false);

  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);
  const togglePictograma = (nombre) => {
  setPictogramasSeleccionados((prev) =>
    prev.includes(nombre)
      ? prev.filter((p) => p !== nombre)
      : [...prev, nombre]
  );
};

   

  
    
    

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

          <label htmlFor="">Familia</label>
          <input type="text" />

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

          <button type="button" onClick={openPictogramasModal}>Pictogramas de seguridad</button>

        </form>
        

        <button>Enviar</button>
      </Modal>



      <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
        <form>

          <label htmlFor="">Cantidad</label>
          <input type="text" />

          <label htmlFor="">Presentacion</label>
          <input type="text" />

          <label htmlFor="">Unidad de medida</label>
          <input type="text" />

          <label htmlFor="">Numero de recipientes</label>
          <input type="text" />

           <label htmlFor="">Catidad total</label>
          <input type="text" />

          <label htmlFor="">Cantidad real</label>
          <input type="text" />

          <label htmlFor="">Hubicacion especifica</label>
          <input type="text" />
      
        </form>
        <button>Enviar</button>
      </Modal>

      <Modal isOpen={isThirdModalOpen} onClose={closeThirdModal}>
        <h1>modal 3</h1>
        <button>Enviar</button>
      </Modal>

      <Modal isOpen={isPictogramasdModalOpen} onClose={closePictogramasModal}>
        <div className="contenedor-pictogramas">

              {[
                { nombre: "advertencia", img: advertencia },
                { nombre: "carcinogenico", img: carcinogenico },
                { nombre: "corrosivo", img: corrosivo },
                { nombre: "explosivo", img: explosivo },
                { nombre: "gases", img: gases },
                { nombre: "inflamable", img: inflamable },
                { nombre: "medioAmbiente", img: medioAmbiente },
                { nombre: "oxidante", img: oxidante },
                { nombre: "toxico", img: toxico },
              ].map((p) => (
                <label key={p.nombre} className={`pictograma-item 
                  ${pictogramasSeleccionados.includes(p.nombre) ? "seleccionado" : ""}`}>

                  <input
                    type="checkbox"
                    checked={pictogramasSeleccionados.includes(p.nombre)}
                    onChange={() => togglePictograma(p.nombre)}
                  />

                  <img src={p.img} alt={p.nombre} />

                </label>
              ))}

            </div>
        <button onClick={() => {
    console.log(pictogramasSeleccionados);
    closePictogramasModal();
  }}>
    Guardar
  </button>
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

