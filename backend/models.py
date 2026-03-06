from sqlalchemy import Column, Integer, String
from database import Base

class RegistroUsuarios(Base):
    __tablename__ = "registroUsuarios"

    id = Column(Integer, primary_key=True, index=True)
    correo = Column(String(100), unique=True, index=True)
    clave = Column(String(255))