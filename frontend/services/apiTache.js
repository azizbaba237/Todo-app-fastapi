// URL de base de ton API FastAPI
const BASE_URL = "http://127.0.0.1:8000/taches";

/**
 * Envoie une requête POST à FastAPI pour créer une nouvelle tâche.
 * @param {Object} nouvelleTache - L'objet contenant les données de la tâche.
 * @returns {Promise<Object>} La tâche créée avec son ID généré par la base de données.
 */
export async function ajouter(nouvelleTache) {
    const response = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nouvelleTache)
    });

    // TRAITEMENT DES ERREURS (Notamment l'erreur 422 de validation)
    if (!response.ok) {
        if (response.status === 422) {
            const erreurValidation = await response.json();
            // Ce log va lister précisément quel champ (titre, etat, etc.) a échoué à la validation Python
            console.error("❌ Erreur 422 de FastAPI : Données invalides !", erreurValidation.detail);
        }
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    return await response.json();
}

/**
 * Récupère les détails d'une seule tâche via son identifiant (GET).
 * @param {string|number} idTache - L'ID de la tâche à récupérer.
 * @returns {Promise<Object>} L'objet de la tâche récupérée.
 */
export async function donneTacheDetail(idTache) {
    const response = await fetch(`${BASE_URL}/${idTache}`);

    if (!response.ok) {
        console.error(`Impossible de récupérer la tâche n°${idTache}`);
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    return await response.json();
}

/**
 * Envoie une requête PUT (ou PATCH) à FastAPI pour modifier une tâche existante.
 * @param {string|number} idTache - L'ID de la tâche à modifier.
 * @param {Object} tacheModifiee - Les nouvelles données à appliquer.
 * @returns {Promise<Object>} La tâche mise à jour renvoyée par le serveur.
 */
export async function modifier(idTache, tacheModifiee) {
    const response = await fetch(`${BASE_URL}/${idTache}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tacheModifiee)
    });

    // TRAITEMENT DES ERREURS
    if (!response.ok) {
        if (response.status === 422) {
            const erreurValidation = await response.json();
            console.error("❌ Erreur 422 lors de la modification :", erreurValidation.detail);
        }
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    return await response.json();
}

/**
 * Récupère la liste complète de TOUTES les tâches (GET).
 * @returns {Promise<Array>} Un tableau contenant toutes les tâches.
 */
export async function listerTaches() {
    const token = localStorage.getItem("access_token");

    // 🔍 ESPION N°2 : Vérifie ce qui part réellement vers l'API
    console.log("👉 Token extrait du LocalStorage pour l'envoi :", token);
    
    // Cette fois-on tape directement sur http://127.0.0.1:8000/taches/ sans ID
    const response = await fetch(`${BASE_URL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    });

    if (!response.ok) {
        console.error("Impossible de récupérer la liste des tâches");
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    return await response.json();
}