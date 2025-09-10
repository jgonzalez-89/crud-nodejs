export class Product {
    constructor(
      public readonly id: number | null,
      public name: string,
      public price: number,
      public stock: number
    ) {}
  
    validate(): void {
      if (!this.name || this.name.trim() === '') {
        throw new Error('El nombre es requerido');
      }
      if (this.price < 0) {
        throw new Error('El precio no puede ser negativo');
      }
      if (this.stock < 0) {
        throw new Error('El stock no puede ser negativo');
      }
    }
  }