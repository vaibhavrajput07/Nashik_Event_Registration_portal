import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const API_URL = "http://localhost:5000/api/events";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    start: "",
    end: "",
    location: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          start: form.start,
          end: form.end,
          location: form.location,
        }),
      });

      const savedEvent = await res.json();
      if (!savedEvent || !savedEvent._id) return;

      if (form.id) {
        setEvents(events.map((ev) => (ev._id === savedEvent._id ? savedEvent : ev)));
      } else {
        setEvents([...events, savedEvent]);
      }

      resetForm();
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: "", start: "", end: "", location: "" });
  };

  const handleEdit = (event) => {
    setForm({
      id: event._id,
      name: event.name,
      start: new Date(event.start).toISOString().slice(0, 16),
      end: new Date(event.end).toISOString().slice(0, 16),
      location: event.location,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setEvents(events.filter((ev) => ev._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const filteredEvents = events.filter((ev) =>
    ev.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2 className="user-dashboard-title">🎉 Admin Dashboard</h2>
      </header>

      <form className="event-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={form.name} onChange={handleChange} required />
        <input type="datetime-local" name="start" value={form.start} onChange={handleChange} required />
        <input type="datetime-local" name="end" value={form.end} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <button type="submit">{form.id ? "Update" : "Create"}</button>
        {form.id && <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>}
      </form>

      <input className="search-input" type="text" placeholder="🔍 Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <div className="event-card" key={ev._id}>
              <h3>{ev.name}</h3>
              <p><strong>Start:</strong> {new Date(ev.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(ev.end).toLocaleString()}</p>
              <p><strong>Location:</strong> {ev.location}</p>
              <div className="event-actions">
                <button onClick={() => handleEdit(ev)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(ev._id)}>Delete</button>
                <Link to={`/ShowUserList?eventId=${ev._id}`}><button>Show Users</button></Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-event">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
