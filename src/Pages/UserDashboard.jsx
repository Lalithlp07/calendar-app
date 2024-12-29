// import React, { useState } from 'react';
// import { companies } from '../Utils/companies';
// import CalendarView from '../Components/CalenderView';
// import NotificationPanel from '../Components/NotificationPanel';

// const UserDashboard = () => {
//   const [companyList] = useState(companies);

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <NotificationPanel />
//       <CalendarView />
//       <div>
//         <h2>Companies</h2>
//         {companyList.map((company) => (
//           <div key={company.id}>
//             <h3>{company.name}</h3>
//             <p>{company.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
// src/Dashboard.js

import React from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { companiesCommunication } from '../Utils/companiesCommunication';


const UserDashboard = ({ companies }) => {
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: 'Last 5 Communications',
      dataIndex: 'lastCommunications',
      key: 'lastCommunications',
      render: (communications) => {
        return communications
          .slice(0, 5)
          .map((comm, index) => (
            <div key={index}>
              <span>{comm.type}</span> <span>{comm.date}</span>
            </div>
          ));
      },
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: 'Next Scheduled Communication',
      dataIndex: 'nextCommunication',
      key: 'nextCommunication',
      render: (nextComm) => (
        <div>
          <span>{nextComm.type}</span> <span>{nextComm.date}</span>
        </div>
      ),
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: 'Status',
      key: 'status',
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
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
  ];

  return (
    <div className="p-6 mt-6 bg-gray-100 rounded-lg">
      <Table
        columns={columns}
        dataSource={companiesCommunication}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        />
      </div>
  );
};

export default UserDashboard;

