// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products?page=${page}&size=10`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${productId}`);
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleUpdateQuantity = async (productId) => {
    try {
      await axios.put(`/products/${productId}/quantity`, {
        quantity: parseInt(newQuantity)
      });
      setEditingQuantity(null);
      setNewQuantity('');
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const startEditingQuantity = (productId, currentQuantity) => {
    setEditingQuantity(productId);
    setNewQuantity(currentQuantity.toString());
  };

  const cancelEditingQuantity = () => {
    setEditingQuantity(null);
    setNewQuantity('');
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list">
      <div className="page-header">
        <h1>Product Inventory</h1>
        <Link to="/add-product" className="btn btn-primary">
          Add New Product
        </Link>
      </div>

      {products.length > 0 ? (
        <>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-name">
                        {product.image_url && (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="product-thumbnail"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        {product.name}
                      </div>
                    </td>
                    <td>{product.sku}</td>
                    <td>{product.type}</td>
                    <td className="description-cell">
                      {product.description || 'No description'}
                    </td>
                    <td>
                      {editingQuantity === product.id ? (
                        <div className="quantity-edit">
                          <input
                            type="number"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                            min="0"
                            className="quantity-input"
                          />
                          <button
                            onClick={() => handleUpdateQuantity(product.id)}
                            className="btn btn-small btn-success"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEditingQuantity}
                            className="btn btn-small btn-cancel"
                          >
                            ✗
                          </button>
                        </div>
                      ) : (
                        <div className="quantity-display">
                          <span className={product.quantity < 10 ? 'low-stock' : ''}>
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => startEditingQuantity(product.id, product.quantity)}
                            className="btn btn-small btn-edit"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={products.length < 10}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>No products found.</p>
          <Link to="/add-product" className="btn btn-primary">
            Add your first product
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductList;