import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const Dashboard = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // FILTER
  const filteredProducts = products.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  // Prevent page overflow
  useEffect(() => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [sortedProducts, currentPage]);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 mb-8">

        <input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-48 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {currentItems.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.thumbnail}
          />
        ))}

      </div>

      

    </div>
  );
};

export default Dashboard;