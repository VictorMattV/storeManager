const validateUserFields = (req, res, next) => {
  const { email, password } = req.body;
  const messages = [];

  if (!email || typeof email !== 'string' || email.trim() === '') {
    messages.push({
      message: 'Email is required and must be a non-empty string'
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    messages.push({
      message: 'Email must be a valid email address'
    });
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    messages.push({
      message: 'Password is required and must be a non-empty string'
    });
  } else if (password.length < 8) {
    messages.push({
      message: 'Password must be at least 8 characters long'
    });
  }

  if (messages.length > 0) {
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateUserFields;
