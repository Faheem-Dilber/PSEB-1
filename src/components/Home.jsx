import { Button } from "./ui/button.jsx";

export default function Home({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <nav className="bg-white shadow-md p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
          <Button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Hello, {user.firstName || "User"}! 👋
          </h2>

          {/* User Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Your Profile Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Username</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.username}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">First Name</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.firstName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Name</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.lastName}
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4">
            <p className="font-semibold mb-1">✓ Login Successful!</p>
            <p className="text-sm">
              You have been successfully authenticated. Your session is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
