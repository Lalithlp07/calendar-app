import React, { createContext, useContext, useState } from "react";

// Communication context
const CommunicationContext = createContext();

// CommunicationProvider to wrap the app or component that needs access to communication state
export const CommunicationProvider = ({ children }) => {
  const [state, setState] = useState({
    companies: [
      { id: 1, name: "Company A", location: "Location A" },
      { id: 2, name: "Company B", location: "Location B" },
    ],
    communications: [
      { id: 1, companyId: 1, type: "Email", date: "2024-12-30" },
      { id: 2, companyId: 2, type: "Call", date: "2024-12-31" },
      { id: 3, companyId: 1, type: "Meeting", date: "2025-01-02" },
    ],
  });

  return (
    <CommunicationContext.Provider value={{ state, setState }}>
      {children}
    </CommunicationContext.Provider>
  );
};

// Custom hook to use the communication context
export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (!context) {
    throw new Error("useCommunication must be used within a CommunicationProvider");
  }
  return context;
};
