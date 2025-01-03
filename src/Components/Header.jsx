import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Drawer, Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import Logo from "../Images/logo.jpg";

const Header = () => {
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today"); // Tracks the active tab: "today" or "overdue"
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user menu dropdown

  const [overdueCommunications] = useState([
    { id: 1, company: "Company A", action: "Email", date: "2024-12-25" },
    { id: 2, company: "Company B", action: "Phone Call", date: "2024-12-28" },
  ]);

  const [todaysCommunications] = useState([
    { id: 3, company: "Company C", action: "LinkedIn Message", date: "2024-12-30" },
    { id: 4, company: "Company D", action: "Follow-up Email", date: "2024-12-30" },
  ]);

  const { user, clearUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const openNotificationDrawer = () => {
    setIsNotificationDrawerOpen(true);
  };

  const closeNotificationDrawer = () => {
    setIsNotificationDrawerOpen(false);
  };

  const notificationCount = overdueCommunications.length + todaysCommunications.length;

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <header className="bg-blue-500 py-4 px-[3rem] flex justify-between items-center sticky top-0 z-[10]">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10 border border-white-1000 rounded-md w-10" />
        <span className="text-white font-bold text-[20px]">
          Calendar Application for Communication Tracking
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative mt-2">
  <button onClick={openNotificationDrawer} className="relative">
    {/* Notification Icon */}
    <FaBell className="text-white text-2xl" />

      {/* Notification Badge */}
      {notificationCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notificationCount}
      </span>
      )}
      </button>
      </div>

        {/* User Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <FaUserCircle className="text-white text-3xl" />

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="p-4">
                <p className="font-semibold">{user?.username || "Guest"}</p>
              </div>
              <div className="border-t border-gray-200">
                <button
                  className="w-full text-left text-red-500 py-2 px-4 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Drawer */}
      <Drawer
        title="Notifications"
        placement="right"
        closable={true}
        onClose={closeNotificationDrawer}
        open={isNotificationDrawerOpen}
        width={400}
      >
        {/* Tab Buttons */}
        <div className="flex gap-1 mb-4  padding-left: 0px">
          <Button
            type={activeTab === "today" ? "primary" : "default"}
            onClick={() => setActiveTab("today")}
          >
            Today's Communications
          </Button>
          <Button
            type={activeTab === "overdue" ? "primary" : "default"}
            onClick={() => setActiveTab("overdue")}
          >
            Overdue Communications
          </Button>
        </div>

        {/* Communications Grid */}
        {activeTab === "today" && (
          <Table
            dataSource={todaysCommunications}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        )}
        {activeTab === "overdue" && (
          <Table
            dataSource={overdueCommunications}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        )}
      </Drawer>
    </header>
  );
};

export default Header;
