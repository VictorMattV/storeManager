const db = require('../database/config');

const getAllProducts = async () => {
  const [rows] = await db.execute(
    'SELECT id, name, type, description, price, quantity FROM products WHERE deleted = false ORDER BY name'
  );
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, name, description, price, quantity, type FROM products WHERE id = ? AND deleted = false',
    [id]
  );
  return rows[0];
};

const createProduct = async (product) => {
  const { name, description, price, quantity, type } = product;
  const [result] = await db.execute(
    'INSERT INTO products (name, description, price, quantity, type, deleted) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, quantity, type, false]
  );
  return { id: result.insertId, name, type, description, price, quantity };
};

const updateProduct = async (id, productData) => {
  const { name, description, price, quantity, type } = productData;
  await db.execute(
    'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, type = ? WHERE id = ? AND deleted = false',
    [name, description, price, quantity, type, id]
  );
  return { id, name, type, description, price, quantity };
};

const deleteProduct = async (id) => {
  await db.execute('UPDATE products SET deleted = true WHERE id = ?', [id]);
};

const getProductsByName = async (name) => {
  const [rows] = await db.execute(
    'SELECT * FROM products WHERE name = ? AND deleted = false',
    [name]
  );
  return rows[0];
};

const updateProductQuantity = async (id, quantity) => {
  await db.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?', [
    quantity,
    id
  ]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByName,
  updateProduct,
  deleteProduct,
  updateProductQuantity
};
