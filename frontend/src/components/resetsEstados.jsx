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
      fecha_actualizacion: "",
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
      separacionMetodoSAFTDATA: "",
      fecha_ingreso: "",
      fecha_vencimiento: "",
      observaciones: "",
      palabra_advertencia: "",
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
      fecha_actualizacion: "",
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
      cantidad_total: "",
      cantidad_real: "",
    },
    especifica: {
      esControlado: "Sí",
      componente1: "",
      clasificacionAlmacenamiento: "",
      separacionMetodoSAFTDATA: "T",
      fecha_ingreso: "",
      fecha_vencimiento: "",
      observaciones: "",
      palabra_advertencia: "",
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
