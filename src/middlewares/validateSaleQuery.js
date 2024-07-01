const validateSaleQuery = (req, res, next) => {
  const { month, year } = req.query;
  const messages = [];

  if (!month || !Number.isInteger(Number(month)) || month < 1 || month > 12) {
    messages.push({
      message: 'Month must be an integer between 1 and 12'
    });
  }

  if (!year || !Number.isInteger(Number(year)) || year < 1900 || year > 2100) {
    messages.push({
      message: 'Year must be an integer between 1900 and 2100'
    });
  }

  if (messages.length > 0) {
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateSaleQuery;
