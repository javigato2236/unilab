from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

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
class InfoBasicaSchema(BaseModel):
    nombre: str
    familia: str
    grupo: str
    sinonimo: str
    cas: str
    marca: str
    referencia: str

    fds_completa: str  # SI / NO
    fecha_actualizacion_fds: Optional[date]

    estado_fisico: str  # SOLIDO / LIQUIDO


# =========================
# 🧪 MODAL 2: INFO GENERAL
# =========================

class InfoGeneralSchema(BaseModel):
    codigo_frase_h: str
    sustancia_cancerigena: str  # SI / NO

    sitio_almacenamiento: str
    ubicacion_especifica: str

    unidad_medida: str
    presentacion: str

    numero_recipientes: int

    cantidad_total: float
    cantidad_real: float

    es_controlado: str  # SI / NO
    componente_1: str

    clasificacion_almacenamiento: str
    separacion_saftdata: str

    fecha_ingreso: Optional[date]
    fecha_vencimiento: Optional[date]

    observaciones: Optional[str]



# MODAL 3: INFO ESPECÍFICA


class InfoEspecificaSchema(BaseModel):
    palabra_advertencia: str

    preventiva: str
    respuesta_intervencion: str

    razon_social: str
    direccion: str
    contacto: str



#PICTOGRAMAS


class PictogramaSchema(BaseModel):
    id: int



#  SUSTANCIA COMPLETA


class SustanciaCreate(BaseModel):
    basica: InfoBasicaSchema
    general: InfoGeneralSchema
    especifica: InfoEspecificaSchema
    pictogramas: List[int]  