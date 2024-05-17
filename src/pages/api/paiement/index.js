// payment.js
import pool from "../db";

export const subscribe = async (req, res) => {
    const { userId, token } = req.body;
    // Vérification du token de paiement via Stripe ou autre service
    const paymentVerified = true; // Cette vérification doit être réelle
    if (paymentVerified) {
        await pool.query("UPDATE users SET paid = $1 WHERE id = $2", [true, userId]);
        res.status(200).json({ message: "Payment successful" });
    } else {
        res.status(400).json({ error: "Payment failed" });
    }
};
