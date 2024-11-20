const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    email: 'admin@gmail.com',
    password: 'admin' 
  }
];

app.get('/', (req, res) => {
  res.send('Backend opérationnel !');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
  }

  const token = jwt.sign({ email: user.email }, 'votre_clé_secrète', { expiresIn: '1h' });

  res.json({ success: true, token });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
