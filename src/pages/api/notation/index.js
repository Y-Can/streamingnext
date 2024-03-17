import pool from "../db";

export default async function handler(req, res) {
  if (req.method === "POST") {
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

  if (req.method === "GET") {
    const { id } = req.body;
      try {
        // Remplacez la requête suivante par la requête appropriée à votre base de données
        const votes = await pool.query('SELECT * FROM votes WHERE film_id = $1', [id]);
        
        const totalNotation = votes.reduce((acc, currentVote) => acc + currentVote.notation, 0);
        console.log(`La somme totale des notations pour le film ${id} est : ${totalNotation}`);
        if (votes.rows.length === 0) {
          return res.status(404).json({ message: 'Aucun vote trouvé pour cet ID de film.' });
        }

        res.status(200).json(votes.rows);
      } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
      }
  
}
}
