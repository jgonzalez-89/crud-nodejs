import { Product } from '../../domain/models/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(data: { name: string; price: number; stock: number }): Promise<Product> {
    const product = new Product(null, data.name, data.price, data.stock);
    product.validate();
    
    return await this.productRepository.save(product);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async updateProduct(id: number, data: { name: string; price: number; stock: number }): Promise<Product> {
    const product = new Product(id, data.name, data.price, data.stock);
    product.validate();
    
    const updatedProduct = await this.productRepository.update(id, product);
    
    if (!updatedProduct) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    const deleted = await this.productRepository.delete(id);
    
    if (!deleted) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
  }
}