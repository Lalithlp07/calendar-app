import React, { useState, useMemo, createContext, useContext, useReducer } from "react";
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Create Context for communication state
const CommunicationContext = createContext();

// Initial state with sample communications and companies
const initialState = {
  communications: [
    { id: 1, companyId: 1, timestamp: "2024-12-01T12:00:00Z", type: "Email" },
    { id: 2, companyId: 2, timestamp: "2024-12-15T14:00:00Z", type: "Call" },
    { id: 3, companyId: 1, timestamp: "2024-12-20T10:00:00Z", type: "Meeting" },
  ],
  companies: [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
  ],
};
// Reducer to manage communication state
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMUNICATION":
      return {
        ...state,
        communications: [...state.communications, action.payload],
      };
    default:
      return state;
  }
};

// CommunicationProvider to pass state and dispatch function through context
const CommunicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getNextScheduledCommunication = (companyId) => {
    return state.communications
      .filter((comm) => comm.companyId === companyId && new Date(comm.timestamp) > new Date())
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))[0];
  };

  return (
    <CommunicationContext.Provider value={{ state, dispatch, getNextScheduledCommunication }}>
      {children}
    </CommunicationContext.Provider>
  );
};

// Hook to access communication context
const useCommunication = () => useContext(CommunicationContext);

// Moment localizer for the calendar
const localizer = momentLocalizer(moment);

// Calendar View component displaying events and handling event details modal
const CalendarView = () => {
  const { state, getNextScheduledCommunication } = useCommunication();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Map past communications into events
  const pastEvents = useMemo(() => {
    if (!state?.communications || !state?.companies) return [];
    return state.communications.map((comm) => {
      const company = state.companies.find((c) => c.id === comm.companyId);
      return {
        title: `${company ? company.name : "Unknown Company"} - ${comm.type}`,
        start: new Date(comm.timestamp),
        end: new Date(comm.timestamp),
        allDay: true,
        resource: { ...comm, companyName: company?.name },
        isPastEvent: true,
      };
    });
  }, [state.communications, state.companies]);

  // Map upcoming communications into events
  const upcomingEvents = useMemo(() => {
    if (!state?.companies || !getNextScheduledCommunication) return [];
    return state.companies
      .map((company) => {
        const nextCommunication = getNextScheduledCommunication(company.id);
        if (!nextCommunication) return null;

        return {
          title: `${company.name} - Next ${nextCommunication.type}`,
          start: new Date(nextCommunication.timestamp),
          end: new Date(nextCommunication.timestamp),
          allDay: true,
          resource: nextCommunication,
          isUpcomingEvent: true,
        };
      })
      .filter(Boolean);
  }, [state.companies, getNextScheduledCommunication]);

  // Combine past and upcoming events
  const events = useMemo(() => [...pastEvents, ...upcomingEvents], [pastEvents, upcomingEvents]);

  // Handle event selection to show modal with details
  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  // Event styling function based on past/upcoming status
  const eventStyleGetter = (event) => {
    const backgroundColor = event.isPastEvent ? "bg-blue-500" : "bg-green-500";
    return {
      className: `${backgroundColor} text-white rounded-lg px-2 py-1`,
    };
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events || []}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />

      {/* Modal for event details */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Communication Details</h2>
            <p>
              <strong>Company:</strong> {selectedEvent.companyName || "N/A"}
            </p>
            <p>
              <strong>Type:</strong> {selectedEvent.type || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {moment(selectedEvent.timestamp || selectedEvent.start).format("MMMM Do, YYYY [at] h:mm A")}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Dashboard View component (Placeholder)
const DashboardView = () => (
  <div>
    <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
    <p>This section will contain dashboard elements.</p>
  </div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState(2); // Default to Calendar view
  const navigate = useNavigate(); 

    const handleTabClick = (tab) => {
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
    <CommunicationProvider>
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`py-2 px-4 text-lg font-semibold ${activeTab === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
          onClick={() => handleTabClick(1)}
        >
          Dashboard
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${activeTab === 2 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
          onClick={() => handleTabClick(2)}
        >
          Calendar
        </button>
        
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <div className="mt-6">
        {activeTab === 1 && <DashboardView />}
        {activeTab === 2 && <CalendarView />}
      </div>
    </CommunicationProvider>
  );
};

export default App;
