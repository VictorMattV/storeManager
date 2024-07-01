const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userService.createUser(email, hashedPassword);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { createUser, loginUser };
