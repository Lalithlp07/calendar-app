import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Table, Tag } from "antd";
import { companiesCommunication } from "../Utils/companiesCommunication";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Last 5 Communications",
      dataIndex: "lastCommunications",
      key: "lastCommunications",
      render: (communications) => (
        <>
          {communications.slice(0, 5).map((comm, index) => (
            <div key={index}>
              <span>{comm.type}</span> - <span>{comm.date}</span>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Next Scheduled Communication",
      dataIndex: "nextCommunication",
      key: "nextCommunication",
      render: (nextComm) =>
        nextComm ? (
          <>
            <span>{nextComm.type}</span> - <span>{nextComm.date}</span>
          </>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <div>
          {record.overdue ? (
            <Tag color="red">Overdue</Tag>
          ) : record.dueToday ? (
            <Tag color="yellow">Due Today</Tag>
          ) : (
            <Tag color="green">On Schedule</Tag>
          )}
        </div>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 1:
        navigate('/user'); // Navigate to the Dashboard route
        break;
      case 2:
        navigate('/calendar'); // Navigate to the Calendar route
        break;
      default:
        navigate('/'); // Default to home or initial route
    }
  };
  

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 1
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Dashboard
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 2
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => handleTabClick(2)}
        >
          Calendar
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 1 && (
          <div>
            <div className="p-6 mt-6 bg-gray-100 rounded-lg">
              <Table
                columns={columns}
                dataSource={companiesCommunication}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Calendar</h1>
            <p>Calendar content goes here...</p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Reporting & Analytics</h1>
            <p>Reporting & Analytics content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
