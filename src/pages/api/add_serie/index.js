import pool from "../db";

export default async function handler(req, res) {
    const { image, description, titre, user_id, url, poster, ba } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO series (titre, description, image, user_id, url, poster, ba) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [titre, description, image, user_id, url, poster, ba]
        );
        const newSerie = result.rows[0]; // Obtient le premier enregistrement de résultat, qui est la nouvelle série
        res.status(201).json({
            message: 'Série ajoutée avec succès',
            serie: newSerie // Renvoie l'objet de la série incluant l'ID et les autres champs
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la série', error);
        res.status(500).json({
            error: 'Erreur interne du serveur'
        });
    }
};
