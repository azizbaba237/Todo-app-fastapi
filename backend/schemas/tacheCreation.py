from pydantic import BaseModel, Field
from datetime import date
from schemas.etat import Etat

class TacheCreation(BaseModel):
    titre       : str = Field(min_length=1)
    description : str = Field(min_length=1)
    etat        : Etat
    date_echeance : date
    date_creation : date = date.today()
    date_modification : date = date.today()