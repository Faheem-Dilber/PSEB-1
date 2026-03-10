import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
// import { Alert } from "./ui/alert.jsx";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert.jsx";
import { AlertCircle } from "lucide-react";
import { mockLoginAPI } from "../services/mockAPI.js";


export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Email/Username validation
  const validateEmail = (input) => {
    // Accept valid email format OR the test username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) || input.toLowerCase() === "kminchelle";
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setApiError("");

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email/Username is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email or use 'kminchelle'";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // If validation passes, send API request
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Send username in lowercase
        const requestBody = {
          username: email.toLowerCase(),
          password: password,
        };

        console.log("Sending request:", requestBody);

        // Use mock API instead of external API
        const result = await mockLoginAPI(requestBody.username, requestBody.password);
        console.log("Response:", result.data, "Status:", result.ok);

        if (result.ok && result.data.accessToken) {
          // Save Login Session
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(result.data));
          // Login successful
          console.log("Login successful:", result.data);
          onLoginSuccess(result.data);
          setEmail("");
          setPassword("");
          navigate("/home");
        } else {
          // Login failed
          console.log("Full error response:", result.data);
          // console.log("Full error response:", result.data);
          setApiError(
            result?.data?.message || 
            result?.data?.error || 
            "Invalid credentials. Please try again."
          );
          // setApiError(
          //   result.data.message || 
          //   result.data.error || 
          //   "Invalid credentials. Please try again."
          // );
        }
      } catch (error) {
        setApiError("An error occurred. Please try again.");
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation errors:", newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h1>

        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" /> 
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email or Username
            </label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              disabled={loading}
              variant={errors.email ? "destructive" : "default"}
              className={`${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Test credentials: kminchelle / 0lelplR
            </p>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              variant={errors.password ? "destructive" : "default"}
              className={`${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
