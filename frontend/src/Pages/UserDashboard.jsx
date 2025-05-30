import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();

        // Sort events by start date (ascending)
        const allEvents = data.sort((a, b) => new Date(a.start) - new Date(b.start));
        setEvents(allEvents);
      } catch (error) {
        console.error("🚫 Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) =>
    ev.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-dashboard">
      <h2 className="user-dashboard-title">🎉 All Events in Nashik</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search event by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="event-list">
        {filteredEvents.map((ev) => (
          <div className="event-card" key={ev._id}>
            <h3>{ev.name}</h3>
            <p><strong>Start:</strong> {new Date(ev.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(ev.end).toLocaleString()}</p>
            <p><strong>Location:</strong> {ev.location}</p>
            <Link to="/EventRegistration" state={{ selectedEvent: ev.name }}>
              <button className="register-btn">Register</button>
            </Link>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p className="no-events">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
