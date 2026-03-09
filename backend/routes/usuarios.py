from fastapi import APIRouter, Depends, HTTPException, Header

from sqlalchemy.orm import Session
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

    # 🔎 Verificar token JWT (firma y expiración)
    
    payload = auth.verify_token(data.token)

    # 📌 Obtener correo desde el JWT
    correo = payload.get("sub")
    

    if not correo:
        raise HTTPException(status_code=400, detail="Token inválido")

    # 🔎 Buscar usuario
    user = db.query(models.RegistroUsuarios).filter(
        models.RegistroUsuarios.correo == correo
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # 🔒 Hashear nueva contraseña
    hashed_password = auth.hash_password(data.nueva_clave)

    # 💾 Actualizar en base de datos
    user.clave = hashed_password
    db.commit()

    return {"msg": "Contraseña actualizada correctamente"}