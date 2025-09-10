import { Product } from '../../domain/models/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import { pool } from '../database/connection';

export class PostgresProductRepository implements ProductRepository {
  async save(product: Product): Promise<Product> {
    const query = `
      INSERT INTO products (name, price, stock) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [product.name, product.price, product.stock];
    
    const result = await pool.query(query, values);
    return this.mapToProduct(result.rows[0]);
  }

  async findById(id: number): Promise<Product | null> {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapToProduct(result.rows[0]);
  }

  async findAll(): Promise<Product[]> {
    const query = 'SELECT * FROM products ORDER BY id';
    const result = await pool.query(query);
    
    return result.rows.map(row => this.mapToProduct(row));
  }

  async update(id: number, product: Product): Promise<Product | null> {
    const query = `
      UPDATE products 
      SET name = $1, price = $2, stock = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 
      RETURNING *
    `;
    const values = [product.name, product.price, product.stock, id];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapToProduct(result.rows[0]);
  }

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapToProduct(row: any): Product {
    return new Product(
      row.id,
      row.name,
      parseFloat(row.price),
      row.stock
    );
  }
}