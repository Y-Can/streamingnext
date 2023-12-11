import pool from "../db";
import { cors } from "../../../utils/authUtils";
export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const result = await pool.query("SELECT * FROM films");
			const films = result.rows;
			const filmList = films.map((film) => ({
				id: film.id,
				nom: film.nom,
				image: film.image,
				titre: film.titre,
				description: film.description,
			}));
			res.status(200).json({ films: filmList });
		} catch (error) {
			console.error("Erreur lors de la récupération des films", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des films" });
		}
	}

	if (req.method === "POST") {
		try {
			const { userId } = req.body;
			const user = await pool.query("SELECT type FROM users where id = $1", [
				userId,
			]);
			if (user === "ADMIN") {
				const { titre, description, image } = req.body;
				const result = await pool.query(
					"INSERT INTO films (titre, description, image) VALUES ($1, $2, $3) RETURNING *",
					[titre, description, image]
				);
				const filmAjoute = result.rows[0];
				res.status(201).json(filmAjoute);
			} else{
        res.status(500).json({ error: "Erreur lors  de l'envoi du films" });
            }
		} catch (error) {
			console.error("Erreur lors de l'envoi du films", error);
			res.status(500).json({ error: "Erreur lors  de l'envoi du films" });
		}
	}
}
