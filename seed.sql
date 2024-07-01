-- Insere dados na tabela de endereços
INSERT INTO address (zip, street, neighborhood, city, state)
VALUES 
    ('12345-678', 'Rua Principal, 123', 'Centro', 'Cidade A', 'AA'),
    ('98765-432', 'Rua das Flores, 456', 'Jardins', 'Cidade B', 'BB'),
    ('54321-876', 'Rua do Morro, 789', 'Alto da Colina', 'Cidade C', 'CC');

-- Insere dados na tabela de clientes
INSERT INTO clients (name, cpf, phone, address_id)
VALUES 
    ('José da Silva', '12345678900', '123456789', 1),
    ('Maria Oliveira', '98765432100', '987654321', 2),
    ('João Santos', '54321678900', '543216789', 3);

-- Insere dados na tabela de produtos
INSERT INTO products (name, description, price, quantity, type)
VALUES 
    ('Notebook', 'Notebook de alta performance', 3500.00, 10, 'Notebook'),
    ('Monitor', 'Monitor LCD 27"', 800.00, 20, 'Monitor'),
    ('Teclado', 'Teclado mecânico para jogos', 300.00, 30, 'Teclado');
