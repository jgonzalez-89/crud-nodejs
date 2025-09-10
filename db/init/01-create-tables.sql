CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO products (name, price, stock) VALUES 
    ('Laptop', 999.99, 10),
    ('Mouse', 25.50, 50),
    ('Teclado', 75.00, 30);