import decodeToken from "../../../utils/decodeToken";
import pool from "../db";
// Assurez-vous que le chemin est correct
export default async function handler(req, res) {
	// Vérifie si le code s'exécute côté serveur
	if (req.method === "GET") {
		// Récupère le token depuis les en-têtes de la requête
		const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log('token de base', token);
		if (!token) {
			return res
				.status(401)
				.json({ error: "Token manquant dans les en-têtes" });
		}
		const decodedToken = decodeToken(token);
        console.log(decodedToken);
		if (decodedToken) {
			const userId = decodedToken.userId;
			try {
				// Assurez-vous que vous avez un paramètre userId dans votre requête
				const userResult = await pool.query(
					"SELECT id, Pseudo, mail, type FROM users WHERE id = $1",
					[userId]
				);
				if (userResult.rows.length > 0) {
					const user = userResult.rows[0];
					return res.status(200).json(user);
				} else {
					return res.status(404).json({ error: "Utilisateur non trouvé" });
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations de l'utilisateur",
					error
				);
				return res.status(500).json({ error: "Erreur serveur" });
			}
		} else {
			return res.status(401).json({ error: "Token invalide" });
		}
	} else {
		return res.status(405).json({ error: "Méthode non autorisée" });
	}
}
