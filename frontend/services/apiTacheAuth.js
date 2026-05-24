const API_AUTH = "http://127.0.0.1:8000/auth/";

// Register - Créer un utilisateur
export async function creerUtilisateur(nouvelUtilisateur) {
    try {
        const response = await fetch(`${API_AUTH}register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // FastAPI attend du JSON pour la création d'utilisateur
            },
            body: JSON.stringify(nouvelUtilisateur)
        });

        if (!response.ok) throw new Error(`Erreur HTTP ! Statut : ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
    }
}

// Login - Authentifier un utilisateur et récupérer un token JWT
// Login - Authentifier un utilisateur et récupérer un token JWT (Format JSON)
export async function connexionUtilisateur(infosUtilisateur) {
    try {
        const response = await fetch(`${API_AUTH}login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // On repasse en JSON pur
            },
            // 💡 STRATÉGIE : Si ça échoue encore, échange les clés ici (ex: username: infosUtilisateur.pseudonyme)
            body: JSON.stringify({
                pseudonyme: infosUtilisateur.pseudonyme,
                mot_de_passe: infosUtilisateur.mot_de_passe
            })
        });

        // En cas d'erreur (comme la 422), on décortique la réponse de FastAPI
        if (!response.ok) {
            if (response.status === 422) {
                const erreurValidation = await response.json();
                // 🔍 Ce log va afficher précisément dans la console quel champ pose problème !
                console.error("❌ Détails de la validation FastAPI :", erreurValidation.detail);
                throw new Error("Format de données rejeté par le serveur.");
            }

            const erreurTexte = await response.text();
            throw new Error(erreurTexte || "Identifiants invalides");
        }

        const data = await response.json();

        // 🔍 ESPION N°1 : Regarde exactement comment ton backend a nommé la clé du token !
        console.log("👉 Réponse brute du serveur au Login :", data);

        localStorage.setItem("access_token", data.access_token);

        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
        } else {
            throw new Error("Le serveur n'a pas renvoyé de token d'accès.");
        }

    } catch (error) {
        // Correction du log pour éviter le [object Object] anonyme
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
    }
}