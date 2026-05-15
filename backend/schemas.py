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


# Schesmas modales ingreso de datos

# INFO BASICA
class InfoBasicaSchema(BaseModel):
    nombre: str
    familia: str
    grupo: str
    sinonimo: str
    cas: str
    marca: str
    referencia: str
    fdsCompleta: str  # SI / NO
    fechaActualizacion: Optional[date] = None
    estadoFisico: str  # SOLIDO / LIQUIDO

# INFO GENERAL
class InfoGeneralSchema(BaseModel):
    codigoFraseH: str
    toxicidadAgudaCat1Cat2: str
    sustanciaCancerigena: str  # SI / NO
    sitioAlmacenamiento: str
    ubicacionEspecifica: str
    unidadMedida: str
    presentacion: str
    numeroRecipientes: Optional[int] = None
    cantidad_total: float
    cantidad_real: float

# INFO ESPECÍFICA
class InfoEspecificaSchema(BaseModel):
    esControlado: str  # SI / NO
    componente1: str
    clasificacionAlmacenamiento: str
    separacionSaftdata: str
    fechaIngreso: Optional[date] = None
    fechaVencimiento: Optional[date] = None
    observaciones: Optional[str] = None
    palabraAdvertencia: str
    preventiva: str
    respuesta: str
    razonSocial: str
    direccion: str
    contacto: str



# PICTOGRAMAS
class PictogramaSchema(BaseModel):
    id: int

# OBSERVACIONES CONSUMO ############################
class ObservacionConsumoSchema(BaseModel):
    fechaObservacion:Optional[date] = None
    responsable:Optional[str] = None
    observacion:Optional[str] = None
#####################################################

#  SUSTANCIA COMPLETA
class SustanciaCreate(BaseModel):
    basica: InfoBasicaSchema
    general: InfoGeneralSchema
    especifica: InfoEspecificaSchema
    pictogramas: List[int]  

    ob_consumo: Optional[ObservacionConsumoSchema] = None   ################




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
    familia: Optional[str] = None
    grupo: Optional[str] = None
    sinonimo: Optional[str] = None
    cas: Optional[str] = None
    marca: Optional[str] = None
    referencia: Optional[str] = None
    fdsCompleta: Optional[str] = None
    fechaActualizacion: Optional[date] = None
    estadoFisico: Optional[str] = None

    class Config:
        from_attributes = True

# 🔹 GENERAL
class InfoGeneralOut(BaseModel):
    codigoFraseH: Optional[str] = None
    toxicidadAgudaCat1Cat2: Optional[str] = None
    sustanciaCancerigena: Optional[str] = None
    sitioAlmacenamiento: Optional[str] = None
    ubicacionEspecifica: Optional[str] = None
    unidadMedida: Optional[str] = None
    presentacion: Optional[str] = None
    numeroRecipientes: Optional[int] = None
    cantidad_total: Optional[float] = None    
    cantidad_real: Optional[float] = None

    class Config:
        from_attributes = True


# 🔹 ESPECIFICA
class InfoEspecificaOut(BaseModel):
    esControlado: Optional[str] = None
    componente1: Optional[str] = None
    clasificacionAlmacenamiento: Optional[str] = None
    separacionSaftdata: Optional[str] = None
    fechaIngreso: Optional[date] = None
    fechaVencimiento: Optional[date] = None
    observaciones: Optional[str] = None
    palabraAdvertencia: Optional[str] = None
    preventiva: Optional[str] = None
    respuesta: Optional[str] = None
    razonSocial: Optional[str] = None
    direccion: Optional[str] = None
    contacto: Optional[str] = None

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