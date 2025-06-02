const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const router = express.Router();

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'realestate',
  password: process.env.PGPASSWORD || 'yourpassword',
  port: process.env.PGPORT || 5432,
});

// 1. User Registration
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add Property
router.post('/properties', async (req, res) => {
  const { user_id, title, description, price, address, city, state, zip_code, latitude, longitude } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO properties (user_id, title, description, price, address, city, state, zip_code, latitude, longitude)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [user_id, title, description, price, address, city, state, zip_code, latitude, longitude]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Edit Property
router.put('/properties/:id', async (req, res) => {
  const { title, description, price, address, city, state, zip_code, latitude, longitude } = req.body;
  try {
    const result = await pool.query(
      `UPDATE properties SET title=$1, description=$2, price=$3, address=$4, city=$5, state=$6, zip_code=$7, latitude=$8, longitude=$9
       WHERE id=$10 RETURNING *`,
      [title, description, price, address, city, state, zip_code, latitude, longitude, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Property not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get all properties
router.get('/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get single property
router.get('/properties/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Property not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Delete property
router.delete('/properties/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. User Profile
router.get('/users/:id', async (req, res) => {
  const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});
router.get('/users/:id/properties', async (req, res) => {
  const result = await pool.query('SELECT * FROM properties WHERE user_id = $1', [req.params.id]);
  res.json(result.rows);
});

// 8. Favorites (requires a favorites table)
router.get('/favorites', async (req, res) => {
  // For demo, use user_id = 1
  const user_id = 1;
  const result = await pool.query(
    `SELECT p.* FROM properties p
     JOIN favorites f ON p.id = f.property_id
     WHERE f.user_id = $1`, [user_id]
  );
  res.json(result.rows);
});

// 9. Contact Landlord/Agent (stub)
router.post('/properties/:id/contact', async (req, res) => {
  // Save message to DB or send email in production
  res.json({ success: true });
});

// 10. Reviews (requires a reviews table)
router.get('/properties/:id/reviews', async (req, res) => {
  const result = await pool.query('SELECT * FROM reviews WHERE property_id = $1', [req.params.id]);
  res.json(result.rows);
});
router.post('/properties/:id/reviews', async (req, res) => {
  const { review } = req.body;
  // For demo, use user_id = 1
  const user_id = 1;
  const result = await pool.query(
    'INSERT INTO reviews (property_id, user_id, review) VALUES ($1, $2, $3) RETURNING *',
    [req.params.id, user_id, review]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;
