from sqlalchemy import Column, Integer, String, Date 
from db.database import Base 

class Tache(Base):
    __tablename__ = "taches"
    
    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    description = Column (String)
    etat = Column(String)
    date_echeance = Column(Date)
    date_creation = Column(Date)
    date_modification = Column(Date)