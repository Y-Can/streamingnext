// utils/authUtils.js
import { sign, verify } from "jsonwebtoken";
const secret = "laclésecretemadestreamingzone";
// Remplacez par une clé secrète réelle et sécurisée
export function generateToken(payload) {
	return sign(payload, secret, { expiresIn: "4h" });
}
export function verifyToken(token) {
	try {
		const decoded = verify(token, secret);
		return { isValid: true, decoded };
	} catch (error) {
		return { isValid: false, error: "Invalid token" };
	}
}
