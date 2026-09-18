require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----

// Parse incoming JSON request bodies
app.use(express.json());

// Custom middleware: log every incoming request (Bonus)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve a static HTML page at /
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----

// GET / -> "My Week 2 API!"
// (Handled primarily by the static index.html above, but we also
// expose a plain-text/JSON version in case the client requests it
// without accepting HTML, or if the static file is ever removed.)
app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      error: 'Missing required fields: "name" and "email" are both required.',
    });
  }

  res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Missing required parameter: id.' });
  }

  res.send(`User ${id} profile`);
});

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ---- Global error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
