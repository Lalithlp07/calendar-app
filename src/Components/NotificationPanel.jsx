import React, { useState } from 'react';

const NotificationPanel = () => {
  const [overdueCommunications] = useState([
    { company: "Tech Innovators", type: "LinkedIn Post", date: "2024-09-05" },
  ]);

  return (
    <div>
      <h3>Notifications</h3>
      <div>
        <h4>Overdue Communications</h4>
        <ul>
          {overdueCommunications.map((comm, index) => (
            <li key={index}>
              {comm.company}: {comm.type} on {comm.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationPanel;
