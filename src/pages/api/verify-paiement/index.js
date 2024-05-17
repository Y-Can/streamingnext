import jwt from 'jsonwebtoken';
import pool from '../../../db';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, secret);
      const result = await pool.query("SELECT paid FROM users WHERE id = $1", [decoded.userId]);
      const user = result.rows[0];
      if (user && user.paid) {
        res.status(200).json({ valid: true });
      } else {
        res.status(200).json({ valid: false });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'abonnement', error);
      res.status(500).json({ error: 'Erreur lors de la vérification de l\'abonnement' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
