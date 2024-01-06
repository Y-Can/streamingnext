// // middleware/authMiddleware.js
// import { verify } from "jsonwebtoken";
// const authMiddleware = (req, res, next) => {
// 	const authHeader = req.headers.authorization;
// 	if (!authHeader) {
// 		return res.status(401).json({ error: "Token manquant dans les en-têtes" });
// 	}
// 	const token = authHeader.split(" ")[1];
// 	console.log("le token recup", token);
// 	try {
// 		const decodedToken = verify(token, "laclésecretemadestreamingzone");
// 		console.log("decoded token", decodedToken);
// 		req.user = {
// 			userId: decodedToken.userId,
// 		};
// 	next();
// 	} catch (error) {
// 		console.error("Erreur lors de la vérification du token", error);
// 		return res.status(401).json({ error: "Token invalide authMiddle" });
// 	}
// };
// module.exports = authMiddleware;
