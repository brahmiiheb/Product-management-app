import React from 'react';
import axios from 'axios';

function DeleteProduct({ productId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      onDelete(); // Notify parent component to refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
}

export default DeleteProduct;
