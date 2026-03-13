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

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [sortedProducts, currentPage]);

  return (
    <div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">

        <input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">

        {currentItems.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.thumbnail}
          />
        ))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage}
        </span>

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={indexOfLastItem >= sortedProducts.length}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Dashboard;