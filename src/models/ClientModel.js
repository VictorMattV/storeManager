const db = require('../database/config');

const getAllClients = async () => {
  const [rows] = await db.execute(`
    SELECT 
      c.id, c.name, c.cpf, c.phone,
      a.zip, a.street, a.neighborhood, a.city, a.state
    FROM clients c
    LEFT JOIN address a ON c.address_id = a.id
    ORDER BY c.id
  `);

  const clients = rows.map((row) => ({
    id: row.id,
    name: row.name,
    cpf: row.cpf,
    phone: row.phone,
    address: {
      zip: row.zip,
      street: row.street,
      neighborhood: row.neighborhood,
      city: row.city,
      state: row.state
    }
  }));

  return clients;
};

const getClientById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT 
      c.id, c.name, c.cpf, c.phone,
      a.zip, a.street, a.neighborhood, a.city, a.state
    FROM clients c
    LEFT JOIN address a ON c.address_id = a.id
    WHERE c.id = ?
  `,
    [id]
  );

  if (rows.length === 0) {
    throw new Error('Client not found');
  }

  const client = {
    id: rows[0].id,
    name: rows[0].name,
    cpf: rows[0].cpf,
    phone: rows[0].phone,
    address: {
      zip: rows[0].zip,
      street: rows[0].street,
      neighborhood: rows[0].neighborhood,
      city: rows[0].city,
      state: rows[0].state
    }
  };

  return client;
};

const createClient = async (clientData) => {
  const { name, cpf, phone, address } = clientData;

  const [result] = await db.execute(
    'INSERT INTO address (zip, street, neighborhood, city, state) VALUES (?, ?, ?, ?, ?)',
    [
      address.zip,
      address.street,
      address.neighborhood,
      address.city,
      address.state
    ]
  );
  const addressId = result.insertId;

  const [clientResult] = await db.execute(
    'INSERT INTO clients (name, cpf, phone, address_id) VALUES (?, ?, ?, ?)',
    [name, cpf, phone, addressId]
  );

  const newClient = {
    id: clientResult.insertId,
    name,
    cpf,
    phone,
    address: {
      zip: address.zip,
      street: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state
    }
  };

  return newClient;
};

const updateClient = async (id, clientData) => {
  const { name, cpf, phone, address } = clientData;

  const [result] = await db.execute(
    'INSERT INTO address (zip, street, neighborhood, city, state) VALUES (?, ?, ?, ?, ?)',
    [
      address.zip,
      address.street,
      address.neighborhood,
      address.city,
      address.state
    ]
  );
  const addressId = result.insertId;

  await db.execute(
    'UPDATE clients SET name = ?, cpf = ?, phone = ?, address_id = ? WHERE id = ?',
    [name, cpf, phone, addressId, id]
  );

  const updatedClient = await getClientById(id);
  return updatedClient;
};

const deleteClient = async (id) => {
  await db.execute('DELETE FROM clients WHERE id = ?', [id]);
};

const getClientByCPF = async (cpf) => {
  const [rows] = await db.execute('SELECT * FROM clients WHERE cpf = ?', [cpf]);
  return rows[0];
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByCPF,
  createClient,
  updateClient,
  deleteClient
};
