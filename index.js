const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch the target URL.',
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`CORS Proxy running at http://localhost:${port}`);
});