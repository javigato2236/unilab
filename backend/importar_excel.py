import pandas as pd
from decimal import Decimal
from database import SessionLocal
import models
db = SessionLocal()




# =========================================
# FUNCIONES PARA EVITAR ERRORES NAN AL ENVIAR DATOS VACIOS


#TEXTOS
def limpiar_texto(valor):

    if pd.isna(valor):

        return None

    return str(valor).strip()

#DECIMAL
def limpiar_decimal(valor):

    if pd.isna(valor):

        return Decimal("0.000")

    return Decimal(str(valor))

#ENTEROS
def limpiar_entero(valor):

    if pd.isna(valor):

        return 0

    return int(valor)

#FECHAS
def limpiar_fecha(valor):

    if pd.isna(valor):

        return None

    return pd.to_datetime(valor).date()





# =========================================

# =========================================
# LEER EXCEL
# =========================================
df = pd.read_excel(
    "INV_REACTIVOS_ALUMINIO_LIMPIO.xlsx"
)

# =========================================
# LIMPIAR NOMBRES DE COLUMNAS
# =========================================
# df.columns = (
#     df.columns
#     .str.strip()
#     .str.lower()
# )

# =========================================
# CREAR SESION MYSQL
# =========================================
db = SessionLocal()

# =========================================
# OBTENER PICTOGRAMAS
# =========================================
pictogramas = db.query(
    models.CatalogoPictograma
).all()

# =========================================
# CREAR MAPA DE PICTOGRAMAS
#
# {
#     "corrosivo": 1,
#     "inflamable": 2
# }
# =========================================
mapa_pictogramas = {}

for pictograma in pictogramas:

    mapa_pictogramas[
        pictograma.nombre.lower()
    ] = pictograma.id

# =========================================
# RECORRER EXCEL
# =========================================
for index, fila in df.iterrows():###############








    # =====================================
    # CANTIDAD TOTAL
    # =====================================
    cantidad_total = fila["CANTIDAD TOTAL"]

    if pd.isna(cantidad_total):

        cantidad_total = Decimal("0.000")

    else:

        cantidad_total = Decimal(
            str(cantidad_total)
        )

    # =====================================
    # CANTIDAD REAL
    # =====================================
    cantidad_real = fila["CANTIDAD REAL"]

    if pd.isna(cantidad_real):

        cantidad_real = Decimal("0.000")

    else:

        cantidad_real = Decimal(
            str(cantidad_real)
        )

    # =====================================
    # NUMERO DE RECIPIENTES
    # =====================================

    numero_recipientes = fila["NUMERO RECIPIENTES"]

    if pd.isna(numero_recipientes):

        numero_recipientes = 0

    else:

        numero_recipientes = int(numero_recipientes)

    # =====================================
    # FECHA ACTUAIZACION
    # =====================================

    fecha_actualizacion = fila["ÚLTIMA FECHA ACTUALIZACION O CREACIÓN DE FDS"]

    if pd.isna(fecha_actualizacion):

        fecha_actualizacion = None

    else:

        fecha_actualizacion = pd.to_datetime(
            fecha_actualizacion
                ).date()
        
    # =====================================
    # FECHA INGRESO
    # =====================================

    fecha_ingreso = fila["FECHA DE INGRESO DE LA SUSTANCIA QUIMICA AL LABORATORIO"]

    if pd.isna(fecha_ingreso):

        fecha_ingreso = None

    else:

        fecha_ingreso = pd.to_datetime(
            fecha_ingreso
                ).date()
        
    # =====================================
    # FECHA VENCIMIENTO
    # ===================================== 
        
    fecha_vencimiento = fila["FECHA VENCIMIENTO PROYECTADO"]

    if pd.isna(fecha_vencimiento):

        fecha_vencimiento = None

    else:

        fecha_vencimiento = pd.to_datetime(
            fecha_vencimiento
                ).date()






    # =====================================
    # CREAR SUSTANCIA
    # =====================================
    sustancia = models.Sustancia(

        nombre=str(
            fila["NOMBRE DE LA SUSTANCIA"]
        ).strip()
    )

    db.add(sustancia)

    # =====================================
    # OBTENER ID GENERADO
    # =====================================
    db.flush()

    # =====================================
    # CREAR INFO BASICA
    # =====================================
    info_basica = models.InfoBasica(

        sustancia_id=sustancia.id,
        familia=limpiar_texto(fila["FAMILIA"]),
        grupo=limpiar_texto(fila["GRUPO"]),
        sinonimo=limpiar_texto(fila["SINÓNIMO"]),
        cas=limpiar_texto(fila["CAS"]),
        marca=limpiar_texto(fila["MARCA"]),
        referencia=limpiar_texto(fila["REFERENCIA"]),
        fdsCompleta=limpiar_texto(fila["FDS COMPLETA"]),
        fechaActualizacion=limpiar_fecha(fecha_actualizacion),
        estadoFisico=limpiar_texto(fila["ESTADO FÍSICO"])

    )

    db.add(info_basica)

 

    # =====================================
    # CREAR INFO GENERAL
    # =====================================
    info_general = models.InfoGeneral(

        sustancia_id=sustancia.id,
        codigoFraseH=limpiar_texto(fila["CODIGO FRASE H"]),
        toxicidadAgudaCat1Cat2=limpiar_texto(fila["TOXICIDAD AGUDA CAT 1 CAT 2"]),
        sustanciaCancerigena=limpiar_texto(fila["SUSTANCIA CANCERÍGENA"]),
        sitioAlmacenamiento=limpiar_texto(fila["SITIO DE ALMACENAMIENTO"]),
        ubicacionEspecifica=limpiar_texto(fila["UBICACIÓN ESPECIFICA"]),
        unidadMedida=limpiar_texto(fila["UNIDAD DE MEDIDA"]),
        presentacion=limpiar_texto(fila["PRESENTACION"]),
        numeroRecipientes=limpiar_entero(numero_recipientes),
        cantidad_total=limpiar_decimal(cantidad_total),
        cantidad_real=limpiar_decimal(cantidad_real)
        
    )

    db.add(info_general)


     # =====================================
    # CREAR INFO ESPECIFICA
    # =====================================

       
    info_especifica = models.InfoEspecifica(

        sustancia_id=sustancia.id,
        esControlado=limpiar_texto(fila["ES CONTROLADO"]),
        componente1=limpiar_texto(fila["COMPONENTE 1"]),
        clasificacionAlmacenamiento=limpiar_texto(fila["CLASIFICACION ALMACENAMIENTO"]),
        separacionSaftdata=limpiar_texto(fila["SEPARACION METODO SAF-T-DATA"]),
        fechaIngreso=limpiar_fecha(fecha_ingreso),
        fechaVencimiento=limpiar_fecha(fecha_vencimiento),
        observaciones=limpiar_texto(fila["OBSERVACIONES"]),
        palabraAdvertencia=limpiar_texto(fila["PALABRA DE ADVERTENCIA"]),
        preventiva=limpiar_texto(fila["PREVENTIVA CODIGO / DETALLE"]),
        respuesta=limpiar_texto(fila["RESPUESTA Ó INTERVENCIÓN"]),
        razonSocial=limpiar_texto(fila["RAZÓN SOCIAL"]),
        direccion=limpiar_texto(fila["DIRECCIÓN"]),
        contacto=limpiar_texto(fila["CONTACTO"])
    )

    db.add(info_especifica)

    # =====================================
    # RECORRER PICTOGRAMAS
    # =====================================
    for columna, pictograma_id in mapa_pictogramas.items():

        # REVISAR SI EXISTE LA COLUMNA
        if columna in df.columns:

            valor = fila[columna]

            # SI TIENE X
            if str(valor).strip().upper() == "X":

                relacion = models.SustanciaPictograma(

                    sustancia_id=sustancia.id,

                    pictograma_id=pictograma_id
                )

                db.add(relacion)

# =========================================
# GUARDAR 
# =========================================
db.commit()

# =========================================
# CERRAR SESION
# =========================================
db.close()

print("IMPORTACION EXITOSA")





# ##################################################################################
# # leemos el documento excel y podemos imprimir en consola las columnas y tambien colummnas y info de columnas
# # df = pd.read_excel(
# #     "INV_REACTIVOS_ALUMINIO_LIMPIO.xlsx"
# # )
# # print(df.columns)
# # print(df.head())






















