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
    general: {
      codigoFraseH: "",
      toxicidadCat1Cat2: "",
      sustanciaCancerigena: "",
      sitioAlmacenamiento: "",
      ubicacionEspecifica: "",
      unidadDeMedida: "",
      presentacion: "",
      numeroDeRecipientes: "",
      cantidad_total: "",
      cantidad_real: "",
    },
    especifica: {
      esControlado: "",
      componente1: "",
      clasificacionAlmacenamiento: "",
      separacionMetodoSAFTDATA: "T",
      fechaIngresoLabQuimica: "",
      fechaVencimientoProyectada: "",
      observaciones: "",
      palabraDvertencia: "",
      preventivaCodigoDetalle: "",
      respuestaOintervencionCodigoDetalle: "",
      razonSocial: "",
      direccion: "",
      contacto: "",
    },
    pictogramas: [],
  });

  //ESTADOS TEMPORALES
  const [tempBasica, setTempBasica] = useState(formData.basica);
  const [tempGeneral, setTempGeneral] = useState(formData.general);
  const [tempEspecifica, setTempEspecifica] = useState(formData.general);

  // 🔹 MODALES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

  const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
  const [tempPictogramas, setTempPictogramas] = useState([]);

  // CONVERTIR A MAYÚSCULAS
  const convertirMayusculas = (obj) => {
    const nuevo = {};

    for (let key in obj) {
      nuevo[key] =
        typeof obj[key] === "string" ? obj[key].toUpperCase() : obj[key];
    }

    return nuevo;
  };

  //HANDLER UNIVERSAL GUARDA DATOS APENAS SE ESCRIBEN EN LOS INPUTS
  const handleChange =
    (seccion, campo, isNumber = false) =>
    (e) => {
      let value = e.target.value;

      if (isNumber) {
        value = value.replace(",", ".");
      }

      setFormData((prev) => ({
        ...prev,
        [seccion]: {
          ...prev[seccion],
          [campo]: value,
        },
      }));
    };

  const handleTempChange =
    (setter, campo, isNumber = false) =>
    (e) => {
      let value = e.target.value;

      if (isNumber) {
        value = value.replace(",", ".");
      }

      setter((prev) => ({
        ...prev,
        [campo]: value,
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

  useEffect(() => {
    console.log("TEMP BASICA:", tempBasica);
  }, [tempBasica]);

  // useEffect(() => {
  //   console.log("TEMP GENERAL:", tempGeneral);
  // }, [tempGeneral]);

  // useEffect(() => {
  //   console.log("TEMP ESPECIFICA:", tempEspecifica);
  // }, [tempEspecifica]);

  useEffect(() => {
    console.log("FORM DATA GLOBAL:", formData);
  }, [formData]);

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
              grupo: "A",
              sinonimo: "",
              cas: "",
              marca: "",
              referencia: "",
              fdsCompleta: "Sí",
              ultimaFechaActualizacion: "",
              estadoFisico: "Solido",
            },
            general: { cantidad_total: "", cantidad_real: "" },
            especifica: { palabra_advertencia: "" },
            pictogramas: [],
          });

          //MUY IMPORTANTE: limpiar selección temporal
          setTempPictogramas([]);

          // abrir modal principal/
          setIsModalOpen(true);
        }}
      >
        <img src={iconoAgregarRegistro} />
        <h3>Nuevo registro</h3>
      </div>

      {/* MODAL PRINCIPAL */}
      <Modal isOpen={isModalOpen}>
        <h2>Ingreso de reactivos quimicos</h2>

        <button
          className="botonModalPrincipal"
          onClick={() => {
            setTempBasica(formData.basica);
            setIsFirstModalOpen(true);
          }}
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
      <Modal isOpen={isFirstModalOpen} className="contenedorModalBasica">
        <div className="contenedorBasica">
          <label>Reactivo</label>
          <input
            type="text"
            value={tempBasica.reactivo}
            onChange={handleTempChange(setTempBasica, "reactivo")}
          />
        </div>

        <div className="contenedorBasica">
          <label>Familia</label>
          <input
            type="text"
            value={tempBasica.familia}
            onChange={handleTempChange(setTempBasica, "familia")}
          />
        </div>

        <div className="contenedorBasica">
          <label>Grupo</label>
          <select
            value={tempBasica.grupo}
            onChange={handleTempChange(setTempBasica, "grupo")}
          >
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
          </select>
        </div>

        <div className="contenedorBasica">
          <label>Sinonimo</label>
          <input
            type="text"
            value={tempBasica.sinonimo}
            onChange={handleTempChange(setTempBasica, "sinonimo")}
          />
        </div>

        <div className="contenedorBasica">
          <label>Cas</label>
          <input
            type="text"
            value={tempBasica.cas}
            onChange={handleTempChange(setTempBasica, "cas")}
          />
        </div>

        <div className="contenedorBasica">
          <label>Marca</label>
          <input
            type="text"
            value={tempBasica.marca}
            onChange={handleTempChange(setTempBasica, "marca")}
          />
        </div>

        <div className="contenedorBasica">
          <label>Referencia</label>
          <input
            type="text"
            value={tempBasica.referencia}
            onChange={handleTempChange(setTempBasica, "referencia")}
          />
        </div>

        <div className="contenedorBasica">
          <label>¿FDS completa?</label>
          <select
            value={tempBasica.fdsCompleta}
            onChange={handleTempChange(setTempBasica, "fdsCompleta")}
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="contenedorBasica">
          <label>Ultima fecha de actualizacion o creacion de FDS</label>
          <input
            value={tempBasica.ultimaFechaActualizacion}
            onChange={handleTempChange(
              setTempBasica,
              "ultimaFechaActualizacion",
            )}
            type="date"
            name="fecha"
          />
        </div>

        <div className="contenedorBasica">
          <label>Estado fisico</label>
          <select
            value={tempBasica.estadoFisico}
            onChange={handleTempChange(setTempBasica, "estadoFisico")}
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
          {/* <button
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                basica: tempBasica,
              }));

              console.log("Guardado basica:", tempBasica);

              setIsFirstModalOpen(false);
            }}
          >
            Guardar
          </button> */}
          <button
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                basica: convertirMayusculas(tempBasica),
              }));

              setIsFirstModalOpen(false);
            }}
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setTempBasica({
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
              });

              setIsFirstModalOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* GENERAL */}
      <Modal isOpen={isSecondModalOpen} className="contenedorModalGeneral">
        <div className="contenedorGeneral">
          <label>Codigo frase H</label>
          <textarea
            value={tempGeneral.codigoFraseH}
            onChange={handleTempChange(setTempGeneral, "codigoFraseH")}
          ></textarea>
        </div>

        <div className="contenedorGeneral">
          <label>Toxicidad aguda CAT 1 CAT 2</label>
          <textarea
            value={tempGeneral.toxicidadCat1Cat2}
            onChange={handleTempChange(setTempGeneral, "toxicidadCat1Cat2")}
          ></textarea>
        </div>

        <div className="contenedorGeneral">
          <label>Sustancia cancerigena</label>
          <select
            value={tempGeneral.sustanciaCancerigena}
            onChange={handleTempChange(setTempGeneral, "sustanciaCancerigena")}
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <h2 className="contenedorGeneraltitulo">Ubicacion</h2>
        <div className="contenedorGeneral2">
          <div className="contenedorGeneral">
            <label>Sitio de almacenamiento</label>
            <input
              value={tempGeneral.sitioAlmacenamiento}
              onChange={handleTempChange(setTempGeneral, "sitioAlmacenamiento")}
            />
          </div>

          <div className="contenedorGeneral">
            <label>Ubicacion especifica</label>
            <input
              value={tempGeneral.ubicacionEspecifica}
              onChange={handleTempChange(setTempGeneral, "ubicacionEspecifica")}
            />
          </div>

          <div className="contenedorGeneral">
            <label htmlFor="UniMedida">Unidad de medida</label>
            <select
              value={tempGeneral.unidadDeMedida}
              onChange={handleTempChange(setTempGeneral, "unidadDeMedida")}
            >
              <option value="gl">gl</option>
              <option value="g">g</option>
              <option value="Kg">Kg</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="mg">mg</option>
              <option value="Oz">Oz</option>{" "}
            </select>
          </div>

          <div className="contenedorGeneral">
            <label>Presentacion</label>
            <input
              value={tempGeneral.presentacion}
              onChange={handleTempChange(setTempGeneral, "presentacion")}
            />
          </div>

          <div className="contenedorGeneral">
            <label>Numero de recipientes</label>
            <input
              value={tempGeneral.numeroDeRecipientes}
              onChange={handleTempChange(setTempGeneral, "numeroDeRecipientes")}
            />
          </div>

          <div className="contenedorGeneral">
            <label>Cantidad total</label>
            <input
              type="text"
              inputMode="decimal"
              value={tempGeneral.cantidad_total ?? ""}
              onChange={handleTempChange(
                setTempGeneral,
                "cantidad_total",
                true,
              )}
            />
          </div>

          <div className="contenedorGeneral">
            <label>Cantidad real</label>

            <input
              type="text"
              inputMode="decimal"
              value={tempGeneral.cantidad_real ?? ""}
              onChange={handleTempChange(setTempGeneral, "cantidad_real", true)}
            />
          </div>
        </div>

        <div className="botonModalGeneral">
          {/* <button
            onClick={() => {
              console.log("Datos guardados (general):", formData.general);
              setIsFirstModalOpen(false);
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

                  numeroDeRecipientes: parseInt(
                    tempGeneral.numeroDeRecipientes || 0,
                  ),

                  cantidad_total: parseFloat(tempGeneral.cantidad_total || 0),

                  cantidad_real: parseFloat(tempGeneral.cantidad_real || 0),
                },
              }));

              setIsSecondModalOpen(false);
            }}
          >
            Guardar
          </button>

          <button
            onClick={() => {
              setTempGeneral({
                codigoFraseH: "",
                toxicidadCat1Cat2: "",
                sustanciaCancerigena: "",
                sitioAlmacenamiento: "",
                ubicacionEspecifica: "",
                unidadDeMedida: "",
                presentacion: "",
                numeroDeRecipientes: "",
                cantidadTotal: "",
                cantidadReal: "",
              });

              setIsSecondModalOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* ESPECIFICA */}
      <Modal isOpen={isThirdModalOpen} className="contenedorModalEpecifica">
        <h2>Sustancias controladas RES001:2015</h2>

        <div className="contenedorEspecifica">
          <label>Es controlado</label>
          <select>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="contenedorEspecifica">
          <label>Componente 1</label>
          <input />
        </div>

        <div className="contenedorEspecifica">
          <label>clasificacion almacenamiento</label>
          <input />
        </div>

        <div className="contenedorEspecifica">
          <label>Separacion metodo SAF-T-DATA</label>
          <select>
            <option value="T">T</option>
            <option value="C">C</option>
            <option value="I">I</option>
            <option value="O">O</option>
            <option value="PMA">PMA</option>
            <option value="RM">RM</option>
          </select>
        </div>

        <div className="contenedorEspecifica">
          <label>
            Fecha de ingreso de la sustancia al laboratorio de quimica
          </label>
          <input type="date" />
        </div>

        <div className="contenedorEspecifica">
          <label>Fecha de vencimiento proyectada</label>
          <input type="date" />
        </div>

        <div className="contenedorEspecifica">
          <label>Observaciones</label>
          <textarea></textarea>
        </div>

        <div className="contenedorEspecifica">
          <label>Palabra advertencia</label>
          <input />
        </div>

        <div className="contenedorEspecifica2">
          <h2>Consejos de prudencia (Frases P)</h2>
          <div className="contenedorEspecifica">
            <label>Preventiva codigo/detalle</label>
            <textarea></textarea>
          </div>

          <div className="contenedorEspecifica">
            <label>respuesta o intervencion codigo/detalle</label>
            <textarea></textarea>
          </div>

          <div className="contenedorEspecifica">
            <h2>Informacion proveedor</h2>
            <label>Razon social</label>
            <input type="text" />
          </div>

          <div className="contenedorEspecifica">
            <label>Direccion</label>
            <input type="text" />
          </div>

          <div className="contenedorEspecifica">
            <label>Contacto</label>
            <input type="text" />
          </div>
        </div>

        <div className="botonModalEspecifica">
          <button
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                especifica: convertirMayusculas(tempEspecifica),
              }));

              setIsThirdModalOpen(false);
            }}
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setTempEspecifica({
                esControlado: "",
                componente1: "",
                clasificacionAlmacenamiento: "",
                separacionMetodoSAFTDATA: "",
                fechaIngresoLabQuimica: "",
                fechaVencimientoProyectada: "",
                observaciones: "",
                palabraAdvertencia: "",
                preventivaCodigoDetalle: "",
                respuestaOintervencionCodigoDetalle: "",
                razonSocial: "",
                direccion: "",
                contacto: "",
              });

              setIsThirdModalOpen(false);
            }}
          >
            Cancelar
          </button>
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
              <img src={`http://localhost:8000${p.url}`} />
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
