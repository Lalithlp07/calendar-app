// Layout.js
import React from 'react';
import Header from '../Components/Header'; // Import the Header component

const Layout = ({ children }) => {
  return (
    <div className="overflow-hidden. min-h-screen">
      {/* Header is always at the top */}
      <div className='h-full overflow-y-scoll thin-scollbar'>
         <Header />
      
      {/* Main content of the page */}
      <main className="flex-1 px-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
