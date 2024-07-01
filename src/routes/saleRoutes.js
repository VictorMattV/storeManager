const express = require('express');
const {
  getAllSales,
  getSalesByClientId,
  createSale,
  getSalesByMonthYear
} = require('../controllers/saleController');
const authenticate = require('../middlewares/authenticate');
const validateParams = require('../middlewares/validateParams');
const validateSaleQuery = require('../middlewares/validateSaleQuery');
const validateSaleFields = require('../middlewares/validateSaleFields');
const router = express.Router();

router.use(authenticate);

router.get('/', getAllSales);
router.get('/client/:id', validateParams, getSalesByClientId);
router.post('/', validateSaleFields, createSale);
router.get('/filter', validateSaleQuery, getSalesByMonthYear);

module.exports = router;
