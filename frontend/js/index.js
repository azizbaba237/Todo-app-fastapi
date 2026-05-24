import { listerTaches } from "../services/apiTache.js";
import { connexionUtilisateur } from "../services/apiTacheAuth.js";

/**
 * Affiche uniquement le message flash d'information à partir de l'URL
 */
function genererinfo() {
    let info = document.getElementById("info");
    if (!info) return;

    const url = new URL(document.location);
    const searchParams = url.searchParams;

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
        info.innerText = "";
    }
}

/**
 * Génère la liste des tâches (Scénario : Utilisateur Connecté)
 */
async function genererListe() {
    // 1. On nettoie l'interface : on enlève le formulaire de connexion inutile
    let blocConnexion = document.getElementById("connexion");
    if (blocConnexion) blocConnexion.remove();

    let tachesContainer = document.getElementById("taches");
    if (!tachesContainer) return;

    while (tachesContainer.firstChild) {
        tachesContainer.removeChild(tachesContainer.firstChild);
    }

    let tachesTable = document.createElement("table");
    let tachesTableEntete = document.createElement("tr");

    let thTitre = document.createElement("th");
    thTitre.innerHTML = "Titre";
    tachesTableEntete.appendChild(thTitre);

    let thModifier = document.createElement("th");
    tachesTableEntete.appendChild(thModifier);

    let thSupprimer = document.createElement("th");
    tachesTableEntete.appendChild(thSupprimer);

    tachesTable.appendChild(tachesTableEntete);

    try {
        const dataTaches = await listerTaches();

        for (let dataElement of dataTaches) {
            let tachesTableLigne = document.createElement("tr");

            let tachesTableLigneTitre = document.createElement("td");
            tachesTableLigneTitre.innerHTML = dataElement.titre;
            tachesTableLigne.appendChild(tachesTableLigneTitre);

            let tachesTableLigneModifier = document.createElement("td");
            tachesTableLigneModifier.innerHTML = `<a href="detail.html?tache=${dataElement.id}">Modifier</a>`;
            tachesTableLigne.appendChild(tachesTableLigneModifier);

            let tachesTableLigneSupprimer = document.createElement("td");
            let lienSupprimer = document.createElement("a");
            lienSupprimer.innerText = "Supprimer";
            lienSupprimer.href = `index.html?supprimerTache=${dataElement.id}`;
            lienSupprimer.id = "Suppr" + dataElement.id;
            lienSupprimer.classList.add("LienSuppression");

            lienSupprimer.addEventListener('click', async function (e) {
                e.preventDefault();
                if (confirm(`Voulez-vous vraiment supprimer la tâche "${dataElement.title || dataElement.titre}" ?`)) {
                    try {
                        // Assure-toi que la fonction supprimer() est bien importée ou définie quelque part
                        await supprimer(dataElement.id);
                        window.location.href = "index.html?supprimerTache=" + dataElement.id;
                    } catch (error) {
                        console.error("Erreur lors de la suppression :", error);
                        alert("Impossible de supprimer la tâche.");
                    }
                }
            });

            tachesTableLigneSupprimer.appendChild(lienSupprimer);
            tachesTableLigne.appendChild(tachesTableLigneSupprimer);
            tachesTable.appendChild(tachesTableLigne);
        }

        tachesContainer.appendChild(tachesTable);

    } catch (error) {
        console.error("Erreur lors du chargement de la liste :", error);
        tachesContainer.innerHTML = "<p class='error'>Impossible de charger les tâches. Vérifiez que le serveur est démarré.</p>";
    }
}

/**
 * Gère le formulaire de connexion (Scénario : Utilisateur Non Connecté)
 */
function genererConnexion() {
    // 1. On nettoie l'interface : on enlève la partie contenu/liste des tâches
    let blocContenu = document.getElementById("contenu");
    if (blocContenu) blocContenu.remove();

    let lienConnexion = document.getElementById("lienConnexion");
    if (lienConnexion) {
        lienConnexion.addEventListener("click", async (e) => {
            e.preventDefault();
            let utilisateur = {
                pseudonyme: document.getElementById("pseudo").value,
                mot_de_passe: document.getElementById("passe").value
            }
            try {
                await connexionUtilisateur(utilisateur);
                window.location.href = "index.html";
            } catch (error) {
                console.error("Échec de la connexion :", error);
                alert("Identifiants incorrects ou problème serveur.");
            }
        });
    }
}

// --- INITIALISATION UNIQUE ET CONTROLÉE DE LA PAGE ---
genererinfo(); // Affiche le message flash s'il y en a un

if (localStorage.getItem("access_token")) {
    // Si connecté : on génère la liste (qui va supprimer le bloc connexion)
    genererListe();
} else {
    // Si non connecté : on prépare la connexion (qui va supprimer le bloc contenu)
    genererConnexion();
}