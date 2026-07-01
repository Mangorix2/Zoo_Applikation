import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { zooData } from "./data/zooData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "No message provided.",
            });
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

        res.json({
            reply: chatCompletion.choices[0].message.content
        });

    } catch (error) {
        console.error("Groq Error:", error);

        res.status(500).json({
            error: "AI Error"
        });
    }
});

app.listen(3001, () => {
    console.log("🦁 Zoo AI running on http://localhost:3001");
});