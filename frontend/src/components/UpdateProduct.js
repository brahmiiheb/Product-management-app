import React, { useState } from 'react';
import axios from 'axios';

function UpdateProduct({ productId, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/products/${productId}`, formData);
      onUpdate(); // Notify parent component to refresh the product list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleInputChange}
      />
      <button type="submit">Update Product</button>
    </form>
  );
}

export default UpdateProduct;
