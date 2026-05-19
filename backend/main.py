from fastapi import FastAPI, Depends, HTTPException
from schemas.tacheCreation import TacheCreation
from fastapi.middleware.cors import CORSMiddleware
from schemas.tacheMiseAjour import TacheMiseAjour
from sqlalchemy.orm import Session
from crud import tache
from db.database import get_db


app = FastAPI(title= "API de gestion des taches",
              description=
              """
              cette application permet de : 
              - Lister les taches
              - Récupérer les details d'une tache 
              - Ajouter une tache 
              - Mettre à jour une tache 
              - Supprimer une tache 
              """
              ) 

origins = [
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True, 
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Afficher toutes les taches disponibles 
@app.get("/taches/", 
         summary="Récupérer toutes les taches",
         description="Toutes les taches de la BDD se retrouvent dans un JSON",
         response_description="Liste de toutes les taches au format JSON")
def getAllTache(db: Session = Depends(get_db)):
    try:
        db_tache = tache.getAllTache(db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    return db_tache

# Afficher une tache par son id
@app.get("/taches/{tache_id}")
def getTache(tache_id : int, db: Session = Depends(get_db)):
    try:
        db_tache = tache.getTacheById(tache_id, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tache non trouvée")
    return db_tache

# Ajouter une tache à la liste 
@app.post("/taches/")
def createTache(t : TacheCreation, db: Session = Depends(get_db)):  
    try:
        db_tache = tache.createTache(t, db)
        return db_tache 
    except Exception:
        raise(HTTPException(status_code=500, detail="Erreur interne du serveur"))

# Modifier une tache 
@app.put("/taches/{tache_id}")
def updateTache(tache_id : int, t: TacheMiseAjour, db: Session = Depends(get_db)):
    try:
        db_tache = tache.updateTache(tache_id, t, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tache non trouvée")
    return db_tache

# Supprimer un tache 
@app.delete("/taches/{tache_id}")
def deleteTache(tache_id : int, db: Session = Depends(get_db)):
    try:
        db_tache = tache.deleteTache(tache_id, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tache non trouvée")
    return {"message": "La tache a été supprimée avec succès", "id": tache_id}