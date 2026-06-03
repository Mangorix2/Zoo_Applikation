import express from 'express';
import cors from 'cors';
import sqlite3Package from 'sqlite3';
const sqlite3 = sqlite3Package.verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// DB-Verbingund mit SQLite
const db = new sqlite3.Database('src/backend/zoo.db', (err) => {
    if (err) {
        console.error("Fehler beim Öffnen der DB:", err.message);
    } else {
        console.log("Erfolgreich mit DB verbunden!");
    }
});

// Base-setup für DB
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        first_name TEXT,
        last_name TEXT
    )
`);

// Create new User
app.post('/api/users', (req, res) => {
    const { username, email, first_name, last_name } = req.body;

    // Anti Injection
    const sql = `INSERT INTO users (username, email, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const params = [username, email, first_name, last_name];

    // Befehl in der DB ausführen
    db.run(sql, params, function(err) {
        if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ 
                error: "Registrierung fehlgeschlagen: Dieser Benutzername oder diese E-Mail wird bereits verwendet." 
            });
        }
        return res.status(500).json({ error: "Datenbankfehler: " + err.message });
    }
        
        res.status(201).json({ 
            message: "User erfolgreich in DB gespeichert!", 
            userId: this.lastID 
        });
    });
});

// Get User
app.get('/api/users', (req, res) => {
    const testUsers = [
        { id: 1, username: "Tierfreund99", email: "max@zoo.de" }
    ];
    res.json(testUsers);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, userId, function(err) {
        if (err) {
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: `Benutzer mit ID ${userId} wurde nicht gefunden.` });
        }

        res.json({ message: `Benutzer mit ID ${userId} erfolgreich gelöscht!` });
    });
});


app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});