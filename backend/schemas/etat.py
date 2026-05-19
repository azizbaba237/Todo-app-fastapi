from enum import Enum 

class Etat(str, Enum):
    AFAIRE   = "A faire"
    ENCOURS  = "En cours"
    TERMINEE = "Terminée"