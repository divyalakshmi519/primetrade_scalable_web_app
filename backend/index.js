require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

// Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Routes
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashed], function(err){
    if(err) return res.status(400).json({ message: err.message });
    res.json({ id: this.lastID, name, email });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name });
  });
});

app.get('/api/tasks', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [req.user.id], (err, rows) => {
    if(err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  const { title, description } = req.body;
  db.run(`INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)`,
    [req.user.id, title, description], function(err){
      if(err) return res.status(400).json({ message: err.message });
      res.json({ id: this.lastID, title, description });
    });
});

app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const { title, description, status } = req.body;
  db.run(`UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?`,
    [title, description, status, req.params.id, req.user.id], function(err){
      if(err) return res.status(400).json({ message: err.message });
      res.json({ message: 'Task updated' });
    });
});

app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  db.run(`DELETE FROM tasks WHERE id=? AND user_id=?`, [req.params.id, req.user.id], function(err){
    if(err) return res.status(400).json({ message: err.message });
    res.json({ message: 'Task deleted' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
