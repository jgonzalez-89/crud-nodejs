import express from 'express';
import { PostgresProductRepository } from './infrastructure/repositories/PostgresProductRepository';
import { ProductService } from './application/services/ProductService';
import { ProductController } from './infrastructure/http/controllers/ProductController';
import { createProductRouter } from './infrastructure/http/routes/productRoutes';
import { pool } from './infrastructure/database/connection';

export function createApp() {
  const app = express();
  app.use(express.json());

  // Inyección de dependencias
  const productRepository = new PostgresProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);

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

  return app;
}