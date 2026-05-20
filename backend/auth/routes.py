from fastapi import APIRouter, Depends 
from schemas.utilisateurCreation import UtilisateurCreation
from sqlalchemy.orm import Session 
from db.database import get_db 
from auth.hashing import hash_password
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