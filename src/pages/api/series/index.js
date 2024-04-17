import pool from "../db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let query = "SELECT * FROM series";
            const { id, search } = req.query;
            if (id) {
                query += " WHERE id = $1";
            } else if (search) {
                query += " WHERE titre ILIKE $1 OR description ILIKE $1";
            }
            const result = await pool.query(
                id && search
                    ? "SELECT * FROM series WHERE id = $1 AND titre ILIKE $2"
                    : id
                      ? "SELECT * FROM series WHERE id = $1"
                      : search
                        ? "SELECT * FROM series WHERE titre ILIKE $1"
                        : "SELECT * FROM series",
                id && search
                    ? [id, `%${search}%`]
                    : id
                      ? [id]
                      : search
                        ? [`%${search}%`]
                        : []
            );
            const series = result.rows;
            const seriesList = series.map((serie) => ({
                id: serie.id,
                image: serie.image,
                titre: serie.titre,
                description: serie.description,
                url: serie.url,
                user_id: serie.user_id,
            }));
            res.status(200).json({ series: seriesList });
        } catch (error) {
            console.error("Erreur lors de la récupération des séries", error);
            res
                .status(500)
                .json({ error: "Erreur lors de la récupération des séries" });
        }
    } else if (req.method === "POST") {
        try {
            const { userId } = req.body;
            const user = await pool.query("SELECT type FROM users where id = $1", [
                userId,
            ]);
            if (user === "ADMIN") {
                const { titre, description, image } = req.body;
                const result = await pool.query(
                    "INSERT INTO series (titre, description, image, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
                    [titre, description, image, userId] // Make sure to include userId in the values array
                );
                const serieAjoutee = result.rows[0];
                res.status(201).json(serieAjoutee);
            } else {
                res.status(500).json({ error: "Erreur lors de l'envoi de la série" });
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la série", error);
            res.status(500).json({ error: "Erreur lors de l'envoi de la série" });
        }
    } else {
        res.status(405).json({ error: "Méthode non autorisée. Utilisez GET ou POST." });
    }
}
