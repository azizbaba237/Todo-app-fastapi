const API_AUTH = "http://localhost:8000/auth/";

export async function creerUtilisateur(nouvelUtilisateur) {
    try {
        const response = await fetch(`${API_AUTH}register/`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(nouvelUtilisateur)
        });

        if (!response.ok) throw new Error(`Erreur HTTP ! Statut : ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
    }

} 