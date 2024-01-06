// pages/api/user_film.js
import pool from "../db";
import authMiddleware from "@/utils/authMiddleware";
export default async function handler(req, res) {
	try {
        await authMiddleware(req, res);
		if (req.method === "GET") {
			const userId = req;
			const result = await pool.query(
				"SELECT * FROM films WHERE user_id = $1",
				[userId]
			);
			const films = result.rows.map((film) => ({
				id: film.id,
				image: film.image,
				titre: film.titre,
				description: film.description,
			}));
			res.status(200).json({ films });
		} else {
			res.status(405).json({ error: "Méthode non autorisée. Utilisez GET." });
		}
	} catch (error) {
		console.error("Erreur lors de la récupération des films", error);
		res.status(500).json({ error: "Erreur lors de la récupération des films" });
	}
}
