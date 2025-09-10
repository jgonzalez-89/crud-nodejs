import { createApp } from './app';
import { pool } from './infrastructure/database/connection';

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API endpoint: http://localhost:${PORT}/api/products`);
  } catch (err) {
    console.error('Database connection failed:', err);
    console.log(`Server running on port ${PORT} but database is not available`);
  }
});