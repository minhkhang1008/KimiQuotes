module.exports = async (req, res) => {
  const { query } = req;
  const targetUrl = query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch the target URL.',
      details: error.message,
    });
  }
};