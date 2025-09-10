import express from 'express';
import { pool } from './infrastructure/database/connection';
import { PostgresProductRepository } from './infrastructure/repositories/PostgresProductRepository';
import { ProductService } from './application/services/ProductService';
import { ProductController } from './infrastructure/http/controllers/ProductController';
import { createProductRouter } from './infrastructure/http/routes/productRoutes';

const app = express();
app.use(express.json());

// Inyección de dependencias
const productRepository = new PostgresProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Rutas de productos
app.use('/api', createProductRouter(productController));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      db: 'connected', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'ERROR', 
      db: 'disconnected', 
      error: (err as Error).message 
    });
  }
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    // Verificar conexión a BD al iniciar
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

export default app;