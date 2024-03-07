export default async function handler(req, res) {
    const { image, description, titre, user_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO films (image, description, titre, user_id) VALUES ($1, $2, $3) RETURNING image, description, titre,user_id',
        [image, description, titre, user_id]
      );
      const newFilmId = result.rows[0];
      res.status(201).json({ id: newFilmId, message: 'Film ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du film' });
    }
  };
  