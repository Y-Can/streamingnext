const bcrypt = require("bcrypt");
import pool from "../db";
import { generateToken } from "../../../utils/authUtils";
// Adjust the import path require('dotenv').config();
export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { email, password } = req.body;
			const userResult = await pool.query(
				"SELECT * FROM users WHERE mail = $1",
				[email]
			);
			if (userResult.rows.length > 0) {
				const user = userResult.rows[0];
				const hashedPassword = user.password;
				// Compare the provided password with the stored hashed password using the bcrypt secret
				const passwordMatch = await bcrypt.compare(password, hashedPassword);
				if (passwordMatch) {
					const token = generateToken({ userId: user.id });
                    res.status(200).json({ token });
				} else {
					res.status(401).json({ error: "Identifiants incorrects" });
				}
			} else {
				res.status(401).json({ error: "Utilisateur non trouvé" });
			}
		} catch (error) {
			res.status(500).json({ error: "Erreur lors de la connexion" });
		}
	} else {
		res.status(405).json({ error: "Méthode non autorisée" });
	}
}
