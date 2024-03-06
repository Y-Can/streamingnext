app.post('/api/add_film', async (req, res) => {
    const { image, description, titre } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO films (image, description, titre) VALUES ($1, $2, $3) RETURNING image, description, titre',
        [image, description, titre]
      );
      const newFilmId = result.rows[0].id;
      res.status(201).json({ id: newFilmId, message: 'Film ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du film' });
    }
  });
  