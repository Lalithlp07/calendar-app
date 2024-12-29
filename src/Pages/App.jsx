// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import Dashboard from './Dashboard';
import Login from './Login'; // Import the Login component
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { UserProvider } from '../Context/UserContext'; // Import the UserProvider


const App = () => {

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = false;
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* Login page doesn't need the header */}
        <Route path="/login" element={<Login />} /> {/* Index screen */}
        <Route path="/" element={<Login />} /> {/* Index screen */}

        {/* Wrap all other routes with the Layout component */}
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
        </Routes>
        
    </Router>
    </UserProvider>
  );
};

export default App;
