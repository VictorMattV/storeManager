const saleModel = require('../models/SaleModel');
const clientService = require('./clientService');
const productService = require('./productService');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  if (!sales || sales.length === 0) {
    throw new Error('There are no sales registered in the database');
  }
  return sales;
};

const getSalesByClientId = async (id) => {
  const sales = await saleModel.getSalesByClient(id);
  if (!sales || sales.length === 0) {
    throw new Error('Client has no sales');
  }
  return sales;
};

const createSale = async (sale) => {
  const client = await clientService.getClientById(sale.clientId);
  const product = await productService.getProductById(sale.productId);

  if (!client) {
    throw new Error('Client not found');
  }

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity <= 0) {
    throw new Error('Product out of stock');
  }

  if (product.quantity < sale.quantity) {
    throw new Error('Sale quantity request is greater than product quantity');
  }

  await productService.updateProductQuantity(product.id, sale.quantity);

  const saleTotalPrice = product.price * sale.quantity;
  const productUnitPrice = product.price;

  const newSale = await saleModel.createSale(
    sale,
    saleTotalPrice,
    productUnitPrice
  );
  return newSale;
};

const getSalesByMonthYear = async (month, year) => {
  const sales = await saleModel.getSalesByMonthYear(month, year);
  if (!sales || sales.length === 0) {
    throw new Error('No sales found for this month and year');
  }

  return saleModel.getSalesByMonthYear(month, year);
};

module.exports = {
  createSale,
  getAllSales,
  getSalesByClientId,
  getSalesByMonthYear
};
