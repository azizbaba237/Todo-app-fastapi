from fastapi import Security, Depends, HTTPException
from fastapi.security import APIKeyHeader
from db.database import get_db 
from .jwt import decode_access_token 
from models.utilisateur import Utilisateur
from sqlalchemy.orm import Session


api_key_header = APIKeyHeader(name="Authorization")

def get_current_user(token : str = Security(api_key_header), db: Session = Depends(get_db)) -> Utilisateur:
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token d'acces invalide.")
    
    user_id = payload.get("sub")
    db_user = db.query(Utilisateur).filter(Utilisateur.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Utilisateur non trouve.")
    
    return db_user  