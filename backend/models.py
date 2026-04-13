from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy.orm import relationship

class RegistroUsuarios(Base):
    __tablename__ = "registroUsuarios"

    id = Column(Integer, primary_key=True, index=True)
    correo = Column(String(100), unique=True, index=True)
    clave = Column(String(255))



########################################
class CatalogoPictograma(Base):
    __tablename__ = "catalogo_pictogramas"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50))
    url = Column(String(255))


# class Sustancia(Base):
#     __tablename__ = "sustancias"

#     id = Column(Integer, primary_key=True, index=True)
#     nombre = Column(String(150), index=True)

#     basica = relationship("InfoBasica", back_populates="sustancia", uselist=False, cascade="all, delete")
#     general = relationship("InfoGeneral", back_populates="sustancia", uselist=False, cascade="all, delete")
#     especifica = relationship("InfoEspecifica", back_populates="sustancia", uselist=False, cascade="all, delete")

#     pictogramas = relationship("SustanciaPictograma", back_populates="sustancia", cascade="all, delete")