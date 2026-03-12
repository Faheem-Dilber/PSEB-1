import React from 'react';

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="product-card" style={styles.card}>
      <img 
        src={image} 
        alt={title} 
        style={styles.image} 
      />
      <div className="product-info" style={styles.info}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Basic inline styles for demonstration (you can replace this with regular CSS or Tailwind)
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '250px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  info: {
    marginTop: '12px'
  },
  title: {
    fontSize: '1.1rem',
    margin: '0 0 8px 0',
    color: '#333'
  },
  price: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0'
  }
};

export default ProductCard;