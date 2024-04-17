import pool from "../db";

export default async function handler(req, res) {
    const { image, description, titre, user, url, poster, ba } = req.body;
   // Validation des données requises
   console.log(req.body);

   if (!titre) {
    return res.status(400).json({ error: 'Le titre est requis et ne peut pas être vide.' });
}
    try {
        const result = await pool.query(
            'INSERT INTO series (titre, description, image, user_id, url, poster, ba) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [titre, description, image, user, url, poster, ba]
        );
        const newSerie = result.rows[0];
        res.status(201).json({
            message: 'Série ajoutée avec succès',
            serie: newSerie
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la série', error,req);
        res.status(500).json({
            error: 'Erreur interne du serveur',
            detail: error.message // Ajout de cette ligne pour plus de détails sur l'erreur
        });
    }
};
