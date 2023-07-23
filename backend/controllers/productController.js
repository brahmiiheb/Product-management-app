// backend/controllers/productController.js
const Product = require('../models/product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Failed to get products.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const newProduct = new Product({ name, price, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to save product.' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Failed to get product.' });
  }
};

// Update a product by ID
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product by ID:', error);
    res.status(500).json({ error: 'Failed to update product.' });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};

// Search products by name
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Search query:', query);

    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const products = await Product.find({ name: regex });
    console.log('Found products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ error: 'Failed to search for products.' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
};
