from fastapi import APIRouter, Depends, HTTPException
from auth.jwt import create_access_token, create_refresh_token, decode_refresh_token
from schemas.utilisateurInfo import UtilisateurInfo
from schemas.utilisateurCreation import UtilisateurCreation
from sqlalchemy.orm import Session 
from db.database import get_db 
from auth.hashing import hash_password, verify_password
from models.utilisateur import Utilisateur 


router = APIRouter()

# Route register user
@router.post("/register")
def register(user: UtilisateurCreation, db: Session = Depends(get_db)):
    user.mot_de_passe = hash_password(user.mot_de_passe)
    db_user = Utilisateur(pseudonyme= user.pseudonyme, email=user.email, mot_de_passe=user.mot_de_passe)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"Message" : "Utilsateur cree avec succes."}


# Login 
@router.post("/login")
def Login(user: UtilisateurInfo, db : Session = Depends(get_db)):
    db_user = db.query(Utilisateur).filter(Utilisateur.pseudonyme == user.pseudonyme).first()
    if not db_user or not verify_password(user.mot_de_passe, db_user.mot_de_passe):
        raise HTTPException(status_code=401, detail="identification invalide.")
    
    access_token  = create_access_token({"sub":str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub":str(db_user.id), "type": "refresh"})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

# Refresh token route 
@router.post("/refresh/")
def refresh_token(token : str, db : Session = Depends(get_db)):
    payload = decode_refresh_token(token)
    if not payload :
        raise HTTPException(status_code=401, detail="Refresh token invalide")
    
    id_user = payload.get("sub")
    db_user = db.query(Utilisateur).filter(Utilisateur.id == id_user).first()
    if not db_user :
        raise HTTPException(status_code=401, detail="Utilisateur invalide")
    
    access_token  = create_access_token({"sub":str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub":str(db_user.id), "type": "refresh"})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}