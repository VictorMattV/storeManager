const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');

const createUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error('User already exists');
  }
  return userModel.createUser(email, password);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });

  return token;
};

const findUserByEmail = async (email) => {
  return userModel.findUserByEmail(email);
};

module.exports = { createUser, findUserByEmail, loginUser };
