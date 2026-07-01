import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import sqlite3Package from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { zooData } from "../data/zooData.js";

dotenv.config();

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const sqlite3 = sqlite3Package.verbose();
const dbPath = path.join(__dirname, "zoo.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Fehler beim Öffnen der DB:", err.message);
    } else {
        console.log(`Erfolgreich mit DB verbunden! (${dbPath})`);
    }
});

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

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "No message provided." });
        }

        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
${zooData}

You are the official AI assistant for Zoo Musterstadt.

Rules:
- Answer ONLY using the zoo information provided above.
- Never invent information.
- If the answer is not available, politely say:
  "I'm sorry, I don't have that information yet."
- Keep answers friendly.
- Keep answers short (1-4 sentences).
`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({ reply: chatCompletion.choices[0].message.content });

    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: "AI Error" });
    }
});

app.post("/api/ratings", (req, res) => {
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

app.get("/api/ratings", (req, res) => {
    const sql = `SELECT * FROM ratings ORDER BY id DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        res.json(rows);
    });
});

app.post("/api/users", (req, res) => {
    const { username, email, first_name, last_name } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "Username und E-Mail sind Pflichtfelder." });
    }

    const sql = `INSERT INTO users (username, email, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const params = [username, email, first_name, last_name];

    db.run(sql, params, function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(400).json({
                    error: "Registrierung fehlgeschlagen: Dieser Benutzername oder diese E-Mail wird bereits verwendet."
                });
            }
            return res.status(500).json({ error: "Datenbankfehler: " + err.message });
        }
        res.status(201).json({ message: "User erfolgreich gespeichert!", userId: this.lastID });
    });
});

app.get("/api/users", (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    db.run(`DELETE FROM users WHERE id = ?`, userId, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "User nicht gefunden." });
        res.json({ message: "User gelöscht!" });
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Zoo-API & AI-Server läuft auf http://localhost:${PORT}`);
});