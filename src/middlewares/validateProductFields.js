const validateProductFields = (req, res, next) => {
  const { name, description, price, quantity, type } = req.body;
  const messages = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    messages.push({
      message: 'Name is required and must be a non-empty string'
    });
  }

  if (description !== undefined && typeof description !== 'string') {
    messages.push({
      message: 'Description must be a string'
    });
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    messages.push({
      message: 'Price is required and must be a number greater than zero'
    });
  }

  if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
    messages.push({
      message:
        'Quantity is required and must be a number greater than or equal to zero'
    });
  }

  if (type === undefined || typeof type !== 'string' || type.trim() === '') {
    messages.push({
      message:
        'Type is required and must be a non-empty string'
    });
  }

  if (messages.length > 0) {
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateProductFields;
