import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export function createProductRouter(controller: ProductController): Router {
  const router = Router();

  router.post('/products', (req, res) => controller.create(req, res));
  router.get('/products', (req, res) => controller.getAll(req, res));
  router.get('/products/:id', (req, res) => controller.getById(req, res));
  router.put('/products/:id', (req, res) => controller.update(req, res));
  router.delete('/products/:id', (req, res) => controller.delete(req, res));

  return router;
}