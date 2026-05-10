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
      fechaActualizacion: "",
      estadoFisico: "",
    },

    general: {
      codigoFraseH: "",
      toxicidadAgudaCat1Cat2: "",
      sustanciaCancerigena: "",
      sitioAlmacenamiento: "",
      ubicacionEspecifica: "",
      unidadMedida: "",
      presentacion: "",
      numeroRecipientes: "",
      cantidad_total: "",
      cantidad_real: "",
    },

    especifica: {
      esControlado: "",
      componente1: "",
      clasificacionAlmacenamiento: "",
      separacionSaftdata: "",
      fechaIngreso: "",
      fechaVencimiento: "",
      observaciones: "",
      palabraAdvertencia: "",
      preventiva: "",
      respuesta: "",
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
      sinonisinonimomo: "",
      cas: "",
      marca: "",
      referencia: "",
      fdsCompleta: "Sí",
      fechaActualizacion: "",
      estadoFisico: "Solido",
    },
    general: {
      codigoFraseH: "",
      toxicidadAgudaCat1Cat2: "",
      sustanciaCancerigena: "Sí",
      sitioAlmacenamiento: "",
      ubicacionEspecifica: "",
      unidadMedida: "gl",
      presentacion: "",
      numeroRecipientes: "",
      cantidad_total: "",
      cantidad_real: "",
    },
    especifica: {
      esControlado: "Sí",
      componente1: "",
      clasificacionAlmacenamiento: "",
      separacionSaftdata: "T",
      fechaIngreso: "",
      fechaVencimiento: "",
      observaciones: "",
      palabraAdvertencia: "",
      preventiva: "",
      respuesta: "",
      razonSocial: "",
      direccion: "",
      contacto: "",
    },
    pictogramas: [],
  };
}

export default { ResetEstados, ResetEstadosIniciales };
