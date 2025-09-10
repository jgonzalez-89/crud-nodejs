import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export function createProductRouter(controller: ProductController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Obtener todos los productos
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: Lista de productos obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       500:
   *         description: Error del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/products', (req, res) => controller.getAll(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Obtener un producto por ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del producto
   *     responses:
   *       200:
   *         description: Producto encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Producto no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/products/:id', (req, res) => controller.getById(req, res));

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Crear un nuevo producto
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductInput'
   *     responses:
   *       201:
   *         description: Producto creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Datos inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post('/products', (req, res) => controller.create(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Actualizar un producto
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del producto
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductInput'
   *     responses:
   *       200:
   *         description: Producto actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Datos inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Producto no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.put('/products/:id', (req, res) => controller.update(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Eliminar un producto
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del producto
   *     responses:
   *       204:
   *         description: Producto eliminado exitosamente
   *       404:
   *         description: Producto no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.delete('/products/:id', (req, res) => controller.delete(req, res));

  return router;
}