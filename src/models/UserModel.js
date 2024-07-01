const db = require('../database/config');

const createUser = async (email, password) => {
  const [result] = await db.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password]
  );
  return { id: result.insertId, email };
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [
    email
  ]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
