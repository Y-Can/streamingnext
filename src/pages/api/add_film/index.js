export default async function handler(req, res) {
    const { image, description, titre, user } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO films (image, description, titre, user) VALUES ($1, $2, $3, $4) RETURNING image, description, titre,user',
        [image, description, titre, user]
      );
      const newFilmId = result.rows[0];
      res.status(201).json({   message: 'Film ajouté avec succès' ,newFilmId });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du film' });
    }
  };
  