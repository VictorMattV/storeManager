const validateClientFields = (req, res, next) => {
  const { name, cpf, address, phone } = req.body;
  const messages = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    messages.push({
      message: 'Name is required and must be a non-empty string'
    });
  }

  if (!cpf || typeof cpf !== 'string' || !/^\d{11}$/.test(cpf)) {
    messages.push({
      message: 'CPF is required and must be a string of 11 digits'
    });
  }

  if (!address || typeof address !== 'object') {
    messages.push({
      message: 'Address is required and must be an object'
    });
  } else {
    if (
      !address.zip ||
      typeof address.zip !== 'string' ||
      !/^\d{5}-\d{3}$/.test(address.zip)
    ) {
      messages.push({
        message: 'Zip is required and must be in the format "12345-678"'
      });
    }

    if (
      !address.street ||
      typeof address.street !== 'string' ||
      address.street.trim() === ''
    ) {
      messages.push({
        message: 'Street is required and must be a non-empty string'
      });
    }

    if (
      !address.neighborhood ||
      typeof address.neighborhood !== 'string' ||
      address.neighborhood.trim() === ''
    ) {
      messages.push({
        message: 'Neighborhood is required and must be a non-empty string'
      });
    }

    if (
      !address.city ||
      typeof address.city !== 'string' ||
      address.city.trim() === ''
    ) {
      messages.push({
        message: 'City is required and must be a non-empty string'
      });
    }

    if (
      !address.state ||
      typeof address.state !== 'string' ||
      address.state.length !== 2
    ) {
      messages.push({
        message: 'State is required and must be a 2-letter string'
      });
    }
  }

  if (!phone || typeof phone !== 'string' || !/^\d{1,15}$/.test(phone)) {
    messages.push({
      message:
        'Phone is required and must be a string of 1 to 15 digits without the "+" character'
    });
  }

  if (messages.length > 0) {
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateClientFields;
