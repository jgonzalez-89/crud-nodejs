import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API - Hexagonal Architecture',
      version: '1.0.0',
      description: 'CRUD API para gestión de productos con arquitectura hexagonal',
      contact: {
        name: 'API Support',
        email: 'api@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'stock'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del producto',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Laptop Gaming'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Precio del producto',
              example: 999.99
            },
            stock: {
              type: 'integer',
              description: 'Cantidad en stock',
              example: 10
            }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'stock'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Laptop Gaming'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Precio del producto',
              example: 999.99
            },
            stock: {
              type: 'integer',
              description: 'Cantidad en stock',
              example: 10
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Producto no encontrado'
            }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK'
            },
            db: {
              type: 'string',
              example: 'connected'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z'
            },
            environment: {
              type: 'string',
              example: 'development'
            }
          }
        }
      }
    }
  },
  apis: ['./src/infrastructure/http/routes/*.ts', './src/app.ts']
};

export const swaggerSpec = swaggerJsdoc(options);