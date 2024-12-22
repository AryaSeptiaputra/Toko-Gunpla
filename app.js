const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const detailTransactionRoutes = require('./routes/detailTransactionRoutes');

// Middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');

// Environment Variables
dotenv.config();

// Middleware untuk parsing JSON request body
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/detail-transactions', detailTransactionRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// 404 Route not found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
