import pool from "../db";

export default async function handler(req, res) {
    const { image, description, titre, user } = req.body;
    try {
        // Assurez-vous que les types de données sont corrects et que la table et les colonnes existent
        const result = await pool.query(
            'INSERT INTO series (image, description, titre, user_id) VALUES ($1, $2, $3, $4) RETURNING id, image, description, titre',
            [image, description, titre, user]
        );
        const newSerie = result.rows[0]; // Obtient le premier enregistrement de résultat, qui est la nouvelle série
        res.status(201).json({
            message: 'Série ajoutée avec succès',
            serie: newSerie // Renvoie l'objet de la série incluant l'ID
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la série', error);
        res.status(500).json({
            error: 'Erreur interne du serveur'
        });
    }
};
