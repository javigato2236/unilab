import pandas as pd

# df = pd.read_excel("inventario.xlsx",sheet_name="INV_REACTIVOS_ALDEHIDOS (al)")
# with pd.ExcelWriter('extraccion.xlsx', engine='openpyxl') as writer:
#     # 'startrow' y 'startcol' indican dónde comenzar (índice basado en 0)
#     df.to_excel(writer, sheet_name='HojaNueva', startrow=10, startcol=1, index=False)











































































































































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
# df = pd.read_excel(
#     "INV_REACTIVOS_ALUMINIO_LIMPIO.xlsx"
# )
df = pd.read_excel(
    "arreglo_datos.xlsx",
    header=None
)

# tomar fila 0 como headers reales
new_columns = df.iloc[0]

df = df[1:]

df.columns = new_columns

print(df.columns)



# =========================================
# LIMPIAR NOMBRES DE COLUMNAS
# =========================================
df.columns = (
    df.columns
    .str.strip()
    .str.lower()
)

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
    cantidad_total = fila["cantidad total"]

    if pd.isna(cantidad_total):

        cantidad_total = Decimal("0.000")

    else:

        cantidad_total = Decimal(
            str(cantidad_total)
        )

    # =====================================
    # CANTIDAD REAL
    # =====================================
    cantidad_real = fila["cantidad real"]

    if pd.isna(cantidad_real):

        cantidad_real = Decimal("0.000")

    else:

        cantidad_real = Decimal(
            str(cantidad_real)
        )

    # =====================================
    # NUMERO DE RECIPIENTES
    # =====================================

    numero_recipientes = fila["numero recipientes"]

    if pd.isna(numero_recipientes):

        numero_recipientes = 0

    else:

        numero_recipientes = int(numero_recipientes)

    # =====================================
    # FECHA ACTUAIZACION
    # =====================================

    fecha_actualizacion = fila["ultima actualizacion"]

    if pd.isna(fecha_actualizacion):

        fecha_actualizacion = None

    else:

        fecha_actualizacion = pd.to_datetime(
            fecha_actualizacion
                ).date()
        
    # =====================================
    # FECHA INGRESO
    # =====================================

    fecha_ingreso = fila["fecha ingreso de la sustancia"]

    if pd.isna(fecha_ingreso):

        fecha_ingreso = None

    else:

        fecha_ingreso = pd.to_datetime(
            fecha_ingreso
                ).date()
        
    # =====================================
    # FECHA VENCIMIENTO
    # ===================================== 
        
    fecha_vencimiento = fila["fecha vencimiento"]

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
            fila["nombre"]
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
        familia=limpiar_texto(fila["familia"]),
        grupo=limpiar_texto(fila["grupo"]),
        sinonimo=limpiar_texto(fila["sinonimo"]),
        cas=limpiar_texto(fila["cas"]),
        marca=limpiar_texto(fila["marca"]),
        referencia=limpiar_texto(fila["referencia"]),
        fdsCompleta=limpiar_texto(fila["fdscompleta"]),
        fechaActualizacion=limpiar_fecha(fecha_actualizacion),
        estadoFisico=limpiar_texto(fila["estado fisico"])

    )

    db.add(info_basica)

 

    # =====================================
    # CREAR INFO GENERAL
    # =====================================
    info_general = models.InfoGeneral(

        sustancia_id=sustancia.id,
        codigoFraseH=limpiar_texto(fila["codigo frase h"]),
        toxicidadAgudaCat1Cat2=limpiar_texto(fila["toxicidad aguda"]),
        sustanciaCancerigena=limpiar_texto(fila["sustancia cancerigena"]),
        sitioAlmacenamiento=limpiar_texto(fila["sitio almacenamiento"]),
        ubicacionEspecifica=limpiar_texto(fila["ubicación especifica"]),
        unidadMedida=limpiar_texto(fila["unidad de medida"]),
        presentacion=limpiar_texto(fila["presentacion"]),
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
        esControlado=limpiar_texto(fila["es controlado"]),
        componente1=limpiar_texto(fila["componente"]),
        clasificacionAlmacenamiento=limpiar_texto(fila["clacificacion almacenamiento"]),
        separacionSaftdata=limpiar_texto(fila["separacion metodo"]),
        fechaIngreso=limpiar_fecha(fecha_ingreso),
        fechaVencimiento=limpiar_fecha(fecha_vencimiento),
        observaciones=limpiar_texto(fila["observaciones"]),
        palabraAdvertencia=limpiar_texto(fila["palabra advertencia"]),
        preventiva=limpiar_texto(fila["preventiva"]),
        respuesta=limpiar_texto(fila["respuesta"]),
        razonSocial=limpiar_texto(fila["razon social"]),
        direccion=limpiar_texto(fila["direccion"]),
        contacto=limpiar_texto(fila["contacto"])
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
            # if str(valor).strip().upper() == "X":
            if str(valor).strip().upper() in ["X", "SI", "SÍ", "1", "TRUE"]:
        

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






# ##################################################################################
# # leemos el documento excel y podemos imprimir en consola las columnas y tambien colummnas y info de columnas
# # df = pd.read_excel(
# #     "INV_REACTIVOS_ALUMINIO_LIMPIO.xlsx"
# # )
# # print(df.columns)
# # print(df.head())






















