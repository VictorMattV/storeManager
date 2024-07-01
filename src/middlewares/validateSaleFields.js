const validateSaleFields = (req, res, next) => {
  const { clientId, productId, quantity } = req.body;
  const messages = [];

  if (!Number.isInteger(clientId) || clientId <= 0) {
    messages.push({
      message: 'clientId is required and must be a positive integer'
    });
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    messages.push({
      message: 'productId is required and must be a positive integer'
    });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    messages.push({
      message: 'quantity is required and must be a positive integer'
    });
  }

  if (messages.length > 0) {
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateSaleFields;
