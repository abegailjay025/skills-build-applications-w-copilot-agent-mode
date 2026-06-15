import express, { Express } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening on port ${PORT}`);
  console.log(`MongoDB connecting to ${MONGODB_URI}`);
});
