from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship 
from db.database import Base

class Utilisateur(Base):
    __tablename__ = "utilisateur"
    
    id = Column(Integer, primary_key=True, index=True)
    pseudonyme = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mot_de_passe =Column(String, nullable=False)
    
    taches = relationship("Tache", back_populates="proprietaire_tache")
    