import React, { useState, useEffect } from "react";
import "./EventRegistrationForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EventRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ for redirect after submission

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    selectedEvent: location.state?.selectedEvent || "",
  });

  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed.");
      }

      const result = await res.json();
      console.log("✅ Registration saved:", result);
      alert("✅ Registration submitted successfully!");

      // Clear form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        selectedEvent: "",
      });

      // ✅ Redirect to user dashboard
      navigate("/user-dashboard");
    } catch (error) {
      console.error("🚫 Error submitting registration:", error.message);
      alert("🚫 Failed to submit registration: " + error.message);
    }
  };

  return (
    <div className="registration-form-container">
      <Link to="/user-dashboard">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <br /><br />
      <h2>📝 Event Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          pattern="[0-9]{10}"
          required
          value={formData.mobile}
          onChange={handleChange}
        />

        <select
          name="selectedEvent"
          required
          value={formData.selectedEvent}
          onChange={handleChange}
        >
          <option value="">-- Select Event --</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default EventRegistrationForm;
