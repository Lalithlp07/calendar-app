import React, { useState } from 'react';
import CompanyManagement from '../Components/CompanyManagement';
import CommunicationMethods from '../Components/CommunicationMethods';
// import CommunicationMethodManagement from './CommunicationMethodManagement';
// You can add more components for the other tabs as needed

const AdminDashboard = () => {
  // State to track the active tab (initially set to 1)
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="px-6">
      {/* Tab navigation */}
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 1
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Company Management
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 2
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab(2)}
        >
          Communication Methods
        </button>
        {/* <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 3
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab(3)}
        >
          Analytics
        </button> */}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 1 && (
          <div>
            {/* Content for Company Management Tab */}
            <CompanyManagement />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {/* Content for Communication Methods Tab */}
            <CommunicationMethods />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <p>Analytics Content Here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
