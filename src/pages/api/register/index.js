import pool from "../db";
import { hashPassword } from "./../utils/passwordUtils";
import { generateToken } from "./../utils/authUtils";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, password, pseudo } = req.body;
		try {
			// Hash du mot de passe
			const hashedPassword = await hashPassword(password);
			// Exécution de la requête SQL pour l'inscription
			const result = await pool.query(
				"INSERT INTO users (email, password, pseudo) VALUES ($1, $2, $3) RETURNING id",
				[email, hashedPassword, pseudo]
			);
			const userId = result.rows[0].id;
			// Génération du jeton JWT
			const token = generateToken({ userId, email });
			res.status(200).json({ token });
		} catch (error) {
			console.error("Erreur lors de l'inscription", error);
			res.status(500).json({ error: "Erreur lors de l'inscription" });
		}
	} else {
		res.status(405).json({ error: "Méthode non autorisée" });
	}
}
