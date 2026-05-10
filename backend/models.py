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
    fdsCompleta = Column(String(10))
    fechaActualizacion = Column(Date)
    estadoFisico = Column(String(50))

    sustancia = relationship("Sustancia", back_populates="basica")


class InfoGeneral(Base):
    __tablename__ = "info_general"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))
    codigoFraseH = Column(String(100))
    toxicidadAgudaCat1Cat2 = Column(String(200))
    sustanciaCancerigena = Column(String(10))
    sitioAlmacenamiento = Column(String(150))
    ubicacionEspecifica = Column(String(150))
    unidadMedida = Column(String(50))
    presentacion = Column(String(150))
    numeroRecipientes = Column(Integer)
    cantidad_total = Column(Numeric(12,3))
    cantidad_real = Column(Numeric(12,3))

    sustancia = relationship("Sustancia", back_populates="general")


class InfoEspecifica(Base):
    __tablename__ = "info_especifica"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))
    esControlado = Column(String(30))
    componente1 = Column(String(100))
    clasificacionAlmacenamiento = Column(String(100))
    separacionSaftdata = Column(String(50))
    fechaIngreso = Column(Date)
    fechaVencimiento = Column(Date)
    observaciones = Column(String(300))
    palabraAdvertencia = Column(String(50))
    preventiva = Column(String(200))
    respuesta = Column(String(200))
    razonSocial = Column(String(150))
    direccion = Column(String(150))
    contacto = Column(String(100))

    sustancia = relationship("Sustancia", back_populates="especifica")