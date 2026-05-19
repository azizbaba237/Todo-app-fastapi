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

---
## ⚙️ Configuration de l'environnement

Ce projet utilise des variables d'environnement pour protéger les informations sensibles.

### 1. Créer le fichier `.env`

Dans le dossier `backend/`, copie le fichier `.env.example` et renomme-le `.env` :

```bash
cp backend/.env.example backend/.env
```

### 2. Remplir le fichier `.env`

Ouvre `backend/.env` et remplis avec tes vraies valeurs :

```env
DATABASE_URL=postgresql://ton_utilisateur:ton_mot_de_passe@localhost:5432/nom_de_ta_bd
```

### 3. ⚠️ Important

- Ne **jamais** partager ton fichier `.env`
- Le fichier `.env` est ignoré par Git (voir `.gitignore`)
- Seul le fichier `.env.example` est sur GitHub (sans vraies valeurs)
---

## 👤 Auteur

[GitHub](https://github.com/azizbaba237)

