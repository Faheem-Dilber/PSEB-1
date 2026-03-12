import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import Dashboard from "./Dashboard";


export default function Home({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // yahan aapki API call ho rahi hai
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error("Kuch ghalat ho gaya!");
      
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message); // Error handler yahan kaam karega
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={onLogout}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white">
          Logout
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg font-semibold">
          Loading products...
        </p>
      )}

      {/* when data is ready, render dashboard with controls */}
      {!loading && !error && (
        <Dashboard products={products} />
      )}

      {/* error state */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </Alert>
      )}
    </div>
  );
}