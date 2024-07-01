const clientModel = require('../models/ClientModel');
const saleModel = require('../models/SaleModel');

const getAllClients = async () => {
  const clients = await clientModel.getAllClients();
  if (!clients || clients.length === 0) {
    throw new Error('There are no clients registered in the database');
  }

  return clients;
};

const getClientById = async (id) => {
  const client = await clientModel.getClientById(id);
  if (!client) {
    throw new Error('Client not found');
  }

  return client;
};

const createClient = async (clientData) => {
  const { cpf } = clientData;
  const existingClient = await clientModel.getClientByCPF(cpf);
  if (existingClient) {
    throw new Error('Client already exists with this CPF');
  }

  const client = await clientModel.createClient(clientData);
  return client;
};

const updateClient = async (id, clientData) => {
  const client = await clientModel.getClientById(id);
  if (!client) {
    throw new Error('Client not found');
  }

  const updatedClient = await clientModel.updateClient(id, clientData);
  return updatedClient;
};

const deleteClient = async (id) => {
  const client = await clientModel.getClientById(id);
  if (!client) {
    throw new Error('Client not found');
  }

  await saleModel.deleteSalesByClientId(id);
  await clientModel.deleteClient(id);
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
