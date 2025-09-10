// src/index.ts
import express from 'express';
import { pool } from './infrastructure/database/connection';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', db: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', db: 'disconnected', error: (err as Error).message });
  }
});

app.listen(PORT, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
  }

  console.log(`Server running on port ${PORT}`);
});