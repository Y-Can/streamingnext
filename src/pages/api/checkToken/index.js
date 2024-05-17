// pages/api/checkAccessToken.js
import pool from "../db";
import { verifyAccessToken } from "../../../utils/authUtils";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { token } = req.body;
        try {
            const decodedToken = verifyAccessToken(token);
            const result = await pool.query(
                "SELECT paid FROM users WHERE id = (SELECT user_id FROM access_tokens WHERE token = $1)",
                [token]
            );
            const user = result.rows[0];

            if (user && user.paid) {
                res.status(200).json({ valid: true });
            } else {
                res.status(200).json({ valid: false });
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du token d'accès:", error);
            res.status(500).json({ error: "Erreur lors de la vérification du token d'accès" });
        }
    } else {
        res.status(405).json({ error: "Méthode non autorisée" });
    }
}
