// utils/authUtils.js
import { sign, verify } from "jsonwebtoken";
const secret = "votre_secret";
// Remplacez par une clé secrète réelle et sécurisée
export function generateToken(payload) {
	return sign(payload, secret, { expiresIn: "1h" });
}
export function verifyToken(token) {
	try {
		const decoded = verify(token, secret);
		return { isValid: true, decoded };
	} catch (error) {
		return { isValid: false, error: "Invalid token" };
	}
}
