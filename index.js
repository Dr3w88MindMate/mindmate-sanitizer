// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/sanitize', (req, res) => {
  const { input } = req.body;

  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Input must be a string.' });
  }

  const sanitized = JSON.stringify(input); // Escapes emojis, quotes, newlines

  res.json({ sanitized });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sanitizer running on port ${PORT}`);
});
