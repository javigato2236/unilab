from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, Date
from database import Base
from sqlalchemy.orm import relationship

class RegistroUsuarios(Base):
    __tablename__ = "registroUsuarios"

    id = Column(Integer, primary_key=True, index=True)
    correo = Column(String(100), unique=True, index=True)
    clave = Column(String(255))



########################################
class Sustancia(Base):
    __tablename__ = "sustancias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), index=True)

    basica = relationship("InfoBasica", back_populates="sustancia", uselist=False, cascade="all, delete")
    general = relationship("InfoGeneral", back_populates="sustancia", uselist=False, cascade="all, delete")
    especifica = relationship("InfoEspecifica", back_populates="sustancia", uselist=False, cascade="all, delete")

    pictogramas = relationship("SustanciaPictograma", back_populates="sustancia", cascade="all, delete")


class CatalogoPictograma(Base):
    __tablename__ = "catalogo_pictogramas"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50))
    url = Column(String(255))


class SustanciaPictograma(Base):
    __tablename__ = "sustancia_pictogramas"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))
    pictograma_id = Column(Integer, ForeignKey("catalogo_pictogramas.id"))

    sustancia = relationship("Sustancia", back_populates="pictogramas")
    pictograma = relationship("CatalogoPictograma")

class InfoBasica(Base):
    __tablename__ = "info_basica"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))

    familia = Column(String(150))
    grupo = Column(String(30))
    sinonimo = Column(String(150))
    cas = Column(String(100))
    marca = Column(String(100))
    referencia = Column(String(100))
    fds_completa = Column(String(10))
    fecha_actualizacion = Column(Date)
    estado_fisico = Column(String(50))

    sustancia = relationship("Sustancia", back_populates="basica")


class InfoGeneral(Base):
    __tablename__ = "info_general"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))
    codigo_frase_h = Column(String(100))
    toxicidad_aguda_cat1_cat2 = Column(String(200))
    sustancia_cancerigena = Column(String(10))
    sitio_almacenamiento = Column(String(150))
    ubicacion_especifica = Column(String(150))
    unidad_medida = Column(String(50))
    presentacion = Column(String(150))
    numero_recipientes = Column(Integer)
    cantidad_total = Column(Numeric(12,3))
    cantidad_real = Column(Numeric(12,3))

    sustancia = relationship("Sustancia", back_populates="general")


class InfoEspecifica(Base):
    __tablename__ = "info_especifica"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))
    es_controlado = Column(String(30))
    componente_1 = Column(String(100))
    clasificacion_almacenamiento = Column(String(100))
    separacion_saftdata = Column(String(50))
    fecha_ingreso = Column(String(30))
    fecha_vencimiento = Column(Date)
    observaciones = Column(String(300))
    palabra_advertencia = Column(String(50))
    preventiva = Column(String(200))
    respuesta = Column(String(200))
    razon_social = Column(String(150))
    direccion = Column(String(150))
    contacto = Column(String(100))

    sustancia = relationship("Sustancia", back_populates="especifica")