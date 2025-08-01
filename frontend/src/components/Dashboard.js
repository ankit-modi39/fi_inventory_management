// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalValue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/products?page=1&size=100');
      const products = response.data;
      
      const totalProducts = products.length;
      const lowStockProducts = products.filter(p => p.quantity < 10).length;
      const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * p.quantity), 0);
      
      setStats({
        totalProducts,
        lowStockProducts,
        totalValue: totalValue.toFixed(2)
      });
      
      setRecentProducts(products.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Inventory Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p className="stat-number warning">{stats.lowStockProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <p className="stat-number">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stats.totalValue)}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/add-product" className="btn btn-primary">
          Add New Product
        </Link>
        <Link to="/products" className="btn btn-secondary">
          View All Products
        </Link>
      </div>

      <div className="recent-products">
        <h2>Recent Products</h2>
        {recentProducts.length > 0 ? (
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.type}</td>
                    <td className={product.quantity < 10 ? 'low-stock' : ''}>
                      {product.quantity}
                    </td>
                    <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products found. <Link to="/add-product">Add your first product</Link></p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;