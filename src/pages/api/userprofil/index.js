import pool from "../db";
export default async function handler(req, res) {
	if (req.method === "GET") {
		const userId = req.query.id;
		if (!userId) {
			return res.status(400).json({ error: "ID d'utilisateur manquant" });
		}
		try {
			const userResult = await pool.query(
				"SELECT id, Pseudo, picture FROM users WHERE id = $1",
				[userId]
			);
			if (userResult.rows.length > 0) {
				const { id, pseudo, profile_picture } = userResult.rows[0];
				const user = { id, pseudo, profile_picture };
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
		return res.status(405).json({ error: "Méthode non autorisée" });
	}
}
