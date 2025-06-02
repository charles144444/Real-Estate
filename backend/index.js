require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all blog posts
app.get('/api/blog', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blog_posts ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
