import pool from "../db";

async function handlePostRequest(req, res) {
  const { filmId, userId, notation } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO votes (film_id, user_id, notation) VALUES ($1, $2, $3) ON CONFLICT (film_id, user_id) DO UPDATE SET notation = EXCLUDED.notation RETURNING *',
      [filmId, userId, notation]
    );

    const newVote = result.rows[0];
    res.status(201).json({ message: 'Vote enregistré avec succès', vote: newVote });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du vote', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du vote' });
  }
}

async function handleGetRequest(req, res) {
  const { id } = req.query; // Utilisez req.query pour les requêtes GET plutôt que req.body

  try {
    const votes = await pool.query('SELECT * FROM votes WHERE film_id = $1', [id]);

    if (votes.rows.length === 0) {
      return res.status(404).json({ message: 'Aucun vote trouvé pour cet ID de film.' });
    }

const totalNotation = votes.rows.reduce((acc, currentVote) => acc + currentVote.notation, 0);
// Calculez la moyenne des notations
const moyenneNotation = votes.rows.length > 0 ? totalNotation / votes.rows.length : 0;
console.log(`La moyenne des notations pour le film ${id} est : ${moyenneNotation.toFixed(1)}`);

    res.status(200).json(moyenneNotation.toFixed(1));
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "GET":
      await handleGetRequest(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
