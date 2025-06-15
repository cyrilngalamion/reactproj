import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScrape = async () => {
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError('');
    setNews(null);

    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url: inputUrl });
      setNews(response.data);
    } catch (err) {
      setError('Failed to scrape. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>📰 News Scraper</h1>

      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Paste a news article link..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleScrape} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Scrape
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {news && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          {news.image && (
            <img
              src={news.image}
              alt="News"
              style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
          )}
          <h2>{news.headline}</h2>
          <p><strong>Author:</strong> {news.author}</p>
          <p><strong>Date:</strong> {news.date}</p>
          <p><strong>Source:</strong> {news.source}</p>
          <a href={news.url} target="_blank" rel="noreferrer">🔗 See Original</a>
        </div>
      )}
    </div>
  );
}

export default App;
