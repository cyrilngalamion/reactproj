const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const { URL } = require('url');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('https')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
    const $ = cheerio.load(response.data);

    const headline = $('h1').first().text().trim();
    const image = $('meta[property="og:image"]').attr('content') || '';
    const author =
      $('meta[name="author"]').attr('content') ||
      $('[itemprop="author"]').text().trim() ||
      '';
    const date =
      $('meta[property="article:published_time"]').attr('content') ||
      $('time').first().attr('datetime') ||
      $('time').first().text().trim();

    const source = new URL(url).hostname;

    const result = {
      headline: headline || 'No headline found',
      image,
      author: author || 'Unknown',
      date: date || 'Unknown',
      source,
      url,
    };

    res.json(result);
  } catch (err) {
    console.error('Scraping error:', err.message);
    res.status(500).json({ error: 'Failed to scrape the page' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${url}`);
});
