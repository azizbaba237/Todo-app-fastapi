from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
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
    id_utilisateur = Column(Integer, ForeignKey("utilisateur.id"))
    
    proprietaire_tache = relationship("Utilisateur", back_populates="taches")