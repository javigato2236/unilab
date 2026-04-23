// import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
// import "../styles/paginaPrincipal.css";
// import "../styles/pictogramas.css";
// import "../styles/tabla.css";
// import "../styles/inputsModales.css";

// import Modal from "../hoosk/modalReutilizable";
// import PanelReactivo from "./PanelReactivo";

// import { useState, useEffect } from "react";

// function TablaReactivos({ seleccionarReactivo }) {
//   const [reactivos, setReactivos] = useState([]);
//   const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);
//   const [editandoId, setEditandoId] = useState(null);

//   // 🔥 ESTADO ÚNICO
//   const [formData, setFormData] = useState({
//     basica: {
//       reactivo: "",
//       familia: "",
//       grupo: "",
//       sinonimo: "",
//       cas: "",
//       marca: "",
//       referencia: "",
//       fdsCompleta: "",
//       ultimaFechaActualizacion: "",
//       estadoFisico: "",
//     },
//     general: {
//       codigoFraseH: "",
//       toxicidadCat1Cat2: "",
//       sustanciaCancerigena: "",
//       sitioAlmacenamiento: "",
//       ubicacionEspecifica: "",
//       unidadDeMedida: "",
//       presentacion: "",
//       numeroDeRecipientes: "",
//       cantidadTotal: "",
//       cantidadReal: "",
//     },
//     especifica: {
//       esControlado: "",
//       componente1: "",
//       clasificacionAlmacenamiento: "",
//       separacionMetodoSAFTDATA: "",
//       fechaIngresoLabQuimica: "",
//       fechaVencimientoProyectada: "",
//       observaciones: "",
//       palabraDvertencia: "",
//       preventivaCodigoDetalle: "",
//       respuestaOintervencionCodigoDetalle: "",
//       razonSocial: "",
//       direccion: "",
//       contacto: "",
//     },
//     pictogramas: [],
//   });

//   //ESTADOS TEMPORALES
//   const [tempBasica, setTempBasica] = useState(formData.basica);

//   // 🔹 MODALES
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
//   const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
//   const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
//   const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

//   const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
//   const [tempPictogramas, setTempPictogramas] = useState([]);

//   //HANDLER UNIVERSAL GUARDA DATOS APENAS SE ESCRIBEN EN LOS INPUTS
//   // const handleChange =
//   //   (seccion, campo, isNumber = false) =>
//   //   (e) => {
//   //     let value = e.target.value;

//   //     if (isNumber) {
//   //       value = value === "" ? "" : Number(value);
//   //       if (isNaN(value)) value = "";
//   //     }

//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [seccion]: {
//   //         ...prev[seccion],
//   //         [campo]: value,
//   //       },
//   //     }));
//   //   };

//   const handleTempChange =
//     (setter, campo, isNumber = false) =>
//     (e) => {
//       let value = e.target.value;

//       if (isNumber) {
//         value = value === "" ? "" : Number(value);
//         if (isNaN(value)) value = "";
//       }

//       setter((prev) => ({
//         ...prev,
//         [campo]: value,
//       }));
//     };

//   // 🔹 FETCH
//   const fetchReactivos = async () => {
//     const res = await fetch("http://localhost:8000/api/sustancias");
//     const data = await res.json();
//     setReactivos(data);
//   };

//   const fetchPictogramas = async () => {
//     const res = await fetch("http://localhost:8000/api/pictogramas");
//     const data = await res.json();
//     setCatalogoPictogramas(data);
//   };

//   useEffect(() => {
//     fetchReactivos();
//     fetchPictogramas();
//   }, []);

//   // 🔥 EDITAR LIMPIO
//   const editar = (item) => {
//     setEditandoId(item.id);

//     setFormData({
//       basica: {
//         nombre: item.nombre || "",
//         familia: item.basica?.familia || "",
//         sinonimo: item.basica?.sinonimo || "",
//       },
//       general: {
//         cantidad_total: item.general?.cantidad_total || "",
//         cantidad_real: item.general?.cantidad_real || "",
//       },
//       especifica: {
//         palabra_advertencia: item.especifica?.palabra_advertencia || "",
//       },
//       pictogramas: item.pictogramas?.map((p) => p.id) || [],
//     });

//     setIsModalOpen(true);
//   };

//   const toggleTempPictograma = (id) => {
//     setTempPictogramas((prev) =>
//       prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
//     );
//   };

//   // 🔹 ENVIAR
//   const enviarTodo = async () => {
//     console.log("FORM DATA:", formData);
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
//           // limpiar modo edición
//           setEditandoId(null);

//           // limpiar formulario completo
//           setFormData({
//             basica: {
//               reactivo: "",
//               familia: "",
//               grupo: "",
//               sinonimo: "",
//               cas: "",
//               marca: "",
//               referencia: "",
//               fdsCompleta: "",
//               ultimaFechaActualizacion: "",
//               estadoFisico: "",
//             },
//             general: { cantidad_total: "", cantidad_real: "" },
//             especifica: { palabra_advertencia: "" },
//             pictogramas: [],
//           });

//           //MUY IMPORTANTE: limpiar selección temporal
//           // setTempPictogramas([]);

//           // abrir modal principal
//           setIsModalOpen(true);
//         }}
//       >
//         <img src={iconoAgregarRegistro} alt="" />
//         <h3>Nuevo registro</h3>
//       </div>

//       {/* MODAL PRINCIPAL */}
//       <Modal isOpen={isModalOpen}>
//         <h2>Ingreso de reactivos quimicos</h2>

//         <button
//           className="botonModalPrincipal"
//           onClick={() => {
//             setTempBasica(formData.basica);
//             setIsFirstModalOpen(true);
//           }}
//         >
//           Información básica
//         </button>

//         <button
//           className="botonModalPrincipal"
//           onClick={() => setIsSecondModalOpen(true)}
//         >
//           Información general
//         </button>

//         <button
//           className="botonModalPrincipal"
//           onClick={() => setIsThirdModalOpen(true)}
//         >
//           Información específica
//         </button>

//         <div className="botonModalPrincipalEnviarGuardar">
//           <button onClick={enviarTodo}>
//             {editandoId ? "Actualizar" : "Guardar"}
//           </button>

//           <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
//         </div>
//       </Modal>

//       {/* BASICA */}
//       <Modal isOpen={isFirstModalOpen}>
//         <div className="contnedorBasica">
//           <label htmlFor="">Reactivo</label>
//           <input
//             type="text"
//             value={tempBasica.reactivo}
//             onChange={handleTempChange(setTempBasica, "reactivo")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Familia</label>
//           <input
//             type="text"
//             value={tempBasica.familia}
//             onChange={handleTempChange(setTempBasica, "familia")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Grupo</label>
//           <select
//             value={tempBasica.grupo}
//             onChange={handleTempChange(setTempBasica, "grupo")}
//           >
//             <option value="a">A</option>
//             <option value="b">B</option>
//             <option value="c">C</option>
//             <option value="d">D</option>
//             <option value="e">E</option>
//           </select>
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Sinonimo</label>
//           <input
//             type="text"
//             value={tempBasica.sinonimo}
//             onChange={handleTempChange(setTempBasica, "sinonimo")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Cas</label>
//           <input
//             type="text"
//             value={tempBasica.cas}
//             onChange={handleTempChange(setTempBasica, "cas")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Marca</label>
//           <input
//             type="text"
//             value={tempBasica.marca}
//             onChange={handleTempChange(setTempBasica, "marca")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Referencia</label>
//           <input
//             type="text"
//             value={tempBasica.referencia}
//             onChange={handleTempChange(setTempBasica, "referencia")}
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">¿FDS completa?</label>
//           <select
//             value={tempBasica.fdsCompleta}
//             onChange={handleTempChange(setTempBasica, "fdsCompleta")}
//           >
//             <option value="si">Sí</option>
//             <option value="no">No</option>
//           </select>
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">
//             Ultima fecha de actualizacion o creacion de FDS
//           </label>
//           <input
//             value={tempBasica.ultimaFechaActualizacion}
//             onChange={handleTempChange(
//               setTempBasica,
//               "ultimaFechaActualizacion",
//             )}
//             type="date"
//             id=""
//             name="fecha"
//           />
//         </div>

//         <div className="contnedorBasica">
//           <label htmlFor="">Estado fisico</label>
//           <select
//             value={tempBasica.estadoFisico}
//             onChange={handleTempChange(setTempBasica, "estadoFisico")}
//           >
//             <option value="solido">Solido</option>
//             <option value="liquido">Liquido</option>
//           </select>
//         </div>

//         <button
//           className="botonModalPictogramas_1"
//           onClick={() => {
//             setTempPictogramas([]); // 🔥 SIEMPRE vacío
//             setIsPictogramasModalOpen(true);
//           }}
//         >
//           Peligrosidad SGA
//         </button>

//         <div className="botonModalBasica">
//           <button
//             onClick={() => {
//               setFormData((prev) => ({
//                 ...prev,
//                 basica: tempBasica,
//               }));

//               console.log("Guardado basica:", tempBasica);

//               setIsFirstModalOpen(false);
//             }}
//           >
//             Guardar
//           </button>
//           <button
//             onClick={() => {
//               setTempBasica(formData.basica); //revertir cambios
//               setIsFirstModalOpen(false);
//             }}
//           >
//             Cancelar
//           </button>
//         </div>
//       </Modal>

//       {/* GENERAL */}
//       <Modal isOpen={isSecondModalOpen}>
//         <div className="contenedorGenearl">
//           <label htmlFor="">Codigo frase H</label>
//           <textarea name="" id=""></textarea>
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Toxicidad aguda CAT 1 CAT 2</label>
//           <textarea name="" id=""></textarea>
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="SusCancer">Sustancia cancerigena</label>
//           <select>
//             <option value="si">Si</option>
//             <option value="no">No</option>
//           </select>
//         </div>

//         <h2>Ubicacion</h2>
//         <div className="contenedorGenearl">
//           <label htmlFor="">Sitio de almacenamiento</label>
//           <input />
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Ubicacion especifica</label>
//           <input />
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="UniMedida">Unidad de medida</label>
//           <select>
//             <option value="gl">gl</option>
//             <option value="g">g</option>
//             <option value="Kg">Kg</option>
//             <option value="L">L</option>
//             <option value="ml">ml</option>
//             <option value="mg">mg</option>
//             <option value="Oz">Oz</option>
//           </select>
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Presentacion</label>
//           <input />
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Numero de recipientes</label>
//           <input />
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Cantidad total</label>
//           <input />
//         </div>

//         <div className="contenedorGenearl">
//           <label htmlFor="">Cantidad real</label>
//           <input />
//         </div>

//         <div className="botonModalGeneral">
//           <button
//             onClick={() => {
//               console.log("Datos guardados (general):", formData.general);
//               setIsFirstModalOpen(false);
//             }}
//           >
//             Guardar
//           </button>
//           <button onClick={() => setIsSecondModalOpen(false)}>Cancelar</button>
//         </div>
//       </Modal>

//       {/* ESPECIFICA */}
//       <Modal isOpen={isThirdModalOpen} className="modal-content">
//         <h2>Sustancias controladas RES001:2015</h2>

//         <div className="form-group">
//           <label htmlFor="EsControlado">Es controlado</label>
//           <select>
//             <option value="si">Si</option>
//             <option value="no">No</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="">Componente 1</label>
//           <input />
//         </div>

//         <div className="form-group">
//           <label htmlFor="">clasificacion almacenamiento</label>
//           <input />
//         </div>

//         <div className="form-group">
//           <label htmlFor="SAF-T-DATA">Separacion metodo SAF-T-DATA</label>
//           <select>
//             <option value="T">T</option>
//             <option value="C">C</option>
//             <option value="I">I</option>
//             <option value="O">O</option>
//             <option value="PMA">PMA</option>
//             <option value="RM">RM</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="fechaIngresoLab">
//             Fecha de ingreso de la sustancia al laboratorio de quimica
//           </label>
//           <input type="date" id="" name="" />
//         </div>

//         <div className="form-group">
//           <label htmlFor="fechaVencimientoProyec">
//             Fecha de vencimiento proyectada
//           </label>
//           <input type="date" id="" name="" />
//         </div>

//         <div className="form-group">
//           <label htmlFor="">Observaciones</label>
//           <textarea name="" id=""></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="">Palabra advertencia</label>
//           <input />
//         </div>

//         <h2>Consejos de prudencia (Frases P)</h2>
//         <div className="form-group">
//           <label htmlFor="">Preventiva codigo/detalle</label>
//           <textarea name="" id=""></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="">respuesta o intervencion codigo/detalle</label>
//           <textarea name="" id=""></textarea>
//         </div>

//         <h2>Informacion proveedor</h2>
//         <div className="form-group">
//           <label htmlFor="">Razon social</label>
//           <input type="text" />
//         </div>

//         <div className="form-group">
//           <label htmlFor="">Direccion</label>
//           <input type="text" />
//         </div>

//         <div className="form-group">
//           <label htmlFor="">Contacto</label>
//           <input type="text" />
//         </div>

//         <div className="botonModalEspecifica">
//           <button>Guardar</button>
//           <button onClick={() => setIsThirdModalOpen(false)}>Cancelar</button>
//         </div>
//       </Modal>

//       {/* PICTOGRAMAS */}
//       <Modal isOpen={isPictogramasModalOpen}>
//         <div className="contenedor-pictogramas">
//           {catalogoPictogramas.map((p) => (
//             <div
//               key={p.id}
//               className={`pictograma-item ${
//                 tempPictogramas.includes(p.id) ? "activo" : ""
//               }`}
//               onClick={() => toggleTempPictograma(p.id)}
//             >
//               <img src={`http://localhost:8000${p.url}`} alt="" />
//             </div>
//           ))}
//         </div>

//         <div className="botonModalPictogramas_2">
//           <button
//             onClick={() => {
//               setFormData((prev) => ({
//                 ...prev,
//                 pictogramas: tempPictogramas,
//               }));

//               console.log("Seleccionados:", tempPictogramas); // 👈 verificar

//               setTempPictogramas([]); //LIMPIAR SELECCIÓN
//               setIsPictogramasModalOpen(false);
//             }}
//           >
//             Guardar selección
//           </button>
//           <button onClick={() => setIsPictogramasModalOpen(false)}>
//             Cancelar
//           </button>
//         </div>
//       </Modal>

//       {/* TABLA */}
//       <table>
//         <tbody>
//           {reactivos.map((r) => (
//             <tr key={r.id}>
//               <td>{r.nombre}</td>
//               <td>
//                 <button onClick={() => setReactivoSeleccionado(r)}>Ver</button>
//                 <button onClick={() => editar(r)}>Editar</button>
//                 <button onClick={() => eliminar(r.id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {reactivoSeleccionado && (
//         <PanelReactivo
//           reactivo={reactivoSeleccionado}
//           cerrar={() => setReactivoSeleccionado(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default TablaReactivos;

/////////////////////////7

import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
import "../styles/paginaPrincipal.css";
import "../styles/pictogramas.css";
import "../styles/tabla.css";
import "../styles/inputsModales.css";

import Modal from "../hoosk/modalReutilizable";
import PanelReactivo from "./PanelReactivo";

import { useState, useEffect } from "react";

function TablaReactivos({ seleccionarReactivo }) {
  const [reactivos, setReactivos] = useState([]);
  const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  // 🔥 ESTADO GLOBAL
  const [formData, setFormData] = useState({
    basica: {
      reactivo: "",
      familia: "",
      grupo: "",
      sinonimo: "",
      cas: "",
      marca: "",
      referencia: "",
      fdsCompleta: "",
      ultimaFechaActualizacion: "",
      estadoFisico: "",
    },
    general: {
      cantidadTotal: "",
      cantidadReal: "",
    },
    especifica: {
      palabraDvertencia: "",
    },
    pictogramas: [],
  });

  // 🔥 ESTADOS TEMPORALES (NUEVO)
  const [tempBasica, setTempBasica] = useState(formData.basica);
  const [tempGeneral, setTempGeneral] = useState(formData.general);
  const [tempEspecifica, setTempEspecifica] = useState(formData.especifica);
  const [tempPictogramas, setTempPictogramas] = useState([]);

  // 🔹 MODALES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

  const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);

  // 🔥 HANDLER UNIVERSAL PARA TEMP (YA LO TENÍAS BIEN)
  const handleTempChange =
    (setter, campo, isNumber = false) =>
    (e) => {
      let value = e.target.value;

      if (isNumber) {
        value = value === "" ? "" : parseFloat(value);
        if (isNaN(value)) value = "";
      }

      setter((prev) => ({
        ...prev,
        [campo]: value,
      }));
    };

  // 🔥 FUNCIÓN PRO DE MAPEO (NUEVO)
  const mapItemToFormData = (item) => ({
    basica: {
      reactivo: item.nombre || "",
      familia: item.basica?.familia || "",
      grupo: item.basica?.grupo || "",
      sinonimo: item.basica?.sinonimo || "",
      cas: item.basica?.cas || "",
      marca: item.basica?.marca || "",
      referencia: item.basica?.referencia || "",
      fdsCompleta: item.basica?.fdsCompleta || "",
      ultimaFechaActualizacion: item.basica?.ultimaFechaActualizacion || "",
      estadoFisico: item.basica?.estadoFisico || "",
    },
    general: {
      cantidadTotal: item.general?.cantidadTotal || "",
      cantidadReal: item.general?.cantidadReal || "",
    },
    especifica: {
      palabraDvertencia: item.especifica?.palabraDvertencia || "",
    },
    pictogramas: item.pictogramas?.map((p) => p.id) || [],
  });

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

  // useEffect(() => {
  //   console.log("🟡 TEMP BASICA:", tempBasica);
  // }, [tempBasica]);

  // useEffect(() => {
  //   console.log("🟡 TEMP GENERAL:", tempGeneral);
  // }, [tempGeneral]);

  // useEffect(() => {
  //   console.log("🟡 TEMP ESPECIFICA:", tempEspecifica);
  // }, [tempEspecifica]);

  // useEffect(() => {
  //   console.log("🟢 GLOBAL formData:", formData);
  // }, [formData]);

  // 🔥 EDITAR CORREGIDO (SINCRONIZA TODO)
  const editar = (item) => {
    const data = mapItemToFormData(item);

    setEditandoId(item.id);

    setFormData(data);

    // 🔥 IMPORTANTE: sincronizar temporales
    setTempBasica(data.basica);
    setTempGeneral(data.general);
    setTempEspecifica(data.especifica);
    setTempPictogramas(data.pictogramas);

    setIsModalOpen(true);
  };

  const toggleTempPictograma = (id) => {
    setTempPictogramas((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  // 🔹 ENVIAR
  const enviarTodo = async () => {
    console.log("FORM DATA:", formData);

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
      {/* 🔥 BOTÓN NUEVO CORREGIDO */}
      <div
        className="contenedor-cierreSesion"
        onClick={() => {
          setEditandoId(null);

          const limpio = {
            basica: {
              reactivo: "",
              familia: "",
              grupo: "",
              sinonimo: "",
              cas: "",
              marca: "",
              referencia: "",
              fdsCompleta: "",
              ultimaFechaActualizacion: "",
              estadoFisico: "",
            },
            general: {
              cantidadTotal: "",
              cantidadReal: "",
            },
            especifica: {
              palabraDvertencia: "",
            },
            pictogramas: [],
          };

          setFormData(limpio);

          // 🔥 sincronizar temporales
          setTempBasica(limpio.basica);
          setTempGeneral(limpio.general);
          setTempEspecifica(limpio.especifica);
          setTempPictogramas([]);

          setIsModalOpen(true);
        }}
      >
        <img src={iconoAgregarRegistro} alt="" />
        <h3>Nuevo registro</h3>
      </div>

      {/* MODAL PRINCIPAL */}
      <Modal isOpen={isModalOpen}>
        <h2>Ingreso de reactivos quimicos</h2>

        {/* 🔥 sincroniza temp antes de abrir */}
        <button
          onClick={() => {
            setTempBasica(formData.basica);
            setIsFirstModalOpen(true);
          }}
        >
          Información básica
        </button>

        <button
          onClick={() => {
            setTempGeneral(formData.general);
            setIsSecondModalOpen(true);
          }}
        >
          Información general
        </button>

        <button
          onClick={() => {
            setTempEspecifica(formData.especifica);
            setIsThirdModalOpen(true);
          }}
        >
          Información específica
        </button>

        <button onClick={enviarTodo}>
          {editandoId ? "Actualizar" : "Guardar"}
        </button>

        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </Modal>

      {/* BASICA */}
      <Modal isOpen={isFirstModalOpen}>
        <input
          value={tempBasica.reactivo}
          onChange={handleTempChange(setTempBasica, "reactivo")}
        />

        <input
          value={tempBasica.familia}
          onChange={handleTempChange(setTempBasica, "familia")}
        />

        {/* 🔥 BOTONES CORREGIDOS */}
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              basica: tempBasica,
            }));
            setIsFirstModalOpen(false);
          }}
        >
          Guardar
        </button>

        <button
          onClick={() => {
            setTempBasica(formData.basica);
            setIsFirstModalOpen(false);
          }}
        >
          Cancelar
        </button>
      </Modal>

      {/* GENERAL */}
      <Modal isOpen={isSecondModalOpen}>
        <input
          value={tempGeneral.cantidadTotal}
          onChange={handleTempChange(setTempGeneral, "cantidadTotal")}
        />

        <input
          value={tempGeneral.cantidadReal}
          onChange={handleTempChange(setTempGeneral, "cantidadReal")}
        />
        {/* 
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              general: tempGeneral,
            }));
            setIsSecondModalOpen(false);
          }}
        >
          Guardar
        </button> */}
        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              general: {
                ...tempGeneral,
                cantidadTotal: parseFloat(tempGeneral.cantidadTotal) || 0,
                cantidadReal: parseFloat(tempGeneral.cantidadReal) || 0,
              },
            }));

            setIsSecondModalOpen(false);
          }}
        >
          Guardar
        </button>

        <button
          onClick={() => {
            setTempGeneral(formData.general);
            setIsSecondModalOpen(false);
          }}
        >
          Cancelar
        </button>
      </Modal>

      {/* ESPECIFICA */}
      <Modal isOpen={isThirdModalOpen}>
        <input
          value={tempEspecifica.palabraDvertencia}
          onChange={handleTempChange(setTempEspecifica, "palabraDvertencia")}
        />

        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              especifica: tempEspecifica,
            }));
            setIsThirdModalOpen(false);
          }}
        >
          Guardar
        </button>

        <button
          onClick={() => {
            setTempEspecifica(formData.especifica);
            setIsThirdModalOpen(false);
          }}
        >
          Cancelar
        </button>
      </Modal>

      {/* PICTOGRAMAS */}
      <Modal isOpen={isPictogramasModalOpen}>
        <div>
          {catalogoPictogramas.map((p) => (
            <div key={p.id} onClick={() => toggleTempPictograma(p.id)}>
              <img src={`http://localhost:8000${p.url}`} />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              pictogramas: tempPictogramas,
            }));

            setIsPictogramasModalOpen(false);
          }}
        >
          Guardar selección
        </button>
      </Modal>

      {/* TABLA */}
      <table>
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
