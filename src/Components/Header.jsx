import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext'; // Import the UserContext
import Logo from '../Images/logo.png';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, clearUser } = useUser(); // Get the user data from context
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // Clear the user data
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 py-4 px-[3rem] flex justify-between items-center sticky top-0 z-[10]">
      {/* Logo on the left */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10 w-10" />
        <span className="text-white font-bold text-[20px]">Calendar Application for Communication Tracking</span>
      </div>

      {/* Right side with Notification and User Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-white text-2xl" />
          <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <FaUserCircle className="text-white text-3xl" />
          
          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10" onMouseEnter={() => setIsUserMenuOpen(isUserMenuOpen)}>
              <div className="p-4">
                <p className="font-semibold">{user?.username}</p>
                {/* <p className="text-sm text-gray-500">{user?.email}</p> */}
              </div>
              <div className="border-t border-gray-200">
                <button className="w-full text-left text-red-500 py-2 px-4 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
