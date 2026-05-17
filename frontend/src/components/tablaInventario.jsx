import iconoAgregarRegistro from "../assets/iconoAgregarRegistro.png";
import "../styles/paginaPrincipal.css";
import "../styles/pictogramas.css";
import "../styles/tabla.css";
import "../styles/inputsModales.css";

import Modal from "../hoosk/modalReutilizable";
import PanelReactivo from "./PanelReactivo";

import resetsEstados from "./resetsEstados";

import { useState, useEffect } from "react";

function TablaReactivos({ seleccionarReactivo }) {
  const [reactivos, setReactivos] = useState([]);
  const [reactivoSeleccionado, setReactivoSeleccionado] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  const [formData, setFormData] = useState(resetsEstados.ResetEstados());

  //ESTADOS TEMPORALES
  const [tempBasica, setTempBasica] = useState(
    resetsEstados.ResetEstados().basica,
  );

  const [tempGeneral, setTempGeneral] = useState(
    resetsEstados.ResetEstados().general,
  );

  const [tempEspecifica, setTempEspecifica] = useState(
    resetsEstados.ResetEstados().especifica,
  );

  //MODALES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isPictogramasModalOpen, setIsPictogramasModalOpen] = useState(false);

  const [catalogoPictogramas, setCatalogoPictogramas] = useState([]);
  const [pictogramasOriginales, setPictogramasOriginales] = useState([]);
  const [tempPictogramas, setTempPictogramas] = useState([]);

  // seleccion de colores para SEPARACION METODO SAF-T-DATA
  const obtenerColor = (valor) => {
    const colores = {
      T: "#3498db",
      I: "#e74c3c",
      O: "#f1c40f",
      PMA: "#7f8c8d",
      RM: "#27ae60",
    };

    return colores[valor] || "white";
  };

  const convertirMayusculas = (obj) => {
    const excluir = ["unidadMedida"];

    const nuevo = {};

    for (let key in obj) {
      nuevo[key] =
        typeof obj[key] === "string" && !excluir.includes(key)
          ? obj[key].toUpperCase()
          : obj[key];
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

  const fetchPictogramas = async () => {
    const res = await fetch("http://localhost:8000/api/pictogramas");
    const data = await res.json();
    setCatalogoPictogramas(data);
  };

  /////////////////////////////////nuevo
  const toFixedString = (value) =>
    value !== null && value !== undefined ? Number(value).toFixed(3) : "";
  /////////////////////////////////nuevo

  /////////funcion para evitar bugs comodatos falsos al enviar un 0 que significaria
  //////////como dato nulo y con esta funcion hacemso real el cero
  const parseNumber = (value, isInt = false) => {
    if (value === "" || value === null || value === undefined) return null;
    return isInt ? parseInt(value) : parseFloat(value);
  };
  /////////funcion para evitar bugs comodatos falsos al enviar un 0 que significaria
  //////////como dato nulo y con esta funcion hacemso real el cero

  useEffect(() => {
    fetchReactivos();
    fetchPictogramas();
  }, []);

  useEffect(() => {
    fetchReactivos();
  }, []);

  // useEffect(() => {
  //   console.log("TEMP BASICA:", tempBasica);
  // }, [tempBasica]);

  // useEffect(() => {
  //   console.log("TEMP PICTOGRAMAS:", tempPictogramas);
  // }, [tempPictogramas]);

  // useEffect(() => {
  //   console.log("TEMP GENERAL:", tempGeneral);
  // }, [tempGeneral]);

  // useEffect(() => {
  //   console.log("TEMP ESPECIFICA:", tempEspecifica);
  // }, [tempEspecifica]);

  // useEffect(() => {
  //   console.log("FORM DATA GLOBAL:", formData);
  // }, [formData]);

  const fetchReactivos = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sustancias");

      if (!res.ok) {
        const errorText = await res.text();
        console.error("ERROR BACKEND:", errorText);
        throw new Error("Error en API");
      }

      const data = await res.json();

      console.log("DATA BACKEND:", data); // 👈 clave para debug

      setReactivos(data);
    } catch (error) {
      console.error("❌ ERROR FETCH:", error);
    }
  };
  //////////////////////////////probando nuevo editar
  const editar = (item) => {
    setEditandoId(item.id);

    const ids = item.pictogramas?.map((p) => p.pictograma.id) || [];

    setFormData({
      basica: {
        nombre: item.nombre || "",
        familia: item.basica?.familia || "",
        grupo: item.basica?.grupo || "",
        sinonimo: item.basica?.sinonimo || "",
        cas: item.basica?.cas || "",
        marca: item.basica?.marca || "",
        referencia: item.basica?.referencia || "",
        fdsCompleta: item.basica?.fdsCompleta || "",
        fechaActualizacion: item.basica?.fechaActualizacion || "",
        estadoFisico: item.basica?.estadoFisico || "",
      },

      general: {
        codigoFraseH: item.general?.codigoFraseH || "",
        toxicidadAgudaCat1Cat2: item.general?.toxicidadAgudaCat1Cat2 || "",
        sustanciaCancerigena: item.general?.sustanciaCancerigena || "",
        sitioAlmacenamiento: item.general?.sitioAlmacenamiento || "",
        ubicacionEspecifica: item.general?.ubicacionEspecifica || "",
        unidadMedida: item.general?.unidadMedida || "",
        presentacion: item.general?.presentacion || "",
        numeroRecipientes: item.general?.numeroRecipientes ?? "",
        cantidad_total: toFixedString(item.general?.cantidad_total),
        cantidad_real: toFixedString(item.general?.cantidad_real),
      },

      especifica: {
        esControlado: item.especifica?.esControlado || "",
        componente1: item.especifica?.componente1 || "",
        clasificacionAlmacenamiento:
          item.especifica?.clasificacionAlmacenamiento || "",
        separacionSaftdata: item.especifica?.separacionSaftdata || "",
        fechaIngreso: item.especifica?.fechaIngreso || "",
        fechaVencimiento: item.especifica?.fechaVencimiento || "",
        observaciones: item.especifica?.observaciones || "",
        palabraAdvertencia: item.especifica?.palabraAdvertencia || "",
        preventiva: item.especifica?.preventiva || "",
        respuesta: item.especifica?.respuesta || "",
        razonSocial: item.especifica?.razonSocial || "",
        direccion: item.especifica?.direccion || "",
        contacto: item.especifica?.contacto || "",
      },

      pictogramas: ids,
    });

    setPictogramasOriginales(ids);
    setTempPictogramas(ids);

    setIsModalOpen(true);
  };
  /////////////probando nuevo editar

  const toggleTempPictograma = (id) => {
    setTempPictogramas((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  ///////////////////////////////////nuevo codigo
  const getClasePictograma = (id) => {
    const esOriginal = pictogramasOriginales.includes(id);
    const estaSeleccionado = tempPictogramas.includes(id);

    // 🔴 estaba en BD y sigue seleccionado
    if (esOriginal && estaSeleccionado) return "original";

    // 🔵 nuevo seleccionado
    if (!esOriginal && estaSeleccionado) return "activo";

    // ❌ estaba pero lo quitó
    if (esOriginal && !estaSeleccionado) return "removido";

    return "";
  };

  const guardarPictogramas = () => {
    setFormData((prev) => ({
      ...prev,
      pictogramas: tempPictogramas,
    }));

    setIsPictogramasModalOpen(false);
  };

  //////////////////////////nuevo codigo

  const enviarTodo = async () => {
    const url = editandoId
      ? `http://localhost:8000/api/sustancias/${editandoId}`
      : "http://localhost:8000/api/sustancias";

    const method = editandoId ? "PUT" : "POST";

    //LIMPIAR FECHAS VACÍAS
    const bodyData = {
      ...formData,

      basica: {
        ...formData.basica,

        fechaActualizacion: formData.basica.fechaActualizacion || null,
      },

      especifica: {
        ...formData.especifica,

        fechaIngreso: formData.especifica.fechaIngreso || null,

        fechaVencimiento: formData.especifica.fechaVencimiento || null,
      },
    };

    const body = JSON.stringify(bodyData);

    console.log(" FORM DATA:", formData);
    console.log(" BODY LIMPIO:", bodyData);
    console.log(" URL:", url);
    console.log(" METHOD:", method);
    console.log(" BODY JSON:", body);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      console.log(" STATUS:", res.status);

      const responseText = await res.text();
      console.log(" RESPONSE RAW:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
        console.log(" RESPONSE JSON:", data);
      } catch {
        console.warn(" La respuesta no es JSON");
      }

      if (!res.ok) {
        throw new Error(responseText);
      }

      alert(editandoId ? "Actualizado" : "Creado");

      setEditandoId(null);

      // 🔴 cerrar TODOS los modales
      setIsModalOpen(false);
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(false);
      setIsThirdModalOpen(false);
      setIsPictogramasModalOpen(false);

      // 🔴 limpiar temporales
      setTempBasica(resetsEstados.ResetEstados().basica);
      setTempGeneral(resetsEstados.ResetEstados().general);
      setTempEspecifica(resetsEstados.ResetEstados().especifica);
      setTempPictogramas([]);

      fetchReactivos();
    } catch (error) {
      console.error(" ERROR FRONT:", error);

      alert("Error al guardar datos");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este reactivo?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/sustancias/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar");
      }

      alert("Reactivo eliminado correctamente");

      fetchReactivos(); // 🔄 recargar tabla
    } catch (error) {
      console.error("ERROR:", error);
      alert("No se pudo eliminar el reactivo");
    }
  };

  function obtenerEstadoCantidad(cantidadReal, cantidadTotal) {
    // evitar división por cero
    if (!cantidadTotal || cantidadTotal <= 0) {
      return "rojo";
    }

    // porcentaje restante
    const porcentaje = (cantidadReal / cantidadTotal) * 100;

    // SIN STOCK
    if (porcentaje <= 0) {
      return "rojo";
    }

    // STOCK BAJO
    if (porcentaje <= 50) {
      return "amarillo";
    }

    // STOCK NORMAL
    return "verde";
  }

  return (
    <div>
      <div
        className="contenedor-cierreSesion"
        onClick={() => {
          // limpiar modo edición
          setEditandoId(null);

          // limpiar formulario completo
          setFormData(resetsEstados.ResetEstadosIniciales());

          //MUY IMPORTANTE: limpiar selección temporal
          setTempPictogramas([]);

          //LIMPIAR LOS ORIGINALES
          setPictogramasOriginales([]);

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
          onClick={() => {
            setTempGeneral(formData.general);
            setIsSecondModalOpen(true);
          }}
        >
          Información general
        </button>

        <button
          className="botonModalPrincipal"
          onClick={() => {
            setTempEspecifica(formData.especifica);
            setIsThirdModalOpen(true);
          }}
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
            value={tempBasica.nombre}
            onChange={handleTempChange(setTempBasica, "nombre")}
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
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
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
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div className="contenedorBasica">
          <label>Ultima fecha de actualizacion o creacion de FDS</label>
          <input
            value={tempBasica.fechaActualizacion}
            onChange={handleTempChange(setTempBasica, "fechaActualizacion")}
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
            <option value="SOLIDO">Solido</option>
            <option value="LIQUIDO">Liquido</option>
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
              setFormData((prev) => ({
                ...prev,

                basica: {
                  ...convertirMayusculas(tempBasica),

                  fechaActualizacion: tempBasica.fechaActualizacion || null,
                },
              }));

              setIsFirstModalOpen(false);
            }}
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setTempBasica(resetsEstados.ResetEstados().basica);
              setTempPictogramas([]);

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
            value={tempGeneral.toxicidadAgudaCat1Cat2}
            onChange={handleTempChange(
              setTempGeneral,
              "toxicidadAgudaCat1Cat2",
            )}
          ></textarea>
        </div>

        <div className="contenedorGeneral">
          <label>Sustancia cancerigena</label>
          <select
            value={tempGeneral.sustanciaCancerigena}
            onChange={handleTempChange(setTempGeneral, "sustanciaCancerigena")}
          >
            <option value="SI">Sí</option>
            <option value="NO">No</option>
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
            {console.log("UNIDAD:", JSON.stringify(tempGeneral.unidadMedida))}
            <select
              value={tempGeneral.unidadMedida}
              onChange={handleTempChange(setTempGeneral, "unidadMedida")}
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
              type="text"
              value={tempGeneral.numeroRecipientes}
              onChange={handleTempChange(
                setTempGeneral,
                "numeroRecipientes",
                true,
              )}
            />
          </div>

          <div className="contenedorGeneral">
            <label>Cantidad total</label>
            <input
              type="text"
              step="any"
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
              step="any"
              inputMode="decimal"
              value={tempGeneral.cantidad_real ?? ""}
              onChange={handleTempChange(setTempGeneral, "cantidad_real", true)}
            />
          </div>
        </div>

        <div className="botonModalGeneral">
          <button
            onClick={() => {
              const datosMayusculas = convertirMayusculas(tempGeneral);
              setFormData((prev) => ({
                ...prev,
                general: {
                  ...datosMayusculas,
                  numeroRecipientes: parseNumber(
                    tempGeneral.numeroRecipientes,
                    true,
                  ),
                  cantidad_total: parseNumber(tempGeneral.cantidad_total),
                  cantidad_real: parseNumber(tempGeneral.cantidad_real),
                },
              }));

              setIsSecondModalOpen(false);
            }}
          >
            Guardar
          </button>

          <button
            onClick={() => {
              setTempGeneral(resetsEstados.ResetEstados().general);

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
          <select
            value={tempEspecifica.esControlado}
            onChange={handleTempChange(setTempEspecifica, "esControlado")}
          >
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div className="contenedorEspecifica">
          <label>Componente 1</label>
          <input
            value={tempEspecifica.componente1}
            onChange={handleTempChange(setTempEspecifica, "componente1")}
          />
        </div>

        <div className="contenedorEspecifica">
          <label>clasificacion almacenamiento</label>
          <input
            value={tempEspecifica.clasificacionAlmacenamiento}
            onChange={handleTempChange(
              setTempEspecifica,
              "clasificacionAlmacenamiento",
            )}
          />
        </div>

        <div className="contenedorEspecifica">
          <label>Separacion metodo SAF-T-DATA</label>
          <select
            value={tempEspecifica.separacionSaftdata}
            onChange={(e) => {
              const valor = e.target.value;

              setTempEspecifica((prev) => ({
                ...prev,
                separacionSaftdata: valor,
              }));
            }}
          >
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
          <input
            type="date"
            value={tempEspecifica.fechaIngreso}
            onChange={handleTempChange(setTempEspecifica, "fechaIngreso")}
          />
        </div>

        <div className="contenedorEspecifica">
          <label>Fecha de vencimiento proyectada</label>
          <input
            type="date"
            value={tempEspecifica.fechaVencimiento}
            onChange={handleTempChange(setTempEspecifica, "fechaVencimiento")}
          />
        </div>

        <div className="contenedorEspecifica">
          <label>Observaciones</label>
          <textarea
            value={tempEspecifica.observaciones}
            onChange={handleTempChange(setTempEspecifica, "observaciones")}
          ></textarea>
        </div>

        <div className="contenedorEspecifica">
          <label>Palabra advertencia</label>
          <input
            value={tempEspecifica.palabraAdvertencia}
            onChange={handleTempChange(setTempEspecifica, "palabraAdvertencia")}
          />
        </div>

        <div className="contenedorEspecifica2">
          <h2>Consejos de prudencia (Frases P)</h2>
          <div className="contenedorEspecifica">
            <label>Preventiva codigo/detalle</label>
            <textarea
              value={tempEspecifica.preventiva}
              onChange={handleTempChange(setTempEspecifica, "preventiva")}
            ></textarea>
          </div>

          <div className="contenedorEspecifica">
            <label>respuesta o intervencion codigo/detalle</label>
            <textarea
              value={tempEspecifica.respuesta}
              onChange={handleTempChange(setTempEspecifica, "respuesta")}
            ></textarea>
          </div>

          <div className="contenedorEspecifica">
            <h2>Informacion proveedor</h2>
            <label>Razon social</label>
            <input
              type="text"
              value={tempEspecifica.razonSocial}
              onChange={handleTempChange(setTempEspecifica, "razonSocial")}
            />
          </div>

          <div className="contenedorEspecifica">
            <label>Direccion</label>
            <input
              type="text"
              value={tempEspecifica.direccion}
              onChange={handleTempChange(setTempEspecifica, "direccion")}
            />
          </div>

          <div className="contenedorEspecifica">
            <label>Contacto</label>
            <input
              type="text"
              value={tempEspecifica.contacto}
              onChange={handleTempChange(setTempEspecifica, "contacto")}
            />
          </div>
        </div>

        <div className="botonModalEspecifica">
          <button
            onClick={() => {
              setFormData((prev) => ({
                ...prev,

                especifica: {
                  ...convertirMayusculas(tempEspecifica),

                  fechaIngreso: tempEspecifica.fechaIngreso || null,

                  fechaVencimiento: tempEspecifica.fechaVencimiento || null,
                },
              }));

              setIsThirdModalOpen(false);
            }}
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setTempEspecifica(resetsEstados.ResetEstados().especifica);

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
              className={`pictograma-item ${getClasePictograma(p.id)}`}
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

      {/* probando nueva tabla */}
      <h2>Inventario de reactivos quimicos</h2>
      <div className="contenedor-tabla">
        <table className="tabla-reactivos">
          <thead>
            <tr>
              <th className="col-angosta">Nombre</th>
              <th className="col-angosta">Familia</th>
              <th className="col-angosta">presentacion</th>
              <th className="col-angosta">Unidad de medida</th>
              <th className="col-angosta">Numero de recipientes</th>
              <th className="col-angosta">Cantidad Total</th>
              <th className="col-angosta">Cantidad Real</th>
              <th>Ubicacion especifica</th>
              <th className="col-angosta">Separacion metodo SAF-T-DATA</th>
              <th className="col-angosta">Stock</th>
              <th className="col-angosta">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reactivos.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>

                <td>{r.basica?.familia}</td>
                <td>{r.general?.presentacion}</td>
                <td>{r.general?.unidadMedida}</td>
                <td>{r.general?.numeroRecipientes}</td>
                <td>{Number(r.general?.cantidad_total).toFixed(3)}</td>
                <td>{Number(r.general?.cantidad_real).toFixed(3)}</td>
                <td>{r.general?.ubicacionEspecifica}</td>
                <td
                  style={{
                    backgroundColor: obtenerColor(
                      r.especifica?.separacionSaftdata,
                    ),
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {r.especifica?.separacionSaftdata}
                </td>

                <td>
                  <div
                    className={`circulo-stock ${obtenerEstadoCantidad(
                      r.general?.cantidad_real,
                      r.general?.cantidad_total,
                    )}`}
                  ></div>
                </td>
                <td>
                  <button
                    className="boton-ver"
                    onClick={() => setReactivoSeleccionado(r)}
                  >
                    ver
                  </button>
                  <button className="boton-editar" onClick={() => editar(r)}>
                    Editar
                  </button>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminar(r.id)}
                  >
                    Eliminar
                  </button>
                </td>

                {/* <td>
                {r.pictogramas?.map((p) => (
                  <img
                    key={p.pictograma.id}
                    src={`http://localhost:8000${p.pictograma.url}`}
                    width="30"
                  />
                ))}
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reactivoSeleccionado && (
        <>
          <div
            className="overlay"
            onClick={() => setReactivoSeleccionado(null)}
          ></div>

          <PanelReactivo
            reactivo={reactivoSeleccionado}
            cerrar={() => setReactivoSeleccionado(null)}
            recargar={fetchReactivos}
          />
        </>
      )}
    </div>
  );
}

export default TablaReactivos;
