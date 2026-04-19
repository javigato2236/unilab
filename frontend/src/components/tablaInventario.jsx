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
    (seccion, campo, isNumber = false, toUpper = false) =>
    (e) => {
      let value = e.target.value;

      if (isNumber) {
        value = value === "" ? "" : Number(value);
        if (isNaN(value)) value = "";
      } else {
        if (toUpper) {
          value = value.normalize("NFC").toLocaleUpperCase("es-CO");
        }
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
        <button onClick={() => setIsFirstModalOpen(false)}>Cancelar</button>
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
        <button onClick={() => setIsPictogramasModalOpen(false)}>
          Cancelar
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
