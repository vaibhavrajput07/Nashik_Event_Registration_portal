import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <Link to='/admin-dashboard'>
          <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <br /><br />
      <h3 style={styles.title}>👥 Registered Users</h3>

      {users.length === 0 ? (
        <p style={styles.noUserMsg}>No users registered.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Event</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.mobile}</td>
                  <td style={styles.td}>{user.selectedEvent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Inline CSS styles (same as you shared)
const styles = {
  container: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginTop: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  noUserMsg: {
    color: "#777",
    padding: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  th: {
    backgroundColor: "#eee",
    padding: "10px",
    border: "1px solid #ddd",
    fontWeight: "bold",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
};

export default ShowUserList;
