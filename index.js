// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/sanitize', (req, res) => {
  let { text } = req.body;

  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Input must be a string.' });
  }

  // Remove emojis (basic emoji range), replace newlines with spaces
  const sanitized = text
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\u200d]+/gu, '') // Remove emojis (unicode emoji sequences)
    .replace(/[\n\r]+/g, ' ') // Replace newlines with space
    .trim();

  res.json({ sanitized });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sanitizer running on port ${PORT}`);
});
