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

class ValidateToken(BaseModel):
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

    fdsCompleta: str  # SI / NO
    ultimaFechaActualizacion: Optional[date]

    estadoFisico: str  # SOLIDO / LIQUIDO


# =========================
# 🧪 MODAL 2: INFO GENERAL
# =========================

class InfoGeneralSchema(BaseModel):
    codigoFraseH: str
    toxicidadCat1Cat2: str

    sustanciaCancerigena: str  # SI / NO

    sitioAlmacenamiento: str
    ubicacionEspecifica: str

    unidadDeMedida: str
    presentacion: str

    numeroDeRecipientes: int

    cantidadTotal: float
    cantidadReal: float

   



# MODAL 3: INFO ESPECÍFICA


class InfoEspecificaSchema(BaseModel):
    esControlado: str  # SI / NO
    componente1: str

    clasificacionAlmacenamiento: str
    separacionMetodoSAFTDATA: str

    fechaIngresoLabQuimica: Optional[date]
    fechaVencimientoProyectada: Optional[date]

    observaciones: Optional[str]
    palabraAdvertencia: str

    preventivaCodigoDetalle: str
    respuestaOintervencionCodigoDetalle: str

    razonSocial: str
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

# /////////////////////////////////////

class PictogramaOut(BaseModel):
    id: int
    nombre: str
    url: str

    class Config:
        from_attributes = True


# 🔹 RELACIÓN INTERMEDIA
class SustanciaPictogramaOut(BaseModel):
    id: int
    pictograma: PictogramaOut

    class Config:
        from_attributes = True


# 🔹 BASICA
class InfoBasicaOut(BaseModel):
    familia: str
    sinonimo: str

    class Config:
        from_attributes = True


# 🔹 GENERAL
class InfoGeneralOut(BaseModel):
    cantidad_total: float
    cantidad_real: float

    class Config:
        from_attributes = True


# 🔹 ESPECIFICA
class InfoEspecificaOut(BaseModel):
    palabra_advertencia: str

    class Config:
        from_attributes = True


# 🔹 SUSTANCIA FINAL
class SustanciaOut(BaseModel):
    id: int
    nombre: str

    basica: InfoBasicaOut | None
    general: InfoGeneralOut | None
    especifica: InfoEspecificaOut | None
    pictogramas: List[SustanciaPictogramaOut]

    class Config:
        from_attributes = True