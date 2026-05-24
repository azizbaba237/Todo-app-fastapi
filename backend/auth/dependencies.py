from fastapi import Security, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.database import get_db
from .jwt import decode_access_token
from models.utilisateur import Utilisateur
from sqlalchemy.orm import Session

bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(bearer_scheme),
    db: Session = Depends(get_db)
) -> Utilisateur:
    
    token = credentials.credentials # Extraire le token de la valeur "Bearer <token>"
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token d'acces invalide.")

    user_id = payload.get("sub")
    db_user = db.query(Utilisateur).filter(Utilisateur.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Utilisateur non trouve.")

    return db_user