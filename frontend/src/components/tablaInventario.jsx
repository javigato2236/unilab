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
      : [...prev, nombre]);};

  const [fechaActualizacionFDS, setFechaActualizacionFDS] = useState('');

  const [fechaIngresoreactivo, setFechaIngresoReactivo] = useState('');

  const [fechaVencimientoProyec, setFechaVencimientoProyec] = useState('');


  



   

  
    
    

  return (

    <div>

      <div className='contenedor-cierreSesion' onClick={openModal}>
        <img src={iconoAgregarRegistro} alt="" />
        <h3>Nuevo registro</h3>
      </div>

      <Modal isOpen={isModalOpen} >

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

          <button type='button' onClick={closeModal}>Cancelar</button>

      </Modal>

      <Modal isOpen={isFirstModalOpen}>
        <form >

          <label htmlFor="">Nombre de la sustancia</label>
          <input type="text" />

          <label htmlFor="">Familia</label>
          <input type="text" />

          <label htmlFor="">Sinonimo</label>
          <input type="text" />

          <label htmlFor="">Cas</label>
          <input type="text" />

          <label htmlFor="">Marca</label>
          <input type="text" />

          <label htmlFor="">Referencia</label>
          <input type="text" />

          <label htmlFor="">FDS Completa?</label>
          <select id="FDS" name="FDS">
              <option value="SI">Si</option>
              <option value="no">No</option>
          </select>
          
          <label htmlFor="">Utima fecha actualizacion o creacion FDS</label>
          <input
            type="date"
            value={fechaActualizacionFDS}
            onChange={(e) => setFechaActualizacionFDS(e.target.value)}
          />
          
          <label htmlFor="">Estado fisico</label>
          <select id="Estado" name="Estado">
              <option value="solido">Solido</option>
              <option value="liquido">Liquido</option>
          </select>

          
          <button type="button" onClick={openPictogramasModal}>Peligrosidad SGA</button>

          <button type='button'>Guardar</button>
          <button type='button' onClick={closeFirstModal}>Cancelar</button>

        </form>


        

        
      </Modal>



      <Modal isOpen={isSecondModalOpen}>
        <form>
           <label htmlFor="">Codigo frase H</label>
           <input type="text" />

           <label htmlFor="">Sustancia cancerigena</label>
           <select id="Suscancer" name="Suscancer">
              <option value="si">Si</option>
              <option value="no">No</option>
           </select>

           <h3>Ubicacion</h3>
           <label htmlFor="">Sitio de almacenamiento </label>
           <input type="text" />

           <label htmlFor="">Ubicacion especifica</label>
           <input type="text" />

           <label htmlFor="">Unidad de medida</label>
           <input type="text" />

           <label htmlFor="">Presentacion</label>
           <input type="text" />

           <label htmlFor="">Numero de recipientes</label>
           <input type="text" />

           <label htmlFor="">Catidad total</label>
           <input type="text" />

           <label htmlFor="">Cantidad real</label>
           <input type="text" />

           <h3>Sustancias controladas RES001:2025</h3>
            <label htmlFor="">Es controlado</label>
              <select id="Suscontrol" name="suscontrol">
                  <option value="si">Si</option>
                  <option value="no">No</option>
              </select>

           <label htmlFor="">Componente 1</label>
           <input type="text" />

           <label htmlFor="">Clacificacion almacenamiento</label>
           <input type="text" />

           <label htmlFor="">Separacion metodo SAF-T-DATA </label>
             <select id="Separasatdata" name="Separasatdata">
                  <option value="c">C</option>
                  <option value="i">I</option>
                  <option value="o">O</option>
                  <option value="pma">PMA</option>
                  <option value="rm">RM</option>
                  <option value="t">T</option>
             </select>

           <label htmlFor="">Fecha de ingreso de la sustancia quimica al laboratorio</label>
           <input
            type="date"
            value={fechaIngresoreactivo}
            onChange={(e) => setFechaIngresoReactivo(e.target.value)}
          />

          <label htmlFor="">Fecha vencimiento proyectado</label>
           <input
            type="date"
            value={fechaVencimientoProyec}
            onChange={(e) => setFechaVencimientoProyec(e.target.value)}
          />

          
          <label htmlFor="observaciones">Observaciones:</label>
          <textarea id="Observaciones" name="Observaciones"></textarea>



           

          <button type='button'>Guardar</button>
          <button type='button' onClick={closeSecondModal}>Cancelar</button>
      
        </form>
        
      </Modal>

      <Modal isOpen={isThirdModalOpen}>
        <h1>modal 3</h1>
        <button type='button'>Guardar</button>
        <button type='button' onClick={closeThirdModal}>Cancelar</button>
      </Modal>

      <Modal isOpen={isPictogramasdModalOpen}>
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
        <button  onClick={() => {
    console.log(pictogramasSeleccionados);
    closePictogramasModal();
  }}>
    Guardar
  </button>
  <button type='button' onClick={closePictogramasModal}>Cancelar</button>
      </Modal>

    

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












   {/* <label for="fruta">Elige o escribe una fruta:</label>
          <input list="frutas" id="fruta" name="fruta"/>

          <datalist id="frutas">
            <option value="Manzana"/>
            <option value="Banana"/>
            <option value="Naranja"/>
          </datalist> */}

          {/* <label>
            <input type="radio" name="fruta" value="manzana" /> Manzana
          </label>

          <label>
            <input type="radio" name="fruta" value="banana" /> Banana
          </label>

          <label>
            <input type="radio" name="fruta" value="naranja" /> Naranja
          </label> */}

          {/* <label for="frutas">Elige una fruta:</label>
            <select id="frutas" name="frutas">
              <option value="manzana">Manzana</option>
              <option value="banana">Banana</option>
              <option value="naranja">Naranja</option>
            </select> */}



                 