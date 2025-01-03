import React from "react";
import { CommunicationProvider } from "./CommunicationContext"; // Path to CommunicationContext
import ReportingAnalytics from "./Components/Report"; // The page component

const App = () => {
  return (
    <CommunicationProvider>
      <ReportingAnalytics />
    </CommunicationProvider>
  );
};

export default App;
