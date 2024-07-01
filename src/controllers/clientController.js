const clientService = require('../services/clientService');

const getAllClients = async (_req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientService.getClientById(id);
    res.status(200).json(client);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createClient = async (req, res) => {
  const clientData = req.body;
  try {
    const newClient = await clientService.createClient(clientData);
    res.status(201).json(newClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;
  try {
    const updatedClient = await clientService.updateClient(id, clientData);
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await clientService.deleteClient(id);
    res.status(200).json({ message: 'Client successfully deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
