import request from 'supertest';
import express from 'express';
import { ProductService } from '../../src/application/services/ProductService';
import { ProductController } from '../../src/infrastructure/http/controllers/ProductController';
import { createProductRouter } from '../../src/infrastructure/http/routes/productRoutes';
import { Product } from '../../src/domain/models/Product';

// Mock del servicio
jest.mock('../../src/application/services/ProductService');

describe('Product API Integration Tests', () => {
  let app: express.Application;
  let mockProductService: jest.Mocked<ProductService>;

  beforeEach(() => {
    // Crear una app de test aislada
    app = express();
    app.use(express.json());
    
    // Crear mock del servicio
    mockProductService = new ProductService(null as any) as jest.Mocked<ProductService>;
    
    // Configurar el controlador con el mock
    const productController = new ProductController(mockProductService);
    app.use('/api', createProductRouter(productController));
  });

  describe('GET /api/products', () => {
    it('should return list of products', async () => {
      const mockProducts = [
        new Product(1, 'Product 1', 99.99, 10),
        new Product(2, 'Product 2', 149.99, 5)
      ];

      mockProductService.getAllProducts = jest.fn().mockResolvedValue(mockProducts);

      const response = await request(app)
        .get('/api/products')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(mockProductService.getAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        price: 299.99,
        stock: 20
      };

      const createdProduct = new Product(1, newProduct.name, newProduct.price, newProduct.stock);
      mockProductService.createProduct = jest.fn().mockResolvedValue(createdProduct);

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);
      
      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
      expect(mockProductService.createProduct).toHaveBeenCalledWith(newProduct);
    });

    it('should return 400 for invalid product', async () => {
      const invalidProduct = {
        name: '',
        price: 299.99,
        stock: 20
      };

      mockProductService.createProduct = jest.fn()
        .mockRejectedValue(new Error('El nombre es requerido'));

      await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a specific product', async () => {
      const product = new Product(1, 'Laptop', 999.99, 10);
      mockProductService.getProduct = jest.fn().mockResolvedValue(product);

      const response = await request(app)
        .get('/api/products/1')
        .expect(200);
      
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Laptop');
      expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
    });

    it('should return 404 for non-existing product', async () => {
      mockProductService.getProduct = jest.fn()
        .mockRejectedValue(new Error('Producto con id 9999 no encontrado'));

      await request(app)
        .get('/api/products/9999')
        .expect(404);
    });
  });
});