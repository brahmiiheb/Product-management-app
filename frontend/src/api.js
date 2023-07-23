// frontend/src/api.js
import axios from 'axios';

const createProduct = async (data) => {
  try {
    await axios.post('http://localhost:5000/api/products', data);
  } catch (error) {
    throw new Error('Failed to save product.');
  }
};

const updateProduct = async (data) => {
  try {
    await axios.put(`http://localhost:5000/api/products/${data._id}`, data);
  } catch (error) {
    throw new Error('Failed to update product.');
  }
};

export { createProduct, updateProduct };
