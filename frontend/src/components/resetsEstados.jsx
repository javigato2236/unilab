function ResetsEstados() {
  return {
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

export default ResetsEstados;
