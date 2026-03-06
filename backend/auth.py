from datetime import datetime, timedelta
from jose import jwt, JWTError, ExpiredSignatureError
from passlib.context import CryptContext
from fastapi import HTTPException
from config import SECRET_KEY, ALGORITHM

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str):
#     return pwd_context.hash(password)
def hash_password(password: str):
    password = password[:72]  # limitar a 72 bytes ya que si se pasa la contraseña hasheada arroja error
    return pwd_context.hash(password)

# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed), veryficamos que l
def verify_password(plain, hashed):
    plain = plain[:72]
    return pwd_context.verify(plain, hashed)

def create_token(data: dict, expires_delta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



# def verify_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         print("Token válido, payload:", payload)
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Token inválido o expirado")
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        return payload

    except ExpiredSignatureError:
        print("TOKEN EXPIRADO")
        raise HTTPException(status_code=401, detail="Token expirado")

    except JWTError:
        print("TOKEN INVÁLIDO")
        raise HTTPException(status_code=401, detail="Token inválido")