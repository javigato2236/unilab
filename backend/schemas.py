from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    correo: EmailStr
    clave: str

class UsuarioLogin(BaseModel):
    correo: EmailStr
    clave: str

class RefreshToken(BaseModel):
    refresh_token: str

class ForgotPassword(BaseModel):
    correo: EmailStr

class ResetPassword(BaseModel):
    token: str
    nueva_clave: str

class ValidateToken(BaseModel):##########################
    token: str