const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Load JSON data once during startup (read-only)
const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));

// Use in-memory data instead of writing to filesystem
const router = jsonServer.router(dbData);
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Use default router
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
module.exports = server;
