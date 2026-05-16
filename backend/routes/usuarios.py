from fastapi import APIRouter, Depends, HTTPException, Header
from typing import List
from decimal import Decimal

from sqlalchemy.orm import Session, joinedload
from datetime import timedelta
import models, schemas, database, auth, config, email_utils
from urllib.parse import quote

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/register")
def register(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):

    existing = db.query(models.RegistroUsuarios).filter(
        models.RegistroUsuarios.correo == user.correo
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
        

    hashed = auth.hash_password(user.clave)

    new_user = models.RegistroUsuarios(
        
        correo=user.correo,
        clave=hashed
    )

    db.add(new_user)
    db.commit()
   

    return {"msg": "Usuario creado"}

@router.post("/login")
def login(user: schemas.UsuarioLogin, db: Session = Depends(get_db)):


    # 🔴 VALIDAR CAMPOS VACIOS
    if not user.correo or not user.clave:
        raise HTTPException(
            status_code=400,
            detail="Ningún campo debe estar vacío"
        )


    db_user = db.query(models.RegistroUsuarios).filter(
        models.RegistroUsuarios.correo == user.correo
    ).first()

    if not db_user or not auth.verify_password(user.clave, db_user.clave):
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectas")

    access_token = auth.create_token(
        {"sub": db_user.correo},
        timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    refresh_token = auth.create_token(
        {"sub": db_user.correo},
        timedelta(days=config.REFRESH_TOKEN_EXPIRE_DAYS)
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/refresh")
def refresh(data: schemas.RefreshToken):
    payload = auth.verify_token(data.refresh_token)

    new_access = auth.create_token(
        {"sub": payload["sub"]},
        timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {"access_token": new_access}

@router.get("/ruta-protegida")
def ruta_protegida(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    auth.verify_token(token)
    return {"msg": "Ruta protegida"}

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# @router.get("/ruta-protegida")
# def ruta_protegida(token: str = Depends(oauth2_scheme)):
#     auth.verify_token(token)
#     return {"msg": "Ruta protegida"}

@router.post("/validate-reset-token")###################
def validate_reset_token(data: schemas.ValidateToken):############333

    try:
        payload = auth.verify_token(data.token)##############333
        return {"valid": True}###############3

    except HTTPException as e:##############3
        raise e##############3

@router.post("/forgot-password")
def forgot_password(data: schemas.ForgotPassword, db: Session = Depends(get_db)):

    # 🔎 Buscar usuario en base de datos
    user = db.query(models.RegistroUsuarios).filter(
        models.RegistroUsuarios.correo == data.correo
    ).first()

    # ⚠️ Por seguridad NO decimos si existe o no
    if not user:
        return {"msg": "Si el correo existe se enviará un enlace"}
    


    #  Crear token JWT de recuperación (10 minutos)
    reset_token = auth.create_token(
        {"sub": user.correo},
        timedelta(minutes=config.RESET_TOKEN_EXPIRE_MINUTES)
        
    )

    # 🔗 Crear link para frontend
    # reset_link = f"http://localhost:5173/reset-password?token={reset_token}"#########
    reset_link = f"http://localhost:5173/reset-password?token={quote(reset_token)}"


    # 📧 Enviar correo con Gmail SMTP
    subject = "Recuperación de contraseña"
    body = f"""
    Hola {user.nombre},

    Haz clic en el siguiente enlace para restablecer tu contraseña:

    {reset_link}

    Este enlace expirará {config.RESET_TOKEN_EXPIRE_MINUTES} minutos.
    """

    email_utils.send_email(user.correo, subject, body)

    return {"msg": "Si el correo existe se enviará un enlace"}
    



# 🔐 RESET PASSWORD
@router.post("/reset-password")
def reset_password(data: schemas.ResetPassword, db: Session = Depends(get_db)):

    #  Verificar token JWT (firma y expiración)
    
    payload = auth.verify_token(data.token)

    #  Obtener correo desde el JWT
    correo = payload.get("sub")
    

    if not correo:
        raise HTTPException(status_code=400, detail="Token inválido")

    #  Buscar usuario
    user = db.query(models.RegistroUsuarios).filter(
        models.RegistroUsuarios.correo == correo
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    #  ¿Hashear nueva contraseña
    hashed_password = auth.hash_password(data.nueva_clave)

    #  Actualizar en base de datos
    user.clave = hashed_password
    db.commit()

    return {"msg": "Contraseña actualizada correctamente"}




@router.get("/pictogramas")
def obtener_pictogramas(db: Session = Depends(get_db)):
    return db.query(models.CatalogoPictograma).all()





@router.get("/sustancias", response_model=list[schemas.SustanciaOut])
def obtener_sustancias(db: Session = Depends(get_db)):

    sustancias = db.query(models.Sustancia).options(
        joinedload(models.Sustancia.basica),
        joinedload(models.Sustancia.general),
        joinedload(models.Sustancia.especifica),
        joinedload(models.Sustancia.pictogramas)
        .joinedload(models.SustanciaPictograma.pictograma)
    ).all()

    return sustancias

################nuevo codigo post
@router.post("/sustancias")
def crear_sustancia(data: schemas.SustanciaCreate, db: Session = Depends(get_db)):
    try:

        print("DATA RECIBIDA:", data.dict())

        sustancia = models.Sustancia(
            nombre=data.basica.nombre
        )

        db.add(sustancia)
        db.flush()

        print("SUSTANCIA OK")

        basica = models.InfoBasica(
            sustancia_id=sustancia.id,
            familia=data.basica.familia,
            grupo=data.basica.grupo,
            sinonimo=data.basica.sinonimo,
            cas=data.basica.cas,
            marca=data.basica.marca,
            referencia=data.basica.referencia,
            fdsCompleta=data.basica.fdsCompleta,
            fechaActualizacion=data.basica.fechaActualizacion,
            estadoFisico=data.basica.estadoFisico
        )

        print("BASICA OK")

        general = models.InfoGeneral(
            sustancia_id=sustancia.id,
            codigoFraseH=data.general.codigoFraseH,
            toxicidadAgudaCat1Cat2=data.general.toxicidadAgudaCat1Cat2,
            sustanciaCancerigena=data.general.sustanciaCancerigena,
            sitioAlmacenamiento=data.general.sitioAlmacenamiento,
            ubicacionEspecifica=data.general.ubicacionEspecifica,
            unidadMedida=data.general.unidadMedida,
            presentacion=data.general.presentacion,
            numeroRecipientes=data.general.numeroRecipientes,
            cantidad_total=data.general.cantidad_total,
            cantidad_real=data.general.cantidad_real
        )

        print("GENERAL OK")

        especifica = models.InfoEspecifica(
            sustancia_id=sustancia.id,
            esControlado=data.especifica.esControlado,
            componente1=data.especifica.componente1,
            clasificacionAlmacenamiento=data.especifica.clasificacionAlmacenamiento,
            separacionSaftdata=data.especifica.separacionSaftdata,
            fechaIngreso=data.especifica.fechaIngreso,
            fechaVencimiento=data.especifica.fechaVencimiento,
            observaciones=data.especifica.observaciones,
            palabraAdvertencia=data.especifica.palabraAdvertencia,
            preventiva=data.especifica.preventiva,
            respuesta=data.especifica.respuesta,
            razonSocial=data.especifica.razonSocial,
            direccion=data.especifica.direccion,
            contacto=data.especifica.contacto
        )

        print("ESPECIFICA OK")

        db.add_all([basica, general, especifica])

        # ---------------- OBSERVACION CONSUMO ----------------

        if data.ob_consumo:

            observacion_consumo = models.ObservacionConsumo(
                sustancia_id=sustancia.id,
                fechaObservacion=data.ob_consumo.fechaObservacion,
                responsable=data.ob_consumo.responsable,
                observacion=data.ob_consumo.observacion
            )

            db.add(observacion_consumo)

            print("OBSERVACION CONSUMO OK")

        print("ADD ALL OK")

        for pictograma_id in data.pictogramas:

            pictograma = models.SustanciaPictograma(
                sustancia_id=sustancia.id,
                pictograma_id=pictograma_id
            )

            db.add(pictograma)

        print("PICTOGRAMAS OK")

        db.commit()

        print("COMMIT OK")

        return {"msg": "ok"}

    except Exception as e:

        db.rollback()

        print("ERROR REAL:", str(e))

        return {"error": str(e)}

################nuevo codigo post

#####codigo post funcional
# @router.post("/sustancias")
# def crear_sustancia(data: schemas.SustanciaCreate, db: Session = Depends(get_db)):
#     try:

#         print("DATA RECIBIDA:", data.dict())

#         sustancia = models.Sustancia(
#             nombre=data.basica.nombre
#         )

#         db.add(sustancia)
#         db.flush()

#         print("SUSTANCIA OK")

#         basica = models.InfoBasica(
#             sustancia_id=sustancia.id,
#             familia=data.basica.familia,
#             grupo=data.basica.grupo,
#             sinonimo=data.basica.sinonimo,
#             cas=data.basica.cas,
#             marca=data.basica.marca,
#             referencia=data.basica.referencia,
#             fdsCompleta=data.basica.fdsCompleta,
#             fechaActualizacion=data.basica.fechaActualizacion,
#             estadoFisico=data.basica.estadoFisico
#         )

#         print("BASICA OK")

#         general = models.InfoGeneral(
#             sustancia_id=sustancia.id,
#             codigoFraseH=data.general.codigoFraseH,
#             toxicidadAgudaCat1Cat2=data.general.toxicidadAgudaCat1Cat2,
#             sustanciaCancerigena=data.general.sustanciaCancerigena,
#             sitioAlmacenamiento=data.general.sitioAlmacenamiento,
#             ubicacionEspecifica=data.general.ubicacionEspecifica,
#             unidadMedida=data.general.unidadMedida,
#             presentacion=data.general.presentacion,
#             numeroRecipientes=data.general.numeroRecipientes,
#             cantidad_total=data.general.cantidad_total,
#             cantidad_real=data.general.cantidad_real
#         )

#         print("GENERAL OK")

#         especifica = models.InfoEspecifica(
#             sustancia_id=sustancia.id,
#             esControlado=data.especifica.esControlado,
#             componente1=data.especifica.componente1,
#             clasificacionAlmacenamiento=data.especifica.clasificacionAlmacenamiento,
#             separacionSaftdata=data.especifica.separacionSaftdata,
#             fechaIngreso=data.especifica.fechaIngreso,
#             fechaVencimiento=data.especifica.fechaVencimiento,
#             observaciones=data.especifica.observaciones,
#             palabraAdvertencia=data.especifica.palabraAdvertencia,
#             preventiva=data.especifica.preventiva,
#             respuesta=data.especifica.respuesta,
#             razonSocial=data.especifica.razonSocial,
#             direccion=data.especifica.direccion,
#             contacto=data.especifica.contacto
#         )

#         print("ESPECIFICA OK")

#         db.add_all([basica, general, especifica])

#         print("ADD ALL OK")

#         for pictograma_id in data.pictogramas:

#             pictograma = models.SustanciaPictograma(
#                 sustancia_id=sustancia.id,
#                 pictograma_id=pictograma_id
#             )

#             db.add(pictograma)

#         print("PICTOGRAMAS OK")

#         db.commit()

#         print("COMMIT OK")

#         return {"msg": "ok"}

#     except Exception as e:

#         db.rollback()

#         print("ERROR REAL:", str(e))

#         return {"error": str(e)}
##########codigo post funcional



@router.delete("/sustancias/{id}")
def eliminar_sustancia(id: int, db: Session = Depends(get_db)):

    sustancia = db.query(models.Sustancia).filter(models.Sustancia.id == id).first()

    if not sustancia:
        raise HTTPException(status_code=404, detail="No encontrado")

    db.delete(sustancia)
    db.commit()

    return {"msg": "Eliminado"}

@router.put("/sustancias/{id}")
def actualizar_sustancia(
    
    id: int,
    data: schemas.SustanciaCreate,
    db: Session = Depends(get_db)
):
    print(data.dict())
    print("BASICA:", data.basica.dict())
    print("ESPECIFICA:", data.especifica.dict())
    # Buscar sustancia
    sustancia = db.query(models.Sustancia).filter(models.Sustancia.id == id).first()

    if not sustancia:
        raise HTTPException(status_code=404, detail="Sustancia no encontrada")

  
    #  ACTUALIZAR SUSTANCIA
    
    sustancia.nombre = data.basica.nombre

   
    #  INFO BASICA
    
    if sustancia.basica:
        sustancia.basica.familia = data.basica.familia
        sustancia.basica.grupo = data.basica.grupo
        sustancia.basica.sinonimo = data.basica.sinonimo
        sustancia.basica.cas = data.basica.cas
        sustancia.basica.marca = data.basica.marca
        sustancia.basica.referencia = data.basica.referencia
        sustancia.basica.fdsCompleta = data.basica.fdsCompleta
        sustancia.basica.fechaActualizacion = data.basica.fechaActualizacion
        sustancia.basica.estadoFisico = data.basica.estadoFisico


    else:
        sustancia.basica = models.InfoBasica(
            sustancia_id=sustancia.id,
            familia=data.basica.familia,
            grupo=data.basica.grupo,
            sinonimo=data.basica.sinonimo,
            cas=data.basica.cas,
            marca=data.basica.marca,
            referencia=data.basica.referencia,
            fdsCompleta=data.basica.fdsCompleta,
            fechaActualizacion=data.basica.fechaActualizacion,
            estadoFisico=data.basica.estadoFisico
            
        )

  
    # INFO GENERAL
   
    if sustancia.general:
        sustancia.general.codigoFraseH = data.general.codigoFraseH
        sustancia.general.toxicidadAgudaCat1Cat2 = data.general.toxicidadAgudaCat1Cat2
        sustancia.general.sustanciaCancerigena = data.general.sustanciaCancerigena
        sustancia.general.sitioAlmacenamiento = data.general.sitioAlmacenamiento
        sustancia.general.ubicacionEspecifica = data.general.ubicacionEspecifica
        sustancia.general.unidadMedida = data.general.unidadMedida
        sustancia.general.presentacion = data.general.presentacion
        sustancia.general.numeroRecipientes = data.general.numeroRecipientes
        sustancia.general.cantidad_total = data.general.cantidad_total
        sustancia.general.cantidad_real = data.general.cantidad_real

    else:
        sustancia.general = models.InfoGeneral(
            sustancia_id=sustancia.id,
            codigoFraseH=data.general.codigoFraseH,
            toxicidadAgudaCat1Cat2=data.general.toxicidadAgudaCat1Cat2,
            sustanciaCancerigena=data.general.sustanciaCancerigena,
            sitioAlmacenamiento=data.general.sitioAlmacenamiento,
            ubicacionEspecifica=data.general.ubicacionEspecifica,
            unidadMedida=data.general.unidadMedida,
            presentacion=data.general.presentacion,
            numeroRecipientes=data.general.numeroRecipientes,
            cantidad_total=data.general.cantidad_total,
            cantidad_real=data.general.cantidad_real
        )

   
    # INFO ESPECIFICA
    
    if sustancia.especifica:
        sustancia.especifica.esControlado = data.especifica.esControlado
        sustancia.especifica.componente1 = data.especifica.componente1
        sustancia.especifica.clasificacionAlmacenamiento = data.especifica.clasificacionAlmacenamiento
        sustancia.especifica.separacionSaftdata = data.especifica.separacionSaftdata
        sustancia.especifica.fechaIngreso = data.especifica.fechaIngreso
        sustancia.especifica.fechaVencimiento = data.especifica.fechaVencimiento
        sustancia.especifica.observaciones = data.especifica.observaciones
        sustancia.especifica.palabraAdvertencia = data.especifica.palabraAdvertencia
        sustancia.especifica.preventiva = data.especifica.preventiva
        sustancia.especifica.respuesta = data.especifica.respuesta
        sustancia.especifica.razonSocial = data.especifica.razonSocial
        sustancia.especifica.direccion = data.especifica.direccion
        sustancia.especifica.contacto = data.especifica.contacto
    else:
        sustancia.especifica = models.InfoEspecifica(
            sustancia_id=sustancia.id,
            esControlado=data.especifica.esControlado,
            componente1=data.especifica.componente1,
            clasificacionAlmacenamiento=data.especifica.clasificacionAlmacenamiento,
            separacionSaftdata=data.especifica.separacionSaftdata,
            fechaIngreso=data.especifica.fechaIngreso,
            fechaVencimiento=data.especifica.fechaVencimiento,
            observaciones=data.especifica.observaciones,
            palabraAdvertencia=data.especifica.palabraAdvertencia,
            preventiva=data.especifica.preventiva,
            respuesta=data.especifica.respuesta,
            razonSocial=data.especifica.razonSocial,
            direccion=data.especifica.direccion,
            contacto=data.especifica.contacto
        )

   
    # PICTOGRAMAS (CLAVE)
   

    # IDs actuales en BD
    actuales = {p.pictograma_id for p in sustancia.pictogramas}

    # IDs nuevos enviados desde frontend
    nuevos = set(data.pictogramas)

    # 🔴 eliminar los que ya no están
    for p in sustancia.pictogramas:
        if p.pictograma_id not in nuevos:
            db.delete(p)

    # 🔵 agregar los nuevos
    for pictograma_id in nuevos - actuales:
        db.add(models.SustanciaPictograma(
            sustancia_id=sustancia.id,
            pictograma_id=pictograma_id
        ))

    
    # GUARDAR
   
    db.commit()

    return {"msg": "Sustancia actualizada correctamente"}




@router.put("/sustancias/{id}/descontar")
def descontar_cantidad(
    id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    sustancia = db.query(models.Sustancia).filter(
        models.Sustancia.id == id
    ).first()

    if not sustancia:
        raise HTTPException(
            status_code=404,
            detail="No encontrada"
        )

    info_general = sustancia.general

    cantidad_descontar = Decimal(
        str(data["cantidad"])
    )

    print("ANTES:", info_general.cantidad_real)

    # 🚨 VALIDAR STOCK
    if cantidad_descontar > info_general.cantidad_real:
        raise HTTPException(
            status_code=400,
            detail="No hay suficiente cantidad disponible"
        )

    # descontar cantidad
    info_general.cantidad_real = (
        info_general.cantidad_real - cantidad_descontar
    )

    print("DESPUES:", info_general.cantidad_real)

   
    # GUARDAR OBSERVACION CONSUMO
    

    observacion_consumo = models.ObservacionConsumo(
        fechaObservacion=data["fechaObservacion"],
        responsable=data["usuario"],
        observacion=data["observacion"],
        cantidadConsumo=data["cantidad"],#################3
        sustancia_id=sustancia.id
    )

    db.add(observacion_consumo)

    # guardar cambios
    db.commit()

    db.refresh(info_general)

    return {
        "mensaje": "Cantidad actualizada",
        "cantidad_real": float(info_general.cantidad_real)
    }
