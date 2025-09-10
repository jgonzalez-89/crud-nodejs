import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { PostgresProductRepository } from './infrastructure/repositories/PostgresProductRepository';
import { ProductService } from './application/services/ProductService';
import { ProductController } from './infrastructure/http/controllers/ProductController';
import { createProductRouter } from './infrastructure/http/routes/productRoutes';
import { pool } from './infrastructure/database/connection';
import { swaggerSpec } from './infrastructure/swagger/swaggerConfig';

export function createApp() {
  const app = express();
  app.use(express.json());

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Ruta para obtener el JSON de la especificación
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Inyección de dependencias
  const productRepository = new PostgresProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);

  // Rutas de productos
  app.use('/api', createProductRouter(productController));

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Health check del servicio
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Servicio funcionando correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthCheck'
   *       500:
   *         description: Error en el servicio
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  // Página de inicio con links útiles
  app.get('/', (req, res) => {
    res.json({
      message: 'Products API - Hexagonal Architecture',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        swagger: '/api-docs',
        products: '/api/products'
      }
    });
  });

  // Error handler global
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
}