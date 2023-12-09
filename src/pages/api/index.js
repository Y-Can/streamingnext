// app.use((req, res, next) => {
// 	cors({ origin: "https://streamingzone.vercel.app" })
// 	res.setHeader(
// 		"Access-Control-Allow-Origin",
// 		"https://streamingzone.vercel.app"
// 	);
// 	res.setHeader("Access-Control-Allow-Credentials", "true");
// 	res.setHeader("Access-Control-Max-Age", "1800");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
// 	);
// 	next();
// });
// app.use(cors({   origin: 'https://streamingzone.vercel.app',   credentials: true, }));
// app.options("/api/singup", cors());
// app.use(express.json());
// app.post("/api/singup", async (req, res) => {
// 	const { email, password, pseudo } = req.body;
// 	try {
// 		const result = await pool.query(
// 			"INSERT INTO users (email, password, pseudo) VALUES ($1, $2, $3) RETURNING id",
// 			[email, password, pseudo]
// 		);
// 		const userId = result.rows[0].id;
// 		const token = generateToken(userId);
// 		res.json({ token });
// 	} catch (error) {
// 		console.error("Erreur lors de l'inscription", error);
// 		res.status(500).json({ error: "Erreur lors de l'inscription" });
// 	}
// });
// app.use(express.json());

// app.post("/login", async (req, res) => {
// 	const { email, password } = req.body;
// 	try {
// 		const user = await getUserByEmail(email);
// 		if (!user) {
// 			return res.status(401).json({ error: "Identifiants incorrects" });
// 		}
// 		const passwordMatch = await comparePasswords(password, user.password);
// 		if (!passwordMatch) {
// 			return res.status(401).json({ error: "Identifiants incorrects" });
// 		}
// 		const token = generateToken(user.id);
// 		res.json({ token });
// 	} catch (error) {
// 		console.error("Erreur lors de la connexion", error);
// 		res.status(500).json({ error: "Erreur lors de la connexion" });
// 	}
// });

// app.get("/profile", async (req, res) => {
// 	const token = req.headers.authorization;
// 	try {
// 		// Vérifier le jeton JWT
// 		const decodedToken = verifyToken(token);
// 		// Récupérer l'utilisateur par ID depuis la base de données
// 		const user = await getUserById(decodedToken.userId);
// 		res.json({ user });
// 	} catch (error) {
// 		console.error("Erreur lors de la vérification du jeton", error);
// 		res.status(401).json({ error: "Authentification échouée" });
// 	}
// });
