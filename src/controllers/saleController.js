const saleService = require('../services/saleService');

const getAllSales = async (_req, res) => {
  try {
    const sales = await saleService.getAllSales();
    res.status(200).json(sales);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getSalesByClientId = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await saleService.getSalesByClientId(id);
    res.status(200).json(sales);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createSale = async (req, res) => {
  const sale = req.body;
  try {
    const newSale = await saleService.createSale(sale);
    res.status(201).json(newSale);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getSalesByMonthYear = async (req, res) => {
  const { month, year } = req.query;
  try {
    const sales = await saleService.getSalesByMonthYear(month, year);
    res.status(200).json(sales);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllSales,
  getSalesByClientId,
  createSale,
  getSalesByMonthYear
};
