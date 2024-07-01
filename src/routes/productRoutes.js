const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authenticate = require('../middlewares/authenticate');
const validateParams = require('../middlewares/validateParams');
const validateProductFields = require('../middlewares/validateProductFields');
const router = express.Router();

router.use(authenticate);

router.get('/', getAllProducts);
router.get('/:id', validateParams, getProductById);
router.post('/', validateProductFields, createProduct);
router.put('/:id', validateParams, validateProductFields, updateProduct);
router.delete('/:id', validateParams, deleteProduct);

module.exports = router;
