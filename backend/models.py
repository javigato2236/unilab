from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
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

    familia = Column(String(100))
    sinonimo = Column(String(150))

    sustancia = relationship("Sustancia", back_populates="basica")


class InfoGeneral(Base):
    __tablename__ = "info_general"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))

    cantidad_total = Column(Numeric(12,3))
    cantidad_real = Column(Numeric(12,3))

    sustancia = relationship("Sustancia", back_populates="general")


class InfoEspecifica(Base):
    __tablename__ = "info_especifica"

    id = Column(Integer, primary_key=True)
    sustancia_id = Column(Integer, ForeignKey("sustancias.id"))

    palabra_advertencia = Column(String(50))

    sustancia = relationship("Sustancia", back_populates="especifica")