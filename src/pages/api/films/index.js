import pool from "../db";
export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			let query = "SELECT * FROM films";
			const { id, search } = req.query;
			if (id) {
				query += " WHERE id = $1";
			} else if (search) {
				query += " WHERE titre ILIKE $1 OR description ILIKE $1";
			}
			const result = await pool.query(
				id && search
					? "SELECT * FROM films WHERE id = $1 AND titre ILIKE $2"
					: id
					  ? "SELECT * FROM films WHERE id = $1"
					  : search
					    ? "SELECT * FROM films WHERE titre ILIKE $1"
					    : "SELECT * FROM films",
				id && search
					? [id, `%${search}%`]
					: id
					  ? [id]
					  : search
					    ? [`%${search}%`]
					    : []
			);
			const films = result.rows;
			const filmList = films.map((film) => ({
				id: film.id,
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
	} else {
		res.status(405).json({ error: "Méthode non autorisée. Utilisez GET." });
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
			} else {
				res.status(500).json({ error: "Erreur lors  de l'envoi du films" });
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi du films", error);
			res.status(500).json({ error: "Erreur lors  de l'envoi du films" });
		}
	}
}
