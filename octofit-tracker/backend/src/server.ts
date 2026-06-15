import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// CORS configuration for Codespaces and localhost
app.use((req: Request, res: Response, next: Function) => {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];

  // Allow Codespaces origin
  if (process.env.CODESPACE_NAME) {
    allowedOrigins.push(`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`);
  }

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const codespaceUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    status: 'API is running',
    port: PORT,
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost',
    apiUrl: codespaceUrl,
  });
});

// API base routes
app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    message: 'Users endpoint',
    route: '/api/users',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
});

app.get('/api/activities', (req: Request, res: Response) => {
  res.json({
    message: 'Activities endpoint',
    route: '/api/activities',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
});

// Start server
app.listen(PORT, () => {
  const codespaceUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  console.log(`
╔════════════════════════════════════════════════════╗
║        🏋️  OctoFit Tracker API Started             ║
╠════════════════════════════════════════════════════╣
║ Environment: ${process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost'}${' '.repeat(31)}║
║ Port: ${PORT}${' '.repeat(42)}║
║ API URL: ${codespaceUrl}${' '.repeat(32 - codespaceUrl.length)}║
║${' '.repeat(50)}║
║ Health Check: /health                            ║
║ Users API: /api/users                            ║
║ Activities API: /api/activities                  ║
╚════════════════════════════════════════════════════╝
  `);
});

export default app;
