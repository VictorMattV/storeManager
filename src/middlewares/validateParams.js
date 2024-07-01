const validateParams = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: 'Invalid ID parameter' });
  }

  next();
};

module.exports = validateParams;
