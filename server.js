const express = require('express');
const cors = require('cors');
const app = express();

// Configuration CORS
app.use(cors());

// Middleware pour parser les JSON
app.use(express.json());

// Route de base pour tester le backend
app.get('/', (req, res) => {
  res.send('Backend opérationnel !');
});

// Définir un port fixe
const PORT = 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
