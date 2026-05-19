# ✅ Todo App — FastAPI + Vanilla JS

Une application de gestion de tâches (Todo List) avec :
- 🐍 **Backend** : FastAPI (Python)
- 🌐 **Frontend** : HTML / CSS / JavaScript

---

## 📁 Structure du projet

todo-app/
├── backend/       # API REST avec FastAPI
├── frontend/      # Interface utilisateur
├── .gitignore
└── README.md


---

## 🚀 Lancer le projet

### Backend (FastAPI)

# 1. Aller dans le dossier backend
cd backend

# 2. Créer un environnement virtuel
python -m venv venv

# 3. L'activer
# Sur Windows :
venv\Scripts\activate
# Sur Mac/Linux :
source venv/bin/activate

# 4. Installer les dépendances
pip install -r requirements.txt

# 5. Lancer le serveur
uvicorn main:app --reload


L'API sera disponible sur : http://localhost:8000
Documentation auto : http://localhost:8000/docs

### Frontend

Ouvre simplement le fichier `frontend/index.html` dans ton navigateur.
Ou utilise l'extension **Live Server** sur VS Code.

---

## 📡 Endpoints de l'API

| Méthode | Route         | Description              |
|---------|---------------|--------------------------|
| GET     | /taches        | Récupérer toutes les tâches |
| POST    | /taches        | Créer une tâche          |
| PUT     | /taches/{id}   | Modifier une tâche       |
| DELETE  | /taches/{id}   | Supprimer une tâche      |

---

## 🛠️ Technologies utilisées

- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- HTML5 / CSS3 / JavaScript ES6

---

## 👤 Auteur

[GitHub](https://github.com/azizbaba237)