// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import Login from './Login'; // Import the Login component
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { UserProvider } from '../Context/UserContext'; // Import the UserProvider
import Register from './Register';
import CalenderView from '../Components/CalenderView';


const App = () => {

  
  
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* Login page doesn't need the header */}
        <Route path="/login" element={<Login />} /> {/* Index screen */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> {/* Index screen */}

        {/* Wrap all other routes with the Layout component */}
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/calendar" element={<Layout><CalenderView /></Layout>} />
          

        </Routes>
        
    </Router>
    </UserProvider>
  );
};

export default App;
