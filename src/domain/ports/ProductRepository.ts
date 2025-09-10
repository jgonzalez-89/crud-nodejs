// src/domain/ports/ProductRepository.ts
import { Product } from '../models/Product';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: number, product: Product): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}