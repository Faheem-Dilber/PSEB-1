import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";

export default function Home({ user, onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user?.username || "User"}!</h1>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}
