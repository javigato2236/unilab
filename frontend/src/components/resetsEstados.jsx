function ResetEstados() {
  return {
    basica: {
      nombre: "",
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
      cantidadTotal: "",
      cantidadReal: "",
    },

    especifica: {
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
    },

    pictogramas: [],
  };
}

function ResetEstadosIniciales() {
  return {
    basica: {
      nombre: "",
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
    general: {
      codigoFraseH: "",
      toxicidadCat1Cat2: "",
      sustanciaCancerigena: "Sí",
      sitioAlmacenamiento: "",
      ubicacionEspecifica: "",
      unidadDeMedida: "gl",
      presentacion: "",
      numeroDeRecipientes: "",
      cantidadTotal: "",
      cantidadReal: "",
    },
    especifica: {
      esControlado: "Sí",
      componente1: "",
      clasificacionAlmacenamiento: "",
      separacionMetodoSAFTDATA: "T",
      fechaIngresoLabQuimica: "",
      fechaVencimientoProyectada: "",
      observaciones: "",
      palabraAdvertencia: "",
      preventivaCodigoDetalle: "",
      respuestaOintervencionCodigoDetalle: "",
      razonSocial: "",
      direccion: "",
      contacto: "",
    },
    pictogramas: [],
  };
}

export default { ResetEstados, ResetEstadosIniciales };
