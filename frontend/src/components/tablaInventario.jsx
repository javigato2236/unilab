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

  // 🔥 ESTADO ÚNICO
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
  const [tempPictogramas, setTempPictogramas] = useState([]);
  // 🔥 HANDLER UNIVERSAL
  const handleChange =
    (seccion, campo, isNumber = false) =>
    (e) => {
      let value = e.target.value;

      if (isNumber) {
        value = value === "" ? "" : Number(value);
        if (isNaN(value)) value = "";
      }

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
        <h2>Ingreso de reactivos quimicos</h2>

        <button
          className="botonModalPrincipal"
          onClick={() => setIsFirstModalOpen(true)}
        >
          Información básica
        </button>

        <button
          className="botonModalPrincipal"
          onClick={() => setIsSecondModalOpen(true)}
        >
          Información general
        </button>

        <button
          className="botonModalPrincipal"
          onClick={() => setIsThirdModalOpen(true)}
        >
          Información específica
        </button>

        <div className="botonModalPrincipalEnviarGuardar">
          <button onClick={enviarTodo}>
            {editandoId ? "Actualizar" : "Guardar"}
          </button>

          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      </Modal>

      {/* BASICA */}
      <Modal isOpen={isFirstModalOpen}>
        <div className="contnedorBasica">
          <label htmlFor="">Reactivo</label>
          <input
            type="text"
            value={formData.basica.reactivo}
            onChange={handleChange("basica", "reactivo")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Familia</label>
          <input
            type="text"
            value={formData.basica.familia}
            onChange={handleChange("basica", "familia")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Grupo</label>
          <input
            type="text"
            value={formData.basica.grupo}
            onChange={handleChange("basica", "grupo")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Sinonimo</label>
          <input
            type="text"
            value={formData.basica.sinonimo}
            onChange={handleChange("basica", "sinonimo")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Cas</label>
          <input
            type="text"
            value={formData.basica.cas}
            onChange={handleChange("basica", "cas")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Marca</label>
          <input
            type="text"
            value={formData.basica.marca}
            onChange={handleChange("basica", "marca")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Referencia</label>
          <input
            type="text"
            value={formData.basica.referencia}
            onChange={handleChange("basica", "referencia")}
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">¿FDS completa?</label>
          <select
            value={formData.basica.fdsCompleta}
            onChange={handleChange("basica", "fdsCompleta")}
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">
            Ultima fecha de actualizacion o creacion de FDS
          </label>
          <input
            value={formData.basica.ultimaFechaActualizacion}
            onChange={handleChange("basica", "ultimaFechaActualizacion")}
            type="date"
            id=""
            name="fecha"
          />
        </div>

        <div className="contnedorBasica">
          <label htmlFor="">Estado fisico</label>
          <select
            value={formData.basica.estadoFisico}
            onChange={handleChange("basica", "estadoFisico")}
          >
            <option value="solido">Solido</option>
            <option value="liquido">Liquido</option>
          </select>
        </div>

        <button
          className="botonModalPictogramas_1"
          onClick={() => {
            setTempPictogramas([]); // 🔥 SIEMPRE vacío
            setIsPictogramasModalOpen(true);
          }}
        >
          Peligrosidad SGA
        </button>

        <div className="botonModalBasica">
          <button
            onClick={() => {
              console.log(
                "Datos guardados (basica):",
                formData.basica,
                formData.pictogramas,
              );
              setIsFirstModalOpen(false);
            }}
          >
            Guardar
          </button>
          <button
            className="botonModalBasica"
            onClick={() => setIsFirstModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* GENERAL */}
      <Modal isOpen={isSecondModalOpen}>
        <div className="contenedorGenearl">
          <label htmlFor="">Codigo frase H</label>
          <textarea name="" id=""></textarea>
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Toxicidad aguda CAT 1 CAT 2</label>
          <textarea name="" id=""></textarea>
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="SusCancer">Sustancia cancerigena</label>
          <select>
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </div>

        <h2>Ubicacion</h2>
        <div className="contenedorGenearl">
          <label htmlFor="">Sitio de almacenamiento</label>
          <input />
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Ubicacion especifica</label>
          <input />
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="UniMedida">Unidad de medida</label>
          <select>
            <option value="gl">gl</option>
            <option value="g">g</option>
            <option value="Kg">Kg</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="mg">mg</option>
            <option value="Oz">Oz</option>
          </select>
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Presentacion</label>
          <input />
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Numero de recipientes</label>
          <input />
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Cantidad total</label>
          <input
            value={formData.general.cantidad_total}
            onChange={handleChange("general", "cantidad_total", true)}
          />
        </div>

        <div className="contenedorGenearl">
          <label htmlFor="">Cantidad real</label>
          <input />
        </div>

        <div className="botonModalGeneral">
          <button>Guardar</button>
          <button onClick={() => setIsSecondModalOpen(false)}>Cancelar</button>
        </div>
      </Modal>

      {/* ESPECIFICA */}
      <Modal isOpen={isThirdModalOpen} className="modal-content">
        <h2>Sustancias controladas RES001:2015</h2>

        <div className="form-group">
          <label htmlFor="EsControlado">Es controlado</label>
          <select>
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="">Componente 1</label>
          <input />
        </div>

        <div className="form-group">
          <label htmlFor="">clasificacion almacenamiento</label>
          <input />
        </div>

        <div className="form-group">
          <label htmlFor="SAF-T-DATA">Separacion metodo SAF-T-DATA</label>
          <select>
            <option value="T">T</option>
            <option value="C">C</option>
            <option value="I">I</option>
            <option value="O">O</option>
            <option value="PMA">PMA</option>
            <option value="RM">RM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fechaIngresoLab">
            Fecha de ingreso de la sustancia al laboratorio de quimica
          </label>
          <input type="date" id="" name="" />
        </div>

        <div className="form-group">
          <label htmlFor="fechaVencimientoProyec">
            Fecha de vencimiento proyectada
          </label>
          <input type="date" id="" name="" />
        </div>

        <div className="form-group">
          <label htmlFor="">Observaciones</label>
          <textarea name="" id=""></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="">Palabra advertencia</label>
          <input
            value={formData.especifica.palabra_advertencia}
            onChange={handleChange("especifica", "palabra_advertencia")}
          />
        </div>

        <h2>Consejos de prudencia (Frases P)</h2>
        <div className="form-group">
          <label htmlFor="">Preventiva codigo/detalle</label>
          <textarea name="" id=""></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="">respuesta o intervencion codigo/detalle</label>
          <textarea name="" id=""></textarea>
        </div>

        <h2>Informacion proveedor</h2>
        <div className="form-group">
          <label htmlFor="">Razon social</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="">Direccion</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label htmlFor="">Contacto</label>
          <input type="text" />
        </div>

        <div className="botonModalEspecifica">
          <button>Guardar</button>
          <button onClick={() => setIsThirdModalOpen(false)}>Cancelar</button>
        </div>
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

        <div className="botonModalPictogramas_2">
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
          <button onClick={() => setIsPictogramasModalOpen(false)}>
            Cancelar
          </button>
        </div>
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
