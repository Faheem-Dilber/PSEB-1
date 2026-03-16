import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import Dashboard from "./Dashboard";

export default function Home({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null); // reset error
        setLoading(true);

        const skip = (page - 1) * limit;

        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );

        if (!response.ok) throw new Error("Something went wrong!");

        const data = await response.json();
        setProducts(data.products);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={onLogout}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg font-semibold">
          Loading products...
        </p>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          <Dashboard products={products} />
          <div className="flex justify-center gap-4 mt-8">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>

            <span>Page {page}</span>

            <Button onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </Alert>
      )}
    </div>
  );
}