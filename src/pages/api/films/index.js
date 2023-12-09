import pool from "../db";
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
	} else {
		res.status(405).json({ error: "Méthode non autorisée" });
	}
}
