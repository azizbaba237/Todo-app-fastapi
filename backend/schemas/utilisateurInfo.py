from pydantic import BaseModel

class UtilisateurInfo(BaseModel):
    pseudonyme: str 
    mot_de_passe: str 