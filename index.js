const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json());

app.post('/discord', async (req, res) => {
  try {
    const body = req.body;

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("Discord error:", await response.text());
      throw new Error("Discord rejected the request");
    }

    res.status(200).send("Message forwarded to Discord.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message to Discord.");
  }
});

app.listen(PORT, () => {
  console.log(`Webhook proxy running on port ${PORT}`);
});
