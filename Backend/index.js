// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const app = express();

// CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 9000
      }
    );

    res.status(200).json({
      success: true,
      reply: response.data.choices[0]?.message?.content || "No reply from API"
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch response from API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
