from sqlalchemy.orm import Session
from schemas.tacheCreation import TacheCreation
from models.tache import Tache
from sqlalchemy.exc import SQLAlchemyError

def createTache(tache : TacheCreation, db: Session):
    """
    Crée une nouvelle tâche dans la base de données.
    """
    try :
        # Mappe les données du schéma Pydantic vers le modèle SQLAlchemy
        db_tache = Tache (
            titre = tache.titre,
            description = tache.description,
            etat = tache.etat.value, # Extraction de la valeur brute de l'Enum (ex: "A faire")
            date_echeance = tache.date_echeance,
            date_creation = tache.date_creation,
            date_modification = tache.date_modification            
        )
        db.add(db_tache)          # Prépare l'insertion de l'objet
        db.commit()               # Valide la transaction dans la base de données
        db.refresh(db_tache)      # Récupère l'ID généré et les données fraîches du serveur
        return db_tache
    except SQLAlchemyError as e:
        db.rollback()             # Annule tout en cas d'erreur (évite de corrompre la session)
        raise                     # Relance l'erreur pour qu'elle soit gérée par FastAPI

def updateTache(id : int, tache: TacheCreation, db: Session ):
    """
    Met à jour une tâche existante identifiée par son ID.
    """
    try:
        # Recherche de la tâche existante
        db_tache = db.query(Tache).filter(Tache.id == id).first()
        if not db_tache:
            return None
        
        # model_dump(exclude_unset=True) permet de ne modifier que les champs envoyés dans la requête
        for cle, valeur in tache.model_dump(exclude_unset=True).items():
            if cle == "etat":
                setattr(db_tache, cle, valeur.value) # Gère spécifiquement l'Enum
            else:
                setattr(db_tache, cle, valeur)       # Assigne dynamiquement les autres valeurs
        
        db.commit()
        db.refresh(db_tache)
        return db_tache
    except SQLAlchemyError as e:
        db.rollback()
        raise

def getAllTache(db: Session):
    """
    Récupère la liste complète de toutes les tâches.
    """
    try:
        # Exécute un SELECT * FROM taches
        db_tache = db.query(Tache).all()
        return db_tache
    except SQLAlchemyError:
        raise

def getTacheById(id : int, db: Session ):
    """
    Récupère une tâche spécifique par son identifiant unique.
    """
    try:
        # Utilise un filtre pour cibler l'ID
        db_tache = db.query(Tache).filter(Tache.id == id).first()
        return db_tache 
    except SQLAlchemyError:
        raise

def deleteTache(id : int, db: Session ):
    """
    Supprime une tâche de la base de données.
    """
    try:
        # On cherche d'abord si la tâche existe
        db_tache = db.query(Tache).filter(Tache.id == id).first()
        if not db_tache:
            return False 
        
        db.delete(db_tache) # Marque l'objet pour suppression
        db.commit()         # Applique la suppression
        return True
    except SQLAlchemyError:
        db.rollback()       # En cas de problème de contrainte, on annule
        raise