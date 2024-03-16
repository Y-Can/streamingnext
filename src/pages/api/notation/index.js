import pool from "../db";

export default async function handler(req, res) {
  const { filmId, userId, notation } = req.body;

  try {
    // La requête SQL tente d'insérer un nouveau vote. Si un vote de l'utilisateur pour le même film existe déjà, la notation est mise à jour.
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
