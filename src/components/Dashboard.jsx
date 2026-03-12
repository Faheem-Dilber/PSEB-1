import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const Dashboard = ({ products }) => {
  // 1. States for UI controls
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // 2. Logic: Filter -> Sort -> Paginate
  
  // FILTERING
  const filteredProducts = products.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // if filters or sort order change, reset to first page
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  // ensure currentPage never exceeds total pages when items shrink
  React.useEffect(() => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [sortedProducts, currentPage, itemsPerPage]);

  return (
    <div>
      {/* Search & Sort Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2">
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Display */}
      <div className="grid grid-cols-4 gap-3 px-10">
        {currentItems.map(product => (
          <ProductCard 
            key={product.id} 
            title={product.title} 
            price={product.price} 
            image={product.thumbnail || product.image} 
          />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className=" justify-center mt-4 flex gap-4">
        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={indexOfLastItem >= sortedProducts.length}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;
