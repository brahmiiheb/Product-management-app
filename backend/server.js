const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRoutes);

// Connect to MongoDB (Update the connection string with your actual MongoDB URL)
mongoose.connect('mongodb://0.0.0.0:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// API endpoints for CRUD operations
app.get('/api/products', productController.getAllProducts);
app.post('/api/products', productController.createProduct);
app.get('/api/products/:id', productController.getProductById);
app.put('/api/products/:id', productController.updateProductById);
app.delete('/api/products/:id', productController.deleteProductById);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
