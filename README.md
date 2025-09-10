# CRUD Sencillo con Arquitectura Hexagonal

API REST para gestión de productos implementada con arquitectura hexagonal (ports & adapters).

## Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/jgonzalez-89/crud-nodejs.git .

# Levantar con Docker
docker-compose up

# La API estará disponible en:
# - API: http://localhost:3000
# - Swagger: http://localhost:3000/api-docs
# - Health: http://localhost:3000/health
```

## Arquitectura Hexagonal

La arquitectura (Ports & Adapters) separa la logica de negocio del mundo exterior. El proyecto esta organizado en tres capas principales:

```
src/
├── domain/           # Núcleo - Lógica de negocio pura
│   ├── models/       # Entidades del dominio
│   └── ports/        # Interfaces (contratos)
│
├── application/      # Casos de uso
│   └── services/     # Servicios de aplicación
│
└── infrastructure/   # Adaptadores - Detalles técnicos
    ├── database/     # Conexión a BD
    ├── repositories/ # Implementación de persistencia
    ├── http/         # Controladores y rutas REST
    └── swagger/      # Documentación API
```

### Domain Layer (Núcleo)
- **Qué es**: El corazón del negocio. Código puro sin dependencias externas.
- **Contiene**: 
  - `Product.js`: Entidad con reglas de negocio (validaciones)
  - `ProductRepository.js`: Interface/contrato (puerto)
- **No sabe de**: Bases de datos, HTTP, frameworks

### Application Layer
- **Qué es**: Orquesta los casos de uso del negocio
- **Contiene**: 
  - `ProductService.js`: Coordina operaciones usando el dominio
- **Responsabilidad**: Ejecutar la lógica de negocio

### Infrastructure Layer
- **Qué es**: Todos los detalles técnicos y conexiones externas
- **Contiene**:
  - `PostgresProductRepository.js`: Implementación real del puerto
  - `ProductController.js`: Maneja peticiones HTTP
  - `database/connection.js`: Configuración de PostgreSQL
- **Responsabilidad**: Adaptar el mundo exterior al dominio

## Flujo de una Petición

```
HTTP Request → Controller → Service → Domain → Repository → Database
     ↑                                                          ↓
     └──────────────────── Response ←──────────────────────────┘
```

1. **Controller** recibe petición HTTP
2. **Service** ejecuta el caso de uso
3. **Domain** aplica reglas de negocio
4. **Repository** persiste/consulta datos
5. La respuesta fluye de vuelta

## Tests

```bash
# Ejecutar tests
docker compose exec app npm test

# Ver cobertura
docker compose exec app npm run test:coverage
```

- **Tests unitarios**: Prueban dominio y servicios aisladamente
- **Tests de integración**: Prueban los endpoints con mocks


---

## TODO - Mejoras Futuras

### Seguridad
- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] CORS configurado por entorno
- [ ] Sanitización de datos de entrada

### Base de Datos
- [ ] Migraciones con herramienta dedicada (Prisma, TypeORM)
- [ ] Pool de conexiones optimizado
- [ ] Transacciones para operaciones complejas
- [ ] Índices en campos de búsqueda

### Dominio y Lógica
- [ ] Value Objects para validaciones complejas
- [ ] Eventos de dominio
- [ ] Aggregates para operaciones complejas
- [ ] Result type para manejo de errores

### Performance
- [ ] Caché con Redis
- [ ] Paginación en listados
- [ ] Compresión de respuestas

### Código y Arquitectura
- [ ] API Gateway pattern
- [ ] Circuit breaker para servicios externos

### Testing
- [ ] Tests E2E
- [ ] Tests de carga
- [ ] Coverage mínimo del 80%

### Documentación
- [ ] Versionado de API
- [ ] Changelog automático
- [ ] Postman collection

### DevOps
- [ ] CI/CD con GitHub Actions
- [ ] Health checks más completos
- [ ] Métricas con Prometheus
- [ ] Environment por rama (dev, staging, prod)

### Funcionalidades
- [ ] Búsqueda y filtros avanzados
- [ ] Bulk operations (crear/actualizar múltiples)
- [ ] WebSockets para tiempo real

### Infraestructura
- [ ] Docker Compose para desarrollo
- [ ] Kubernetes para producción
- [ ] Service mesh (Istio)
- [ ] Message queue (RabbitMQ)
