const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "https://chatbot-blush-phi.vercel.app/"
}));
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

   const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "user", content: question }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);
    res.json({
      success:true,reply: response.data.choices[0].message.content
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "Failed" });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
