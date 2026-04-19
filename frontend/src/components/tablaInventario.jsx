// import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
// import "../styles/paginaPrincipal.css";
// import "../styles/pictogramas.css";
// import Modal from "../hoosk/modalReutilizable";
// import { useState, useEffect } from "react";

// function TablaReactivos({ reactivos, seleccionarReactivo }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 🔹 primer  modal
//   const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

//   // 🔹 segundo  modal
//   const [isSecondModalOpen, setIsSecondOpen] = useState(false);

//   // 🔹 tercer modal
//   const [isThirdModalOpen, setIsThirdOpen] = useState(false);

//   // 🔹 modal  que abre el contenedor de las imagenes de los pictogramas
//   const [isPictogramasdModalOpen, setIsPictogramasOpen] = useState(false);

//   // 🔹 modal  que contiene las imagenes de los pictogramas
//   const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);
//   const togglePictograma = (nombre) => {
//     setPictogramasSeleccionados((prev) =>
//       prev.includes(nombre)
//         ? prev.filter((p) => p !== nombre)
//         : [...prev, nombre],
//     );
//   };

//   const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/pictogramas")
//       .then((res) => res.json())
//       .then((data) => setCatalogoPictogramas(data));
//   }, []);

//   // const [fechaActualizacionFDS, setFechaActualizacionFDS] = useState('');
//   // const [fechaIngresoreactivo, setFechaIngresoReactivo] = useState('');
//   // const [nombre, setNombre] = useState('');
//   // const [familia, setFamilia] = useState('');
//   // const [sinonimo, setSinonimo] = useState('');
//   // const [cas, setCas] = useState('');
//   // const [marca, setMarca] = useState('');
//   // const [referencia, setReferencia] = useState('');
//   // const [fdsCompleta, setFdsCompleta] = useState('Si');
//   // const [ultimaFechaActualizacionFDS, setUltimaFechaActualizacionFDS] = useState('');
//   // const [estadoFisico, setEstadoFisico] = useState('Solido');
//   // const [codigoFraseH, setCodigoFraseH] = useState('');
//   // const [sustanciaCancerigena, setSustanciaCancerigena] = useState('Si');
//   // const [sitioAlmacenamiento, setSitioAlmacenamiento] = useState('');
//   // const [ubicacionEspecifica, setUbicacionEspecifica] = useState('');
//   // const [unidadDeMedida, setUnidadDeMedida] = useState('');
//   // const [presentacion, setPresentacion] = useState('');
//   // const [numeroRecipientes, setNumeroRecipientes] = useState('');
//   // const [cantidadTotal, setCantidadTotal] = useState('');
//   // const [cantidadReal, setCantidadReal] = useState('');
//   // const [esControlado, setEsControlado] = useState('Si');
//   // const [componente1, setComponente1] = useState('');
//   // const [clacificacionAlmacenamiento, setClacificacionAlmacenamiento] = useState('');
//   // const [SeparacionMetodoSAFTDATA, setSeparacionMetodoSAFTDATA] = useState('C');
//   // const [fechaDeIngresoDelaSustanciaQuimicaAlLaboratorio, SetFechaDeIngresoDelaSustanciaQuimicaAlLaboratorio] = useState('');
//   // const [fechaVencimientoProyec, setFechaVencimientoProyec] = useState('');
//   // const [Observaciones, setObservaciones] = useState('');
//   // const [palabraDeAdvertencia, setPalabraDeAdvertencia] = useState('');
//   // const [preventivaCodigoDetalle, setPreventivaCodigoDetalle] = useState('');
//   // const [respuestaOIntervencionCodigoDetalle, setRespuestaOIntervencionCodigoDetalle] = useState('');
//   // const [razonSocial, setRazonSocial] = useState('');
//   // const [direccion, setDireccion] = useState('');
//   // const [contacto, setContacto] = useState('');

//   // función para que las entradas se registren solo en mayúsculas
//   const toUpper = (setter) => (e) => {
//     setter(e.target.value.toUpperCase());
//   };

//   //función para que al dar clic en cancelar se reinicien los inpus de los modales de los formularios
//   // const resetForm = () => {

//   //  setNombre('');
//   //  setFamilia('');
//   //  setSinonimo('');
//   //  setCas('');
//   //  setMarca('');
//   //  setReferencia('');
//   //  setFdsCompleta('Si');
//   //  setUltimaFechaActualizacionFDS('');
//   //  setEstadoFisico('Solido');
//   //  setCodigoFraseH('');
//   //  setSustanciaCancerigena('');
//   //  setSitioAlmacenamiento('');
//   //  setUbicacionEspecifica('');
//   //  setUnidadDeMedida('');
//   //  setPresentacion('');
//   //  setNumeroRecipientes('');
//   //  setCantidadTotal('');
//   //  setCantidadReal('');
//   //  setEsControlado('');
//   //  setComponente1('');
//   //  setPictogramasSeleccionados([]);
//   //  setClacificacionAlmacenamiento('');
//   //  setSeparacionMetodoSAFTDATA('');
//   //  SetFechaDeIngresoDelaSustanciaQuimicaAlLaboratorio('');
//   //  setFechaVencimientoProyec('');
//   //  setObservaciones('');
//   //  setPalabraDeAdvertencia('');
//   //  setPreventivaCodigoDetalle('');
//   //  setRespuestaOIntervencionCodigoDetalle('');
//   //  setRazonSocial('');
//   //  setDireccion('');
//   //  setContacto('');

//   // };

//   //funciones para aplicar el cierre y reset de los inputs de los formularios de los modales
//   const closeModal = () => {
//     // resetForm();
//     setIsModalOpen(false);
//   };

//   const closeFirstModal = () => {
//     setIsFirstModalOpen(false);
//   };

//   const closeSecondModal = () => {
//     // resetForm();
//     setIsSecondOpen(false);
//   };

//   const closeThirdModal = () => {
//     // resetForm();
//     setIsThirdOpen(false);
//   };

//   const closePictogramasModal = () => {
//     setPictogramasSeleccionados([]);
//     setIsPictogramasOpen(false);
//   };

//   return (
//     <div>
//       <div
//         className="contenedor-cierreSesion"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <img src={iconoAgregarRegistro} alt="" />
//         <h3>Nuevo registro</h3>
//       </div>

//       <Modal isOpen={isModalOpen}>
//         <div>
//           <h1>Informacion basica</h1>
//           <button onClick={() => setIsFirstModalOpen(true)}>Agregar</button>
//         </div>

//         <div>
//           <h1>Informacion general</h1>
//           <button onClick={() => setIsSecondOpen(true)}>Agregar</button>
//         </div>

//         <div>
//           <h1>Informacion especifica</h1>
//           <button onClick={() => setIsThirdOpen(true)}>Agregar</button>
//         </div>

//         <button type="button" onClick={closeModal}>
//           Cancelar
//         </button>
//         <button type="button" onClick={""}>
//           enviar
//         </button>
//       </Modal>

//       <Modal isOpen={isFirstModalOpen}>
//         <form>
// <label htmlFor="">Nombre de la sustancia</label>
// <input type="text" />

// <label htmlFor="">Familia</label>
// <input type="text" />

// <label htmlFor="">Grupo</label>
// <select id="Grupo" name="Grupo">
//   <option value="a">A</option>
//   <option value="b">B</option>
//   <option value="c">C</option>
//   <option value="d">D</option>
//   <option value="e">E</option>
//   <option value="f">F</option>
// </select>

// <label htmlFor="">Sinonimo</label>
// <input type="text" />

// <label htmlFor="">Cas</label>
// <input type="text" />

// <label htmlFor="">Marca</label>
// <input type="text" />

// <label htmlFor="">Referencia</label>
// <input type="text" />

// <label htmlFor="">FDS Completa?</label>
// <select id="FDS" name="FDS">
//   <option value="si">Si</option>
//   <option value="no">No</option>
// </select>

// <label htmlFor="">Utima fecha actualizacion o creacion FDS</label>
// <input
//   type="date"
//   onChange={(e) => setFechaActualizacionFDS(e.target.value)}
// />

// <label htmlFor="">Estado fisico</label>
// <select id="Estado" name="Estado">
//   <option value="solido">Solido</option>
//   <option value="liquido">Liquido</option>
// </select>

//           <button type="button" onClick={() => setIsPictogramasOpen(true)}>
//             Peligrosidad SGA
//           </button>

//           <button type="button">Guardar</button>
//           <button type="button" onClick={closeFirstModal}>
//             Cancelar
//           </button>
//         </form>
//       </Modal>

//       <Modal isOpen={isSecondModalOpen}>
//         <form>
// <label htmlFor="">Codigo frase H</label>
// <input type="text" />

// <label htmlFor="">Sustancia cancerigena</label>
// <select id="Suscancer" name="Suscancer">
//   <option value="si">Si</option>
//   <option value="no">No</option>
// </select>

// <h3>Ubicacion</h3>
// <label htmlFor="">Sitio de almacenamiento </label>
// <input type="text" />

// <label htmlFor="">Ubicacion especifica</label>
// <input type="text" />

// <label htmlFor="">Unidad de medida</label>
// <input type="text" />

// <label htmlFor="">Presentacion</label>
// <input type="text" />

// <label htmlFor="">Numero de recipientes</label>
// <input type="text" />

// <label htmlFor="">Catidad total</label>
// <input type="text" />

// <label htmlFor="">Cantidad real</label>
// <input type="text" />

// <h3>Sustancias controladas RES001:2025</h3>
// <label htmlFor="">Es controlado</label>
// <select id="Suscontrol" name="suscontrol">
//   <option value="si">Si</option>
//   <option value="no">No</option>
// </select>

// <label htmlFor="">Componente 1</label>
// <input type="text" />

// <label htmlFor="">Clacificacion almacenamiento</label>
// <input type="text" />

// <label htmlFor="">Separacion metodo SAF-T-DATA </label>
// <select id="Separasatdata" name="Separasatdata">
//   <option value="c">C</option>
//   <option value="i">I</option>
//   <option value="o">O</option>
//   <option value="pma">PMA</option>
//   <option value="rm">RM</option>
//   <option value="t">T</option>
// </select>

// <label htmlFor="">
//   Fecha de ingreso de la sustancia quimica al laboratorio
// </label>
// <input
//   type="date"
//   onChange={(e) => setFechaIngresoReactivo(e.target.value)}
// />

// <label htmlFor="">Fecha vencimiento proyectado</label>
// <input
//   type="date"
//   onChange={(e) => setFechaVencimientoProyec(e.target.value)}
// />

// <label htmlFor="observaciones">Observaciones</label>
// <textarea id="Observaciones" name="Observaciones"></textarea>

//           <button type="button">Guardar</button>
//           <button type="button" onClick={closeSecondModal}>
//             Cancelar
//           </button>
//         </form>
//       </Modal>

//       <Modal isOpen={isThirdModalOpen}>
//         <form action="">
// <label htmlFor="">Palabra de advertencia</label>
// <input type="text" />

// <h2>Consejos de prudencia (frases p)</h2>
// <label htmlFor="preventiva">Preventiva codigo/detalle</label>
// <textarea id="Preventiva" name="Preventiva"></textarea>

// <label htmlFor="respuestaIntervencion">
//   Respuesta o intervencion codigo/detalle
// </label>
// <textarea
//   id="RespuestaIntervencion"
//   name="RespuestaIntervencion"
// ></textarea>

// <h2>Informacion proveedor</h2>
// <label htmlFor="infoproveedor">Razon social</label>
// <input type="text" />

// <label htmlFor="">direccion</label>
// <input type="text" />

// <label htmlFor="">Contacto</label>
// <input type="text" />

//           <button type="button">Guardar</button>
//           <button type="button" onClick={closeThirdModal}>
//             Cancelar
//           </button>
//         </form>
//       </Modal>

//       <Modal isOpen={isPictogramasdModalOpen}>
//         <div className="contenedor-pictogramas">
//           {catalogoPictogramas.map((p) => (
//             <label
//               key={p.id}
//               className={`pictograma-item
//                         ${pictogramasSeleccionados.includes(p.id) ? "seleccionado" : ""}`}
//             >
//               <input
//                 type="checkbox"
//                 checked={pictogramasSeleccionados.includes(p.id)}
//                 onChange={() => {
//                   setPictogramasSeleccionados((prev) =>
//                     prev.includes(p.id)
//                       ? prev.filter((id) => id !== p.id)
//                       : [...prev, p.id],
//                   );
//                 }}
//               />

//               <img src={`http://localhost:8000${p.url}`} alt={p.nombre} />
//             </label>
//           ))}
//         </div>

//         <button
//           onClick={() => {
//             // console.log(pictogramasSeleccionados);
//             closePictogramasModal();
//           }}
//         >
//           Guardar
//         </button>

//         <button type="button" onClick={closePictogramasModal}>
//           Cancelar
//         </button>
//       </Modal>

//       <table className="tabla-reactivos">
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Cantidad</th>
//             <th>Recipientes</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {reactivos.map((r) => (
//             <tr key={r.id}>
//               <td>{r.nombre}</td>
//               <td>{r.cantidad} ml</td>
//               <td>{r.recipientes}</td>

//               <td>
//                 <button onClick={() => seleccionarReactivo(r)}>Ver</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TablaReactivos;

// {
//   /* <label for="fruta">Elige o escribe una fruta:</label>
//           <input list="frutas" id="fruta" name="fruta"/>

//           <datalist id="frutas">
//             <option value="Manzana"/>
//             <option value="Banana"/>
//             <option value="Naranja"/>
//           </datalist> */
// }

// {
//   /* <label>
//             <input type="radio" name="fruta" value="manzana" /> Manzana
//           </label>

//           <label>
//             <input type="radio" name="fruta" value="banana" /> Banana
//           </label>

//           <label>
//             <input type="radio" name="fruta" value="naranja" /> Naranja
//           </label> */
// }

// {
//   /* <label for="frutas">Elige una fruta:</label>
//             <select id="frutas" name="frutas">
//               <option value="manzana">Manzana</option>
//               <option value="banana">Banana</option>
//               <option value="naranja">Naranja</option>
//             </select> */
// }

///////////////////////////////////////////////////////////////////////////////////
// import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
// import "../styles/paginaPrincipal.css";
// import "../styles/pictogramas.css";
// import Modal from "../hoosk/modalReutilizable";
// import { useState, useEffect } from "react";

// function TablaReactivos({ seleccionarReactivo }) {
//   // 🔹 LISTA DE REACTIVOS DESDE BACKEND
//   const [reactivos, setReactivos] = useState([]);
//   const [editandoId, setEditandoId] = useState(null);

//   // 🔹 FORMULARIO GLOBAL
//   const [formData, setFormData] = useState({
//     basica: {},
//     general: {},
//     especifica: {},
//     pictogramas: [],
//   });

//   const [guardado, setGuardado] = useState({
//     basica: false,
//     general: false,
//     especifica: false,
//   });

//   // 🔹 MODALES
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
//   const [isSecondModalOpen, setIsSecondOpen] = useState(false);
//   const [isThirdModalOpen, setIsThirdOpen] = useState(false);
//   const [isPictogramasModalOpen, setIsPictogramasOpen] = useState(false);

//   // 🔹 CAMPOS (PUEDES EXPANDIR TODOS LOS QUE TENÍAS)
//   const [nombre, setNombre] = useState("");
//   const [familia, setFamilia] = useState("");
//   const [sinonimo, setSinonimo] = useState("");
//   const [cantidadTotal, setCantidadTotal] = useState("");
//   const [cantidadReal, setCantidadReal] = useState("");
//   const [palabraAdvertencia, setPalabraAdvertencia] = useState("");

//   // 🔹 PICTOGRAMAS
//   const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
//   const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);

//   // 🔹 MAYÚSCULAS
//   const toUpper = (setter) => (e) => {
//     setter(e.target.value.toUpperCase());
//   };

//   // 🔹 TRAER REACTIVOS
//   const fetchReactivos = async () => {
//     const res = await fetch("http://localhost:8000/api/sustancias");
//     const data = await res.json();
//     setReactivos(data);
//   };

//   // 🔹 TRAER PICTOGRAMAS
//   const fetchPictogramas = async () => {
//     const res = await fetch("http://localhost:8000/api/pictogramas");
//     const data = await res.json();
//     setCatalogoPictogramas(data);
//   };

//   useEffect(() => {
//     fetchReactivos();
//     fetchPictogramas();
//   }, []);

//   // 🔹 EDITAR
//   const editar = (item) => {
//     setEditandoId(item.id);

//     setNombre(item.nombre || "");
//     setFamilia(item.basica?.familia || "");
//     setSinonimo(item.basica?.sinonimo || "");
//     setCantidadTotal(item.general?.cantidad_total || "");
//     setCantidadReal(item.general?.cantidad_real || "");
//     setPalabraAdvertencia(item.especifica?.palabra_advertencia || "");

//     setPictogramasSeleccionados(item.pictogramas?.map((p) => p.id) || []);

//     setFormData({
//       basica: item.basica,
//       general: item.general,
//       especifica: item.especifica,
//       pictogramas: item.pictogramas || [],
//     });

//     setGuardado({ basica: true, general: true, especifica: true });

//     setIsModalOpen(true);
//   };

//   // 🔹 GUARDAR SECCIONES
//   const guardarBasica = () => {
//     setFormData((prev) => ({
//       ...prev,
//       basica: { nombre, familia, sinonimo },
//     }));
//     setGuardado((prev) => ({ ...prev, basica: true }));
//     setIsFirstModalOpen(false);
//   };

//   const guardarGeneral = () => {
//     setFormData((prev) => ({
//       ...prev,
//       general: {
//         cantidad_total: Number(cantidadTotal),
//         cantidad_real: Number(cantidadReal),
//       },
//     }));
//     setGuardado((prev) => ({ ...prev, general: true }));
//     setIsSecondOpen(false);
//   };

//   const guardarEspecifica = () => {
//     setFormData((prev) => ({
//       ...prev,
//       especifica: { palabra_advertencia: palabraAdvertencia },
//     }));
//     setGuardado((prev) => ({ ...prev, especifica: true }));
//     setIsThirdOpen(false);
//   };

//   // 🔹 GUARDAR PICTOGRAMAS
//   const guardarPictogramas = () => {
//     setFormData((prev) => ({
//       ...prev,
//       pictogramas: pictogramasSeleccionados,
//     }));
//     setIsPictogramasOpen(false);
//   };

//   // 🔹 ENVIAR TODO
//   const enviarTodo = async () => {
//     const url = editandoId
//       ? `http://localhost:8000/api/sustancias/${editandoId}`
//       : "http://localhost:8000/api/sustancias";

//     const method = editandoId ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     alert(editandoId ? "Actualizado" : "Creado");

//     setIsModalOpen(false);
//     setEditandoId(null);
//     fetchReactivos();
//   };

//   // 🔹 ELIMINAR
//   const eliminar = async (id) => {
//     if (!confirm("¿Eliminar?")) return;

//     await fetch(`http://localhost:8000/api/sustancias/${id}`, {
//       method: "DELETE",
//     });

//     fetchReactivos();
//   };

//   return (
//     <div>
//       {/* BOTÓN NUEVO */}
//       <div
//         className="contenedor-cierreSesion"
//         onClick={() => {
//           setEditandoId(null);
//           setIsModalOpen(true);
//         }}
//       >
//         <img src={iconoAgregarRegistro} alt="" />
//         <h3>Nuevo registro</h3>
//       </div>

//       {/* MODAL PRINCIPAL */}
//       <Modal isOpen={isModalOpen}>
//         <h2>Formulario principal</h2>

//         <button onClick={() => setIsFirstModalOpen(true)}>
//           Información básica
//         </button>
//         <button onClick={() => setIsSecondOpen(true)}>
//           Información general
//         </button>
//         <button onClick={() => setIsThirdOpen(true)}>
//           Información específica
//         </button>

//         <button onClick={enviarTodo}>
//           {editandoId ? "Actualizar" : "Guardar"}
//         </button>

//         <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
//       </Modal>

//       {/* BASICA */}
//       <Modal isOpen={isFirstModalOpen}>
//         <input
//           placeholder="Nombre"
//           value={nombre}
//           onChange={toUpper(setNombre)}
//         />
//         <input
//           placeholder="Familia"
//           value={familia}
//           onChange={toUpper(setFamilia)}
//         />
//         <input
//           placeholder="Sinonimo"
//           value={sinonimo}
//           onChange={toUpper(setSinonimo)}
//         />

//         <button onClick={() => setIsPictogramasOpen(true)}>Pictogramas</button>

//         <button onClick={guardarBasica}>Guardar</button>
//       </Modal>

//       {/* GENERAL */}
//       <Modal isOpen={isSecondModalOpen}>
//         <input
//           placeholder="Cantidad total"
//           value={cantidadTotal}
//           onChange={(e) => setCantidadTotal(e.target.value)}
//         />
//         <input
//           placeholder="Cantidad real"
//           value={cantidadReal}
//           onChange={(e) => setCantidadReal(e.target.value)}
//         />

//         <button onClick={guardarGeneral}>Guardar</button>
//       </Modal>

//       {/* ESPECIFICA */}
//       <Modal isOpen={isThirdModalOpen}>
//         <input
//           placeholder="Palabra advertencia"
//           value={palabraAdvertencia}
//           onChange={toUpper(setPalabraAdvertencia)}
//         />

//         <button onClick={guardarEspecifica}>Guardar</button>
//       </Modal>

//       {/* PICTOGRAMAS */}
//       <Modal isOpen={isPictogramasModalOpen}>
//         <div className="contenedor-pictogramas">
//           {catalogoPictogramas.map((p) => (
//             <label
//               key={p.id}
//               className={`pictograma-item ${pictogramasSeleccionados.includes(p.id) ? "seleccionado" : ""}`}
//             >
//               <input
//                 type="checkbox"
//                 checked={pictogramasSeleccionados.includes(p.id)}
//                 onChange={() => {
//                   setPictogramasSeleccionados((prev) =>
//                     prev.includes(p.id)
//                       ? prev.filter((id) => id !== p.id)
//                       : [...prev, p.id],
//                   );
//                 }}
//               />
//               <img src={`http://localhost:8000${p.url}`} alt={p.nombre} />
//             </label>
//           ))}
//         </div>

//         <button onClick={guardarPictogramas}>Guardar</button>
//         <button onClick={() => setIsPictogramasOpen(false)}>Cancelar</button>
//       </Modal>

//       {/* TABLA */}
//       <table className="tabla-reactivos">
//         <tbody>
//           {reactivos.map((r) => (
//             <tr key={r.id}>
//               <td>{r.nombre}</td>

//               <td>
//                 <button onClick={() => editar(r)}>Editar</button>
//                 <button onClick={() => eliminar(r.id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TablaReactivos;

///////////////////////////////////////////////////////

import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
import "../styles/paginaPrincipal.css";
import "../styles/pictogramas.css";
import "../styles/tabla.css";

import Modal from "../hoosk/modalReutilizable";
import PanelReactivo from "./PanelReactivo";

import { useState, useEffect } from "react";

function TablaReactivos({ seleccionarReactivo }) {
  // 🔹 LISTA DE REACTIVOS
  const [reactivos, setReactivos] = useState([]);

  // 🔹 NUEVO: REACTIVO SELECCIONADO (PARA VER)
  const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);

  const [editandoId, setEditandoId] = useState(null);

  // 🔹 FORMULARIO GLOBAL
  const [formData, setFormData] = useState({
    basica: {},
    general: {},
    especifica: {},
    pictogramas: [],
  });

  const [guardado, setGuardado] = useState({
    basica: false,
    general: false,
    especifica: false,
  });

  // 🔹 MODALES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

  // 🔹 CAMPOS
  const [nombre, setNombre] = useState("");
  const [familia, setFamilia] = useState("");
  const [sinonimo, setSinonimo] = useState("");
  const [cantidadTotal, setCantidadTotal] = useState("");
  const [cantidadReal, setCantidadReal] = useState("");
  const [palabraAdvertencia, setPalabraAdvertencia] = useState("");

  // 🔹 PICTOGRAMAS
  const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);

  const toUpper = (setter) => (e) => {
    setter(e.target.value.toUpperCase());
  };

  // 🔹 FETCH
  const fetchReactivos = async () => {
    const res = await fetch("http://localhost:8000/api/sustancias");
    const data = await res.json();
    setReactivos(data);
  };

  const fetchPictogramas = async () => {
    const res = await fetch("http://localhost:8000/api/pictogramas");
    const data = await res.json();
    setCatalogoPictogramas(data);
  };

  useEffect(() => {
    fetchReactivos();
    fetchPictogramas();
  }, []);

  // 🔹 EDITAR
  const editar = (item) => {
    setEditandoId(item.id);

    setNombre(item.nombre || "");
    setFamilia(item.basica?.familia || "");
    setSinonimo(item.basica?.sinonimo || "");
    setCantidadTotal(item.general?.cantidad_total || "");
    setCantidadReal(item.general?.cantidad_real || "");
    setPalabraAdvertencia(item.especifica?.palabra_advertencia || "");

    setPictogramasSeleccionados(item.pictogramas?.map((p) => p.id) || []);

    setFormData({
      basica: item.basica,
      general: item.general,
      especifica: item.especifica,
      pictogramas: item.pictogramas || [],
    });

    setGuardado({ basica: true, general: true, especifica: true });

    setIsModalOpen(true);
  };

  // 🔹 GUARDAR
  const guardarBasica = () => {
    setFormData((prev) => ({
      ...prev,
      basica: { nombre, familia, sinonimo },
    }));
    setGuardado((prev) => ({ ...prev, basica: true }));
    setIsFirstModalOpen(false);
  };

  const guardarGeneral = () => {
    setFormData((prev) => ({
      ...prev,
      general: {
        cantidad_total: Number(cantidadTotal),
        cantidad_real: Number(cantidadReal),
      },
    }));
    setGuardado((prev) => ({ ...prev, general: true }));
    setIsSecondOpen(false);
  };

  const guardarEspecifica = () => {
    setFormData((prev) => ({
      ...prev,
      especifica: { palabra_advertencia: palabraAdvertencia },
    }));
    setGuardado((prev) => ({ ...prev, especifica: true }));
    setIsThirdOpen(false);
  };

  const guardarPictogramas = () => {
    setFormData((prev) => ({
      ...prev,
      pictogramas: pictogramasSeleccionados,
    }));
    setIsPictogramasOpen(false);
  };

  // 🔹 ENVIAR
  const enviarTodo = async () => {
    const url = editandoId
      ? `http://localhost:8000/api/sustancias/${editandoId}`
      : "http://localhost:8000/api/sustancias";

    const method = editandoId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert(editandoId ? "Actualizado" : "Creado");

    setIsModalOpen(false);
    setEditandoId(null);
    fetchReactivos();
  };

  // 🔹 ELIMINAR
  const eliminar = async (id) => {
    if (!confirm("¿Eliminar?")) return;

    await fetch(`http://localhost:8000/api/sustancias/${id}`, {
      method: "DELETE",
    });

    fetchReactivos();
  };

  return (
    <div>
      {/* BOTÓN NUEVO */}
      <div
        className="contenedor-cierreSesion"
        onClick={() => {
          setEditandoId(null);
          setIsModalOpen(true);
        }}
      >
        <img src={iconoAgregarRegistro} alt="" />
        <h3>Nuevo registro</h3>
      </div>

      {/* MODAL PRINCIPAL */}
      <Modal isOpen={isModalOpen}>
        <h2>Formulario principal</h2>

        <button onClick={() => setIsFirstModalOpen(true)}>
          Información básica
        </button>
        <button onClick={() => setIsSecondModalOpen(true)}>
          Información general
        </button>
        <button onClick={() => setIsThirdModalOpen(true)}>
          Información específica
        </button>

        <button onClick={enviarTodo}>
          {editandoId ? "Actualizar" : "Guardar"}
        </button>

        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </Modal>

      {/* BASICA */}
      <Modal isOpen={isFirstModalOpen}>
        <form>
          <label htmlFor="">Nombre de la sustancia</label>
          <input type="text" />

          <label htmlFor="">Familia</label>
          <input type="text" />

          <label htmlFor="">Grupo</label>
          <select id="Grupo" name="Grupo">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
          </select>

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
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="">Utima fecha actualizacion o creacion FDS</label>
          <input
            type="date"
            onChange={(e) => setFechaActualizacionFDS(e.target.value)}
          />

          <label htmlFor="">Estado fisico</label>
          <select id="Estado" name="Estado">
            <option value="solido">Solido</option>
            <option value="liquido">Liquido</option>
          </select>

          <button type="button" onClick={() => setIsPictogramasModalOpen(true)}>
            Pictogramas
          </button>
          <button onClick={guardarBasica}>Guardar</button>
          <button onClick={() => setIsFirstModalOpen(false)}>Cancelar</button>
        </form>
      </Modal>

      {/* GENERAL */}
      <Modal isOpen={isSecondModalOpen}>
        <form action="">
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

          <label htmlFor="">
            Fecha de ingreso de la sustancia quimica al laboratorio
          </label>
          <input
            type="date"
            onChange={(e) => setFechaIngresoReactivo(e.target.value)}
          />

          <label htmlFor="">Fecha vencimiento proyectado</label>
          <input
            type="date"
            onChange={(e) => setFechaVencimientoProyec(e.target.value)}
          />

          <label htmlFor="observaciones">Observaciones</label>
          <textarea id="Observaciones" name="Observaciones"></textarea>

          <button onClick={guardarEspecifica}>Guardar</button>
          <button onClick={() => setIsSecondModalOpen(false)}>Cancelar</button>
        </form>
      </Modal>

      {/* ESPECIFICA */}
      <Modal isOpen={isThirdModalOpen}>
        <form action="">
          <label htmlFor="">Palabra de advertencia</label>
          <input type="text" />

          <h2>Consejos de prudencia (frases p)</h2>
          <label htmlFor="preventiva">Preventiva codigo/detalle</label>
          <textarea id="Preventiva" name="Preventiva"></textarea>

          <label htmlFor="respuestaIntervencion">
            Respuesta o intervencion codigo/detalle
          </label>
          <textarea
            id="RespuestaIntervencion"
            name="RespuestaIntervencion"
          ></textarea>

          <h2>Informacion proveedor</h2>
          <label htmlFor="infoproveedor">Razon social</label>
          <input type="text" />

          <label htmlFor="">direccion</label>
          <input type="text" />

          <label htmlFor="">Contacto</label>
          <input type="text" />

          <button onClick={guardarEspecifica}>Guardar</button>
          <button onClick={() => setIsThirdModalOpen(false)}>Cancelar</button>
        </form>
      </Modal>

      {/* PICTOGRAMAS */}
      <Modal isOpen={isPictogramasModalOpen}>
        <div className="contenedor-pictogramas">
          {catalogoPictogramas.map((p) => (
            <label
              key={p.id}
              className={`pictograma-item ${pictogramasSeleccionados.includes(p.id) ? "seleccionado" : ""}`}
            >
              <input
                type="checkbox"
                checked={pictogramasSeleccionados.includes(p.id)}
                onChange={() => {
                  setPictogramasSeleccionados((prev) =>
                    prev.includes(p.id)
                      ? prev.filter((id) => id !== p.id)
                      : [...prev, p.id],
                  );
                }}
              />
              <img src={`http://localhost:8000${p.url}`} alt={p.nombre} />
            </label>
          ))}
        </div>

        <button onClick={guardarPictogramas}>Guardar</button>
        <button onClick={() => setIsPictogramasModalOpen(false)}>
          Cancelar
        </button>
      </Modal>

      {/* TABLA */}
      <table className="tabla-reactivos">
        <tbody>
          {reactivos.map((r) => (
            <tr key={r.id}>
              <td>{r.nombre}</td>

              <td>
                <button onClick={() => setReactivoSeleccionado(r)}>Ver</button>
                <button onClick={() => editar(r)}>Editar</button>
                <button onClick={() => eliminar(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 🔹 PANEL */}
      {reactivoSeleccionado && (
        <PanelReactivo
          reactivo={reactivoSeleccionado}
          cerrar={() => setReactivoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default TablaReactivos;
