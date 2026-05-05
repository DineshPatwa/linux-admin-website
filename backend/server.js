require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Database configuration
// Note: In a production 3-VM setup, DB_HOST would be the IP of the Database VM
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'linuxmastery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

// Initialize Database and Tables
async function initDB() {
  try {
    // First connect without database selected to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await connection.end();

    // Now connect to the specific database using a connection pool
    pool = mysql.createPool(dbConfig);

    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Progress Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        user_id INT,
        page_id VARCHAR(50) NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, page_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database connected and tables verified.');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Make sure MySQL is running and credentials are correct.');
  }
}

initDB();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-learning';

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) return res.status(400).json({ error: 'Username already taken' });

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 3. Get User Progress
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT page_id FROM user_progress WHERE user_id = ?', [req.user.id]);
    const completedPages = rows.map(row => row.page_id);
    res.json(completedPages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// 4. Update Progress
app.post('/api/progress', authenticateToken, async (req, res) => {
  try {
    const { pageId, isComplete } = req.body;

    if (isComplete) {
      await pool.query('INSERT IGNORE INTO user_progress (user_id, page_id) VALUES (?, ?)', [req.user.id, pageId]);
    } else {
      await pool.query('DELETE FROM user_progress WHERE user_id = ? AND page_id = ?', [req.user.id, pageId]);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Application Server running on port ${PORT}`);
});
