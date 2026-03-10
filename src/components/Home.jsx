import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";


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

      {!loading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <p className="text-lg font-semibold text-indigo-600">
                ${product.price}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    )}

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg font-semibold">
          Loading products...
        </p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition">

            <CardHeader>
              <CardTitle className="text-lg line-clamp-1">
                {product.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-4"
              />

              <p className="text-indigo-600 font-semibold text-lg">
                ${product.price}
              </p>
            </CardContent>

          </Card>
        ))}

      </div>
    </div>
  );
}