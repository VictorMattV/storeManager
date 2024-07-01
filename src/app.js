const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.NODE_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
