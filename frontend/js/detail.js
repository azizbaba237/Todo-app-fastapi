import { ajouter, donneTacheDetail, modifier } from "../services/apiTache.js";

/**
 * Remplit le formulaire avec les données existantes d'une tâche 
 * et intercepte la soumission pour effectuer une mise à jour (PUT/PATCH).
 * @param {string|number} idTache - L'identifiant de la tâche à modifier.
 */
async function genererDetailModification(idTache) {
    // 1. Alignement des textes et boutons de l'interface
    let titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Modifier une tâche";

    let btnValider = document.getElementById("btnValider");
    btnValider.innerText = "Enregistrer"; // Force le texte approprié pour la modification

    let btnAnnuler = document.getElementById("btnAnnuler");
    btnAnnuler.href = "index.html"; // Retour simple à l'accueil en cas d'annulation

    // 2. Récupération des données de la tâche depuis l'API FastAPI
    let tacheJSON = await donneTacheDetail(idTache);

    // 3. Pré-remplissage des champs du formulaire avec les valeurs existantes
    let titreTache = document.getElementById("titre");
    titreTache.value = tacheJSON.titre;

    let descriptionTache = document.getElementById("description");
    descriptionTache.value = tacheJSON.description;

    let etatTache = document.getElementById("etat");
    etatTache.value = tacheJSON.etat;

    let date_echeance = document.getElementById("date_echeance");
    date_echeance.value = tacheJSON.date_echeance;

    // 4. Interception de la soumission du formulaire de modification
    let formTache = document.getElementById("formTache");

    formTache.onsubmit = async function (e) {
        e.preventDefault(); // Bloque le rechargement natif de la page

        // Construction de l'objet contenant les modifications
        const modiferTache = {
            "titre": document.getElementById("titre").value,
            "description": document.getElementById("description").value,
            "etat": document.getElementById("etat").value,
            "date_echeance": document.getElementById("date_echeance").value
        };

        try {
            // Envoi des modifications au serveur
            const data = await modifier(idTache, modiferTache);

            // Redirection vers l'index avec notification de succès si l'ID est bien renvoyé
            if (data && data.id) {
                window.location.href = "index.html?modifier=" + data.id;
            } else {
                alert("Erreur : La tâche n'a pas pu être modifiée.");
            }
        } catch (error) {
            console.error("Erreur API lors de la modification :", error);
            alert("Impossible de joindre le serveur FastAPI.");
        }
    };
}

/**
 * Prépare l'interface pour la création d'une nouvelle tâche 
 * et gère l'envoi des données vers l'API (POST).
 */
function genererDetailAjout() {
    // 1. Mise à jour des textes et des liens de la page
    let titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Ajouter une nouvelle tâche";

    let btnValider = document.getElementById("btnValider");
    btnValider.innerText = "Ajouter"; // Adapte le bouton pour le contexte d'insertion

    let btnAnnuler = document.getElementById("btnAnnuler");
    btnAnnuler.href = "index.html?annulerAjouter=1";

    // 2. Interception de la soumission du formulaire d'ajout
    let formTache = document.getElementById("formTache");

    formTache.onsubmit = async function (e) {
        e.preventDefault(); // Bloque le rechargement natif de la page

        // Collecte des valeurs saisies par l'utilisateur
        const nouvelleTache = {
            "titre": document.getElementById("titre").value,
            "description": document.getElementById("description").value,
            "etat": document.getElementById("etat").value,
            "date_echeance": document.getElementById("date_echeance").value
        };

        try {
            // Envoi de la nouvelle tâche à l'API FastAPI
            const data = await ajouter(nouvelleTache);

            // Redirection vers l'index avec notification de succès
            if (data && data.id) {
                window.location.href = "index.html?ajouter=" + data.id;
            } else {
                alert("Erreur : La tâche n'a pas pu être créée.");
            }
        } catch (error) {
            console.error("Erreur API lors de l'ajout :", error);
            alert("Impossible de joindre le serveur FastAPI.");
        }
    };
}

// --- ROUTAGE DE LA PAGE DE DÉTAIL ---
// Analyse de l'URL pour déterminer si l'on est en mode "Ajout" ou "Modification"
const url = new URL(document.location);
const searchParams = url.searchParams;

// Si l'URL contient "?tache=ID", on charge le mode modification, sinon le mode ajout
if (searchParams.has('tache')) {
    genererDetailModification(searchParams.get('tache'));
} else {
    genererDetailAjout();
}