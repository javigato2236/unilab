from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routes import usuarios


#########################
from fastapi.staticfiles import StaticFiles

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

########### SERVIR IMÁGENES 
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

########### RUTAS

app.include_router(usuarios.router, prefix="/api")
