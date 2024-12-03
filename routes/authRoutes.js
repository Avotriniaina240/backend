const express = require('express');
const jwt = require('jsonwebtoken');
const validateEmail = require('../utils/validateEmail');
const db = require('../config/db'); // Importer la connexion PostgreSQL

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Entrer une adresse email valide.' });
    }

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        const user = result.rows[0];

        // Vérifier le mot de passe
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ email: user.email }, 'votre_clé_secrète', { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (error) {
        console.error('Erreur lors de la requête à la base de données:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

module.exports = router;
