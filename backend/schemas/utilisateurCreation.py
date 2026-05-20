from pydantic import BaseModel, EmailStr

class UtilisateurCreation(BaseModel):
    pseudonyme : str = None
    email : EmailStr = None
    mot_de_passe : str = None