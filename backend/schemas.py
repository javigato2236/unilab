from pydantic import BaseModel, EmailStr
from typing import List

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




#################################################
class Basica(BaseModel):
    nombre: str
    familia: str
    sinonimo: str

class General(BaseModel):
    cantidad_total: int
    cantidad_real: int

class Especifica(BaseModel):
    palabra_advertencia: str

class SustanciaCreate(BaseModel):
    basica: Basica
    general: General
    especifica: Especifica
    pictogramas: List[int]