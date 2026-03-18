import React, { useState } from "react";
import ProductCard from "./ProductCard";

const Dashboard = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // FILTER
  const filteredProducts = products.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);

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

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {sortedProducts.map(product => (
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
