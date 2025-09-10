import { Product } from '../../../src/domain/models/Product';

describe('Product Domain Model', () => {
  describe('validate', () => {
    it('should validate a valid product', () => {
      const product = new Product(null, 'Laptop', 999.99, 10);
      expect(() => product.validate()).not.toThrow();
    });

    it('should throw error for empty name', () => {
      const product = new Product(null, '', 999.99, 10);
      expect(() => product.validate()).toThrow('El nombre es requerido');
    });

    it('should throw error for negative price', () => {
      const product = new Product(null, 'Laptop', -100, 10);
      expect(() => product.validate()).toThrow('El precio no puede ser negativo');
    });

    it('should throw error for negative stock', () => {
      const product = new Product(null, 'Laptop', 999.99, -5);
      expect(() => product.validate()).toThrow('El stock no puede ser negativo');
    });
  });
});