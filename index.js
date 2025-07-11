// index.js
const express = require('express');
const app = express();

// Use express.text() to handle raw text input on the /sanitize route
app.use('/sanitize', express.text());

app.post('/sanitize', (req, res) => {
  const text = req.body; // This is now plain text

  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Input must be a string.' });
  }

  // Sanitize: remove emojis, escape quotes and backslashes, replace newlines with spaces
  const sanitized = text
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\u200d]+/gu, '') // Remove emojis
    .replace(/\\/g, '\\\\') // Escape backslashes
    .replace(/"/g, '\\"')   // Escape double quotes
    .replace(/[\n\r]+/g, ' ') // Replace newlines with spaces
    .trim();

  res.json({ sanitized });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sanitizer running on port ${PORT}`);
});
