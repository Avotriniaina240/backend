require('dotenv').config();
const { Pool } = require('pg');

// Connexion à la base de données PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erreur de connexion à PostgreSQL', err.stack);
    }
    console.log('Connexion à PostgreSQL réussie !');
    release();
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
