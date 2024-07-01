const db = require('../database/config');

const createSale = async (sale, saleTotalPrice, productUnitPrice) => {
  const [result] = await db.execute(
    'INSERT INTO sales (client_id, product_id, quantity, unit_price, total_price, sale_date) VALUES (?, ?, ?, ?, ?, ?)',
    [
      sale.clientId,
      sale.productId,
      sale.quantity,
      productUnitPrice,
      saleTotalPrice,
      new Date()
    ]
  );

  const [newSale] = await db.execute(
    'SELECT id, client_id, product_id, quantity, unit_price, total_price, sale_date FROM sales WHERE id = ?',
    [result.insertId]
  );

  const saleRecord = newSale[0];
  saleRecord.unit_price = parseFloat(saleRecord.unit_price);
  saleRecord.total_price = parseFloat(saleRecord.total_price);

  return saleRecord;
};

const getAllSales = async () => {
  const [rows] = await db.execute(
    'SELECT s.id, c.id AS client_id, p.id AS product_id, s.quantity, s.unit_price, s.total_price, s.sale_date FROM sales s JOIN clients c ON s.client_id = c.id JOIN products p ON s.product_id = p.id ORDER BY s.sale_date DESC'
  );

  rows.forEach(row => {
    row.unit_price = parseFloat(row.unit_price);
    row.total_price = parseFloat(row.total_price);
  });

  return rows;
};

const getSalesByClient = async (id) => {
  const [rows] = await db.execute(
    'SELECT s.id, s.product_id, s.quantity, s.unit_price, s.total_price, s.sale_date FROM sales s WHERE s.client_id = ? ORDER BY s.sale_date DESC',
    [id]
  );

  rows.forEach(row => {
    row.unit_price = parseFloat(row.unit_price);
    row.total_price = parseFloat(row.total_price);
  });

  return rows;
};

const getSalesByMonthYear = async (month, year) => {
  const [rows] = await db.execute(
    'SELECT s.id, c.name AS client_name, p.name AS product_name, s.quantity, s.unit_price, s.total_price, s.sale_date FROM sales s JOIN clients c ON s.client_id = c.id JOIN products p ON s.product_id = p.id WHERE YEAR(s.sale_date) = ? AND MONTH(s.sale_date) = ? ORDER BY s.sale_date DESC',
    [year, month]
  );

  rows.forEach(row => {
    row.unit_price = parseFloat(row.unit_price);
    row.total_price = parseFloat(row.total_price);
  });

  return rows;
};

const deleteSalesByClientId = async (clientId) => {
  await db.execute('DELETE FROM sales WHERE client_id = ?', [clientId]);
};

module.exports = {
  createSale,
  getAllSales,
  getSalesByClient,
  getSalesByMonthYear,
  deleteSalesByClientId
};
