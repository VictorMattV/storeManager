const express = require('express');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const authenticate = require('../middlewares/authenticate');
const validateClientFields = require('../middlewares/validateClientFields');
const validateParams = require('../middlewares/validateParams');
const router = express.Router();

router.use(authenticate);

router.get('/', getAllClients);
router.get('/:id', validateParams, getClientById);
router.post('/', validateClientFields, createClient);
router.put('/:id', validateParams, validateClientFields, updateClient);
router.delete('/:id', validateParams, deleteClient);

module.exports = router;
