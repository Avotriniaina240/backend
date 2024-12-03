const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Exemple de route pour ajouter une transcription dans la base de données
router.post('/add-transcription', authenticateToken, async (req, res) => {
    const { date, text } = req.body;

    try {
        const result = await db.query('INSERT INTO transcriptions (date, text) VALUES ($1, $2) RETURNING *', [date, text]);
        res.json({ success: true, transcription: result.rows[0] });
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la transcription:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

module.exports = router;
