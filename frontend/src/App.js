import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { createProduct, updateProduct } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to view product details in the modal
  const viewProductDetailsModal = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setSelectedProduct(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to add/update a product via the Back-End
const handleSubmit = async (event) => {
  event.preventDefault();

  // Validate that all required fields are filled
  if (!formData.name || !formData.price || !formData.quantity) {
    toast.error('Please fill all required fields.');
    return;
  }

  if (formData._id) {
    // Update existing product
    try {
      await updateProduct(formData);
      setFormData({
        name: '',
        price: '',
        quantity: '',
        _id: '', // Reset the _id field after successful update
      });
      fetchProducts();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  } else {
    // Add new product
    try {
      await createProduct(formData);
      setFormData({
        name: '',
        price: '',
        quantity: '',
      });
      fetchProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  }
};

  // Function to delete a product via the Back-End
  const deleteProduct = async (productId) => {
    try {
      confirmAlert({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await axios.delete(`http://localhost:5000/api/products/${productId}`);
              fetchProducts();
              toast.success('Product deleted successfully!');
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  // Function to fetch all products from the Back-End
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to fetch the details of a specific product by ID
  const viewProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setSelectedProduct(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Function to handle search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log('Search submitted with query:', searchQuery);
    alert('Search submitted with query: ' + searchQuery);
    //fetchFilteredProducts();
   let response = await fetchFilteredProducts();
    if (response){
      setProducts(response)
    }
  };

 // Function to fetch filtered products from the Back-End
const fetchFilteredProducts = async () => {
  try {
    toast.success('Fetching filtered products...'); // Notify user that we're fetching the filtered products

    // Encode the search query before sending it to the backend API
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await axios.get(`http://localhost:5000/api/products?query=${encodedQuery}`);
    setFilteredProducts(response.data); // Set the filtered products state with the results from the backend
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    toast.error('Failed to fetch filtered products.');
    setFilteredProducts([]); // Set filteredProducts to an empty array in case of an error
  }
};

  // Function to handle product edit
  const handleEdit = (product) => {
    setFormData({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setModalIsOpen(false); // Close the modal when editing
  };
  const [isTitleAnimated, setIsTitleAnimated] = useState(false);

  useEffect(() => {
    // Add a delay to start the title animation after a short delay
    const timer = setTimeout(() => {
      setIsTitleAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  console.log('Filtered products:', filteredProducts);
  return (
    <div >
      
      <div className={`title-container ${isTitleAnimated ? 'animated-title' : ''}`}>
        <h1>Product Management App</h1>
      </div>
      {/* Search Form */}
      <div className='add-search-container'>
      <h2>Search Product</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

            {/* Add / Edit Product Form */}
            <h2>{formData._id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        />
        <button type="submit">{formData._id ? 'Update Product' : 'Add Product'}</button>
      </form>
      </div>
      {/* Product List Table */}
      <div className='product-list-container'>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {searchQuery ? (
        // Display filtered products if search query is present
        filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td className="text-center">
                  <button onClick={() => viewProductDetails(product._id)}>View Details</button>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            // Display all products if no search query or no matches
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td className="text-center">
                  <button onClick={() => viewProductDetailsModal(product._id)}>View Details</button>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
              </tr>
              
            ))
            
          )}
          
        </tbody>
      </table>
      </div>
      {/* Product Details Modal */}
      {selectedProduct && (
        <div className={`modal ${modalIsOpen ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedProduct.name}</p>
                <p><strong>Price:</strong> {selectedProduct.price}</p>
                <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;

