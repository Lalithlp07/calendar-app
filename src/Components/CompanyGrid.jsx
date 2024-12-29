import React from 'react';

const CompanyGrid = ({ companies }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Last Five Communications</th>
          <th>Next Scheduled Communication</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.lastCommunications.join(', ')}</td>
            <td>{company.nextCommunication}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyGrid;