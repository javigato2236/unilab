// import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
// import "../styles/paginaPrincipal.css";
// import "../styles/pictogramas.css";
// import "../styles/tabla.css";

// import Modal from "../hoosk/modalReutilizable";
// import PanelReactivo from "./PanelReactivo";

// import { useState, useEffect } from "react";

// function TablaReactivos({ seleccionarReactivo }) {
//   // 🔹 LISTA DE REACTIVOS
//   const [reactivos, setReactivos] = useState([]);

//   // 🔹 NUEVO: REACTIVO SELECCIONADO (PARA VER)
//   const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);

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
//   const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
//   const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
//   const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

//   // 🔹 CAMPOS
//   const [nombre, setNombre] = useState("");
//   const [familia, setFamilia] = useState("");
//   const [sinonimo, setSinonimo] = useState("");
//   const [cantidadTotal, setCantidadTotal] = useState("");
//   const [cantidadReal, setCantidadReal] = useState("");
//   const [palabraAdvertencia, setPalabraAdvertencia] = useState("");

//   // 🔹 PICTOGRAMAS
//   const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
//   const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);

//   const toUpper = (setter) => (e) => {
//     setter(e.target.value.toUpperCase());
//   };

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

//   // 🔹 GUARDAR
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

//   const guardarPictogramas = () => {
//     setFormData((prev) => ({
//       ...prev,
//       pictogramas: pictogramasSeleccionados,
//     }));
//     setIsPictogramasOpen(false);
//   };

//   // 🔹 ENVIAR
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
//         <button onClick={() => setIsSecondModalOpen(true)}>
//           Información general
//         </button>
//         <button onClick={() => setIsThirdModalOpen(true)}>
//           Información específica
//         </button>

//         <button onClick={enviarTodo}>
//           {editandoId ? "Actualizar" : "Guardar"}
//         </button>

//         <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
//       </Modal>

//       {/* BASICA */}
//       <Modal isOpen={isFirstModalOpen}>
//         <form>
//           <label htmlFor="">Nombre de la sustancia</label>
//           <input type="text" />

//           <label htmlFor="">Familia</label>
//           <input type="text" />

//           <label htmlFor="">Grupo</label>
//           <select id="Grupo" name="Grupo">
//             <option value="a">A</option>
//             <option value="b">B</option>
//             <option value="c">C</option>
//             <option value="d">D</option>
//             <option value="e">E</option>
//             <option value="f">F</option>
//           </select>

//           <label htmlFor="">Sinonimo</label>
//           <input type="text" />

//           <label htmlFor="">Cas</label>
//           <input type="text" />

//           <label htmlFor="">Marca</label>
//           <input type="text" />

//           <label htmlFor="">Referencia</label>
//           <input type="text" />

//           <label htmlFor="">FDS Completa?</label>
//           <select id="FDS" name="FDS">
//             <option value="si">Si</option>
//             <option value="no">No</option>
//           </select>

//           <label htmlFor="">Utima fecha actualizacion o creacion FDS</label>
//           <input
//             type="date"
//             onChange={(e) => setFechaActualizacionFDS(e.target.value)}
//           />

//           <label htmlFor="">Estado fisico</label>
//           <select id="Estado" name="Estado">
//             <option value="solido">Solido</option>
//             <option value="liquido">Liquido</option>
//           </select>

//           <button type="button" onClick={() => setIsPictogramasModalOpen(true)}>
//             Pictogramas
//           </button>
//           <button onClick={guardarBasica}>Guardar</button>
//           <button onClick={() => setIsFirstModalOpen(false)}>Cancelar</button>
//         </form>
//       </Modal>

//       {/* GENERAL */}
//       <Modal isOpen={isSecondModalOpen}>
//         <form action="">
//           <label htmlFor="">Codigo frase H</label>
//           <input type="text" />

//           <label htmlFor="">Sustancia cancerigena</label>
//           <select id="Suscancer" name="Suscancer">
//             <option value="si">Si</option>
//             <option value="no">No</option>
//           </select>

//           <h3>Ubicacion</h3>
//           <label htmlFor="">Sitio de almacenamiento </label>
//           <input type="text" />

//           <label htmlFor="">Ubicacion especifica</label>
//           <input type="text" />

//           <label htmlFor="">Unidad de medida</label>
//           <input type="text" />

//           <label htmlFor="">Presentacion</label>
//           <input type="text" />

//           <label htmlFor="">Numero de recipientes</label>
//           <input type="text" />

//           <label htmlFor="">Catidad total</label>
//           <input type="text" />

//           <label htmlFor="">Cantidad real</label>
//           <input type="text" />

//           <h3>Sustancias controladas RES001:2025</h3>
//           <label htmlFor="">Es controlado</label>
//           <select id="Suscontrol" name="suscontrol">
//             <option value="si">Si</option>
//             <option value="no">No</option>
//           </select>

//           <label htmlFor="">Componente 1</label>
//           <input type="text" />

//           <label htmlFor="">Clacificacion almacenamiento</label>
//           <input type="text" />

//           <label htmlFor="">Separacion metodo SAF-T-DATA </label>
//           <select id="Separasatdata" name="Separasatdata">
//             <option value="c">C</option>
//             <option value="i">I</option>
//             <option value="o">O</option>
//             <option value="pma">PMA</option>
//             <option value="rm">RM</option>
//             <option value="t">T</option>
//           </select>

//           <label htmlFor="">
//             Fecha de ingreso de la sustancia quimica al laboratorio
//           </label>
//           <input
//             type="date"
//             onChange={(e) => setFechaIngresoReactivo(e.target.value)}
//           />

//           <label htmlFor="">Fecha vencimiento proyectado</label>
//           <input
//             type="date"
//             onChange={(e) => setFechaVencimientoProyec(e.target.value)}
//           />

//           <label htmlFor="observaciones">Observaciones</label>
//           <textarea id="Observaciones" name="Observaciones"></textarea>

//           <button onClick={guardarEspecifica}>Guardar</button>
//           <button onClick={() => setIsSecondModalOpen(false)}>Cancelar</button>
//         </form>
//       </Modal>

//       {/* ESPECIFICA */}
//       <Modal isOpen={isThirdModalOpen}>
//         <form action="">
//           <label htmlFor="">Palabra de advertencia</label>
//           <input type="text" />

//           <h2>Consejos de prudencia (frases p)</h2>
//           <label htmlFor="preventiva">Preventiva codigo/detalle</label>
//           <textarea id="Preventiva" name="Preventiva"></textarea>

//           <label htmlFor="respuestaIntervencion">
//             Respuesta o intervencion codigo/detalle
//           </label>
//           <textarea
//             id="RespuestaIntervencion"
//             name="RespuestaIntervencion"
//           ></textarea>

//           <h2>Informacion proveedor</h2>
//           <label htmlFor="infoproveedor">Razon social</label>
//           <input type="text" />

//           <label htmlFor="">direccion</label>
//           <input type="text" />

//           <label htmlFor="">Contacto</label>
//           <input type="text" />

//           <button onClick={guardarEspecifica}>Guardar</button>
//           <button onClick={() => setIsThirdModalOpen(false)}>Cancelar</button>
//         </form>
//       </Modal>

//       {/* PICTOGRAMAS */}
// <Modal isOpen={isPictogramasModalOpen}>
//   <div className="contenedor-pictogramas">
//     {catalogoPictogramas.map((p) => (
//       <label
//         key={p.id}
//         className={`pictograma-item ${pictogramasSeleccionados.includes(p.id) ? "seleccionado" : ""}`}
//       >
//         <input
//           type="checkbox"
//           checked={pictogramasSeleccionados.includes(p.id)}
//           onChange={() => {
//             setPictogramasSeleccionados((prev) =>
//               prev.includes(p.id)
//                 ? prev.filter((id) => id !== p.id)
//                 : [...prev, p.id],
//             );
//           }}
//         />
//         <img src={`http://localhost:8000${p.url}`} alt={p.nombre} />
//       </label>
//     ))}
//   </div>

//   <button onClick={guardarPictogramas}>Guardar</button>
//   <button onClick={() => setIsPictogramasModalOpen(false)}>
//     Cancelar
//   </button>
// </Modal>

//       {/* TABLA */}
//       <table className="tabla-reactivos">
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
//       {/* 🔹 PANEL */}
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

////////////////////////////////////////////////////////

import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
import "../styles/paginaPrincipal.css";
import "../styles/pictogramas.css";
import "../styles/tabla.css";

import Modal from "../hoosk/modalReutilizable";
import PanelReactivo from "./PanelReactivo";

import { useState, useEffect } from "react";

function TablaReactivos({ seleccionarReactivo }) {
  const [reactivos, setReactivos] = useState([]);
  const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  // 🔥 ESTADO ÚNICO
  const [formData, setFormData] = useState({
    basica: { nombre: "", familia: "", sinonimo: "" },
    general: { cantidad_total: "", cantidad_real: "" },
    especifica: { palabra_advertencia: "" },
    pictogramas: [],
  });

  // 🔹 MODALES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

  const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
  const [tempPictogramas, setTempPictogramas] = useState([]); //////////////7
  // 🔥 HANDLER UNIVERSAL
  const handleChange =
    (seccion, campo, isNumber = false) =>
    (e) => {
      const value = isNumber ? Number(e.target.value) : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [seccion]: {
          ...prev[seccion],
          [campo]: value,
        },
      }));
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

  // 🔥 EDITAR LIMPIO
  const editar = (item) => {
    setEditandoId(item.id);

    setFormData({
      basica: {
        nombre: item.nombre || "",
        familia: item.basica?.familia || "",
        sinonimo: item.basica?.sinonimo || "",
      },
      general: {
        cantidad_total: item.general?.cantidad_total || "",
        cantidad_real: item.general?.cantidad_real || "",
      },
      especifica: {
        palabra_advertencia: item.especifica?.palabra_advertencia || "",
      },
      pictogramas: item.pictogramas?.map((p) => p.id) || [],
    });

    setIsModalOpen(true);
  };

  // 🔹 PICTOGRAMAS
  // const togglePictograma = (id) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     pictogramas: prev.pictogramas.includes(id)
  //       ? prev.pictogramas.filter((p) => p !== id)
  //       : [...prev.pictogramas, id],
  //   }));
  // };
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
      {/* BOTÓN NUEVO */}
      <div
        className="contenedor-cierreSesion"
        onClick={() => {
          // limpiar modo edición
          setEditandoId(null);

          // limpiar formulario completo
          setFormData({
            basica: { nombre: "", familia: "", sinonimo: "" },
            general: { cantidad_total: "", cantidad_real: "" },
            especifica: { palabra_advertencia: "" },
            pictogramas: [],
          });

          //MUY IMPORTANTE: limpiar selección temporal
          // setTempPictogramas([]);

          // abrir modal principal
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
        <input
          placeholder="Nombre"
          value={formData.basica.nombre}
          onChange={handleChange("basica", "nombre")}
        />
        <input
          placeholder="Familia"
          value={formData.basica.familia}
          onChange={handleChange("basica", "familia")}
        />
        <input
          placeholder="Sinonimo"
          value={formData.basica.sinonimo}
          onChange={handleChange("basica", "sinonimo")}
        />

        <button
          onClick={() => {
            setTempPictogramas([]); // 🔥 SIEMPRE vacío
            setIsPictogramasModalOpen(true);
          }}
        >
          Pictogramas
        </button>
        <button onClick={() => setIsFirstModalOpen(false)}>Cerrar</button>
      </Modal>

      {/* GENERAL */}
      <Modal isOpen={isSecondModalOpen}>
        <input
          placeholder="Cantidad total"
          value={formData.general.cantidad_total}
          onChange={handleChange("general", "cantidad_total", true)}
        />
        <input
          placeholder="Cantidad real"
          value={formData.general.cantidad_real}
          onChange={handleChange("general", "cantidad_real", true)}
        />

        <button onClick={() => setIsSecondModalOpen(false)}>Cerrar</button>
      </Modal>

      {/* ESPECIFICA */}
      <Modal isOpen={isThirdModalOpen}>
        <input
          placeholder="Palabra advertencia"
          value={formData.especifica.palabra_advertencia}
          onChange={handleChange("especifica", "palabra_advertencia")}
        />

        <button onClick={() => setIsThirdModalOpen(false)}>Cerrar</button>
      </Modal>

      {/* PICTOGRAMAS */}
      <Modal isOpen={isPictogramasModalOpen}>
        <div className="contenedor-pictogramas">
          {catalogoPictogramas.map((p) => (
            <div
              key={p.id}
              className={`pictograma-item ${
                tempPictogramas.includes(p.id) ? "activo" : ""
              }`}
              onClick={() => toggleTempPictograma(p.id)}
            >
              <img src={`http://localhost:8000${p.url}`} alt="" />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              pictogramas: tempPictogramas,
            }));

            console.log("Seleccionados:", tempPictogramas); // 👈 verificar

            setTempPictogramas([]); //LIMPIAR SELECCIÓN
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
