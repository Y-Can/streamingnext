const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;
// Remplacez par votre propre clé secrète
const decodeToken = (token) => {
	try {
		const decoded = jwt.verify(token, secretKey);
		return decoded;
	} catch (error) {
		console.error("Erreur lors du décodage du token :", error);
		return null;
	}
};
module.exports = decodeToken;
