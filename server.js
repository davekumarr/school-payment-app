const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const Order = require('./models/Order_m');
const OrderStatus = require('./models/OrderStatus');

const orderRoutes = require('./routes/Order_r');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use('/api/orders', orderRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// A simple route
app.get('/', (req, res) => {
  res.send('Hello from Express.js!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
