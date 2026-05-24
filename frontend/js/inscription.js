import { creerUtilisateur } from "../services/apiTacheAuth.js";


const lienInscription = document.getElementById("inscription");

lienInscription.addEventListener("click", async (e) => {
    e.preventDefault();

    let mot_de_passe = document.getElementById("passe").value;
    let confirmer_mot_de_passe = document.getElementById("confpasse").value;

    if (mot_de_passe == confirmer_mot_de_passe) {
        const nouvelUtilisateur = {
            pseudonyme: document.getElementById("pseudo").value,
            email: document.getElementById("mail").value,
            mot_de_passe
        };

        try {
            // Appel à l'api pour créer un compte
            const data = await creerUtilisateur(nouvelUtilisateur);
            window.location.href = "index.html?nouvelUtilisateur=" + data.pseudonyme;
        } catch (error) {
            console.error("Erreur lors de l'inscription à l'API :", error);
        }
    } else {
        console.error("Les mots de passe ne correspondent pas !");
    }
});