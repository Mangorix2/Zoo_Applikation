import express from 'express';
import cors from 'cors';
import sqlite3Package from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Package.verbose();
const app = express();
const PORT = 3000;

// Pfade für ES-Module bereitstellen (__dirname Ersatz)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// DB-Verbindung mit absolutem Pfad (erstellt zoo.db im selben Verzeichnis)
const dbPath = path.join(__dirname, 'zoo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Fehler beim Öffnen der DB:", err.message);
    } else {
        console.log(`Erfolgreich mit DB verbunden! (${dbPath})`);
    }
});

// Tabellen erstellen, falls nicht vorhanden
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            first_name TEXT,
            last_name TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stars INTEGER NOT NULL CHECK(stars >= 1 AND stars <= 5),
            text TEXT
        )
    `);
});

// --- RATING ENDPUNKTE ---

// POST: Neue Bewertung hinzufügen
app.post('/api/ratings', (req, res) => {
    const { stars, text } = req.body;

    if (stars === undefined || stars < 1 || stars > 5) {
        return res.status(400).json({
            error: "Die Bewertung muss zwischen 1 und 5 Sternen liegen."
        });
    }

    const sql = `INSERT INTO ratings (stars, text) VALUES (?, ?)`;

    db.run(sql, [stars, text ? text.trim() : null], function(err) {
        if (err) {
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        res.status(201).json({
            message: "Bewertung gespeichert",
            id: this.lastID,
            stars: stars,
            text: text ? text.trim() : null
        });
    });
});

// GET: Alle Bewertungen abrufen
app.get('/api/ratings', (req, res) => {
    const sql = `SELECT * FROM ratings ORDER BY id DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        res.json(rows);
    });
});

// --- USER ENDPUNKTE ---

// POST: Neuen User registrieren
app.post('/api/users', (req, res) => {
    const { username, email, first_name, last_name } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username und E-Mail sind Pflichtfelder." });
    }

    const sql = `INSERT INTO users (username, email, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const params = [username, email, first_name, last_name];

    db.run(sql, params, function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({
                    error: "Registrierung fehlgeschlagen: Dieser Benutzername oder diese E-Mail wird bereits verwendet."
                });
            }
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        res.status(201).json({ message: "User erfolgreich gespeichert!", userId: this.lastID });
    });
});

// GET: Alle User abrufen
app.get('/api/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// DELETE: User löschen
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run(`DELETE FROM users WHERE id = ?`, userId, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "User nicht gefunden." });
        res.json({ message: "User gelöscht!" });
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});