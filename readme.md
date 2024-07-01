# Store Manager
  
Store Manager é uma API para gerenciar produtos, clientes e vendas.
  
## Tecnologias

- NodeJs;
- Javascript;
- MySQL;
- Docker;

<details>
<summary>Como rodar o projeto</summary>

## Requisitos

- Docker;
- MySQL Workbench;

## Rodando o projeto

- Clone o repositório do projeto;
- Entre na pasta do projeto e renomeie o arquivo .env.example para .env;
- Abra um terminal na pasta do projeto e crie os containers: `docker-compose up --build`;
- Abra o MySQL workbench e crie uma nova conexão, preencha os campos com
hostname: `127.0.0.1`, port: `3307`, username: `root` e password: `root`;
- Ainda no MySQL Workbench execute o arquivo de script: `db.sql` para criar o banco de dados;
- Por fim execute o arquivo de script: `seed.sql` para alimentar o banco de dados;
- Na segunda vez que executar o projeto rode no terminal: `docker-compose up -d` ao invés do comando anterior;


  
Obs: Para testar os endpoints da API, recomendo utilizar o Postman ou a extensão do Vscode: ThunderClient.
Na pasta principal do projeto há uma subpasta chamada `collections`, onde se encontra os arquivos de 
coleções do storeManager para serem importadas no `Postman` e `ThunderClient`, utilize `localhost:3000` na url base;

</details>

<details>
<summary>API</summary>
  
## Endpoints

### Autenticação

#### Criar usuário  
- **URL:** `/users/signup`
- **Método:** `POST`
- **Body:**
```json
{
  "email": "vendedor1@example.com",
  "password": "securepassword1"
}
```
- **Response:**

*Status code: 201*
```json
{
  "message": "User created successfully"
}
```
#### Login de usuário
- **URL:** `/users/login`
- **Método:** `POST`
- **Body:**
```json
{
  "email": "vendedor1@example.com",
  "password": "securepassword1"
}
```

- **Response:**

*Status code: 200*
```json
{
  "message": "<token>"
}
```

### Clientes

#### Criar cliente
- **URL:** `/clients`
- **Método:** `POST`
- **Headers:**
```
  Authorization: <token>
```
  
- **Body:**
```json
{
  "name": "Marcos Silva",
  "cpf": "12345678958"
  "phone": "5562985667889",
  "address": {
    "zip": "12345-678",
    "street": "Rua Exemplo",
    "neighborhood": "Bairro Exemplo",
    "city": "Cidade Exemplo",
    "state": "EX"
  }
}
```

- **Response:**

*Status code: 201*
```json
{
  "id": 5,
  "name": "Marcos Silva",
  "cpf": "12345678958",
  "phone": "5562985667889",
  "address": {
    "zip": "12345-678",
    "street": "Rua Exemplo",
    "neighborhood": "Bairro Exemplo",
    "city": "Cidade Exemplo",
    "state": "EX"
  }
}
```

#### Visualizar todos os clientes
- **URL:** `/clients`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
[
  {"..."},
  {"..."},
  {"..."},
  {
    "id": 4,
    "name": "João Santos",
    "cpf": "54321678900",
    "phone": "543216789",
    "address": {
      "zip": "54321-876",
      "street": "Rua do Morro, 789",
      "neighborhood": "Alto da Colina",
      "city": "Cidade C",
      "state": "CC"
    }
  },
  {
    "id": 5,
    "name": "Marcos Silva",
    "cpf": "12345678958",
    "phone": "5562985667889",
    "address": {
      "zip": "12345-678",
      "street": "Rua Exemplo",
      "neighborhood": "Bairro Exemplo",
      "city": "Cidade Exemplo",
      "state": "EX"
    }
  }
]
```

#### Visualizar cliente por ID
- **URL:** `/clients/{id}`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
{
  "name": "João Matos",
  "cpf": "12345678978",
  "phone": "5563998612321",
  "address": {
    "zip": "12345-678",
    "street": "Rua Exemplo",
    "neighborhood": "Bairro Exemplo",
    "city": "Cidade Exemplo",
    "state": "EX"
  }
}
```

#### Atualizar cliente por ID
- **URL:** `/clients/{id}`
- **Método:** `PUT`
- **Body:**
```json
{
  "name": "Marcos Silva",
  "cpf": "32158795312"
  "phone": "3564985787558",
  "address": {
    "zip": "12345-678",
    "street": "Rua Exemplo1",
    "neighborhood": "Bairro Exemplo1",
    "city": "Cidade Exemplo1",
    "state": "EX"
  }
}
```

- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
{
  "id": 5,
  "name": "Marcos Silva",
  "cpf": "12345678958"
  "phone": "3562985667558",
  "address": {
    "zip": "12345-678",
    "street": "Rua Exemplo",
    "neighborhood": "Bairro Exemplo",
    "city": "Cidade Exemplo",
    "state": "EX"
  }
}
```

#### Deletar cliente por ID
- **URL:** `/clients/{id}`
- **Método:** `DELETE`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*

```json
{
  "message": "Client successfully deleted"
}
```

### Produtos

#### Criar produto
- **URL:** `/products`
- **Método:** `POST`
- **Headers:**
```
  Authorization: <token>
```
  
- **Body:**
```json
{
  "name": "Mouse",
  "type": "mouse gamer",
  "description": "Mouse voltado para jogos FPS",
  "price": 300,
  "quantity": 10
}
```

- **Response:**

*Status code: 201*
```json
{
  "id": 5,
  "name": "Mouse",
  "type": "mouse gamer",
  "description": "Mouse voltado para jogos FPS",
  "price": 300,
  "quantity": 10
}
```

#### Visualizar todos os produtos
- **URL:** `/products`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
[
  {"..."},
  {"..."},
  {"..."},
    {
    "id": 4,
    "name": "Teclado",
    "type": "teclado gamer",
    "description": "Teclado mecânico para jogos",
    "price": "200.00",
    "quantity": 5
  },
  {
    "id": 5,
    "name": "Mouse",
    "type": "mouse gamer",
    "description": "Mouse voltado para jogos FPS",
    "price": "300.00",
    "quantity": 10
  },
]
```

#### Visualizar produto por ID
- **URL:** `/products/{id}`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
  {
    "id": 5,
    "name": "Mouse",
    "type": "mouse gamer",
    "description": "Mouse voltado para jogos FPS",
    "price": "300.00",
    "quantity": 10
  }
```

#### Atualizar produto por ID
- **URL:** `/products/{id}`
- **Método:** `PUT`
- **Headers:**
```
  Authorization: <token>
```

- **Body:**
```json
  {
    "name": "Mouse",
    "type": "mouse convencional",
    "description": "mouse de uso convencional",
    "price": 50,
    "quantity": 2
  }
```

- **Response:**

*Status code: 200*
```json
{
  "id": "5",
  "name": "Mouse",
  "type": "mouse convencional",
  "description": "mouse de uso convencional",
  "price": 50,
  "quantity": 2
}
```

#### Deletar produto por ID
- **URL:** `/products/{id}`
- **Método:** `DELETE`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
{
  "message": "Product successfully deleted"
}
```

### Vendas

#### Criar venda
- **URL:** `/sales`
- **Método:** `POST`
- **Headers:**
```
  Authorization: <token>
```
  
- **Body:**
```json
{
  "clientId": 5,
  "productId": 5,
  "quantity": 1
}
```

- **Response:**

*Status code: 201*
```json
{
  "id": 17,
  "client_id": 5,
  "product_id": 5,
  "quantity": 2,
  "unit_price": "300",
  "total_price": "600",
  "sale_date": "2024-07-01T13:41:15.000Z"
}
```

#### Visualizar todas as vendas
- **URL:** `/sales`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Response:**

*Status code: 200*
```json
[
  {
    "id": 17,
    "client_id": 5,
    "product_id": 5,
    "quantity": 2,
    "unit_price": 300,
    "total_price": 600,
    "sale_date": "2024-07-01T17:31:20.000Z"
  },
  {
    "id": 16,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:29:59.000Z"
  },
  {
    "id": 15,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:23:47.000Z"
  },
  {
    "id": 14,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:22:48.000Z"
  },
  {
    "id": 13,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:22:20.000Z"
  },
  {
    "id": 12,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:22:19.000Z"
  },
  {
    "id": 11,
    "client_id": 1,
    "product_id": 3,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T17:17:12.000Z"
  },
  {
    "id": 10,
    "client_id": 1,
    "product_id": 5,
    "quantity": 1,
    "unit_price": 300,
    "total_price": 300,
    "sale_date": "2024-07-01T13:41:15.000Z"
  },
  {
    "id": 9,
    "client_id": 1,
    "product_id": 2,
    "quantity": 1,
    "unit_price": 800,
    "total_price": 800,
    "sale_date": "2024-07-01T02:13:50.000Z"
  }
]
```

#### Visualizar vendas de um cliente
- **URL:** `/sales/{id}`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```

- **Response:**

*Status code: 200*
```json
[
  {
    "id": 17,
    "product_id": 5,
    "quantity": 2,
    "unity_price": 600,
    "sale_date": "2024-07-01T17:23:47.000Z"
  },
    {
    "id": 16,
    "product_id": 4,
    "quantity": 4,
    "unit_price": 200,
    "total_price": 800,
    "sale_date": "2024-07-01T13:41:15.000Z"
  },
  {"..."},
  {"..."},
  {"..."},
]
```

#### Visualizar vendas por mês e ano
- **URL:** `/sales/filter?month={month}&year={year}`
- **Método:** `GET`
- **Headers:**
```
  Authorization: <token>
```
- **Query parameters:**
```
  month: <number between 1 and 12>
  year:  <number between 1900 and 2100>
```

- **Response:**

*Status code: 200*
```json
[
  {
    "id": 17,
    "client_name": "José da Silva",
    "product_name": "Mouse voltado para jogos FPS",
    "quantity": 2,
    "unit_price": 300,
    "total_price": 600,
    "sale_date": "2024-07-01T18:23:47.000Z"
  },
  {
    "id": 16,
    "client_name": "José da Silva",
    "product_name": "Teclado",
    "quantity": 4,
    "unit_price": 200,
    "total_price": 800,
    "sale_date": "2024-07-01T17:29:59.000Z"
  },
  {
    "id": 15,
    "client_name": "Matheus Oliveira",
    "product_name": "Teclado",
    "quantity": 1,
    "unit_price": 200,
    "total_price": 200,
    "sale_date": "2024-07-01T17:23:47.000Z"
  },
  {
    "id": 14,
    "client_name": "Amanda Martins",
    "product_name": "Teclado",
    "quantity": 3,
    "unit_price": 200,
    "total_price": 600,
    "sale_date": "2024-07-01T17:22:48.000Z"
  }
]
```

</details>
