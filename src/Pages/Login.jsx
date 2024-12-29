import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext'; // Import the UserContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(true); // State to track if it's Admin or User login
  const navigate = useNavigate();
  const { setLoggedInUser } = useUser(); // Access the function to set logged-in user

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      // Create a user object
      const userData = {
        username,
        email: `${username}@example.com`, // Just an example, you can change it accordingly
      };

      // Store the user data in context
      setLoggedInUser(userData);

      // Navigate based on the login type
      if (isAdminLogin) {
        navigate('/admin'); // Redirect to /admin for admin login
      } else {
        navigate('/user'); // Redirect to /user for user login
      }
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        {/* Radio Buttons for Admin/User Login */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="adminLogin"
              name="loginType"
              checked={isAdminLogin}
              onChange={() => setIsAdminLogin(true)}
              className="mr-2"
            />
            <label htmlFor="adminLogin" className="text-sm font-semibold">Admin Login</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="userLogin"
              name="loginType"
              checked={!isAdminLogin}
              onChange={() => setIsAdminLogin(false)}
              className="mr-2"
            />
            <label htmlFor="userLogin" className="text-sm font-semibold">User Login</label>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
