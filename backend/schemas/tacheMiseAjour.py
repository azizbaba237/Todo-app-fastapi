from pydantic import BaseModel, Field
from datetime import date 
from schemas.etat import Etat 

class TacheMiseAjour(BaseModel):
    titre       : str = None
    description : str = None
    etat        : Etat = None
    date_echeance : date = None 
    date_modification : date = date.today()