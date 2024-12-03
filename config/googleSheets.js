const { google } = require('googleapis');

// Configuration Google Sheets
const auth = new google.auth.GoogleAuth({
    keyFile: 'votre-credentials.json',  // Vous devrez créer ce fichier
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const SPREADSHEET_ID = 'VOTRE_SPREADSHEET_ID'; // L'ID de votre Google Sheet
const RANGE = 'A2:B'; // Ajustez selon vos besoins

module.exports = {
    auth,
    SPREADSHEET_ID,
    RANGE
};
