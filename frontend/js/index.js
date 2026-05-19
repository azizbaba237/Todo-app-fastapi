import { donneTaches, supprimer } from "../services/apiTache.js";

/**
 * Analyse l'URL actuelle pour détecter les paramètres de retour (Query Params)
 * et affiche un message flash d'information à l'utilisateur dans l'élément #info.
 */
function genererinfo() {
    let info = document.getElementById("info");
    if (!info) return; // Sécurité si l'élément n'existe pas dans le HTML

    const url = new URL(document.location);
    const searchParams = url.searchParams;

    // Aiguillage des messages selon le paramètre reçu dans l'URL
    if (searchParams.has('modifier')) {
        info.innerText = "La tâche n°" + searchParams.get('modifier') + " a été modifiée avec succès.";
    } else if (searchParams.has('annulerModifier')) {
        info.innerText = "Modification annulée, la tâche n'a pas été modifiée.";
    } else if (searchParams.has('ajouter')) {
        info.innerText = "La tâche n°" + searchParams.get('ajouter') + " a été ajoutée avec succès.";
    } else if (searchParams.has('annulerAjouter')) {
        info.innerText = "Création annulée, aucune tâche n'a été ajoutée.";
    } else if (searchParams.has('supprimerTache')) {
        info.innerText = "La tâche n°" + searchParams.get('supprimerTache') + " a été supprimée avec succès.";
    } else {
        info.innerText = ""; // Aucun paramètre, on laisse la zone vide
    }
}

/**
 * Récupère la liste de toutes les tâches depuis l'API, construit 
 * dynamiquement un tableau HTML et l'injecte dans la page d'accueil.
 */
async function genererListe() {
    let tachesContainer = document.getElementById("taches");
    if (!tachesContainer) return;

    // 1. Nettoyage de la zone pour éviter les doublons lors des rafraîchissements
    while (tachesContainer.firstChild) {
        tachesContainer.removeChild(tachesContainer.firstChild);
    }

    // 2. Création de la structure du tableau et de sa ligne d'en-tête
    let tachesTable = document.createElement("table");
    let tachesTableEntete = document.createElement("tr");

    // Colonne Titre
    let thTitre = document.createElement("th");
    thTitre.innerHTML = "Titre";
    tachesTableEntete.appendChild(thTitre);

    // CORRECTION : Création de deux éléments 'th' distincts pour éviter le décalage des colonnes
    let thModifier = document.createElement("th");
    tachesTableEntete.appendChild(thModifier);

    let thSupprimer = document.createElement("th");
    tachesTableEntete.appendChild(thSupprimer);

    tachesTable.appendChild(tachesTableEntete);

    try {
        // 3. Récupération des données depuis l'API FastAPI
        const dataTaches = await donneTaches();

        // 4. Boucle de génération des lignes pour chaque tâche
        for (let dataElement of dataTaches) {
            let tachesTableLigne = document.createElement("tr");

            // Cellule du titre
            let tachesTableLigneTitre = document.createElement("td");
            tachesTableLigneTitre.innerHTML = dataElement.titre;
            tachesTableLigne.appendChild(tachesTableLigneTitre);

            // Cellule du lien "Modifier" (Aiguille vers la page de détail avec l'ID)
            let tachesTableLigneModifier = document.createElement("td");
            tachesTableLigneModifier.innerHTML = `<a href="detail.html?tache=${dataElement.id}">Modifier</a>`;
            tachesTableLigne.appendChild(tachesTableLigneModifier);

            // Cellule du bouton "Supprimer"
            let tachesTableLigneSupprimer = document.createElement("td");
            let lienSupprimer = document.createElement("a");
            lienSupprimer.innerText = "Supprimer";
            lienSupprimer.href = `index.html?supprimerTache=${dataElement.id}`;
            lienSupprimer.id = "Suppr" + dataElement.id;
            lienSupprimer.classList.add("LienSuppression");

            // Écouteur d'événement pour intercepter le clic et appeler l'API de suppression
            lienSupprimer.addEventListener('click', async function (e) {
                e.preventDefault(); // Empêche la navigation immédiate du lien

                // Demande de confirmation à l'utilisateur
                if (confirm(`Voulez-vous vraiment supprimer la tâche "${dataElement.title || dataElement.titre}" ?`)) {
                    try {
                        // Appel de la fonction de suppression dans apiTache.js
                        await supprimer(dataElement.id);

                        // Redirection avec le paramètre de succès pour déclencher le message flash
                        window.location.href = "index.html?supprimerTache=" + dataElement.id;
                    } catch (error) {
                        console.error("Erreur lors de la suppression :", error);
                        alert("Impossible de supprimer la tâche.");
                    }
                }
            });

            tachesTableLigneSupprimer.appendChild(lienSupprimer);
            tachesTableLigne.appendChild(tachesTableLigneSupprimer);

            // Ajout de la ligne complète dans le tableau
            tachesTable.appendChild(tachesTableLigne);
        }

        // 5. Injection du tableau finalisé dans le conteneur HTML
        tachesContainer.appendChild(tachesTable);

    } catch (error) {
        console.error("Erreur lors du chargement de la liste :", error);
        tachesContainer.innerHTML = "<p class='error'>Impossible de charger les tâches. Vérifiez que le serveur est démarré.</p>";
    }
}

// --- INITIALISATION DE LA PAGE ---
genererinfo();
genererListe();