import pool from "../db";
import { hashPassword } from "../../../utils/passwordUtils";
import { generateToken } from "../../../utils/authUtils";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, password, pseudo } = req.body;
		try {
			// Hash du mot de passe
			const hashedPassword = await hashPassword(password);
			// Exécution de la requête SQL pour l'inscription
			const userId = uuidv4();
			const result = await pool.query(
				"INSERT INTO users (id, mail, password, pseudo) VALUES ($1, $2, $3, $4) RETURNING id",
				[userId,email, hashedPassword, pseudo]
			);
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
