import React from 'react';
import ProductCard from './ProductCard'; // Adjust path as necessary

const Dashboard = () => {
  // Mock data for your dashboard
  const products = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      title: 'Mechanical Keyboard',
      price: 129.50,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      title: 'Gaming Mouse',
      price: 49.99,
      image: 'https://via.placeholder.com/150'
    }
  ];

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <h2>Product Dashboard</h2>
      
      {/* Grid container to display the cards */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;