// src/infrastructure/database/connection.ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'products_db',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Verificar conexión
pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  process.exit(-1);
});