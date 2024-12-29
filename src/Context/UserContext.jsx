import React, { createContext, useState, useContext } from 'react';

// Create a Context for User data
const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default user is null

  // Function to set the user
  const setLoggedInUser = (userData) => {
    setUser(userData); // Save user data to state
    localStorage.setItem('user', JSON.stringify(userData)); // Optional: Save user data to local storage
  };

  // Function to clear user (logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Optional: Remove user data from local storage
  };

  return (
    <UserContext.Provider value={{ user, setLoggedInUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the User context
export const useUser = () => useContext(UserContext);
